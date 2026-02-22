# Accessibility Checklist for Pull Requests

Use this checklist when adding or modifying components to ensure accessibility standards are maintained.

## Before Submitting a PR

- [ ] I have tested keyboard navigation for all new/modified interactive elements
- [ ] All interactive elements have visible focus indicators
- [ ] I have added appropriate ARIA labels where needed
- [ ] Color contrast meets WCAG 2.1 AA standards (4.5:1 for text, 3:1 for UI)
- [ ] I have tested with a screen reader (NVDA, VoiceOver, or JAWS)
- [ ] Animations respect `prefers-reduced-motion` setting
- [ ] Form fields have proper labels and validation messages
- [ ] All images have descriptive alt text
- [ ] I have run axe DevTools and fixed any critical/serious issues

## Component-Specific Checks

### Buttons and Links

- [ ] All buttons use `<button>` element (not `<div>` with click handlers)
- [ ] Buttons have descriptive text or `aria-label`
- [ ] Links that open in new tab indicate this in `aria-label`
- [ ] Icon-only buttons have `aria-label`
- [ ] Decorative icons have `aria-hidden="true"`
- [ ] Minimum touch target: 44x44px

### Forms

- [ ] Every input has an associated `<label>` with `htmlFor`
- [ ] Required fields have `aria-required="true"`
- [ ] Error states use `aria-invalid="true"`
- [ ] Error messages use `role="alert"`
- [ ] Error messages are linked via `aria-describedby`
- [ ] Submit button has `aria-busy` during loading
- [ ] Form success/error messages are announced to screen readers

### Modals and Dialogs

- [ ] Modal uses `role="dialog"` and `aria-modal="true"`
- [ ] Modal has `aria-labelledby` pointing to title
- [ ] Modal has `aria-describedby` if there's a description
- [ ] Focus moves to modal when opened
- [ ] Focus is trapped within modal (Tab cycling)
- [ ] Escape key closes modal
- [ ] Focus returns to trigger element when closed
- [ ] Body scroll is prevented when modal is open

### Carousels and Sliders

- [ ] Carousel has `role="region"` with `aria-label`
- [ ] Arrow keys work for navigation
- [ ] Indicators have proper `aria-label` (e.g., "View project 1")
- [ ] Current slide is announced to screen readers
- [ ] Autoplay is disabled or can be paused

### Navigation

- [ ] Navigation uses `<nav>` element with `aria-label`
- [ ] Current page/section is indicated with `aria-current`
- [ ] Skip navigation link is present at top of page
- [ ] Breadcrumbs use proper semantic markup

### Images and Media

- [ ] All images have `alt` attribute
- [ ] Decorative images have empty alt (`alt=""`)
- [ ] Complex images have longer descriptions
- [ ] Videos have captions/transcripts

### Dynamic Content

- [ ] Loading states are announced to screen readers
- [ ] Dynamic updates use `aria-live` regions
- [ ] Error messages appear in `role="alert"` containers
- [ ] Success messages use `role="status"`

### Lists

- [ ] Use semantic `<ul>`, `<ol>`, or `<dl>` elements
- [ ] If using `list-style: none`, add `role="list"` to maintain semantics

### Headings

- [ ] Heading levels follow logical order (h1 → h2 → h3)
- [ ] No heading levels are skipped
- [ ] Page has only one `<h1>`
- [ ] Sections are identified by headings

### Colors

- [ ] Information is not conveyed by color alone
- [ ] Error states have icon + color + text
- [ ] Links are distinguishable from regular text (not by color alone)
- [ ] Tested in both light and dark themes

### Keyboard Support

- [ ] All functionality available via keyboard
- [ ] Tab order is logical
- [ ] No keyboard traps (unless intentional, like modals)
- [ ] Enter and Space activate buttons/links
- [ ] Escape closes overlays/modals
- [ ] Arrow keys work for relevant widgets

### Focus Management

- [ ] Focus indicator has 3:1 contrast ratio with background
- [ ] Focus is visible on all interactive elements
- [ ] Focus is not removed with `outline: none` (unless replaced with alternative)
- [ ] Skip links allow bypassing repetitive content

## Testing Commands

```bash
# Type checking
npm run type-check

# Linting
npm run lint

# Format
npm run format

# Build
npm run build
```

## Automated Testing

```bash
# Run axe DevTools in browser
# 1. Open DevTools (F12)
# 2. Go to axe DevTools tab
# 3. Click "Scan ALL of my page"
# 4. Fix any critical/serious issues

# Lighthouse in Chrome
# 1. Open DevTools (F12)
# 2. Go to Lighthouse tab
# 3. Select "Accessibility"
# 4. Run audit
# 5. Aim for 95+ score
```

## Screen Reader Testing

**Minimum**: Test with at least one screen reader before merging

- **Windows**: [NVDA](https://www.nvaccess.org/) (free)
- **macOS**: VoiceOver (built-in: Cmd+F5)
- **Linux**: Orca

## Keyboard Testing

Press `Tab` through your component and verify:

1. All interactive elements are reachable
2. Focus indicator is clearly visible
3. Tab order makes logical sense
4. Enter/Space activate buttons and links
5. Escape closes overlays
6. Arrow keys work for navigation widgets

## Resources

- [WCAG 2.1 Quick Reference](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Project ACCESSIBILITY.md](../ACCESSIBILITY.md)
- [Project ACCESSIBILITY_TESTING_GUIDE.md](../ACCESSIBILITY_TESTING_GUIDE.md)

## Questions?

If you're unsure about any accessibility requirement, please:

1. Check the documentation in `/ACCESSIBILITY.md`
2. Run automated tests (axe, Lighthouse)
3. Ask for a review from someone familiar with accessibility
4. Reference WCAG 2.1 guidelines

---

**Remember**: Accessibility is not optional. It's a core requirement for all features.
