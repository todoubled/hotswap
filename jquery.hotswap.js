// Generated by CoffeeScript 1.3.3
(function() {

  $.fn.hotswap = function(options) {
    var config, defaults;
    defaults = {
      swaps: '.items',
      item: 'div',
      wrapper: '.hotswap',
      nav: '.nav',
      leftCtlSelector: '.left',
      rightCtlSelector: '.right',
      speed: 400,
      auto: false,
      interval: 5000,
      ctlPosition: 'center'
    };
    config = $.extend({}, defaults, options);
    return $(this).each(function() {
      var $eachSwap, $leftCtl, $nav, $rightCtl, $swapContainer, $swapWrapper, $swaps, autoSwap, ctlPosition, eachNavCss, interval, itemCss, left, leftPos, leftSwap, leftSwapAssign, leftSwapReverse, middle, middlePos, navCss, navFromSide, navHeight, navPos, right, rightPos, rightSwap, rightSwapAssign, rightSwapReverse, speed, swapHeight, swapWidth;
      $swaps = [];
      $swapWrapper = $(this);
      $nav = $swapWrapper.find(config.nav);
      $swapContainer = $swapWrapper.find(config.swaps);
      $eachSwap = $swapWrapper.find(config.item);
      $leftCtl = $nav.find(config.leftCtlSelector);
      $rightCtl = $nav.find(config.rightCtlSelector);
      speed = config.speed;
      ctlPosition = config.ctlPosition;
      interval = config.interval;
      swapHeight = parseInt($swapWrapper.height(), 10);
      swapWidth = parseInt($swapWrapper.width(), 10);
      navHeight = parseInt($rightCtl.height(), 10);
      navFromSide = swapWidth / 10;
      leftPos = -(swapWidth / 2);
      rightPos = swapWidth - navFromSide;
      middlePos = navFromSide * 2;
      left = {
        "left": leftPos
      };
      middle = {
        "left": middlePos
      };
      right = {
        "left": rightPos
      };
      navPos = 0;
      navCss = {
        "position": "relative",
        "z-index": 99
      };
      eachNavCss = {
        "position": "absolute",
        "z-index": 9
      };
      itemCss = {
        "width": swapWidth * 0.6,
        "position": "absolute",
        "height": swapHeight
      };
      if (ctlPosition === 'center') {
        navPos = (swapHeight / 2) - (navHeight * 2);
      } else if (ctlPosition === 'bottom') {
        navPos = swapHeight - (navHeight * 2);
      }
      $(this).each(function() {
        return $eachSwap.each(function() {
          var id;
          id = $(this).attr('id');
          return $swaps.push(id);
        });
      });
      $swapContainer.css({
        "position": "relative",
        "z-index": 999
      });
      $swapWrapper.css('overflow', 'hidden');
      $nav.css(navCss);
      $leftCtl.css(eachNavCss);
      $rightCtl.css(eachNavCss);
      $eachSwap.css(itemCss);
      $nav.css('top', navPos);
      $leftCtl.css('left', navFromSide);
      $rightCtl.css('right', navFromSide);
      $('#' + $swaps[0]).css(left);
      $('#' + $swaps[1]).css(middle);
      $('#' + $swaps[2]).css(right);
      leftSwap = function() {
        $leftCtl.hide();
        $("#" + $swaps[0]).animate(middle, speed);
        $("#" + $swaps[2]).animate(right, speed);
        $("#" + $swaps[1]).animate(left, speed, function() {
          return $leftCtl.show();
        });
        return leftSwapAssign();
      };
      leftSwapReverse = function() {
        $leftCtl.hide();
        $("#" + $swaps[1]).animate(left, speed);
        $("#" + $swaps[2]).animate(right, speed);
        $("#" + $swaps[0]).animate(middle, speed, function() {
          return $leftCtl.show();
        });
        return leftSwapAssign();
      };
      leftSwapAssign = function() {
        var temp;
        temp = $swaps[0];
        $swaps[0] = $swaps[1];
        return $swaps[1] = temp;
      };
      rightSwap = function() {
        $rightCtl.hide();
        $("#" + $swaps[1]).animate(right, speed);
        $("#" + $swaps[0]).animate(left, speed);
        $("#" + $swaps[2]).animate(middle, speed, function() {
          return $rightCtl.show();
        });
        return rightSwapAssign();
      };
      rightSwapReverse = function() {
        $rightCtl.hide();
        $("#" + $swaps[2]).animate(middle, speed);
        $("#" + $swaps[0]).animate(left, speed);
        $("#" + $swaps[1]).animate(right, speed, function() {
          return $rightCtl.show();
        });
        return rightSwapAssign();
      };
      rightSwapAssign = function() {
        var temp;
        temp = $swaps[1];
        $swaps[1] = $swaps[2];
        return $swaps[2] = temp;
      };
      $leftCtl.toggle(leftSwap, leftSwapReverse);
      $rightCtl.toggle(rightSwap, rightSwapReverse);
      autoSwap = function() {
        var autoLeftSwap, autoRightSwap, initAutoSwap, killAutoSwap;
        autoLeftSwap = function() {
          return this.autoLeft = setInterval(leftSwap, interval);
        };
        autoRightSwap = function() {
          return this.autoRight = setInterval(rightSwap, interval);
        };
        initAutoSwap = function() {
          autoLeftSwap();
          return setTimeout(autoRightSwap, interval / 2);
        };
        killAutoSwap = function() {
          clearInterval(this.autoLeft);
          return clearInterval(this.autoRight);
        };
        initAutoSwap();
        return $("" + config.leftCtlSelector + ", " + config.rightCtlSelector + "").bind("click", function() {
          return killAutoSwap();
        });
      };
      if (config.auto === true) {
        return autoSwap();
      }
    });
  };

}).call(this);
