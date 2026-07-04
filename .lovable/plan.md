## Plan: Move the hero green dot after the name

### Goal
Update the hero headline in `src/routes/index.tsx` so the lime dot appears after the full name (`THUVARAKAN·`) instead of between "THUVA" and "RAKAN" (`THUVA·RAKAN`).

### Changes
1. In `src/routes/index.tsx`, locate the `Hero` component's `<h1>`.
2. Replace the current split headline structure with the dot after the full name.

Current code:
```tsx
<h1 className="text-display text-[18vw] md:text-[13vw] leading-[0.85] break-words">
  THUVA<span className="text-accent">·</span>RAKAN
</h1>
```

Target code:
```tsx
<h1 className="text-display text-[18vw] md:text-[13vw] leading-[0.85] break-words">
  THUVARAKAN<span className="text-accent">·</span>
</h1>
```

### Verification
- Check the preview to confirm the hero headline now renders as `THUVARAKAN·` with the lime dot after the name.
- Ensure no other layout or styling is affected.
