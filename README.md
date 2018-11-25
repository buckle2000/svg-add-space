![](https://img.shields.io/npm/n/svg-add-space.svg)
![](https://img.shields.io/npm/v/svg-add-space.svg)
![](https://img.shields.io/npm/l/svg-add-space.svg)

`npm install svg-add-space -g`

`yarn global add svg-add-space`

## Use Case

![](assets/test.svg)

If you ever try to copy the multiple lines of text in SVG, you will get this:

```
This is English. You needto add space for every<text> element in thisFrame Textexceptthelast line.
```

Note that there is no space before linebreak, so you will see words like `needto` and `Textexceptthelast`.

This tool will insert 1 space **before** each linebreak, so anyone can copy the text without wordslikethis.

## Usages

```
cat in.svg | node index.js > out.svg
node index.js in.svg > out.svg
node index.js in.svg out.svg
```

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
