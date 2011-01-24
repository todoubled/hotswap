/* 
Author:	Todd Larsen | toddlar@gmail.com
*/

(function() {		
	$.fn.hotswap = function(options) {
		var options = $.extend({}, {
			swaps:".items",
			item:"div",
			wrapper:".hotswap",
			nav:".nav",
			leftCtlSelector:".left",
			rightCtlSelector:".right",
			speed:400,
			auto:false,
			interval:5000,
			ctlPosition:"center"
		}, options);
		
		// Create as many hotswaps per page as needed
		$(this).each(function() {
			var $swaps = [ ],
				$swapWrapper = $(this),
				$nav = $swapWrapper.find(options.nav),
				$swapContainer =$swapWrapper.find(options.swaps),
				$eachSwap = $swapContainer.find(options.item),
				$leftCtl = $nav.find(options.leftCtlSelector),
				$rightCtl = $nav.find(options.rightCtlSelector),
				speed = options.speed,
				interval = options.interval,
				swapHeight = parseInt($swapWrapper.height()),
				swapWidth = parseInt($swapWrapper.width()),
				navHeight = parseInt($rightCtl.height()),
				navCSS = { "position":"relative","z-index":99 },
				eachNavCSS = { "position":"absolute","z-index":9 },
				itemCSS = { "width":swapWidth * 0.6, "position": "absolute", "height":swapHeight },
				navFromSide = swapWidth / 10,
				navPos,
				left = -250,
				right = 450,
				middle = 100,
				autoLeft,
				autoRight,
				temp;
				
			// Process conditional variables
			switch(options.ctlPosition) {
				case "top":
				break;
				case "center":
					navPos = (swapHeight / 2) - (navHeight * 2);
				break;
				case "bottom":
					navPos = swapHeight - (navHeight * 2);
				break;
			}
			
			// Find and store hotswap items
			$(this).each(function() {			
				$eachSwap.each(function() {
					var ids = $(this).attr("id");
					$swaps.push(ids);
				});
			});
				
			// Base CSS for hotswaps and navigation
			$swapContainer.css({ "position":"relative","z-index":999 });
			$swapWrapper.css("overflow", "hidden");
			$nav.css(navCSS);
			$leftCtl.css(eachNavCSS);
			$rightCtl.css(eachNavCSS);
			$eachSwap.css(itemCSS);
			$nav.css("top", navPos);
			$leftCtl.css("left", navFromSide);
			$rightCtl.css("right", navFromSide);
			$('#' + $swaps[0]).css("left", left);
			$('#' + $swaps[1]).css("left", middle);
			$('#' + $swaps[2]).css("left", right);

			// Move left item to center
			function leftSwap() {
				$leftCtl.hide();
				$('#' + $swaps[0]).animate({left:middle}, speed);
				$('#' + $swaps[2]).animate({left:right}, speed);
				$('#' + $swaps[1]).animate({left:left}, speed, function() {
					$leftCtl.show();
				});
				leftSwapAssign();
			}

			// Move left item from center back to left
			function leftSwapReverse() {
				$leftCtl.hide();
				$('#' + $swaps[1]).animate({left:left}, speed);
				$('#' + $swaps[2]).animate({left:right}, speed);
				$('#' + $swaps[0]).animate({left:middle}, speed, function() {
					$leftCtl.show();
				});
				leftSwapAssign();
			}

			// Assign new array order based on left swap
			function leftSwapAssign() {
				temp = $swaps[0];
				$swaps[0] = $swaps[1];
				$swaps[1] = temp;
			}

			// Move right item to center
			function rightSwap() {
				$rightCtl.hide();
				$('#' + $swaps[1]).animate({left:right}, speed);
				$('#' + $swaps[0]).animate({left:left}, speed);
				$('#' + $swaps[2]).animate({left:middle}, speed, function() {
					$rightCtl.show();
				});
				rightSwapAssign();
			}

			// Move right item from center back to right
			function rightSwapReverse() {
				$rightCtl.hide();
				$('#' + $swaps[2]).animate({left:middle}, speed);
				$('#' + $swaps[0]).animate({left:left}, speed);
				$('#' + $swaps[1]).animate({left:right}, speed, function() {
					$rightCtl.show();
				});
				rightSwapAssign();
			}
			
			// Assign new array order based on right swap
			function rightSwapAssign() {
				temp = $swaps[1];
				$swaps[1] = $swaps[2];
				$swaps[2] = temp;
			}
			
			
			
			
			
			
			
			/* Manual Toggles */
			$leftCtl.toggle(function() {
				leftSwap();
			}, function() {
				leftSwapReverse();
			});

			$rightCtl.toggle(function() {
				rightSwap();
			}, function() {
				rightSwapReverse();
			});
			
			/* Auto Toggles */
			function autoSwap() {
				function autoLeftSwap() {
					autoLeft = setInterval(leftSwap, interval);
				}

				function autoRightSwap() {
					autoRight = setInterval(rightSwap, interval);
				}
				
				function initAutoSwap() {
					autoLeftSwap();
					setTimeout(autoRightSwap, interval / 2);
				}
				
				function killAutoSwap() {
					clearInterval(autoLeft);
					clearInterval(autoRight);
				}
				
				// Start auto-swapping
				initAutoSwap();
				
				// Stop auto-swapping
				$(''+options.leftCtlSelector+', '+options.rightCtlSelector+'').bind("click", function() {
					killAutoSwap();
				});
			}
			
			// Cruise control
			if (options.auto === true) {
				autoSwap();
			}
		});
    };
})(jQuery);