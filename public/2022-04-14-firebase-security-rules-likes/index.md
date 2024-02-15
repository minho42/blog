---
title: Firebase Security Rules - like/unlike system
date: "2022-04-14"
---

> Edit: Removed like/unlike system as of 8/June/2022 for simplicity 😝

This is how I figured out to do like/unlike system for my blog posts using Firebase Authentication and Firestore.
I believe there are other ways and better ways to do the same.

## Data structure

```text
likes/post_1
  - postId: "post_1"
  - userIds: ["user_1", "user_2"]
  - users: [
    {
      id: "user_1",
      email: "user_1@blog.com",
      name: "User 1",
      ...
    },
    {
      id: "user_2",
      ...
    }
  ]

users/user_1
  - id: "user_1"
  - email: "user_1@blog.com"
```

Coming from relational database background (I'm not a SQL master), it's still awkward to have nested, duplicated data. Above is the data structure I settled for my blog like system with Firebase.
This `likes` collection has list of user objects who liked the post, and their id is duplicated in `userIds`.
User object data is nested inside `users` list in order to reduce Firestore lookup counts. Usage is charged for the number of read/write activities regardless of size of looked up document. Therefore it makes sense to have duplicate data.

`userIds` are list of user IDs from `users` field.
It's duplicate from `users[].id`, frontend code is ensuring both are in sync in my case.

Why `userIds` list?

**Turns out it's impossible (?) to find if users list has id of 'user_1' or not with above data structure.** (let me know if it's not true)

It's possible in JavaScript but Firebase Security Rules are built on top of JavaScript/JSON-looking language called [Common Expression Language](https://firebase.google.com/docs/rules/rules-language) that is non-turing complete.

## Start applying Security Rules

Like button can:

- `create` new document when liked for the first time.
- `update` document by adding liked user thereafter.

Unlike button can:

- `delete` document if no one likes the post any more.
- `update` document by removing user but leaving other people as is

### read

Anyone can read data

```js
allow read;
```

### create

Any authenticated user can create

```js
allow create: if isAuthenticated();

function isAuthenticated() {
  return request.auth != null;
}
```

### delete

Authenticated user can delete their own likes only

```js
allow delete: if isAuthenticated() && isLikedByMe();

function isAuthenticated() {
  return request.auth != null;
}

function isLikedByMe() {
  return request.auth.uid in resource.data.userIds;
}
```

## Distinction between request and resource

- `request` is an incoming request (data) from path matched
- `resource` is the existing data in Firestore that will be evaluated against the set Security Rules

### Here's the challenge

Like (add user) and unlike (remove user) both are considered `update` operations in Security Rules but has different conditions to apply.

Adding user to the liked user list is same as creating a new one: any authenticated user is allowed to do so.

**But removing user from list (without deleting the document) must make sure user is only allowed to remove himself/herself from the liked users list.**

How to make such a rule?

### Solution

1. Allow update if user is not in the liked user list (adding).

2. If not (removing without `delete` operation), user shouldn't be in the liked user list after `update` operation.

This is achievable with the use of builtin function: [getAfter](https://firebase.google.com/docs/firestore/security/rules-conditions)

```js
getAfter(/databases/$(database)/documents/likes/$(likeId)).data
```

this returns document objects as if it's successfully executed updating without actually doing so (kinda staging data).

**If user who is attempting to remove their id is not included in the returned data from above, it's quite certain that they removed themselves not others.**

I guess length of the list can also be checked before and after if need more strict rules.

```js
// Haven't tested but something like this...
let beforeData = request.resource.data
let afterData = getAfter(/databases/$(database)/documents/likes/$(likeId)).data

beforeData.userIds.length - 1 == afterData.userIds.length
```

### update

```js
match /likes/{likeId} {
  allow update: if isAuthenticated() && isUpdateAllowed(likeId);
}

function isAuthenticated() {
  return request.auth != null;
}

function isUpdateAllowed(likeId) {
  let isUpdateRemoving = (request.auth.uid in resource.data.userIds);
  let isUpdateAdding = !isUpdateRemoving;
  let isGoingToDeleteMyselfFromLikedUsers = !(
    request.auth.uid in
    getAfter(/databases/$(database)/documents/likes/$(likeId)).data.userIds
    );

  return isUpdateAdding || (isUpdateRemoving && isGoingToDeleteMyselfFromLikedUsers)
}
```

## Full Security Rules for `likes` collection

This is the full Security Rules for my future reference.
It has things that are not mentioned above

```js
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    match /users/{userId} {
      allow read, write: if isAuthenticated() && isSameUser(userId);
    }

    match /likes/{likeId} {
      allow read;
      allow create: if isAuthenticated() && isCreateKeysCorrect();
      allow update: if isAuthenticated() && isUpdateKeysCorrect() && isUpdateAllowed(likeId);
      allow delete: if isAuthenticated() && isLikedByMe();
    }

    function isCreateKeysCorrect() {
      let isAllKeysCorrect = request.resource.data.keys().hasAll(['postId', 'userIds', 'users']);

      return isAllKeysCorrect;
    }

    function isUpdateKeysCorrect() {
      let isUnchangedKeysCorrect = request.resource.data.diff(resource.data).unchangedKeys().hasAll(['postId']);
      let isChangedKeysCorrect = request.resource.data.diff(resource.data).changedKeys().hasAll(['userIds', 'users']);

      return isUnchangedKeysCorrect && isChangedKeysCorrect;
    }

    function isUpdateAllowed(likeId) {
      let isUpdateRemoving = (request.auth.uid in resource.data.userIds);
      let isUpdateAdding = !isUpdateRemoving;
      let isGoingToDeleteMyselfFromLikedUsers = !(
        request.auth.uid in
        getAfter(/databases/$(database)/documents/likes/$(likeId)).data.userIds
        );

      return isUpdateAdding || (isUpdateRemoving && isGoingToDeleteMyselfFromLikedUsers)
    }

    function isLikedByMe() {
      return request.auth.uid in resource.data.userIds;
    }

    function isAuthenticated() {
      return request.auth != null;
    }

    function isSameUser(userId) {
      return request.auth.uid == userId;
    }

  }
}
```

### Related

- [Firestore security rules cookbook](https://fireship.io/snippets/firestore-rules-recipes/) by Jeff Delaney
