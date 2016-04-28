# quartz-menu
You know what I hate? jQuery menu plugins that want you to include their styles, and all their dependencies, their entire kitchen sink and ...... etc.

I've created a bare bones version of the menu on www.qz.com

Bare bones, as in, it includes the sliding/toggling/responsive functionality and the minimum CSS required to make it work. And that's it.

It does require jQuery though ```1.1.2```.

I've also linked a styled version in /example.

# example

HTML
````
<div id="qz">
	<header id="qzHeader" class="transparent">
		<!-- OPTINONAL Lefthand content -->
		<div class="menu-container menu-left">
			<a class="header-btn">
				Text
			</a>
			<a class="header-btn">
				Icon
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
			<button id="qzBtn" class="header-btn">
				<svg width="16" height="4">
				  <circle cx="2" cy="2" r="2"></circle>
				  <circle cx="8" cy="2" r="2"></circle>
				  <circle cx="14" cy="2" r="2"></circle>
				</svg>
			</button>
		<!-- OPTINONAL Button -->
			<a class="header-btn">
				Icon
			</a>
		</div>
	</header>
	<figure id="qzDimmer"></figure>
	<nav id="qzNav">
		<div class="nagivation-row">
			<a href="#">
				el
			</a>
			<a href="#">
				el
			</a>
			<a href="#">
				el
			</a>
			<a href="#">
				el
			</a>
		</div>
	</nav>
</div>
````

Overridable defaults:

````
transparentOnTop: true,
transparencyThreshold: 200,
delta: 5,
animate: true,
enableDimmer: true,
qzNav: 'qzNav',
qzBtn: 'qzBtn',
qzHeader: 'qzHeader'
````