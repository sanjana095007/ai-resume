# Design System Documentation

## Overview

This design system provides a comprehensive set of design tokens, component patterns, and utility classes for building consistent, accessible, and responsive UI components.

## File Structure

```
src/styles/
├── tokens.css       # Design tokens (colors, spacing, typography) + utility classes
├── global.css       # CSS reset, base styles, and typography defaults
├── components.css   # Reusable component patterns (buttons, cards, badges, etc.)
├── fonts.css        # Font face declarations for Proxima Nova
└── resume.css       # Page-specific styles for the resume layout
```

## Import Order

The styles should be imported in the following order:

1. **fonts.css** - Font face declarations
2. **global.css** - Imports tokens.css automatically, provides reset and base styles
3. **components.css** - Component patterns that use the tokens
4. **Page-specific CSS** - Any additional page-specific styles

Example in `main.tsx`:

```tsx
import '@styles/fonts.css'
import '@styles/global.css'
import '@styles/components.css'
```

## Design Tokens (`tokens.css`)

### Purpose

- Centralized source of truth for all design values
- Provides CSS custom properties (variables) for consistency
- Includes utility classes for rapid development

### Token Categories

1. **Colors**
   - Primary palette (slate scale)
   - Accent colors (primary, secondary, success, warning, error)
   - Semantic colors (text, background, border)

2. **Typography**
   - Font families (primary, monospace)
   - Font sizes (fluid with clamp)
   - Font weights
   - Line heights
   - Letter spacing

3. **Spacing**
   - Scale from 0 to 24 (0px to 96px)
   - Used for padding, margin, gap

4. **Visual Effects**
   - Shadows (xs, sm, md, lg, xl, 2xl)
   - Border radius (none to full)
   - Transitions (fast, base, slow)

5. **Layout**
   - Z-index scale
   - Breakpoints
   - Container widths

### Utility Classes

The tokens file includes utility classes for:

- Spacing (p-_, px-_, py-_, m-_, mt-_, mb-_, gap-\*)
- Typography (text-_, font-_, leading-_, tracking-_)
- Colors (text-_, bg-_, border-\*)
- Display & Layout (flex, grid, inline, block, etc.)
- Border radius (rounded-\*)
- Shadows (shadow-\*)
- Transitions (transition-\*)

## Global Styles (`global.css`)

### Purpose

- CSS reset for consistent cross-browser rendering
- Base typography styles
- Accessibility features (prefers-reduced-motion)

### Features

- Box-sizing reset
- Typography normalization
- Image and media defaults
- Form element inheritance
- Focus states and accessibility
- Reduced motion support

## Component Patterns (`components.css`)

### Purpose

- Pre-built, reusable component patterns
- Consistent visual language
- Follows BEM naming convention

### Available Components

1. **Buttons**
   - Variants: primary, secondary, tertiary, ghost
   - Sizes: sm, default, lg
   - States: hover, active, disabled
   - Icon buttons

2. **Cards**
   - Variants: default, secondary, flat, hover
   - Sizes: sm, default, lg
   - Parts: header, title, subtitle, body, footer

3. **Badges**
   - Variants: default, primary, secondary, success, warning, error
   - Sizes: sm, default, lg
   - Modifier: dot

4. **Chips**
   - States: default, clickable, selected
   - Parts: icon, avatar, remove button

5. **Avatars**
   - Sizes: xs, sm, md, lg, xl, 2xl
   - Variants: default, bordered
   - Content: image, initials

6. **Layout Components**
   - Container (with size variants)
   - Stack (vertical layout with gap)
   - Inline (horizontal layout with gap)
   - Grid (2, 3, 4 columns + auto-fit)

## Responsive Design

### Breakpoints

The design system uses a mobile-first approach with the following breakpoints:

| Breakpoint | Width   | Usage                |
| ---------- | ------- | -------------------- |
| xs         | ≤360px  | Small mobile devices |
| sm         | 640px   | Mobile devices       |
| md         | 768px   | Tablets              |
| lg         | 1024px  | Desktop              |
| xl         | 1280px  | Large desktop        |
| 2xl        | ≥1440px | Ultra-wide screens   |

### Fluid Typography

All font sizes use `clamp()` for smooth scaling across viewport sizes:

```css
--font-size-base: clamp(1rem, 0.95rem + 0.25vw, 1.125rem);
```

This ensures text scales proportionally without abrupt jumps at breakpoints.

### Responsive Utilities

Many utility classes and components automatically adjust at different breakpoints:

```css
/* Grid adjusts from 4 columns to 2 to 1 */
@media (max-width: 1024px) {
  .grid-4 {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 640px) {
  .grid-4 {
    grid-template-columns: 1fr;
  }
}
```

## Usage Guidelines

### DO ✅

1. **Use design tokens consistently**

   ```css
   .my-component {
     padding: var(--space-4);
     color: var(--color-text-primary);
     font-size: var(--font-size-base);
   }
   ```

2. **Use utility classes for common patterns**

   ```html
   <div class="flex items-center gap-3 p-4">
     <!-- content -->
   </div>
   ```

3. **Use component patterns as base**

   ```html
   <button class="btn btn--primary">Click me</button>
   ```

4. **Follow BEM for custom components**
   ```css
   .custom-widget {
   }
   .custom-widget__element {
   }
   .custom-widget--modifier {
   }
   ```

### DON'T ❌

1. **Don't use hard-coded values**

   ```css
   /* Avoid */
   padding: 16px;
   color: #2563eb;

   /* Use */
   padding: var(--space-4);
   color: var(--color-accent-primary);
   ```

2. **Don't use inline styles** (except for motion libraries)

   ```html
   <!-- Avoid -->
   <div style="padding: 20px; color: blue;">
     <!-- Use -->
     <div class="p-5 text-accent"></div>
   </div>
   ```

3. **Don't create one-off custom values**

   ```css
   /* Avoid */
   border-radius: 13px;

   /* Use existing token */
   border-radius: var(--radius-xl);
   ```

## Extending the Design System

### Adding New Tokens

1. Add the token to `tokens.css` under the appropriate category
2. Follow the existing naming convention
3. Update documentation

### Adding New Components

1. Add the component pattern to `components.css`
2. Follow BEM naming: `.component`, `.component__element`, `.component--modifier`
3. Use existing tokens for all values
4. Add responsive breakpoints if needed
5. Document usage in STYLEGUIDE.md

### Adding New Utilities

1. Add to the utility classes section in `tokens.css`
2. Follow the existing pattern
3. Consider responsive variants if applicable

## Accessibility

The design system includes several accessibility features:

1. **Semantic colors** - Clear contrast ratios
2. **Focus states** - Visible focus indicators
3. **Reduced motion** - Respects `prefers-reduced-motion`
4. **Keyboard navigation** - All interactive elements are keyboard accessible
5. **ARIA support** - Components are ARIA-compatible

## Browser Support

The design system uses modern CSS features:

- CSS Custom Properties
- CSS Grid
- Flexbox
- `clamp()` for fluid typography
- Modern color syntax

Supported browsers:

- Chrome/Edge 88+
- Firefox 75+
- Safari 13.1+

## Performance

### Best Practices

1. **CSS is concatenated and minified** in production
2. **No runtime CSS-in-JS** - All styles are static CSS
3. **Minimal specificity** - Easy to override when needed
4. **No unused styles** - Only import what you need

### Bundle Size

- `tokens.css`: ~8KB (gzipped)
- `global.css`: ~2KB (gzipped)
- `components.css`: ~6KB (gzipped)

Total: ~16KB for the entire design system

## Testing

### Visual Testing

A visual style guide is available at `/public/styleguide.html` showing all components and patterns.

### Responsive Testing

Test at the following viewport widths:

- 360px (mobile)
- 768px (tablet)
- 1024px (desktop)
- 1440px (ultra-wide)

### Accessibility Testing

- Check color contrast ratios
- Test keyboard navigation
- Verify screen reader compatibility
- Test with `prefers-reduced-motion` enabled

## Migration Guide

If migrating from the old system to this design system:

1. Replace hard-coded values with tokens:

   ```css
   /* Old */
   color: #1e293b;
   padding: 16px;

   /* New */
   color: var(--color-text-primary);
   padding: var(--space-4);
   ```

2. Replace custom components with design system components:

   ```html
   <!-- Old -->
   <div class="custom-button">Click</div>

   <!-- New -->
   <button class="btn btn--primary">Click</button>
   ```

3. Use utility classes where appropriate:

   ```html
   <!-- Old -->
   <div style="display: flex; gap: 12px;">
     <!-- New -->
     <div class="flex gap-3"></div>
   </div>
   ```

## Resources

- **Full Style Guide**: See `STYLEGUIDE.md` in the project root
- **Visual Demo**: Open `/public/styleguide.html` in a browser
- **Component Examples**: Check `src/components/` for real-world usage

## Questions?

For questions or suggestions about the design system, please:

1. Check the style guide documentation
2. Review existing components for patterns
3. Create an issue if you need new tokens or components
