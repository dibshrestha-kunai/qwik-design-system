# Base Toast

Accessible via: `/base/toast`

> TODO: Add description.

import api from "./code-notate/api.json";

# Toast
A notification system that displays brief messages to users with automatic dismissal options.
<Showcase name="hero" />

## Features
<Features api={api} />

## Anatomy
<AnatomyTable api={api} />

## Examples
### Basic Usage
#### Default Toast
The Toast component provides a way to show temporary notifications to users. It automatically dismisses after a set duration and can be manually closed.
<Showcase name="hero" />

In this example, we're using the basic Toast structure with:
- `<Toast.Root>` as the container component
- `<Toast.Title>` for the accessible title
- `<Toast.Description>` for the detailed message
- `<Toast.Close>` for the dismissal button
The toast is triggered by a button click that sets the `isOpen` signal to `true`.

#### Custom Duration
You can customize how long the toast appears before automatically dismissing.
<Showcase name="custom-duration" />

This example sets a custom duration of 2 seconds using the `duration` prop on `<Toast.Root>`. The default duration is 5 seconds.

#### Signal Binding
Toast state can be bound to a signal for external state management.
<Showcase name="signal-binding" />
The `bind:open` prop creates a two-way binding with the provided signal, allowing you to track the toast's open state from outside the component.

#### Change Callback
You can respond to toast state changes with the `onChange$` callback.
<Showcase name="on-change" />

The `onChange$` callback is triggered whenever the toast opens or closes, allowing you to perform side effects or track usage.

## Component State
### Using Component State
The Toast component provides several ways to control its state through props and callbacks.
#### Controlling Open State
As shown in the Basic Usage example above, you can control the toast's visibility using the `bind:open` prop with a signal:
```typescript
const isOpen = useSignal(false);
<Toast.Root bind:open={isOpen}>
  <Toast.Title>Toast Title</Toast.Title>
  <Toast.Description>Toast Description</Toast.Description>
  <Toast.Close>Close</Toast.Close>
</Toast.Root>
```
This creates a two-way binding between your application state and the toast's open state. When the toast opens or closes, the bound signal will update accordingly.
#### Auto-Dismissal Duration
As shown in the Custom Duration example above, you can control how long the toast appears before automatically dismissing:
```typescript
<Toast.Root bind:open={isOpen} duration={2000}>
  <!-- Toast content -->
</Toast.Root>
```
The `duration` prop accepts a value in milliseconds. The default duration is 5000ms (5 seconds). Setting `duration` to `0` will disable auto-dismissal.
### State Interactions
#### Responding to State Changes
As shown in the Change Callback example above, you can use the `onChange$` prop to respond to toast state changes:
```typescript
const handleChange$ = $((open: boolean) => {
  // Perform actions when toast opens or closes
  console.log(`Toast is now ${open ? 'open' : 'closed'}`);
});
<Toast.Root bind:open={isOpen} onChange$={handleChange$}>
  <!-- Toast content -->
</Toast.Root>
```
The `onChange$` callback receives the current open state as a boolean parameter. This is useful for tracking usage, logging, or triggering additional actions when the toast opens or closes.
#### Pause on Hover
The Toast component automatically pauses its auto-dismissal timer when the user hovers over it. This behavior is built-in and requires no additional configuration. When the user moves their cursor away from the toast, the timer resumes with the remaining time.
This feature ensures that users have enough time to read and interact with the toast content, especially for longer messages or when the toast contains interactive elements like buttons or links.

## Configuration
### Core Configuration
#### Duration Settings
The Toast component automatically dismisses after a set duration. You can customize this duration using the `duration` prop on `<Toast.Root>`.
```typescript
<Toast.Root duration={3000}>
  {/* Toast content */}
</Toast.Root>
```
The `duration` prop accepts a value in milliseconds. The default duration is 5000ms (5 seconds). Setting `duration` to `0` will disable auto-dismissal, requiring the user to manually close the toast.
As shown in the Custom Duration example above, you can set a custom duration of 2000ms (2 seconds) to make the toast dismiss more quickly.

### Advanced Configuration
#### Pause on Hover Behavior
The Toast component automatically pauses its auto-dismissal timer when the user hovers over it. This behavior is built-in and requires no additional configuration. When the user moves their cursor away from the toast, the timer resumes with the remaining time.
This feature ensures that users have enough time to read and interact with the toast content, especially for longer messages or when the toast contains interactive elements like buttons or links.
#### State Change Callback
For advanced use cases, you can track toast state changes using the `onChange$` callback:

```typescript
const handleChange$ = $((open: boolean) => {
  // Perform actions when toast opens or closes
  console.log(`Toast is now ${open ? 'open' : 'closed'}`);
});
<Toast.Root onChange$={handleChange$}>
  {/* Toast content */}
</Toast.Root>
```
As shown in the Change Callback example above, the `onChange$` callback receives the current open state as a boolean parameter. This is useful for tracking usage, logging, or triggering additional actions when the toast opens or closes.

<Showcase name="custom-duration" />

<APITable api={api} />
