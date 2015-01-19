$(function() {
    var getCalls = $('#getCalls'); //立马领取
    var popDiv = $('#overlay-login'); //登录弹层
    var modalVerify = $('#modal-verify'); //验证码input
    var modalPhone = $('#modal-phone'); //手机input
    var verifyError = $('#verify-error'); //验证码错误提示
    var phoneClose = $('#phone-close'); //登录弹层关闭按钮
    var overlayTip = $('#overlay-tip'); //
    var tipClose = $('#tip-close'); //
	var mask=$('#overlayMask');
	var activeShare=$('#activeShare');
	var overlayShare=$('#overlay-share');
	var shareClose=$('#shareClose');
	var winCall=$('#winCall');
    var price = $('#getCalls').parent().find('i').text();
    //手机弹层关闭事件
    phoneClose.click(function() {
			pophide(popDiv,mask);
        })
	//马上赚话费
	winCall.click(function(){
		pophide(overlayTip,mask);
		})
    //弹出层显示
    function popShow(obj,mask) {
            var browserWidth = $(window).width();
                var browserHeight = $(window).height();
                var browserTop = $(window).scrollTop();
                var browserLeft = $(window).scrollLeft();
                var popWidth = obj.outerWidth(true);
                var popHeight = obj.outerHeight(true);
				var maskHeight=browserHeight+browserTop;
                var popLeft = (browserWidth - popWidth) / 2 + browserLeft;
                var popTop = (browserHeight - popHeight) / 2 + browserTop;
				mask.css('height',maskHeight).fadeIn()
                obj.css({
					'left': popLeft + 'px',
                    'top': popTop + 'px'
					}).fadeIn();
				document.ontouchstart = function() {
                return false;
            }
        }
	function pophide(obj,mask){
		mask.fadeOut();
		obj.fadeOut();
		document.ontouchstart=function(){
			return true;
			}
		}
	//分享点击事件
	activeShare.click(function(){
		popShow(overlayShare,mask)
		var comShare = Share({
                box: overlayShare,
                title: 'fdsfdsfdsf',
                url: 'http://m.anjuke.com',
                source: 'bookmark',
                pic:'../img/shareIcon.png' ,
                desc: 'sdfdsfdsfdsfdsf'
            })
            overlayShare.find('.jtico_qzone').on('click', function() {
                pophide(overlayShare,mask)
                comShare.qzone();

            })
            overlayShare.find('.jtico_tsina').on('click', function() {
                pophide(overlayShare,mask)
                comShare.sina();

            })
            overlayShare.find('.jtico_tqq').on('click', function() {
                pophide(overlayShare,mask)
                comShare.tqq();
            })

		})
	//分享层关闭
	shareClose.click(function(){
		pophide(overlayShare,mask)
		})
    //马上领取话费事件
    getCalls.click(function(event) {
        if (price == '0') {
            popShow(overlayTip,mask);
        } else {
            popShow(popDiv,mask);
        }
    });
    placeholder(modalVerify, "验证码")
	//提示层关闭
    tipClose.click(function() {
			pophide(overlayTip,mask)
        })
	
        //电话填写交互
    modalPhone.focus(function() {
        if ($(this).val() == "请输入手机号码") {
            $(this).val("");
        }
    }).blur(function() {
        if ($(this).val() == "") {
            $(this).val('请输入手机号码')
        } else if (!isPhone(modalPhone.val())) {
            $(this).hide();
            $('#phone-error').show();
        } else if (isPhone(modalPhone.val())) {
            $('#phone-error').hide();
        }
    })
    $('#phone-error').click(function() {
            $(this).hide();
            modalPhone.val('').show();
        })
        //获取手机号码验证
    function getMobileAjax() {
        var mobile = modalPhone.val();
        $.ajax({
            type: 'post',
            url: sendCaptcha,
            dataType: 'json',
            data: {
                mobile: mobile
            },
            error: function() {},
            success: function(data) {
                mobileStatus = data.error;
                mobileMsg = data.error_msg;
                verifyEvent(mobileStatus, mobileMsg)
            }
        })
    }

    //点击获取验证码的事件判断
    function verifyEvent(mobileStatus, mobileMsg) {
        var phoneError = $('#phone-error');
        if (mobileStatus == 0) {
            phoneError.hide();
            time(btnVerify, 90);
        } else {
            phoneError.html('<span>!</span>' + mobileMsg);
            phoneError.show();
        }
    }

    //获取验证码验证
    function getLoginAjax() {
        var mobile = modalPhone.val();
        var phone_code = modalVerify.val();
        $.ajax({
            type: 'post',
            url: mobileLoginUrl,
            dataType: 'json',
            async: false,
            data: {
                mobile: mobile,
                phone_code: phone_code
            },
            error: function() {},
            success: function(data) {
                var loginStatus = "";
                if (undefined != data && data.error == 0) {
                    loginStatus = 0;
                } else {
                    loginStatus = 1;
                }
                submitEvent(loginStatus);
            }
        })
    }

    //点击提交的事件判断
    function submitEvent(loginStatus) {
        if (loginStatus == 0) {
            popDiv.fadeOut();
			overlayTip.find('.modal-tip').text('亲，您已成功领取'+price+'元手机话费，当日领取的话费将于次个工作日充值，请注意查收哦~');
			popShow(overlayTip,mask)
            setTimeout(function() {
                overlayTip.fadeOut()
            }, 10000)
        } else if (loginStatus == 1) {
            modalVerify.hide();
            verifyError.show().html("<span>!</span>验证码错误");
        }
    }
    verifyError.click(function(event) {
        $(this).hide();
        modalVerify.show();
    });
    $('#ruleBtn').click(function() {
            if ($('#activeDatail').is(":visible") == true) {
                $('#activeDatail').fadeOut();
                $('#ruleBtn').find('.arrowup').addClass('down').end().parent().find('a').removeClass('hdshow');
                $('#ruleBtn').parent().css('marginBottom', '28px');
            } else {
                $('#activeDatail').fadeIn();
                $('#ruleBtn').parent().css('marginBottom', '0px');
                $('#ruleBtn').find('.arrowup').removeClass('down').end().parent().find('a').addClass('hdshow');
            }
        })
        //弹框
    function dialog(obj) {
            obj.show();
            obj.find('.modal-close').bind('click', function() {
                obj.hide();
            })
        }
        //手机号码验证
    function isPhone(aPhone) {
        var bValidate = RegExp(/^(0|86|17951)?(13[0-9]|15[012356789]|18[0-9]|14[57])[0-9]{8}$/).test(aPhone);
        if (bValidate) {
            return true;
        } else
            return false;
    }

    //倒计时60秒
    function time(obj, wait) {
        if (wait == 0) {
            obj.attr('disabled', false);
            obj.val('获取验证码');
            wait = wait;
        } else {
            obj.val('发送中(' + wait + ')');
            obj.attr('disabled', true);
            wait--;
            setTimeout(function() {
                time(obj, wait)
            }, 1000)
        }
    }

    //表单的placeholder
    function placeholder(obj, text) {
        obj.focus(function() {
            if (obj.val() == text) {
                obj.val("")
            }
        }).blur(function() {
            if (obj.val() == "") {
                obj.val(text);
            }
        })
    }
	//分享按钮组件
function Share(option) {
    var defaultOptions = {
        box: overlayShare,
        title: '租房免租金,有钱没钱都任性!安居客品牌公寓暖冬盛典',
        url: window.location.href,
        source: 'bookmark',
        pic: '',
        desc: '租房免租金,有钱没钱都任性!安居客品牌公寓暖冬盛典'
    }
    var opt = $.extend(defaultOptions, option || {}, true);

    function setLocalUrl(localUrl) {
        opt.url = localUrl || window.location.href;
    }

    function setTitle(title) {
        opt.title = title || document.title;
    }

    function setDesc(desc) {
        opt.desc = desc || '';
    }

    function show() {
        if (opt.box.length > 0) {
            opt.box.setStyle({
                'display': 'block'
            })
        }
    }

    function hide() {
        if (opt.box.length > 0) {
            opt.box.setStyle({
                'display': 'none'
            })
        }
    }

    function buildUrl(url, params) {
        //组装Url
        var httpUri = [];
        for (var k in params) {
            httpUri.push(k + "=" + encodeURI(params[k]));
        }
        return url + "?" + httpUri.join("&");
    }

    function copyBtn(e) {
        return false;
    }

    function sina(title, localUrl, picUrl) {
        var url = "http://service.weibo.com/share/share.php";
        var data = {
            title: opt.title,
            url: opt.url || localUrl,
            source: 'bookmark',
            appkey: "appkey",
            pic: opt.pic || picUrl,
            ralateUid: '来自安居客的分享按钮'
        };
        window.open(buildUrl(url, data));
    }

    function renren(title, localUrl, picUrl) {
        var url = 'http://widget.renren.com/dialog/share';
        var data = {
            resourceUrl: opt.url || localUrl,
            srcUrl: opt.url || localUrl,
            title: opt.title || title,
            pic: opt.pic || picUrl,
            description: opt.desc
        };
        window.open(buildUrl(url, data));
    }

    function qzone(title, localUrl, picUrl) {
        var url = "http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey";
        var data = {
            url: opt.url || localUrl,
            title: opt.title || title,
            pics: opt.pic || picUrl,
            summary: opt.desc
        };
        window.open(buildUrl(url, data));
    }

    function tqq(title, localUrl, picUrl) {
        var url = "http://share.v.t.qq.com/index.php";
        var data = {
            c: "share",
            a: "index",
            title: opt.title,
            url: opt.url || localUrl,
            appkey: "appkey",
            site: 'www.anjuke.com',
            pic: opt.pic || picUrl
        };
        window.open(buildUrl(url, data));
    }

    return {
        setLocalUrl: setLocalUrl, //设置URL
        setTitle: setTitle, //设置标题
        setDesc: setDesc, //设置标题
        show: show, //弹出显示
        hide: hide, //弹出隐藏
        buildUrl: buildUrl, //拼接URL
        copyBtn: copyBtn, //复制按钮
        sina: sina, //新浪分享
        renren: renren, //人人分享
        qzone: qzone, //qq空间分享
        tqq: tqq //腾讯QQ分享
    }
}


})