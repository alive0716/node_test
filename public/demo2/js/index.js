// JavaScript Document
$(function() {
    if (typeof Array.prototype.every != "function") {
        Array.prototype.every = function(fn, context) {
            var passed = true;
            if (typeof fn === "function") {
                for (var k = 0, length = this.length; k < length; k++) {
                    if (passed === false) break;
                    passed = !!fn.call(context, this[k], k, this);
                }
            }
            return passed;
        };
    }
    $('.vote-btn').each(function(i, v) {
        $(v).click(function(e) {
            if ($(this).attr('flag') !== 'false') {
                var mheight = $(window).height() + $(document).scrollTop();
                star($('#star-pp'));
                star($('#star-my'));
                star($('#star-cx'));
                star($('#star-yx'));
                star($('#star-fw'));
                $(this).attr('flag', 'true')
                $("#popupbox").show();
                $("#popmask").css("height", mheight); //遮罩层高度为屏幕高度
                $("html").css("overflow", "hidden"); //去除滚动条  
                $('#popmask').show();
                //document.body.style.overflow='hidden';
                stopDefault(e);
            }
        })
    });
    $('#popsubmit').click(function() {
        if (notnull()) {
            $.ajax({
                type: "POST",
                url: "/v3/vote",
                data: "",
                dataType: 'json',
                success: function(msg) {
                    
                }
            });
            var currentBtn = '';
            $('.vote-btn').each(function(i, v) {
                if ($(v).attr('flag') == 'true') {
                    currentBtn = $(v);
                }
            })
            $("html").css("overflow", "auto");
            currentBtn && currentBtn.addClass('voted').html('已投票').attr('flag', 'false');
            clearData();
        } else {
            $('#poptip').show();
        }
    })
    $('#popClose').click(function() {

        clearData()
    })

    function notnull() {
        var arr = [];
        $('.star-ul').each(function(i, v) {
            arr.push($(v).attr('selLength'))
        })
        return arr.every(function(n) {
            return n >= 0
        })
    }

    function clearData() {
        $("#popupbox").hide();
        $('#scoreBox').find('li').each(function(i, v) {
            $(v).removeClass('sel')
        });
        $('#scoreBox').find('.star-ul').each(function(i, v) {
            $(v).attr('selLength', '-1')
        })
        $("html").css("overflow", "auto");
        $('#popmask').hide();

    }

    function stopDefault(e) {
        if (e && e.preventDefault)
            e.preventDefault();
        else
            window.event.returnValue = false;
        return false;
    };

    function star(starid) {
        var stars = starid.find('li');
        var targetIndex = -1;

        stars.on('click', function() {
            targetIndex = $(this).index();
            $(this).parent().attr('selLength', targetIndex);
        })

        stars.on('mouseover', function() {
            light($(this).index())
        })

        stars.on('mouseout', function() {
            light(targetIndex);
        })

        function light(index) {
            stars.each(function(i, star) {
                i <= index ? $(star).addClass('sel') : $(star).removeClass('sel');
            })
        }
    }
});