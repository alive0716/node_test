var slider = {},
	urlParams = utilM2.getParams(),
	G_pos = "around20141024" + (urlParams.from || ""),
	countOfWX = 0,
	allImages = {
		images: ["img/0_00.png", "img/0_0.png", "img/0_01.png", "img/0_025.png", "img/0_03.png", "img/0_05.png"],
		images1: ["img/1_02.png", "img/1_03.png", "img/1_06.png", "img/1_07.png", "img/1_08.png"],
		images2: ["img/2_00.png", "img/2_03.png", "img/2_04.png", "img/2_06.png"],
		images5: ["img/5_03.png", "img/5_05.png", "img/5_09.png", "img/5_10.png", "img/5_11.png"]
	},
	anim = new Animation;
anim.played = [], anim.movie = [function(e) {
	if (anim.played[e]) return;
	anim.played[e] = 1, anim.add(".slider-1 .title", "moveFromTop"), anim.add(".slider-1 .man", "fadeIn"), anim.add(".slider-1 .desc", "moveFromLeft"), anim.add(".slider-1 .next", "moveFromBottom", {
		remove: !0,
		onComplete: function() {
			$(".slider-1 .next").css("-webkit-animation", "float 1s linear 0 infinite alternate")
		}
	}), anim.onComplete = function() {
		anim.onComplete = new Function;
		var e = new Preloader(allImages.images1);
		e.load()
	}, anim.play()
}, function(e) {
	if (anim.played[e]) return;
	anim.played[e] = 1, anim.add(".slider-2 .title", "fadeIn"), anim.add(".slider-2 .desc", "moveFromLeft"), anim.add(".slider-2 .bg", "moveFromRight"), anim.add(".slider-2 .bottom", "moveFromBottom"), anim.add(".slider-2 .bg2", "fadeIn"), anim.add(".slider-2 .man", "zoomOut"), anim.onComplete = function() {
		anim.onComplete = new Function;
		var e = new Preloader(allImages.images2);
		e.load()
	}, anim.play()
}, function(e) {
	if (anim.played[e]) return;
	anim.played[e] = 1, anim.add(".slider-3 .bg", "zoomOut"), anim.add(".slider-3 .title", "fadeIn"), anim.add(".slider-3 .desc", "moveFromLeft"), anim.add(".slider-3 .bottom", "moveFromBottom"), anim.onComplete = function() {
		anim.onComplete = new Function;
		var e = new Preloader(allImages.images3);
		e.load()
	}, anim.play()
}, function(e) {
	if (anim.played[e]) return;
	anim.played[e] = 1, anim.add(".slider-4 .bg", "zoomOut"), anim.add(".slider-4 .title", "fadeIn"), anim.add(".slider-4 .mask", "fadeIn"), anim.add(".slider-4 .desc", "moveFromLeft"), anim.add(".slider-4 .bottom", "moveFromBottom"), anim.onComplete = function() {
		anim.onComplete = new Function;
		var e = new Preloader(allImages.images4);
		e.load()
	}, anim.play()
}, function(e) {
	if (anim.played[e]) return;
	anim.played[e] = 1, anim.add(".slider-5 .bg", "zoomOut"), anim.add(".slider-5 .title", "fadeIn"), anim.add(".slider-5 .mask", "fadeIn"), anim.add(".slider-5 .desc", "moveFromLeft"), anim.add(".slider-5 .bottom", "moveFromBottom"), anim.onComplete = function() {
		anim.onComplete = new Function;
		var e = new Preloader(allImages.images5);
		e.load()
	}, anim.play()
}, function(e) {
	if (anim.played[e]) return;
	anim.played[e] = 1, anim.add(".slider-6 .goast", "zoomIn", {
		remove: !0
	}), anim.add(".slider-6 .title", "fadeIn"), anim.add(".slider-6 .mask", "fadeIn"), anim.add(".slider-6 .desc", "moveFromLeft"), anim.add(".slider-6 .bg", "moveFromRight"), anim.add(".slider-6 .bottom", "moveFromBottom"), anim.add(".slider-6 .pao", "moveFromRight", {
		onComplete: function() {
			$(".slider-6 .goast").css("-webkit-animation", "float 1s linear infinite alternate")
		}
	}), anim.play()
}, function(e) {
	utilM2.record("page8", G_pos, "show")
}], anim.show = function(e) {
	anim.movie[e].call(anim, e)
}