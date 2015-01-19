(function(){window.TouchSlider=function(){this._init.apply(this,arguments)},TouchSlider.prototype={constructor:TouchSlider,_init:function(e,t,n){this.options=$.extend({horizontal:!1,vertical:!1,duration:".5s",effect:"linear"},n||{}),this.container=$(e),this.section=$(t,this.container),this.events={},this.index=0,this.total=this.section.length,this.position={start:{x:0,y:0},end:{x:0,y:0}},this._setDefaultStyle(),this._bindEvents()},on:function(e,t){this.events[e]||(this.events[e]=[]),this.events[e].push(t)},off:function(e,t){var n=this.events[e];if(!n)return;if(!t){delete this.events[e];return}for(var r=0,i=n.length;r<i;r++)t===n[r]&&this.events[e].splice(r--,1)},trigger:function(e){var t=this.events[e],n=[].slice.call(arguments,1);if(!t)return;for(var r=0,i=t.length;r<i;r++)t[r].apply(null,n)},_setDefaultStyle:function(){this.section.css({position:"absolute",width:"100%",height:"100%",left:0,top:0,"-webkit-transition":"-webkit-transform "+this.options.duration+" "+this.options.effect}),this.section.slice(1).css("-webkit-transform",this.options.horizontal?"translateX(100%)":"translateY(100%)")},_resetPosition:function(e,t,n,r){this.position={start:{x:e||0,y:t||0},end:{x:n||0,y:r||0}}},_getSwipeEvent:function(){var e=this.position,t=Math.abs(e.start.x-e.end.x),n=Math.abs(e.start.y-e.end.y);if(t<50&&n<50)return!1;var r=t>n?"x":"y";return r==="x"?e.end.x-e.start.x>0?"swipeRight":"swipeLeft":e.end.y-e.start.y>0?"swipeBottom":"swipeTop"},_getTouchEvent:function(e){var t=navigator.userAgent,n;return/(iPhone|iPad|iPod|iOS)/i.test(t)?e.targetTouches&&(n=e.targetTouches[0]):/(Android)/i.test(t)?e.touches&&(n=e.touches[0]):n=e,n},_swipeTop:function(e,t){window.gotoContent&&window.gotoContent(e);if(e===this.total-1||!this.options.vertical)return;var n=this.section.eq(e+1);t.css("-webkit-transform","translateY(-100%)"),n.css("-webkit-transform","translateY(0)"),this.trigger("swipeTop",e,this.total,t)},_swipeBottom:function(e,t){if(e===0||!this.options.vertical)return;var n=this.section.eq(e-1);t.css("-webkit-transform","translateY(100%)"),n.css("-webkit-transform","translateY(0)"),this.trigger("swipeBottom",e,this.total,t)},_swipeLeft:function(e,t){window.gotoContent&&window.gotoContent(e);if(e===this.total-1||!this.options.horizontal)return;var n=this.section.eq(e+1);t.css("-webkit-transform","translateX(-100%)"),n.css("-webkit-transform","translateX(0)"),this.trigger("swipeLeft",e,this.total,t)},_swipeRight:function(e,t){if(e===0||!this.options.horizontal)return;var n=this.section.eq(e-1);t.css("-webkit-transform","translateX(100%)"),n.css("-webkit-transform","translateX(0)"),this.trigger("swipeRight",e,this.total,t)},_bindEvents:function(){var e=this.section,t=this,n;e.on("touchstart mousedown",function(e){var n=t._getTouchEvent(e);if(!n)return;t._resetPosition(n.pageX,n.pageY,n.pageX,n.pageY)}),e.on("touchmove mousemove",function(e){e.preventDefault();var n=t._getTouchEvent(e);if(!n)return;t.position.end.x=n.pageX,t.position.end.y=n.pageY}),e.on("touchend mouseup",function(e){var r=t._getSwipeEvent();if(!r)return;var i=$(this);t._resetPosition(),clearTimeout(n),n=setTimeout(function(){var e=i.index();t["_"+r](e,i)},60)})}}})();