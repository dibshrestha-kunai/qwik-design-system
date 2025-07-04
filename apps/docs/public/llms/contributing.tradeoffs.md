# Contributing Tradeoffs

Accessible via: `/contributing/tradeoffs`

> TODO: Add description.

# Tradeoffs in Component Design

## HTML Streaming Order Challenges

When building accessible components in Qwik, we face unique challenges due to how HTML is streamed from the server to the client. These challenges particularly affect components with related elements like form controls, labels, and descriptions.

### The Connection Problem

In standard HTML, elements are often connected through attributes:
- Labels connect to inputs via `for` and `id` attributes
- ARIA relationships use attributes like `aria-labelledby` and `aria-describedby`
- Error states need to reference their associated inputs

These connections create accessibility relationships that screen readers and other assistive technologies rely on.

## The Challenge with Streaming Rendering

### Why Traditional Nesting Doesn't Always Work

Consider this common component pattern:

```jsx
<Field.Root>
  <Field.Label>Email</Field.Label>
  <Field.Input />
  <Field.Description>Enter your work email</Field.Description>
  <Field.Error>Invalid email Fieldat</Field.Error>
</Field.Root>
```

In a streaming environment, components render sequentially. By the time `Field.Description` is encountered, `Field.Input` has already been sent to the browser. This creates two significant issues:

1. **Missing References**: We can't retroactively add the description's ID to the input's `aria-describedby` attribute
2. **Unpredictable Component Order**: We can't assume users will always place components in a specific order

### Example: Checkbox with Description

<Showcase name="description" />

In this example, the `Root` component provides context for the `Trigger` and `Label`. However, when a user adds a `Description` component:

```jsx
<Checkbox.Root>
  <Checkbox.Trigger />
  <Checkbox.Label>Accept terms</Checkbox.Label>
  <Checkbox.Description>Read our terms and conditions</Checkbox.Description>
</Checkbox.Root>
```

The `Trigger` has already been streamed before we discover the `Description` exists!

## Current Solution: Props-Based Approach

Our current approach passes information up front through props:

```jsx
<Checkbox.Root description>
  <Checkbox.Trigger />
  <Checkbox.Description>Read our terms</Checkbox.Description>
</Checkbox.Root>
```

What's happening under the hood:

```tsx
<button aria-describedby={context.description ? descriptionId : undefined}>
    <Slot />
</button>
```

This pattern:
- Informs `Root` ahead of time that a description exists
- Allows proper ARIA attributes to be added when components render
- Creates a more predictable rendering pattern

### Limitations

While functional, this approach:
- Makes the API more verbose
- Requires manual ID management
- Reduces the intuitiveness of the component composition

### Future Improvements

Some potential solutions:

#### 1. Out-of-Order Streaming

Qwik could support mechanisms to revisit and update already-streamed HTML, allowing components to communicate after initial rendering.

This has been [proposed in a Qwik](https://github.com/QwikDev/qwik-evolution/discussions/16) and would enable more intuitive component APIs.

#### 2. Inline components

A root component could collect information about children before rendering the parent, enabling automatic connection of related components.

> The downside here is that user composed components make getting this information difficult.

#### 3. Deferred Rendering

Components could defer rendering critical attributes until all children have been analyzed, then "catch up" with the necessary connections.

### Contribute to This Challenge

This remains an active area of research in Qwik's component model. We welcome contributions and ideas for solving this streaming composition problem!

If you have approaches that might help balance accessibility needs with intuitive APIs, please share them with the community.

## asChild and inline components

The `asChild` prop is a powerful feature that allows a component to render another component as its child. This is useful for creating more complex components that can be reused in different contexts.

Take for example a use case in the `Tree` component:

```tsx
import {
  type Component,
  type PropsOf,
  Slot,
  component$,
  useContext
} from "@builder.io/qwik";
import { withAsChild } from "../as-child/as-child";
import {
  type CollapsibleTrigger,
  CollapsibleTriggerBase
} from "../collapsible/collapsible-trigger";
import { groupContextId } from "./tree-group";
import { TreeItem } from "./tree-item";

export const TreeGroupTriggerBase: Component<PropsOf<typeof CollapsibleTrigger>> =
  component$((props) => {
    const groupContext = useContext(groupContextId);
    
    return (
      <TreeItem asChild groupTrigger groupId={groupContext?.id}>
        <CollapsibleTriggerBase {...props}>
          <Slot />
        </CollapsibleTriggerBase>
      </TreeItem>
    );
});

export const TreeGroupTrigger = withAsChild(TreeGroupTriggerBase);

```

The Collapsible Trigger is becoming a tree item. This allows us to get the logic inside the tree item, and combine it with the collapsible trigger logic.

### Why the base component?

When using asChild internally, you must always use asChild **on the base**, which is a `component$` component, not the inline component.

If the child being rendered is not a normal Qwik component, that information **cannot be serialized**. As a result, we use Qwik's `noSerialize` function to render the child, and state / props can be lost as we transfer from environments.