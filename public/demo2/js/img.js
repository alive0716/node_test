// JavaScript Document

(function() {
    $(".company-img img").each(function(i,v){
        v.onload=function(){
            ResizeImage(this,600);
        }
    })

    function ResizeImage(obj, MaxW, MaxH) {

        if (obj != null) imageObject = obj;

        var state = imageObject.readyState;

        if (state != 'complete') {

            setTimeout("ResizeImage(null," + MaxW + "," + MaxH + ")", 50);

            return;

        }

        var oldImage = new Image();

        oldImage.src = imageObject.src;

        var dW = oldImage.width;

        var dH = oldImage.height;

        if (dW > MaxW)

        {
            size=MaxW/dW;
			dW=dW*size;
			dH=dH*size;
        }

        if (dW > 0 && dH > 0)

        {
            imageObject.width = dW;
            imageObject.height = dH;
        }

    }

})()