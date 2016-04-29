# basic menu
You know what I hate? jQuery menu plugins that want you to include their styles, all their dependencies, their entire kitchen sink and ...... etc. This menu doesn't do that. 

## Demo

```http://nikkwong.github.io/basic-menu/```

## Features

Only includes sliding/toggling/responsive functionality and the minimum CSS required to make it work. And that's it. Bring your own styling.

## Requirements

```jQuery 1.1.2```.

## Examples

There are two versions.

### basic menu styled

available in ```/src/styled```

### basic menu boilerplate

available in ```/src/boilerplate```


I would probably suggest picking and choosing what you like from the styled version and adding it to the boilerplate.


# How to use

Fire the jQuery plugin ```.bm()``` on a div that wraps ```header``` and ```nav```. i.e.

```
$('#bm').bm();
```

HTML: 


````
<div id="bm">
	<header id="bmHeader" class="transparent">
		<!-- optional -->
		<div class="menu-container menu-left">
			<a class="icon-btn header-btn">
				Item
			</a>
		</div>
		<!-- optional -->
		<div class="logo">
			<a href="/" title="My page title" id="myLogo">
				Logo
			</a>
		</div>
		<div class="menu-container menu-right">
			<button id="bmBtn" class="header-btn">
				<svg width="16" height="6">
				  <circle cx="2" cy="2" r="2"></circle>
				  <circle cx="8" cy="2" r="2"></circle>
				  <circle cx="14" cy="2" r="2"></circle>
				</svg>
			</button>
		</div>
	</header>
	<figure id="bmDimmer" class="dimmer"></figure>
	<nav id="bmNav" class="navBox">
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

i.e. ```$('#bm').bm({transparentOnTop: false});```

Defaults are overridable:


// Remove this class from HTML if you don't wan't transparency toggle.
````
transparentOnTop: true
````

// Number of pixels before transparent header becomes opaque.
````
transparencyThreshold: 200
````

// Amount of Y direction scroll before scrolling listeners kick in.  
````
delta: 5
````

// Dimmer
````
enableDimmer: true
````

// Div id's which the plugin will use to find elements to fire actions on. Feel free to override these.
````
bmNav: 'bmNav'
bmBtn: 'bmBtn'
bmHeader: 'bmHeader'
````