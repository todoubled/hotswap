# Move left item to center
leftSwap = ->
  $leftCtl.hide()
  $("#" + $swaps[0]).animate middle, speed
  $("#" + $swaps[2]).animate right, speed
  $("#" + $swaps[1]).animate left, speed, -> $leftCtl.show()
  @leftSwapAssign()


# Move left item from center back to left
leftSwapReverse = ->
  $leftCtl.hide()
  $("#" + $swaps[1]).animate left, speed
  $("#" + $swaps[2]).animate right, speed
  $("#" + $swaps[0]).animate middle, speed, -> $leftCtl.show()
  @leftSwapAssign()

# Assign new array order based on left swap
@leftSwapAssign = ->
  temp = $swaps[0]
  $swaps[0] = $swaps[1]
  $swaps[1] = temp

# Move right item to center
rightSwap = ->
  $rightCtl.hide()
  $("#" + $swaps[1]).animate right, speed
  $("#" + $swaps[0]).animate left, speed
  $("#" + $swaps[2]).animate middle, speed, -> $rightCtl.show()
  rightSwapAssign()

# Move right item from center back to right
rightSwapReverse = ->
  $rightCtl.hide()
  $("#" + $swaps[2]).animate middle, speed
  $("#" + $swaps[0]).animate left, speed
  $("#" + $swaps[1]).animate right, speed, -> $rightCtl.show()
  rightSwapAssign()

# Assign new array order based on right swap
rightSwapAssign = ->
  temp = $swaps[1]
  $swaps[1] = $swaps[2]
  $swaps[2] = temp



$.fn.hotswap = (options) ->
  defaults =
    swaps: '.items'
    item: 'div'
    wrapper: '.hotswap'
    nav: '.nav'
    leftCtlSelector: '.left'
    rightCtlSelector: '.right'
    speed: 400
    auto: false
    interval: 5000
    ctlPosition: 'center'

  config = $.extend {}, defaults, options

  $(@).each ->
    $swaps = []
    $swapWrapper = $(@)
    $nav = $swapWrapper.find config.nav
    $swapContainer = $swapWrapper.find config.swaps
    $eachSwap = $swapWrapper.find config.item
    $leftCtl = $nav.find config.leftCtlSelector
    $rightCtl = $nav.find config.rightCtlSelector
    speed = config.speed
    ctlPosition = config.ctlPosition
    interval = config.interval
    swapHeight = +$swapWrapper.height()
    swapWidth = +$swapWrapper.width()
    navHeight = +$rightCtl.height()
    navFromSide = swapWidth / 10
    leftPos = -(swapWidth / 2)
    rightPos = swapWidth - navFromSide
    middlePos = navFromSide * 2
    left = "left": leftPos
    middle = "left": middlePos
    right = "left": rightPos
    navPos = 0
    navCss =
      "position": "relative"
      "z-index": 99
    eachNavCss =
      "position": "absolute"
      "z-index": 9
    itemCss =
      "width": swapWidth * 0.6
      "position": "absolute"
      "height": swapHeight

    # Position controls in the UI
    if ctlPosition is 'center'
      navPos = (swapHeight / 2) - (navHeight * 2)

    else if ctlPosition is 'bottom'
      navPos = swapHeight - (navHeight * 2)


    # Find and store hotswap items
    $(@).each ->
      $eachSwap.each ->
        id = $(@).attr 'id'
        $swaps.push(id)


    # Set up base UI
    $swapContainer.css
      "position":"relative"
      "z-index":999

    $swapWrapper.css 'overflow', 'hidden'
    $nav.css navCss
    $leftCtl.css eachNavCss
    $rightCtl.css eachNavCss
    $eachSwap.css itemCss
    $nav.css 'top', navPos
    $leftCtl.css 'left', navFromSide
    $rightCtl.css 'right', navFromSide
    $("##{$swaps[0]}").css left
    $("##{$swaps[1]}").css middle
    $("##{$swaps[2]}").css right






    $leftCtl.toggle leftSwap, leftSwapReverse
    $rightCtl.toggle rightSwap, rightSwapReverse

    autoSwap = ->
      autoLeftSwap = -> @autoLeft = setInterval leftSwap, interval
      autoRightSwap = -> @autoRight = setInterval rightSwap, interval

      initAutoSwap = ->
        autoLeftSwap()
        setTimeout autoRightSwap, interval / 2

      killAutoSwap = ->
        clearInterval @autoLeft
        clearInterval @autoRight

      initAutoSwap()

      $("#{config.leftCtlSelector}, #{config.rightCtlSelector}").bind "click", ->
        killAutoSwap()

    autoSwap() if config.auto is true
