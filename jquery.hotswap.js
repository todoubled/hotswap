/* 
Author:	Todd Larsen | toddlar@gmail.com
*/

(function() {	
	// Config - use options hash
	var swapElem = "div",
		leftCtlSelector = ".left",
		rightCtlSelector = ".right",
		swapInnerWrapper = ".swap-inner",
		swapCtlWrapper = ".swap-nav",
		swapSpeed = 400;
	
	
	
	$.fn.hotSwap = function() {
		var swaps = [ ],
			eachSwap = $(this).find(swapInnerWrapper).find(swapElem),
			leftCtl = $(this).find(swapCtlWrapper).find(leftCtlSelector),
			rightCtl = $(this).find(swapCtlWrapper).find(rightCtlSelector),
			temp;
			
		// Find swappable items
		$(this).each(function() {			
			$(eachSwap).each(function() {
				var ids = $(this).attr("id");
				swaps.push(ids);
			});
		});
		
		var left = $('#' + swaps[0]).position().left,
			middle = $('#' + swaps[1]).position().left,
			right = $('#' + swaps[2]).position().left;
			
		function leftSwap() {
			leftCtl.hide();
			$('#' + swaps[0]).animate({left:middle}, swapSpeed);
			$('#' + swaps[2]).animate({left:right}, swapSpeed);
			$('#' + swaps[1]).animate({left:left}, swapSpeed, function() {
				leftCtl.show();
			});
			leftSwapAssign();
		}
		
		function leftSwapReverse() {
			leftCtl.hide();
			$('#' + swaps[1]).animate({left:left}, swapSpeed);
			$('#' + swaps[2]).animate({left:right}, swapSpeed);
			$('#' + swaps[0]).animate({left:middle}, swapSpeed, function() {
				leftCtl.show();
			});
			leftSwapAssign();
		}
		
		function leftSwapAssign() {
			temp = swaps[0];
			swaps[0] = swaps[1];
			swaps[1] = temp;
		}
		
		function rightSwap() {
			rightCtl.hide();
			$('#' + swaps[1]).animate({left:right}, swapSpeed);
			$('#' + swaps[0]).animate({left:left}, swapSpeed);
			$('#' + swaps[2]).animate({left:middle}, swapSpeed, function() {
				rightCtl.show();
			});
			rightSwapAssign();
		}
		
		function rightSwapReverse(){
			rightCtl.hide();
			$('#' + swaps[2]).animate({left:middle}, swapSpeed);
			$('#' + swaps[0]).animate({left:left}, swapSpeed);
			$('#' + swaps[1]).animate({left:right}, swapSpeed, function() {
				rightCtl.show();
			});
			rightSwapAssign();
		}
		
		function rightSwapAssign() {
			temp = swaps[1];
			swaps[1] = swaps[2];
			swaps[2] = temp;
		}
				
		// Move left content to middle onClick
		leftCtl.toggle(function() {
			leftSwap();
		}, function() {
			leftSwapReverse();
		});

		//Move right content to middle onClick
		rightCtl.toggle(function() {
			rightSwap();
		}, function() {
			rightSwapReverse();
		});
    };
})(jQuery);