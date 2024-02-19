---
title: Firebase snippets for CRUD (version 10)
date: "2024-01-21"
---

Some more Firebase snippets from my recent side project, [roster-nextjs.vercel.app](https://roster-nextjs.vercel.app)

```js
roster/${uid}/shift/${shiftId}: {
  shift (document path): "shifts/${uid}/shift/${shiftId}"
  start: "2024-01-21"
}

shifts/${uid}/shift/${shiftId}: {
  title: "A"
  createdAt: ...
  modifiedAt: ...
}
```

```js
import { collection, doc, setDoc, getDoc, deleteDoc, orderBy, getDocs, updateDoc } from "firebase/firestore"
```

### Create - setDoc

```js
async function createRoster(uid, start, shiftId) {
  // check for duplicate
  const rosterColRef = collection(db, `roster/${uid}/shift/`)
  const querySnapshot = await getDocs(rosterColRef)

  const duplicate = querySnapshot.docs.find((doc) => {
    return doc.data().shift.id === shiftId && doc.data().start === start
  })
  if (!duplicate) {
    const docRef = doc(rosterColRef)
    await setDoc(docRef, {
      start,
      shift: doc(collection(db, `shifts/${uid}/shift`), shiftId),
      incharge: false,
    })
  }
}
```

### Read - getDoc

```js
async function getShiftTitle(shiftId) {
  const docRef = doc(db, `shifts/${user.uid}/shift`, shiftId)
  const docSnap = await getDoc(docRef)
  if (docSnap.exists) {
    const title = docSnap.data()?.title
    return title
  } else {
    return null
  }
}
```

### Read - getDocs

```js
const colRef = collection(db, `roster/${user.uid}/shift`)
const snapshot = await getDocs(colRef)

const temp = await Promise.all(
  snapshot.docs.map(async (doc) => {
    const shiftId = doc.data().shift.id
    const title = await getShiftTitle(shiftId)
    return {
      start: doc.data().start,
      title,
      color: getColorForTitle(title),
      id: doc.id, // "id" to be used for fullcalendar event
      incharge: doc.data().incharge,
    }
  })
)
```

### Read - getDocs with query

```js
const colRef = collection(db, `shifts/${user.uid}/shift`)
const q = query(colRef, orderBy("createdAt", "asc"))

const snapshot = await getDocs(q)
const temp = snapshot.docs.map((doc) => {
  return { ...doc.data(), id: doc.id }
})
```

### Update - updateDoc

```js
const docRef = doc(db, `roster/${user.uid}/shift/${selectedEvent.id}`)
await updateDoc(docRef, {
  incharge: newInchargeValue,
})
```

### Delete - deleteDoc

```js
const docRef = doc(db, `roster/${user.uid}/shift/${selectedEvent.id}`)
await deleteDoc(docRef)
```

### Related

[Firebase snippets for CRUD and Auth (version 9)](/posts/firebase-v9-crud)
