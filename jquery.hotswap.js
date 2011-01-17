/* 
Author:	Todd Larsen | toddlar@gmail.com
*/

(function() {		
	$.fn.hotswap = function(options) {
		var options = $.extend({}, {
			items:".items",
			item:"div",
			wrapper:".hotswap",
			nav:".nav",
			leftCtlSelector:".left",
			rightCtlSelector:".right",
			speed:400,
			ctlPosition:"center"
		}, options);
		
		// Create as many hotswaps as needed
		$(this).each(function() {
			var swaps = [ ],
				$eachSwap = $(this).find(options.items).find(options.item),
				$leftCtl = $(this).find(options.nav).find(options.leftCtlSelector),
				$rightCtl = $(this).find(options.nav).find(options.rightCtlSelector),
				temp;
				
			// Base CSS for hotswap wrappers
			$(options.items).css({
				"position":"relative",
				"z-index":999
			});
			$(options.items).parent().css("overflow", "hidden");
			$(options.nav).css({
				"position":"relative",
				"z-index":99 
			});
			
			// Base CSS for hotswap controls
			$leftCtl.css({
				"position":"absolute",
				"z-index":9
			});
			$rightCtl.css({
				"position":"absolute",
				"z-index":9
			});
			
			// Base CSS for hotswap items
			$eachSwap.css({
				"position":"absolute"
			});
			
			// Find hotswap items and store in swaps array
			$(this).each(function() {			
				$eachSwap.each(function() {
					var ids = $(this).attr("id");
					swaps.push(ids);
				});
			});
			
			// Dynamically position the hotswap elements and navigation
			
			
			
			
			
			
			

			// Get positions of each hotswap item
			var left = $('#' + swaps[0]).position().left,
				middle = $('#' + swaps[1]).position().left,
				right = $('#' + swaps[2]).position().left;

			// Move left item to center
			function leftSwap() {
				$leftCtl.hide();
				$('#' + swaps[0]).animate({left:middle}, options.speed);
				$('#' + swaps[2]).animate({left:right}, options.speed);
				$('#' + swaps[1]).animate({left:left}, options.speed, function() {
					$leftCtl.show();
				});
				leftSwapAssign();
			}

			// Move left item from center back to left
			function leftSwapReverse() {
				$leftCtl.hide();
				$('#' + swaps[1]).animate({left:left}, options.speed);
				$('#' + swaps[2]).animate({left:right}, options.speed);
				$('#' + swaps[0]).animate({left:middle}, options.speed, function() {
					$leftCtl.show();
				});
				leftSwapAssign();
			}

			// Assign new array order based on movement
			function leftSwapAssign() {
				temp = swaps[0];
				swaps[0] = swaps[1];
				swaps[1] = temp;
			}

			// Move right item to center
			function rightSwap() {
				$rightCtl.hide();
				$('#' + swaps[1]).animate({left:right}, options.speed);
				$('#' + swaps[0]).animate({left:left}, options.speed);
				$('#' + swaps[2]).animate({left:middle}, options.speed, function() {
					$rightCtl.show();
				});
				rightSwapAssign();
			}

			// Move right item from center back to right
			function rightSwapReverse(){
				$rightCtl.hide();
				$('#' + swaps[2]).animate({left:middle}, options.speed);
				$('#' + swaps[0]).animate({left:left}, options.speed);
				$('#' + swaps[1]).animate({left:right}, options.speed, function() {
					$rightCtl.show();
				});
				rightSwapAssign();
			}
			
			// Assign new array order based on movement
			function rightSwapAssign() {
				temp = swaps[1];
				swaps[1] = swaps[2];
				swaps[2] = temp;
			}

			// Move left content to middle onClick
			$leftCtl.toggle(function() {
				leftSwap();
			}, function() {
				leftSwapReverse();
			});

			//Move right content to middle onClick
			$rightCtl.toggle(function() {
				rightSwap();
			}, function() {
				rightSwapReverse();
			});
		});
    };
})(jQuery);