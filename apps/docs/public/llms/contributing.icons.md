# Contributing Icons

Accessible via: `/contributing/icons`

> TODO: Add description.

import { Image } from "~/docs-widgets/image/image";

import iconsLibrary from '~/assets/docs/icons/icons-library.png';

# Contributing to Qwik Icons

<Image src={iconsLibrary} alt="Icons" />

This guide explains how to contribute to the Qwik Icons package, including its structure, icon generation system, and testing approach.

## Project Structure

The icons package follows a modular structure:

```
libs/icons/
├── src/
│   ├── generate/          # Icon generation scripts
│   │   ├── packs/        # Icon pack configurations
│   │   ├── download-icons.ts
│   │   └── generate-icons.ts
│   ├── icons/            # Generated icon components
│   ├── tests/            # Test files
```

## Icon Generation System

The icon generation process consists of two main steps:

1. **Downloading Icons**: The `download-icons.ts` script fetches icon packs from their respective sources
2. **Generating Components**: The `generate-icons.ts` script converts SVG files into Qwik components

### Icon Adapter System

The package uses an adapter system to handle different icon packs. Each icon pack has its own configuration in the `generate/packs/` directory that defines:

- Source URLs
- File naming conventions
- SVG optimization settings
- Component generation rules

### Dependencies

The icon generation process relies on several key dependencies:

- **SVGO**: For optimizing SVG files
- **Node-stream-zip**: For handling zip files during icon downloads
- **Vite**: For building and development
- **TypeScript**: For type safety and development

## Development Workflow

1. **Download Icons**:
   ```bash
   pnpm run download-icons
   ```

2. **Generate Components**:
   ```bash
   pnpm run generate-icons
   ```

3. **Build Package**:
   ```bash
   pnpm run build
   ```

## Testing

The package includes unit tests for the icon generation process. Tests are located in `src/tests/` and can be run using:

```bash
pnpm test
```

The main test file `icon-generation.unit.ts` verifies:
- Icon component generation
- SVG optimization
- File structure correctness

## Adding New Icon Packs

To add a new icon pack:

1. Create a new configuration file in `generate/packs/`
2. Define the pack's download and generation rules
3. Add the pack to the main configuration in `generate/configs.ts`
4. Run the download and generation scripts
5. Add tests for the new pack

## Best Practices

1. **SVG Optimization**: Always optimize SVGs using SVGO before generating components
2. **Type Safety**: Maintain TypeScript types for all generated components
3. **Testing**: Add tests for new icon packs and generation features
4. **Documentation**: Update documentation when adding new features or packs

## Troubleshooting

Common issues and solutions:

- **Download Failures**: Check network connectivity and source URLs
- **Generation Errors**: Verify SVG file integrity and configuration
- **Build Issues**: Ensure all dependencies are up to date

## Getting Help

If you encounter issues or have questions:

1. Check the existing documentation
2. Review the test files for examples
3. Open an issue in the repository 