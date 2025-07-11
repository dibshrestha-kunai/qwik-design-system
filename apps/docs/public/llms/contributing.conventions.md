# Contributing Conventions

Accessible via: `/contributing/conventions`

> TODO: Add description.

import { Image } from "~/docs-widgets/image/image";
import convention from "~/assets/docs/conventions/chess.webp";

# Conventions

<Image loading="eager" src={convention} alt="QDS Conventions" />

## Writing documentation

Docs are a great way to understand things better, and also help others, but not all of us like writing docs, or are great writers.

Luckily, Sarah Rainsberger has a [great talk on writing docs](https://www.youtube.com/watch?v=jcpkVJr-rUw).

The [Astro docs guide](https://contribute.docs.astro.build/) from Sarah has been Jack's go-to resource for writing docs. It mentions Astro, but the principles and style guide apply to most documentation.

- Docs are not "good" or "bad"
- Docs are not "complete"
- Docs are not "final"

The question to ask yourself is:
- Are these docs helpful?

> Documenting things is a small sacrifice for a big benefit down the road. Whether that's for your future self, career, or for others.

## Prop Naming

### No `default` in the prop name

Do **NOT** use `default` in the prop name.

```tsx
<Select.Root defaultOpen={false} />
```

Default is a React convention, based on the limitations of one way data flow. Qwik does not have this limitation. Instead, it would be `open` in this case for value based state, and `bind:open` for signal based state.


## Sig Suffix

Every signal (useComputed$, useSignal, useBoundSignal) should have a `Sig` suffix. This is to help prevent confusion between form controls with `.value`

```tsx
const isSelectedSig = useSignal(false);
```

## Signal props and the bind convention

The `bind:x` API's that expect a signal are really  *just a prop*. The convention is to use `bind:` for signals, to stay consistent with Qwik's API (which was inspired by frameworks like Svelte and Angular).

```tsx
<Select.Root bind:value={selectedValueSig} />
```

> You also get typescript autocomplete for each bind on the component!

It is a requirement that you handle both [signal based](http://localhost:5173/contributing/state/#signal-based-reactive-state) and [value based state](http://localhost:5173/contributing/state/#value-based) for each component.



## Events

### Naming

The most important event that handles the  value change should *always* be named `onChange$` on the `Root` piece.

Any other events should be named like `on<EventName>Change$`.

Ex: Listening to when the actual selected value changed

```tsx
<Select.Root onChange$={...} />
```

Ex: Listening to when the Select popover is open

```tsx
<Select.Root onOpenChange$={...} />
```

### Event handling

All events, or functions inside the component should have a $ at the end of the name.

It is also preferred to use a reference to the QRL in the JSX rather than inlining the function.

```tsx
const handleClick$ = $(() => {
    // do something
})

// Do this:
<button onClick$={[handleClick$, props.onClick$]}>
    <Slot />
</button>
```

```tsx
// Not this:
<button onClick$={[() => {
    // do something
}, props.onClick$]}>
    <Slot />
</button>
```

## Data Attributes

Each component should have an identifier data attribute.

Ex: `data-qds-select-root`

We use this both for styling (layout / behavioral css), and for testing.

### Attributes based on existence

**Important Convention:** For data attributes representing a boolean (true/false) state like `data-disabled` or `data-checked`, the attribute should **only be present** on the HTML element when the state is **true**. It should be completely absent when the state is false.

**Example: `data-disabled`**

*   ✅ **Good:**
    *   `disabled = true`  -> `<button data-disabled ...>`
    *   `disabled = false` -> `<button ...>` (Attribute is missing)
*   ❌ **Bad:**
    *   `<button data-disabled="true" ...>` (Avoid setting value to "true")
    *   `<button data-disabled="false" ...>` (Do not add the attribute when false)

**Example: `data-checked`**

*   ✅ **Good:**
    *   `checked = true`  -> `<div data-checked ...>`
    *   `checked = false` -> `<div ...>` (Attribute is missing)
*   ❌ **Bad:**
    *   `<div data-checked="true" ...>` (Avoid setting value to "true")
    *   `<div data-checked="false" ...>` (Do not add the attribute when false)

Styling should rely on the presence or absence of the attribute:

```css
/* Style for when the button IS disabled */
.checkbox-trigger[data-disabled] {
  opacity: 0.5;
}

/* Style for when the checkbox IS checked */
.checkbox-trigger[data-checked] {
  background-color: blue;
}
```

*   ❌ **Bad:**

Do **NOT** prefix any attributes with `data-state`. Not only is it verbose, but it's not the convention we use.








