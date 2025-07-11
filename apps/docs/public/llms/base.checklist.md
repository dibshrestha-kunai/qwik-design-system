# Base Checklist

Accessible via: `/base/checklist`

> TODO: Add description.

import api from "./code-notate/api.json";

# Checklist
A group of selectable items that can be toggled individually or all at once.
<Showcase name="hero" />
## Features
<Features api={api} />
## Anatomy
<AnatomyTable api={api} />
## Examples
### Basic Usage
The basic checklist setup allows users to select multiple items independently.
<Showcase name="select-all" />
This example demonstrates:
- `Checklist.Root` as the container for all checklist items
- `Checklist.Item` for individual selectable items
- `Checklist.ItemTrigger` and `Checklist.ItemIndicator` for the checkbox interaction
- `Checklist.ItemLabel` for item text
- `Checklist.SelectAll` for the parent checkbox that controls all items
- `Checklist.SelectAllIndicator` showing the mixed state with both check and minus icons
- `Checklist.Label` for the select all text
The select-all functionality automatically manages three states:
- Unchecked when no items are selected
- Mixed state when some items are selected
- Checked when all items are selected
Each item maintains its own state while staying synchronized with the select-all checkbox.
Note: The example uses Lucide icons (`LuCheck` and `LuMinus`) to display the checkbox states, but you can customize these with your own icons or indicators.

### Form Integration
Integrate with native HTML forms by adding the `Checklist.HiddenInput` component under each item.
The selected items are then automatically submitted with the form. The `name` input is required and should be unique
within the form.
<Showcase name="form" />

## Component State
### Using Component State
The Checklist component provides a powerful way to manage multiple checkbox selections with a "select all" capability. Let's look at how to implement and control the checklist state.
The basic checklist state is demonstrated in the hero example:
<Showcase name="hero" />
For more advanced state management, including a "select all" feature:
<Showcase name="select-all" />
This example demonstrates:
- Individual item selection state
- Select all functionality
- Mixed state when only some items are selected
### State Interactions
The checklist maintains three main states:
- Unchecked: No items selected
- Mixed: Some items selected
- Checked: All items selected
The select-all checkbox automatically updates based on the state of individual items:
- Shows unchecked when no items are selected
- Shows a mixed state when some items are selected
- Shows checked when all items are selected
To respond to state changes, the checklist items and select-all checkbox are automatically synchronized:
1. When clicking the select-all checkbox:
   - If unchecked or mixed: All items become checked
   - If checked: All items become unchecked
2. When clicking individual items:
   - Updates the select-all checkbox state based on overall selection
   - Maintains the mixed state when appropriate
The state management is handled automatically by the component, requiring no additional configuration from the user. Simply structure your checklist with the appropriate components and the state synchronization works out of the box.

Based on the provided implementation and examples, I'll document the configuration options for the Checklist component.
## Core Configuration
### Select All Behavior
The Checklist component supports a "select all" functionality that manages the state of all child checkboxes. As shown in the `select-all` example above, this requires configuring both the select all trigger and individual items.
The select all state automatically manages three possible values:
- `false` - No items checked
- `true` - All items checked  
- `"mixed"` - Some items checked
### Item Management
Items must be direct children of `Checklist.Root` to be properly tracked. The component internally manages indices for state synchronization.
> Each `Checklist.Item` requires a unique key when mapping over items to maintain proper state tracking.
### Group Configuration
The Checklist is configured as a checkbox group by default with the following characteristics:
```typescript
type ChecklistContext = {
  isAllCheckedSig: Signal<boolean | "mixed">;
  checkedStatesSig: Signal<(boolean | "mixed")[]>;
};
```
The context manages:
- Overall checked state (`isAllCheckedSig`)
- Individual item states (`checkedStatesSig`)
### Form Integration
The Checklist can be integrated with forms through the `HiddenInput` component. As shown in the `hero` example above, this manages the form submission state for all checkboxes in the group.
## Advanced Configuration
### State Synchronization
The Checklist implements a bi-directional state synchronization:
1. Select All → Items:
- When select all is toggled, all items update to match
- Mixed state is preserved when partially selected
2. Items → Select All:
- Select all updates based on collective item state
- Automatically switches to mixed state when appropriate
### Custom Layouts
While the component handles state management, the layout is fully customizable. As shown in the `select-all` example above, items can be nested and grouped with custom spacing and hierarchies.
> Note: The internal state tracking works regardless of DOM structure, but items must remain direct children of `Checklist.Root` in the component tree.

Based on the provided implementation and examples, I'll document the form-specific features of the Checklist component.
## Forms
The Checklist component provides form integration through the `<Checklist.HiddenInput>` component, which manages multiple checkbox form inputs.
The component follows a group pattern where the select-all functionality can control multiple checkbox states simultaneously.
<Showcase name="select-all" />
In this example, the select-all checkbox controls the state of all child checkboxes, maintaining form state synchronization. When some items are selected, the select-all checkbox displays a mixed state, indicated by the minus icon.
The form state is managed through the `ChecklistContext`, which tracks:
- The overall checked state (`isAllCheckedSig`)
- Individual item states (`checkedStatesSig`)
The `<Checklist.Root>` component acts as a form group container with the appropriate `role="group"` attribute, ensuring proper form semantics and accessibility.
Note: The current implementation doesn't show explicit form validation examples, but the component structure includes `<Checklist.Error>` for handling validation states when needed.



<APITable api={api} />