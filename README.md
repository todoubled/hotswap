# What is this?

hotswap.js is a jQuery plugin allows continuous position swap of 3 content areas with focus on the center. Useful for home page featured content. Inspired by LeanCuisine.com circa Summer 2010. 

# Usage

It requires at the very least base markup like this:

	<div class="hotswap">
		<div class="nav">
			<a href="#" class="left"><img src="swap-left.png" alt="Swap Left" /></a>
			<a href="#" class="right"><img src="swap-right.png" alt="Swap Right" /></a>
		</div>

		<div class="items">
			<section id="left"></section>

			<section id="middle"></section>

			<section id="right"></section>	
		</div>
	</div><!-- end .swap-wrapper -->

Inclusion of the jQuery library, hotswap.js plugin and a hotswap function call on document ready:

	<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js"></script>
	<script src="jquery.hotswap.js"></script>
	<script>
		$(document).ready(function() {
			$('.hotswap').hotswap({
				item:"section"
			}); 
		});		
	</script>

CSS is entirely up to you. The entire hotswap section is built based on the dimensions of the overall hotswap wrapper. See demo.html for a basic example.


# Options and Their Default Values:

	swaps: ".items"
	item: "div"
	wrapper: ".hotswap"
	nav: ".nav"
	leftCtlSelector: ".left"
	rightCtlSelector: ".right"
	speed: 400
	auto: false
	interval: 5000
	ctlPosition: "center"
