# Icon Component

Tree-shaken icon component using `react-icons/fa` (Font Awesome).

## Usage

```tsx
import Icon from '@components/icons'

// Basic usage
<Icon name="github" />

// With size
<Icon name="linkedin" size={24} />

// With custom class
<Icon name="email" className="social-icon" />

// With aria-label for accessibility
<Icon name="download" aria-label="Download Resume PDF" />
```

## Available Icons

The following icons are available (mapped from Font Awesome):

- `github` - GitHub logo
- `twitter` - Twitter/X logo
- `linkedin` - LinkedIn logo
- `email` - Email/Envelope icon
- `globe` - Globe/Website icon
- `user` - User profile icon
- `handshake` - Handshake icon
- `cog` - Settings/Cog icon
- `tools` - Tools icon
- `graduate` - Graduation cap icon
- `puzzle` - Puzzle piece icon
- `language` - Language icon
- `suitcase` - Suitcase/Briefcase icon
- `code` - Code icon
- `download` - Download icon

## Adding New Icons

1. Import the icon from `react-icons/fa`:

   ```tsx
   import { FaNewIcon } from 'react-icons/fa'
   ```

2. Add it to the `icons` object:

   ```tsx
   const icons = {
     // ...existing icons
     newIcon: FaNewIcon,
   }
   ```

3. The TypeScript `IconName` type will automatically update.

## Why This Approach?

- **Tree-shaking**: Only used icons are bundled (vs. entire Font Awesome library)
- **Type-safety**: TypeScript ensures only valid icon names are used
- **Consistency**: Centralized icon management
- **Performance**: No external CDN dependency
- **Bundle size**: ~1KB for icon barrel vs. ~100KB for Font Awesome CSS
