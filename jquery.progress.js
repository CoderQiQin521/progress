/*
 * @Author: coderqiqin@aliyun.com 
 * @Date: 2018-12-13 14:45:54 
 * @Last Modified by: CoderQiQin
 * @Last Modified time: 2018-12-13 14:48:11
 */
if (typeof jQuery === 'undefined') {
  throw new Error('请先引用jquery')
}

(function($){
  function Progress(el, options) {
    this.el = el
    this.options = options
    this._init()
  }
  
  Progress.prototype._init = function() {
    var docHeight = $('body').height() // 文档高度
    var sercHeight = $(window).height() // 屏幕高度
    var resHeight = docHeight - sercHeight

    var config = this.options

    var proConfig = {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '2px',
      backgroundColor: '#eee',
      zIndex: 9999
    }
    var innerConfig = {
      width: 0,
      backgroundColor: '#50bcb6',
      height: '100%',
      transitionProperty: 'width',
      transitionDuration: '.3s',
      transitionTimingFunction: 'linear'
    }

    var proMap = ['size', 'position', 'wapperBg', ]
    var innerMap = ['innerBg', 'duration', 'effect']
    var setMap = proMap.concat(innerMap)

    for(let key in config) {
      if(!setMap.includes(key)) delete config[key]
      switch (key) {
        case 'size':
          proConfig.height = config.size
          break;
        case 'position':
          if(config.position === 'bottom') {
            delete proConfig.top
            proConfig['bottom'] = 0
          }
          break;
        case 'wapperBg':
          proConfig.backgroundColor = config.wapperBg
          break;
        case 'innerBg':
          innerConfig.backgroundColor = config.innerBg
          break;
        case 'duration':
          innerConfig.transitionDuration = config.duration
          break;
        case 'effect':
          innerConfig.transitionTimingFunction = config.effect
          break;
        default:
          break;
      }
    }

    this.el.empty().css(proConfig)
    $('<div class="inner"></div>').appendTo(this.el).css(innerConfig)
    
    $(window).scroll(function(e) {
      window.requestAnimationFrame(function(){
        var width = Math.max(0, Math.min(1, $(window).scrollTop() / resHeight))
        $('.inner').show().css('width', width * 100 +'%')
      })
    })
  }

  $.fn.progress = function(options) {
    this.each(function(el) {
      new Progress($(this), options || null)
    })
    return this
  }
  
})(jQuery)
