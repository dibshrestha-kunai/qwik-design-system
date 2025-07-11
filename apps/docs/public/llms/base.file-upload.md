# Base File-Upload

Accessible via: `/base/file-upload`

> TODO: Add description.

import api from "./code-notate/api.json";

# File Upload
A drag and drop interface for uploading files with support for filtering and multiple selections.
<Showcase name="hero" />
## Features
<Features api={api} />
## Anatomy
<AnatomyTable api={api} />
## Examples
### Basic Usage
The most basic implementation allows users to upload files through drag and drop or button click.
### Visual Features
The file upload can be styled to match your application's design system.
### Advanced Usage
#### Multiple File Upload
Enable multiple file selection and handle batch uploads.
#### Disabled State
Control the interactive state of the upload component.

## Component State
### Using Component State
The File Upload component's state can be controlled through several props on the `FileUpload.Root` component:
1. **Multiple File Selection**
- Control whether multiple files can be selected using the `multiple` prop
- When `multiple` is `true`, users can select or drop multiple files at once
- When `false` (default), only one file can be selected at a time
2. **File Type Filtering**
- Restrict allowed file types using the `accept` prop
- Accepts standard MIME types or file extensions
- As shown in the Image Upload example above, use `accept="image/*"` to allow only image files
3. **Disabled State**
- Disable all file upload interactions using the `disabled` prop
- When disabled, the component prevents:
  - File selection via the trigger button
  - Drag and drop operations
  - File input interactions
### State Interactions
The component provides a callback to handle file changes:
1. **File Change Handler**
```typescript
<FileUpload.Root
  onFilesChange$={(files) => {
    // files is an array of FileInfo objects
    files.forEach(file => {
      console.log(file.name, file.size, file.type);
    });
  }}
>
```
The `onFilesChange$` prop receives an array of `FileInfo` objects containing:
- `name`: File name
- `size`: File size in bytes
- `type`: MIME type
- `lastModified`: Last modification timestamp
- `file`: The actual File object (if available)
2. **Drag State**
The component automatically manages drag states:
- Visual feedback when files are dragged over the dropzone
- Drag state is cleared when:
  - Files are dropped
  - Cursor leaves the dropzone
  - Component is disabled
3. **Processing State**
- Files are processed immediately after selection or drop
- The component handles both single and multiple file selections based on the `multiple` prop
- Invalid file types are automatically rejected when using the `accept` prop
The state management is designed to be simple and declarative, allowing you to focus on handling the files rather than managing the upload interface state.

Based on the provided examples and API documentation, I'll document the configuration options for the File Upload component.
## Core Configuration
### File Selection Mode
The File Upload component supports both single and multiple file selection modes through the `multiple` prop on `FileUpload.Root`.
As shown in the hero example above, by default, the component operates in single file mode. To enable multiple file selection, add the `multiple` prop to `FileUpload.Root`.
> The `multiple` prop is `false` by default, allowing only single file selection.
### File Type Filtering
The component supports file type filtering through the `accept` prop on `FileUpload.Root`. This allows you to restrict which file types users can select.
As shown in the hero example above, you can use MIME types or file extensions to filter files:
> Common accept values:
> - `"image/*"` - All image types
> - `".pdf,.doc,.docx"` - Specific file extensions
> - `"video/*,audio/*"` - Multiple MIME types
### Disabled State
The File Upload component can be disabled entirely using the `disabled` prop on `FileUpload.Root`. When disabled:
- The trigger button becomes unclickable
- The file input is disabled
- Drag and drop functionality is prevented
- Visual feedback indicates the disabled state
## Advanced Configuration
### File Change Handling
The component provides detailed file information through the `onFilesChange$` callback prop on `FileUpload.Root`. The callback receives an array of `FileInfo` objects with the following structure:
```typescript
interface FileInfo {
  name: string;
  size: number;
  type: string;
  lastModified: number;
  file: NoSerialize<File>;
}
```
> The `file` property is wrapped in `NoSerialize` to prevent serialization issues in Qwik's resumability model.
### Drag and Drop Configuration
The component automatically handles drag and drop events and provides visual feedback through data attributes:
```typescript
interface DropzoneAttributes {
  "data-dragging": string | undefined;  // Present when files are being dragged
  "data-disabled": string | undefined;  // Present when dropzone is disabled
}
```
These attributes can be used for styling and state management in more complex implementations.





<APITable api={api} />