function shareSucHandler() {}

function initWXShare() {
	if (!window.WeixinJSBridge) {
		if (countOfWX > 20) return;
		setTimeout(initWXShare, 150), countOfWX++;
		return
	}
	var e = {
		imgUrl: "http://p7.qhimg.com/d/inn/ef297f3a/share.jpg",
		link: "http://t.cn/R7MGKHa",
		desc: "30\u53f0iPhone6\u8ba9\u4f60\u4e45\u7b49\u4e86\uff01360\u624b\u673a\u52a9\u624b3.0\u8eab\u8fb9\u7248\u6bcf\u59295000\u540d\u989d\u62a2\u5148\u6d4b",
		title: "360\u624b\u673a\u52a9\u624b3.0\u8eab\u8fb9\u7248\u6b63\u5f0f\u5185\u6d4b"
	};
	WeixinApi.shareToTimeline(e, wxCallbacks), WeixinApi.shareToFriend(e, wxCallbacks)
}

function pageInit() {
	$(".sliderContainer").css("visibility", "visible"), $(".loading").remove(), slider.on("swipeTop", function(e) {
		setTimeout(function() {
			anim.show(e + 1)
		}, 500)
	}), slider.on("swipeBottom", function(e) {
		setTimeout(function() {
			anim.show(e - 1)
		}, 500)
	}), anim.show(0), window.gotoContent = function(e) {
		if (e == 6)
			if (window.flag_isWeixin) {
				$(".weixinTip").show(), utilM2.record("share", G_pos, "show");
				var t = parseFloat(navigator.userAgent.match(/MicroMessenger\/(\d\.\d)/)[1]);
				t < 5.3 && setTimeout(shareSucHandler, 5e3)
			} else if (window.AndroidWebview) {
			utilM2.record("share", G_pos, "show");
			var n = !1;
			try {
				n = AndroidWebview.isSupportShareFriend(), n = typeof n == "string" ? JSON.parse(n) : n
			} catch (r) {}
			if (typeof AndroidWebview.shareToFriend == "function" && n) {
				var i = {
					imgUrl: "http://p7.qhimg.com/d/inn/ef297f3a/share.jpg",
					webUrl: "http://t.cn/R7MGKHa",
					title: "30\u53f0iPhone6\u8ba9\u4f60\u4e45\u7b49\u4e86\uff01360\u624b\u673a\u52a9\u624b3.0\u8eab\u8fb9\u7248\u6bcf\u59295000\u540d\u989d\u62a2\u5148\u6d4b",
					desc: "360\u624b\u673a\u52a9\u624b3.0\u8eab\u8fb9\u7248\u6b63\u5f0f\u5185\u6d4b"
				};
				AndroidWebview.shareToFriend(JSON.stringify(i))
			} else {
				var i = {
					content: "30\u53f0iPhone6\u8ba9\u4f60\u4e45\u7b49\u4e86\uff01360\u624b\u673a\u52a9\u624b3.0\u8eab\u8fb9\u7248\u6bcf\u59295000\u540d\u989d\u62a2\u5148\u6d4b http://t.cn/R7MGKHa",
					imgUrl: "http://p7.qhimg.com/d/inn/ef297f3a/share.jpg"
				};
				AndroidWebview.shareToSNS(JSON.stringify(i))
			}
			setTimeout(shareSucHandler, 3e3)
		} else shareSucHandler()
	}, utilM2.is_iphone() && setTimeout(function() {
		var e = $(window).height();
		e = Math.min(504, e), $(".sliderContainer, .section").height(e)
	}, 200), window.flag_isWeixin = utilM2.is_weixin(), flag_isWeixin && initWXShare()
}

function bindEvents() {
	$(".js-next").click(function(e) {
		var t = $(this),
			n = t.closest(".slider"),
			r = n.index();
		slider._swipeTop(r, n), e.preventDefault()
	}), $(".weixinTip").click(function() {
		$(this).hide()
	})
}
var wxCallbacks = {
		confirm: function(e) {
			$(".weixinTip").hide(), shareSucHandler()
		}
	},
	animApp = {
		images: allImages.images,
		init: function() {
			slider = new TouchSlider(".sliderContainer", ".slider", {
				vertical: !0
			});
			var e = this,
				t = this.getPreloader();
			t.onProgress = this.onPreloadProgress, t.load(function() {
				e.onPreloadLoad()
			}), window.timer_loaded = setTimeout(function() {
				e.onPreloadLoad()
			}, 5e3)
		},
		getPreloader: function() {
			return new Preloader(this.images)
		},
		onPreloadProgress: function(e, t) {
			var n = $(".loading em"),
				r = $(".progress > div");
			n.eq(0).text(e), n.eq(1).text(t), r.css("-webkit-transition", "all .4s ease-in-out"), r.width(100 * e / t + "%")
		},
		onPreloadLoad: function() {
			clearTimeout(window.timer_loaded), setTimeout(pageInit, 500)
		}
	};
$(function() {
	if (utilM2.getCookie("gottedcode3") == 1) {
		setTimeout(function() {
			location.replace("http://" + location.host + "/html/zs3/code.html?_=" + Math.random())
		}, 500);
		return
	}
	animApp.init(), bindEvents(), utilM2.record("page1", G_pos, "show")
})