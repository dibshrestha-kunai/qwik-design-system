# Base Tabs

Accessible via: `/base/tabs`

> TODO: Add description.

# Tabs

Organize content into multiple sections that users can navigate between.

<Showcase name="hero" />

## Disabled

<Showcase name="disabled" />

## Loop

<Showcase name="loop" />

## Vertical

<Showcase name="vertical" />

## Initial Tab

To set an initial tab, you can pass the `value` prop to the `Tabs.Root` component.

This allows you to bind each tab to its content, allowing it anywhere in the JSX tree.

<Showcase name="initial-value" />

> Alternatively, you can pass the index order instead of a value prop. `value="0` being the first tab. The order of the content must match the order of the tabs.

## Signal based state

You can also use a signal to manage the selected tab.

<Showcase name="signal" />

## Value based state

You can also use the `value` prop to manage the selected tab, and the `onChange$` prop to listen for whenever a selected tab changes.

<Showcase name="value" />

> `onChange$` has an argument of the selected tab's value.

## Manual selection

Tabs are initially selected on focus, to make keyboard selection manual, you can pass `selectOnFocus={false}` to the `Tabs.Root` component.

<Showcase name="manual" />

## Dynamic tabs

You can also dynamically add and remove tabs.

<Showcase name="dynamic" />
