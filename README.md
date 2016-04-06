# dis

**Putting things in their place; the `dist` directory.**

`dis` is a no-configuration builder of websites.

## dis html

```sh
dis html # => html in yer ./dist dir
```
Compile jade templates named `index.jade` in `./pages` with their `content.json` file and write resulting html to the `./dist` directory.

`dis pug` and `dis jade` are aliases to ease your pain.

## dis css

```sh
dis css # => bundle.css in yer ./dist dir
```
Compile the `./pages/main.scss` file; output the css to the stdout

`dis sass` and `dis scss` are aliases.
