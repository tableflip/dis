# dis

**Putting things in their place; the `dist` directory.**

`dis` is a no-configuration builder of websites.

## install

```sh
npm install @tableflip/dis
```

## dis html

```sh
dis html # => html in yer ./dist dir
```
Compile jade templates named `index.jade` in `./pages` with their `content.json` file and write resulting html to the `./dist` directory.

## dis css

```sh
dis css # => bundle.css in yer ./dist dir
```
Compile the `./pages/main.scss` file; output the css to the stdout


