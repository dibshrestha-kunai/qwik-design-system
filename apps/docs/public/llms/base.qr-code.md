# Base Qr-Code

Accessible via: `/base/qr-code`

> TODO: Add description.

import api from "./code-notate/api.json";

# QR Code
Generate scannable codes to share links and information instantly.
<Showcase name="base" />
## Features
<Features api={api} />
## Anatomy
<AnatomyTable api={api} />
## Examples
### Basic Usage
The QR code component provides a simple way to generate scannable codes. The `value` prop specifies the content to encode, while the `level` prop determines error correction strength.
<Showcase name="base" />
Key features demonstrated:
- `value` prop to set the QR code content
- `level="H"` for high error correction
- Basic structure with `Root`, `Frame`, `PatternSvg`, and `PatternPath` components
### Visual Features
#### Custom Colors and Overlay
You can customize the QR code appearance with custom colors and add an overlay image in the center.
<Showcase name="overlay-custom-color" />
Key features demonstrated:
- Custom fill color using the `fill` prop on `PatternPath`
- Background styling through CSS classes
- Center overlay with the `Overlay` component
- Custom `aria-label` for accessibility
### Advanced Usage
#### Multiple QR Codes
Display multiple QR codes side by side, each with unique content and styling.
<Showcase name="multiple" />
Key features demonstrated:
- Independent QR codes with different values
- Consistent styling across instances
- Optional overlay support per instance
- Flexible layout arrangement

## Component State
### Using Component State
The QR code component's state is primarily controlled through two main props on the `QRCode.Root` component:
1. `value` - Sets the text content to be encoded in the QR code
2. `level` - Controls the error correction level ("L", "M", "Q", "H")
As shown in the base example above, you can set these props directly:
```typescript
<QRCode.Root 
  value="https://qwikui.com" 
  level="H"
>
  {/* ... */}
</QRCode.Root>
```
The QR code will automatically update whenever these props change. This allows you to dynamically update the QR code content in response to user interactions or other state changes in your application.
### State Interactions
The QR code component is primarily a display component, so it doesn't expose any direct event handlers. However, you can wrap it in your own event handling logic to update its state:
```typescript
<button onClick$={() => updateQRValue("new value")}>
  Update QR Code
</button>
<QRCode.Root value={qrValue}>
  {/* ... */}
</QRCode.Root>
```
As shown in the multiple example above, you can have multiple QR codes on the same page, each with its own independent state. This is useful when you need to display different QR codes that update independently.
The error correction level can be adjusted based on your needs:
- "L" (Low) - 7% of data can be restored
- "M" (Medium) - 15% of data can be restored
- "Q" (Quartile) - 25% of data can be restored
- "H" (High) - 30% of data can be restored
Higher error correction levels make the QR code more resistant to damage or poor scanning conditions, but also make the pattern more complex.

Based on the provided implementation and examples, I'll document the QR code component's configuration options.
## Core Configuration
### Basic Setup
The QR code component requires two essential configurations: `value` and `level` props on the `QRCode.Root` component.
As shown in the `base` example above, the minimal configuration includes:
- `value`: The text or URL to encode
- `level`: Error correction level ("L", "M", "Q", "H")
> The default error correction level is "L" (Low) if not specified.
### Dimensions
The QR code size is controlled through the `width` and `height` attributes on the `QRCode.PatternSvg` component. As shown in all examples above, the recommended size is 200x200 pixels for optimal scanning.
> The QR code maintains its aspect ratio regardless of the container size.
## Advanced Configuration
### Error Correction Levels
The `level` prop supports four values with different data redundancy:
```typescript
type ErrorCorrectionLevel = "L" | "M" | "Q" | "H"
```
- L (Low): 7% of data can be restored
- M (Medium): 15% of data can be restored
- Q (Quartile): 25% of data can be restored
- H (High): 30% of data can be restored
As shown in the `overlay` and `overlay-custom-color` examples above, using level "H" is recommended when adding an overlay to ensure reliable scanning.
### Pattern Customization
The QR code pattern is rendered using SVG paths, allowing for color customization through the `fill` attribute on `QRCode.PatternPath`. As demonstrated in the `overlay-custom-color` example above, you can modify the pattern color to match your design requirements.
> The QR code maintains functionality regardless of color choice, but ensure sufficient contrast for reliable scanning.
### Technical Constraints
1. Border: The component generates QR codes with zero border padding
2. Size: The minimum recommended size is 200x200 pixels for reliable scanning
3. Overlay: When using overlays, the QR code must maintain sufficient pattern visibility
4. SVG Rendering: The pattern uses path-based rendering for optimal scaling
These technical specifications ensure the QR code remains functional while providing flexibility for customization.





<APITable api={api} />