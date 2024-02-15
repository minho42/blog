---
title: TIL React forwardRef
date: "2023-08-31"
---

I was just browsing around `Radix` source [code](https://github.com/radix-ui/primitives/blob/main/packages/react/checkbox/src/Checkbox.tsx) and stumbled upon this new React API called `forwardRef`.

```js
const Checkbox = React.forwardRef<CheckboxElement, CheckboxProps>(
  (props: ScopedProps<CheckboxProps>, forwardedRef) => {
  ...
})
```

## [forwardRef](https://react.dev/reference/react/forwardRef)

> forwardRef lets your component expose a DOM node to parent component with a ref.

Parent component can access child component's ref if child component is wrapped with `forwardRef`.
Without using forwardRef, child component's ref can't be accessed from parent component.

It's like how [`closure`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures) gives you access to an outer function from an inner function. Not really, but kind of the same concept.

In example code below,

\<ParentComponent> has access to it's own ref (parentInputRef).

\<ParentComponent> also has access to \<ChildComponentWithForwardRef> ref (childForwardRef).

\<ParentComponent> doesn't has access to \<ChildComponentWithoutForwardRef> ref (childWithoutForwardRef).

> Uncaught TypeError: Cannot read properties of null (reading 'value')

```js
import { forwardRef, useRef } from "react"

const ChildComponentWithForwardRef = forwardRef(function ChildComponentWithForwardRef(props, ref) {
  const { label, ...otherProps } = props
  return (
    <label>
      {label}
      <input {...otherProps} ref={ref} />
    </label>
  )
})

const ChildComponentWithoutForwardRef = (props) => {
  const { label, ref, ...otherProps } = props
  return (
    <label>
      {label}
      <input {...otherProps} ref={ref} />
    </label>
  )
}

const ParentComponent = () => {
  const parentInputRef = useRef(null)
  const childForwardRef = useRef(null)
  const childWithoutForwardRef = useRef(null)

  return (
    <div>
      <button
        onClick={() => {
          parentInputRef.current.value += "@"
          childForwardRef.current.value += "@"
          childWithoutForwardRef.current.value += "@"
        }}
        className="flex flex-col bg-purple-200 p-3 gap-3"
      >
        click
        <input ref={parentInputRef} />
        <ChildComponentWithForwardRef label="Child with forwardRef" ref={childForwardRef} />
        <ChildComponentWithoutForwardRef label="Child without forwardRef" ref={childWithoutForwardRef} />
      </button>
    </div>
  )
}

export default function Home() {
  return (
    <main>
      <ParentComponent />
    </main>
  )
}
```
