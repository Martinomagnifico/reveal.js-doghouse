# Doghouse

A plugin for [Reveal.js](https://revealjs.com) 4 that will render Pug codeblocks when it starts, *but it also works with live editing*, which makes it great for presentations about Pug. 

[![Screenshot](screenshot.png)](https://martinomagnifico.github.io/reveal.js-doghouse/demo.html)

Doghouse uses the standalone, latest version of Pug (as described here: [github.com/pugjs/pug](https://github.com/pugjs/pug)). To avoid needing to use DogPack and get all kinds of issues with importers and modules, this plugin uses Require.js.

[demo](https://martinomagnifico.github.io/reveal.js-doghouse/demo.html)

Doghouse only does one thing: it renders Pug codeblocks.



## Installation

Copy the doghouse folder to the plugins folder of the reveal.js folder, like this: `plugin/doghouse`.


### npm installation

This plugin is published to, and can be installed from, npm.

```javascript
npm install reveal.js-doghouse
```
The Doghouse plugin folder can then be referenced from `node_modules/reveal.js-doghouse/plugin/doghouse`



## Setup

### JavaScript

The Doghouse plugin has been written for Reveal.js version 4.

There are two JavaScript files for Doghouse, a regular one, `doghouse.js`, and a module one, `doghouse.esm.js`. You only need one of them:


#### Regular 
If you're not using ES modules, for example, to be able to run your presentation from the filesystem, you can add it like this:

```html
<script type="text/javascript" src="dist/reveal.js"></script>
<script src="plugin/doghouse/doghouse"></script>
<script>
	Reveal.initialize({
		// ...
		plugins: [ Doghouse ]
	});
</script>
```

#### As a module 
If you're using ES modules, you can add it like this:

```html
<script type="module">
	// This will need a server
	import Reveal from './dist/reveal.esm.js';
	import Doghouse from './plugin/doghouse/doghouse.esm.js';
	Reveal.initialize({
		// ...
		plugins: [ Doghouse ]
	});
</script>
```


### HTML

Doghouse looks for sets of codeblocks. Each set should get a data-attribute of `data-doghouse`. Inside each set, Doghouse looks for a Pug source codeblock (`data-doghouse-pug`), an HTML codeblock where the HTML ends up (`data-doghouse-html`), and an optional data codeblock (`data-doghouse-data`), used to show how locals can be used.

```html
<div data-doghouse>
	<pre>
		<code contenteditable="true" data-doghouse-pug>
			ul
				li Item 1
				li Item 2
		</code>
	</pre>
	<pre>
		<code data-doghouse-html>
		</code>
	</pre>
</div>
```

The above example will then render this in the second codeblock:

```html
<ul>
	<li>Item 1</li>
	<li>Item 2</li>
</ul>
```
See the [demo](https://martinomagnifico.github.io/reveal.js-doghouse/demo.html) for a full example.


## Like it?

If you like it, please star this repo! 

And if you want to show off what you made with it, please do :-)




## License
MIT licensed

Copyright (C) 2021 Martijn De Jongh (Martino)
