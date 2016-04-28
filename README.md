# quartz-menu
You know what I hate? jQuery menu plugins that want you to include their styles, all their dependencies, their entire kitchen sink and ...... etc.

For realz. When I'm incorporating a 3rd party nav menu into my site, I really don't want all the baggage that comes with it.

Here we have a bare bones version of the menu on www.qz.com

Bare bones, as in, it includes the sliding/toggling/responsive functionality and the minimum CSS required to make it work. And that's it. It does require jQuery though ```1.1.2```.

It's available under the ```jQuery``` plugin namespace ```qz```.

## Examples

BUT styling is nice. And can help you figure out how to best style your header, so here's an example  (available in ```/src/example```):

```
www.plnkr.co/xxx
```

Naked example, available in ```/src/boilerplate```

```
www.plnkr.co/xxx
```

I would probably suggest picking and choosing what you like from the example and adding it to the boilerplate.


# Minimum required markup

Fire the ```jQuery plugin``` on a div that wraps ```header``` and ```nav```. i.e.

```
$('#qz').qz();
```

HTML: 


````
<div id="qz">
	<header id="qzHeader" class="transparent">
		<!-- OPTINONAL Lefthand content -->
		<div class="menu-container menu-left">
			<a class="icon-btn header-btn">
				Item
			</a>
		</div>
		<!-- OPTINONAL Logo -->
		<div class="logo">
			<a href="/" title="My page title" id="myLogo">
				Logo
			</a>
		</div>
		<!-- REQUIRED Righthand content -->
		<div class="menu-container menu-right">
			<!-- REQUIRED Main collapsable button -->
			<a class="header-btn">
				Archive
			</a>
			<button id="qzBtn" class="header-btn">
				<svg width="16" height="6">
				  <circle cx="2" cy="2" r="2"></circle>
				  <circle cx="8" cy="2" r="2"></circle>
				  <circle cx="14" cy="2" r="2"></circle>
				</svg>
			</button>
		</div>
	</header>
	<figure id="qzDimmer" class="dimmer"></figure>
	<nav id="qzNav" class="navBox">
		<div class="navBoxRow">
			<a href="#">
				item
			</a>
			<a href="#">
				item
			</a>
		</div>
	</nav>
</div>
````

# Options

i.e. ```$('#qz').qz({transparentOnTop: false});```

Defaults are overridable:


````
// Remove this class from HTML if you don't wan't transparency toggle.
transparentOnTop: true

// Number of pixels before transparent header becomes opaque.
transparencyThreshold: 200

// Amount of Y direction scroll before scrolling listeners kick in.  
delta: 5

// Dimmer
enableDimmer: true

// Div id's which the plugin will use to find elements to fire actions on. Feel free to override these.
qzNav: 'qzNav'
qzBtn: 'qzBtn'
qzHeader: 'qzHeader'
````