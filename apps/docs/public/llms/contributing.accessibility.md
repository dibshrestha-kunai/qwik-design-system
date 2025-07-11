# Contributing Accessibility

Accessible via: `/contributing/accessibility`

> TODO: Add description.

---
title: Qwik Design System | Accessibility
---

import { Image } from "~/docs-widgets/image/image";
import accessibility from "~/assets/docs/accessibility/accessibility.webp";

# Accessibility

<Image src={accessibility} alt="Accessibility" />

**The Americans with Disabilities Act (ADA)** requires applications to be accessible to people with disabilities. Following accessibility best practices helps:

- Make your components and API's usable by everyone
- Meet legal requirements
- Support consumers who rely on assistive technologies

## Getting started

The [Aria APG](https://www.w3.org/WAI/ARIA/apg/) is a great starting point for understanding how to make your component pieces and API's accessible.

> Keep in mind, that this is more of a starting point and not a comprehensive guide.  It is important to test your component on a regular basis to ensure that it is accessible to all users.

## Qwik specific

Most accessibility features in Qwik work through standard HTML attributes added on initial render.

There are however, some Qwik specific features that can be used to manage attributes, elements, focus management, and state.

### Attributes and state

In this example, we're creating an accessible toggle button that properly announces its state to screen readers:

```tsx
const isPressedSig = useSignal(false);

const handleClick$ = $(() => {
    isPressedSig.value = !isPressedSig.value
})

return (
  <>
    <button 
      onClick$={[handleClick$, props.onClick$]}
      aria-pressed={isPressedSig.value}
    >
      Toggle
    </button>
  </>
);
```

Make sure to use reactive state to manage attributes (signals, stores, props).

In the case of `data-*` attributes, you can use a ternary to indicate the presence of the attribute, otherwise it will be undefined.

```tsx
const isPressedSig = useSignal(false);

const handleClick$ = $(() => {
    isPressedSig.value = !isPressedSig.value
})

return (
  <>
    <button 
      onClick$={[handleClick$, props.onClick$]}
      aria-pressed={`${isPressedSig.value}`} // Will be the text "true" or "false"
      data-pressed={isPressedSig.value} // Will exist if true, otherwise undefined
    >
      Toggle
    </button>
  </>
);
```


### Refs

Signals in Qwik are also refs.  This means that you can use a signal to manage the ref for an element.

The ref value becomes the DOM element when it is resolved on the client.

```tsx
const triggerRef = useSignal<HTMLButtonElement>();

const handleClick$ = $(() => {
    // on the client I resolve to the button
    console.log(triggerRef.value)
})

return (
    <button ref={triggerRef} onClick$={[handleClick$, props.onClick$]}>
       <Slot />
    </button>
)
```

#### Merging refs

The `ref` attribute can also accept a function, with the first argument being the element in the DOM when resolved on the client.

This can be useful when consumers of your component provide a ref to the component.

```tsx
return (
    <button ref={(el) => {
        context.triggerRef = el;
        
        if (props.ref) {
            props.ref.value = el;
        }
    }}>
        <Slot />
    </button>
)
```

> The ref function can also be used for other more complex use cases, such as handling an array of refs.

### Managing Multiple Instances

When working with multiple instances of components (like tabs, accordions, or carousels), it's important to manage DOM elements correctly for accessibility. **Never use `querySelector` or `getElementById`** - instead, use Qwik's ref system.

#### Single Instance vs Multiple Instances

For a single instance (e.g., one modal trigger):
```tsx
// In your root component
const triggerRef = useSignal<HTMLButtonElement>();

// Make it available to child components
const context = {
  triggerRef
};
useContextProvider(modalContextId, context);
```

For multiple instances (e.g., carousel slides), use an array of refs:
```tsx
// In your root component
type CarouselContext = {
  slideRefs: Signal<HTMLElement[]>;
}

const context: CarouselContext = {
  slideRefs: useSignal([]),
};
useContextProvider(carouselContextId, context);
```

#### Managing Individual Refs

When rendering multiple instances, each needs its own ref:
```tsx
export const CarouselSlideBase = component$((props) => {
  const context = useContext(carouselContextId);
  const slideRef = useSignal<HTMLElement>();

  useTask$(function setIndexOrder({ cleanup }) {
    if (props._index !== undefined) {
      context.slideRefsArray.value[props._index] = slideRef;
    } else {
      throw new Error('Qwik UI: Carousel Slide cannot find its proper index.');
    }

    cleanup(() => {
      context.slideRefsArray.value[props._index] = undefined;
    })
  });

  return (
    <Render
      internalRef={slideRef}
      role="tabpanel"
      aria-hidden={context.currentIndex.value !== props._index}
    >
      <Slot />
    </Render>
  );
});

export const CarouselSlide = withAsChild(CarouselSlideBase, (props) => {
  const index = getNextIndex("carousel")

  props._index = index;

  return props;
});
```

Please read the [indexing docs](https://qwik.design/contributing/indexing/) for more information on how to manage multiple instances of components.

> Notice that an array of refs is used to manage the refs for each instance. You will also need to use the `resetIndexes(namespace)` to tie the component to the render lifecycle.

#### Using Refs for focus management

Once refs are set up, you can manage focus and ARIA attributes properly:
```tsx
const focusNextSlide$ = $((currentIndex: number) => {
    const slides = context.slideRefs.value;
    const totalSlides = slides.length;

    if (!totalSlides) return;

    const nextIndex = (currentIndex + 1) % totalSlides;
    return focusSlide(slides[nextIndex], nextIndex);
});
```

## JSX in Qwik

There are a couple of differences between JSX and HTML that are important to know when working with Qwik.

### Self-Closing Tags

Unlike HTML which can be forgiving with unclosed tags, JSX requires explicit closing of all elements. For elements that can't have children (like `img`, `input`, etc.), use self-closing syntax:

```tsx
// ❌ Invalid JSX
<img src="/images/logo.png">

// ✅ Valid JSX
<img src="/images/logo.png" />
```

### Case Sensitivity 

### Tags
HTML tags must be lowercase in JSX:

```tsx
// ❌ Invalid JSX
<MAIN>
  <H1>Hello World!</H1>
</MAIN>

// ✅ Valid JSX
<main>
  <h1>Hello World!</h1>
</main>
```

### Attributes
Most attributes in JSX use camelCase:

```tsx
// ❌ Invalid JSX
<video
  src="/videos/demo.mp4"
  autoplay={true}
/>

// ✅ Valid JSX
<video
  src="/videos/demo.mp4"
  autoPlay={true}
/>
```

> **Exception**: `data-*` and `aria-*` attributes keep their original kebab-case format:
> ```tsx
> <button
>   data-test-id="submit-button"
>   aria-label="Submit form"
> >
>   Submit
> </button>
> ```

### Inline Styles

In JSX, the `style` attribute takes an object instead of a string:

```tsx
// ❌ Invalid JSX
<div style="color: blue; font-size: 16px;">

// ✅ Valid JSX
<div style={{ color: 'blue', fontSize: '16px' }}>
```

CSS properties are written in camelCase:
- `background-color` → `backgroundColor`
- `border-radius` → `borderRadius`
- `font-family` → `fontFamily`

### Event Handlers in Qwik

Qwik has a unique approach to event handlers using the `$` suffix:

```tsx
export const Counter = component$(() => {
  const count = useSignal(0);

  // ❌ Invalid in Qwik
  return <button onClick={() => count.value++}>

  // ✅ Valid in Qwik
  return <button onClick$={() => count.value++}>
    Count: {count.value}
  </button>
});
```

The `$` suffix is crucial in Qwik as it enables modular lazy-loading of code.

### Expression Slots

Like React, Qwik JSX uses curly braces `{}` for JavaScript expressions:

```tsx
export const Greeting = component$(() => {
  const name = "World";
  return (
    <div>
      <h1>Hello {name}!</h1>
      <div>{2 + 2}</div>
      <div>{getGreeting()}</div>
    </div>
  );
});
```

### Boolean Attributes

In JSX, boolean attributes can be written in shorthand when the value is `true`:

```tsx
// These are equivalent:
<input disabled={true} />
<input disabled />

// To set false, omit the attribute:
<input /> // disabled={false}
```

## A11y Testing

### Automated Accessibility Testing   

This should be the first step in testing your application for accessibility. Automated testing tools can help identify accessibility issues with minimal effort.

- Use a linter to detect issues early in the development process. (e.g. axe DevTools Linter)
- Use a browser extension to test for accessibility issues. (e.g. Lighthouse, axe DevTools, WCAG Contrast Checker)
- Use a testing framework to automate accessibility testing. (e.g. Playwright, Vitest)

### Manual Accessibility Testing

**Manual testing should not be skipped.** It is beneficial to test using different platforms and devices and review and fix any issues that automated testing may have missed. While pairing of screen readers and browsers is outside the scope of this guide, it is important to note that there are screen readers that work better with certain browsers and platforms.

#### Testing order:

**1. Keyboard Navigation Testing**
  - Make sure all interactive elements are **focusable** using just the keyboard
  - Note any elements that are **skipped** or **out of order**
  - Confirm that modals and other dynamically loaded content **trap focus** as necessary and return it correctly when closed

**2. Screen Reader Testing**
  - Use screen readers like **NVDA**, **JAWS**, or **VoiceOver** to navigate and interact with your application
  - Note any issues or areas that may be **difficult to navigate**
  - As with keyboard only navigation, confirm that modals and other dynamically loaded content trap focus as necessary and return it correctly when closed and that the screen reader **announces the changes properly**

### Cross-Platform Accessibility Testing

Testing accessibility across multiple platforms and devices is essential to ensure your application is accessible to all users.

_Note: This section does not replace automated and manual testing, it is in addition to those methods._

#### Test with key platforms and assistive technologies

- **Windows:** NVDA, JAWS, Narrator. JAWS is paid, while NVDA and Narrator are free and open source.
- **Mac:** VoiceOver for Mac and iOS devices
- **Android:** Talkback for Android devices

#### Establish a Testing Plan

- Choose a primary browser + screen reader combination for initial development. This provides a baseline and helps identify issues early.
- Document your findings: browser version, screen reader used, OS version, and any issues found.
- Test on other platforms and devices. Mobile devices have different screen sizes and input methods (touch vs keyboard), which can reveal new issues.

#### Continuous process

Accessibility testing should be integrated into your development workflow. Test regularly and continuously improve - solving an issue on one platform might affect another, so ongoing testing across platforms is essential.

## Accessibility Resources

A growing collection of useful links, tools, and resources to have handy for your everyday accessibility work.

### Accessibility Standards
- [HTML: The Living Standard](https://html.spec.whatwg.org/)
- [WCAG](https://www.w3.org/TR/WCAG/)
- [WCAG Quick Reference](https://www.w3.org/WAI/WCAG21/quickref/)
- [Understanding WCAG 2.1](https://www.w3.org/WAI/WCAG21/Understanding/)
- [Techniques for WCAG 2.1](https://www.w3.org/WAI/WCAG21/Techniques/)
- [ARIA](https://www.w3.org/TR/wai-aria/)
- [ARIA Authoring Practices Guide (APG)](https://www.w3.org/WAI/ARIA/apg/)
- [ARIA in HTML](https://www.w3.org/TR/html-aria/)
- [Using ARIA](https://www.w3.org/TR/using-aria/)
- [HTML Accessibiliy API Mappings (AAM)](https://www.w3.org/TR/html-aam/)
- [Accessible Name and Description Computation](https://w3c.github.io/html-aam/#accessible-name-and-description-computation)

### Useful Resources and References
- [HTML5 Accessibility](http://www.html5accessibility.com/) - Tests which HTML5 features are accessibly supported by major browsers
- [a11ysupport.io](https://a11ysupport.io/) - ARIA attributes support across screen readers
- [This is WCAG 2.1](https://thisiswcag.com/)
- [WCAG 2.1 Map](https://intopia.digital/articles/intopia-launches-wcag-2-1-map/)

### Guides & Cheatsheets

#### Official Screen Reader User Guides

##### NVDA
- [User Guide](https://www.nvaccess.org/files/nvda/documentation/userGuide.html)
- [Browse Mode](https://www.nvaccess.org/files/nvda/documentation/userGuide.html#BrowseMode) - Most read-only webpages are browsed in NVDA using Browse mode

##### JAWS
- [JAWS Documentation](https://www.freedomscientific.com/Products/software/JAWS/)
- [JAWS Hotkeys](https://www.freedomscientific.com/training/jaws/hotkeys/#wb)

##### Narrator
- [Complete Guide to Narrator](https://support.microsoft.com/en-us/windows/complete-guide-to-narrator-e4397a0d-ef4f-b386-d8ae-c172f109bdb1)
- [Narrator Keyboard Commands and Touch Gestures](https://support.microsoft.com/en-us/windows/appendix-b-narrator-keyboard-commands-and-touch-gestures-8bdab3f4-b3e9-4554-7f28-8b15bd37410a#WindowsVersion=Windows_11)

##### VoiceOver
- [VoiceOver for iPhone](https://help.apple.com/iphone/11/#/iph3e2e415f)
- [VoiceOver for Mac](https://support.apple.com/en-lb/guide/voiceover/vo27974/10/mac/13.0)
- [Apple VoiceOver Command Charts](https://help.apple.com/voiceover/command-charts/)

##### TalkBack
- [Android Accessibility](https://support.google.com/accessibility/android/topic/10601774?hl=en&ref_topic=3529932)
- [TalkBack User Guides](https://support.apple.com/en-lb/guide/iphone/iph3e2e415f/16.0/ios/16.0)
- [Turn on and Practice VoiceOver on iPhone](https://help.apple.com/iphone/11/#/iph3e2e415f)
- [TalkBack Gestures on iOS](https://dequeuniversity.com/screenreaders/talkback-shortcuts)

#### Screen Reader Cheatsheets
- [VoiceOver Keyboard Shortcuts on a Mac](https://dequeuniversity.com/screenreaders/voiceover-keyboard-shortcut)
- [VoiceOver Gestures on iOS](https://dequeuniversity.com/screenreaders/voiceover-ios-shortcuts)
- [NVDA Keyboard Shortcuts](https://dequeuniversity.com/screenreaders/nvda-keyboard-shortcuts)
- [TalkBack Gestures on Android](https://dequeuniversity.com/screenreaders/talkback-shortcuts)
- [JAWS Keyboard Shortcuts](https://dequeuniversity.com/screenreaders/jaws-keyboard-shortcuts)
- [Narrator Keyboard Shortcuts](https://dequeuniversity.com/screenreaders/narrator-keyboard-shortcuts)
- [Desktop Screen Readers Forms Guide](https://dequeuniversity.com/screenreaders/forms-guide)
- [Desktop Screen Readers Survival Guide - Basic Keyboard Shortcuts](https://dequeuniversity.com/screenreaders/survival-guide)

### Checklists
- [Custom Control Accessible Development Checklist](https://www.w3.org/TR/using-aria/#ariachecklist)
- [Deque's Web Accessibility Checklist](https://dequeuniversity.com/checklists/web/) - Includes checklists for components, forms, images, links, multimedia, etc.
- [The Must-Have WCAG 2.1 Checklist](https://kma.global/wp-content/uploads/2019/07/WCAG_2.1_Checklist.pdf)
- [A11y Project Checklist](https://www.a11yproject.com/checklist/)
- [WebAIM WCAG 2 Checklist](https://webaim.org/standards/wcag/checklist)
- [Accessibility Not-Checklist](https://not-checklist.intopia.digital/)

### Auditing and Testing Tools
- [A Comprehensive List of Web Accessibility Evaluation Tools](https://www.w3.org/WAI/ER/tools/)
- [JavaScript Bookmarklets for Accessibility Testing](https://pauljadam.com/bookmarklets.html)

#### Virtual Machines
- [Microsoft Edge Virtual Machines](https://developer.microsoft.com/en-us/microsoft-edge/tools/vms/)
- [Windows 11 Virtual Machines](https://developer.microsoft.com/en-us/windows/downloads/virtual-machines/)

#### Accessibility Auditing
- [WCAG Conformance Evaluation Methodology (WCAG-EM)](https://www.w3.org/TR/WCAG-EM/)
- [WCAG-EM Report Tool](https://www.w3.org/WAI/eval/report-tool/) - Generates a standards-first report
- [HTML Validation (Nu HTML Checker)](https://validator.nu/)
- [The W3C Markup Validator](https://validator.w3.org/)

#### Browser Extensions & Bookmarklets
- [ARC Toolkit by TPGi](https://www.tpgi.com/arc-platform/arc-toolkit/) - Chrome-only extension
- [WAVE Browser Extension](https://wave.webaim.org/extension/)
- [Web Developer Extension](https://chrispederick.com/work/web-developer/)
- [h123 HTML5 Outliner](https://hinderlingvolkart.github.io/h123/) - Cross-browser bookmarklet
- [Accessibility Insights for Web](https://accessibilityinsights.io/)

### Other Helpful Resources
- [Build a Better Mobile Input](https://better-mobile-inputs.netlify.app/?android=false&autocomplete=one-time-code&inputmode=decimal&type=email) - Displays mobile keyboard used by browser based on HTML input attributes
- [Estimate How Many People Using Your Website Might Be Disabled](https://how-many.herokuapp.com/)
- [ISO 639-1 Language Codes](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes)
- [Simple Web Accessibility Guidelines](https://jfhector.github.io/accessibility-guidelines/index.html)
- [Accessibility Statement Generator from Nomensa](https://www.accessibilitystatementgenerator.com/)
- [The W3C Accessibility Statement Generator](https://www.w3.org/WAI/planning/statements/generator/#create)