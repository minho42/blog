---
title: Firebase Security Rules - blog posts
date: "2022-04-12"
---

Collection of `Firebase Security Rules` example snippets for my future use

### Hypothetical `blog` app

```text
posts/post_1
  - title: "first post"
  - content: "📮"
  - owner: "user_1"

users/user_1
  - id: "user_1"
  - email: "user_1@blog.com"
```

### What I want

1. All posts can be `read` by anyone
2. A post can be `created` by any authenticated user
3. A post can only be `updated/deleted` by the **authenticated user who created the post**

### Security Rules for above

1. `allow read;` // anyone
2. `allow create: request.auth != null;` // authenticated user
3. `allow update, delete: request.auth != null && request.auth.uid == resource.data.owner;` // authenticated user who created the post (owner in this case)

### Distinction between request and resource

- `request` is an **incoming request (data)** from path matched
- `resource` is the **existing data** in Firestore that will be evaluated against the set Security Rules

### Put them into functions

```js
function isAuthenticated() {
  return request.auth != null
}
```

```js
function isPostOwner() {
  return request.auth.uid == resource.data.owner
}
```

### Security Rules for `blog` app

```js
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Match any document in the 'posts' collection
    match /posts/{postId} {
      allow read;
      allow create: if isAuthenticated();
      allow update, delete: if isAuthenticated() && isPostOwner();
    }

    // Match any document in the 'users' collection
    match /users/{userId} {
      allow read;
      allow write: if isAuthenticated() && isSameUser(userId);
    }

    function isAuthenticated() {
      return request.auth != null;
    }

    // request.resource.data: incoming data
    // resource.data: existing data
    function isPostOwner() {
      return request.auth.uid == resource.data.owner;
    }

    function isSameUser(userId) {
      return request.auth.uid == userId;
    }

  }
}
```
