//Declare content blocks
var divs = ['left', 'middle', 'right'];

//Get position of each block
var right = $('#' + divs[2]).position().left;
var left = $('#' + divs[0]).position().left;
var middle = $('#' + divs[1]).position().left;


//Move left content to middle
$(function() {
	$('.swapLeft').toggle(function() {

			var offset = 0;
			if ( divs[1] == "right" ) {
				var offset = -40;	
			}

			$('#' + divs[0]).animate({left:middle},400);
			$('.swapLeft').hide();
			$('#' + divs[2]).animate({left:right},400);
			$('#' + divs[1]).animate({left:left + offset},400, function() {
				$('.swapLeft').show();
			});
				temp = divs[0];
				divs[0] = divs[1];
				divs[1] = temp;
		}, function() {

			var offset = 0;
			if ( divs[0] == "right" ) {
				var offset = -20;	
			}

			$('#' + divs[1]).animate({left:left},400);
			$('.swapLeft').hide();
			$('#' + divs[2]).animate({left:right},400);
			$('#' + divs[0]).animate({left:middle + offset},400, function() {
				$('.swapLeft').show();
			});
				temp = divs[0];
				divs[0] = divs[1];
				divs[1] = temp;
	});
});


//Move right content to middle
$(function() {
	$('.swapRight').toggle(function() {

			var offset = 0;
			if ( divs[2] == "right" ) {
				var offset = -15;	
			}

			$('#' + divs[1]).animate({left:right},400);
			$('.swapRight').hide();
			$('#' + divs[0]).animate({left:left},400);
			$('#' + divs[2]).animate({left:middle + offset},400, function() {
				$('.swapRight').show();
			});
				temp = divs[1];
				divs[1] = divs[2];
				divs[2] = temp;
		}, function() {

			var offset = 0;
			if ( divs[2] == "right" ) {
				var offset = 0;	
			}


			$('#' + divs[2]).animate({left:middle + offset},400);
			$('.swapRight').hide();
			$('#' + divs[0]).animate({left:left},400);
			$('#' + divs[1]).animate({left:right},400, function() {
				$('.swapRight').show();
			});
				temp = divs[1];
				divs[1] = divs[2];
				divs[2] = temp;
	});
});

//Main Slide CTA content triggers
$(function() {
	$('#videos').click(function() {
			$('#left').animate({left:middle},400);
			$('#right').animate({left:right},400);
			$('.swapLeft').hide();
			$('#middle').animate({left:left},400, function() {
				$('.swapLeft').show();
			});
				vtemp = $('#left').position().left;
				$('#left').position().left = $('#middle').position().left;
				$('#middle').position().left = vtemp;

				divs[0] = 'middle';
				divs[1] = 'left';
				divs[2] = 'right';
	});
});

$(function() {
	$('#experience').click(function() {
			$('#right').animate({left:middle},400);
			$('#left').animate({left:left},400);
			$('.swapRight').hide();
			$('#middle').animate({left:right},400, function() {
				$('.swapRight').show();
			});
				etemp = $('#middle').position().left;
				$('#middle').position().left = $('#right').position().left;
				$('#right').position().left = etemp;

				divs[0] = 'left';
				divs[1] = 'right';
				divs[2] = 'middle';
	});
});

$(function() {
	$('#middleCTA').click(function() {
			$('#right').animate({left:right},400);
			$('#left').animate({left:left},400);
			$('.swapRight').hide();
			$('.swapLeft').hide();
			$('#middle').animate({left:middle},400, function() {
				$('.swapRight').show();
				$('.swapLeft').show();
			});
				dtemp = $('#middle').position().left;
				$('#middle').position().left = $('#right').position().left;
				$('#right').position().left = dtemp;

				divs[0] = 'left';
				divs[1] = 'right';
				divs[2] = 'middle';
	});
});