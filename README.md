## Mechanics

This tool will add one space to any `g > text:not(:last-child)` that is not CJK.

Before:

```svg
<g>
    <text>line1</text>
    <text>line2</text>
</g>
```

After:

```svg
<g>
    <text>line1 </text>
    <text>line2</text>
</g>
```

## What is 'beforeend'?

```svg
<!-- beforebegin -->
<text>
<!-- afterbegin -->
foo
<!-- beforeend -->
</text>
<!-- afterend -->
```
