// JavaScript Document
$(function() {
    var topText = '<div class="top"><ul class="top-step clearfix"><li class="step1 "><i>1</i><span>2015年1月15日<br/>活动开幕</span></li><li class="step2 active"><i>2</i><span>1月15日-1月28日<br/>活动进行</span></li><li class="step3"><i>3</i><span>1月28日评选结束<br/>颁出优胜奖</span></li></ul><ul class="top-data clearfix"><li class="step1">2015.01.15</li><li class="step2">2015.01.15－01.28</li><li class="step3">2015.01.28以后</li></ul></div>';
    var navText='<div class="navbg"><div class="nav"><a href="index.html#miao01">活动详情</a><a href="index.html#miao02">入围经纪公司</a><a href="index.html#miao03">入围开发商</a></div></div>'
    var companyText = '<div class="navn"><a href="../index.html">活动详情</a>&nbsp;>&nbsp;入围经纪公司</div>';
    var economicText = '<div class="navn"><a href="../index.html">活动详情</a>&nbsp;>&nbsp;入围开发商</div>'
    if ($('head').attr('data-page') == 'companyPage') {
        $('.con').before(topText+companyText);

    } else if ($('head').attr('data-page') == 'economicPage') {
        $('.con').before(topText+economicText);

    } else {
        $('.con').before(topText+navText);
    }

})