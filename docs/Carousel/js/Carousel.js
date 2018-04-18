(function(){
    // 强行暴露一个变量，就是构造函数的名字。
    window.Carousel = Carousel;
    window.a=111;
    function Carousel(JSON){
        this.$dom = $("#"+JSON.id);
        this.imagesUl = null;
        this.$imagesULlis = null;
        this.width = JSON.width;
        this.height = JSON.height;
        // 信号量
        this.idx = 0;
        // 图片的地址；
        this.imageURLArr = JSON.images;
        // 图片的数量
        this.pictureLength = JSON.images.length;
        this.animateDuration = JSON.animateDuration;
        // 初始化
        this.init();
        // 绑定监听
        this.bindEvent();
    };
    Carousel.prototype.init = function(){
        // 创建ul节点
        this.imagesUl = $("<ul></ul>");
        this.$dom.append( this.imagesUl);
        // 创建li标签
        for (var i = 0; i < this.pictureLength; i++) {

            $("<li><img src='"+this.imageURLArr[i]+"' /></li>").appendTo(this.imagesUl)
        };
        // 重新的获取所有的li的引用
        this.$imagesULlis = this.imagesUl.find("li");
        // 布局
        this.$dom.css({
            "width":this.width,
            "height":this.height,
            "position":"relative",
            "overflow":"hidden"
        });
        this.$imagesULlis.css({
            "position":"absolute",
            "left":this.width,
            "top":0
        });
        this.$imagesULlis.eq(0).css("left",0);
        // 创建按钮
        this.$leftBtn = $("<a href='javascript:void(0);' class='leftBtn'></a>");
        this.$rightBtn = $("<a href='javascript:void(0);' class='rightBtn'></a>");
        this.$leftBtn.appendTo(this.$dom);
        this.$rightBtn.appendTo(this.$dom);
         //小圆点
        this.$circleOl = $("<ol class='circle'></ol>");
        this.$circleOl.appendTo(this.$dom);
        for (var i = 0; i < this.pictureLength; i++) {
            $("<li></li>").appendTo(this.$circleOl)
        };
        // 重新的获取所有小圆点的li的引用
        this.$circleLis = this.$circleOl.find("li");
        // 加cur
        this.$circleLis.eq(0).addClass('cur');
        this.$circleOl.css({
            "left":"50%",
            "transform":"translateX(-50%)"
        });
    };
    Carousel.prototype.bindEvent = function(){
        var self = this;
        this.$rightBtn.click(function() {

            self.$imagesULlis.eq(self.idx).animate({
                "left":-self.width
            },self.animateDuration);
            self.idx++;
            if( self.idx > self.pictureLength - 1){
                self.idx = 0;
            };
            self.$imagesULlis.eq(self.idx).css("left",self.width).animate({
                "left":0
            },self.animateDuration);
            self.$circleLis.eq(self.idx).addClass('cur').siblings().removeClass("cur");
        });

        this.$leftBtn.click(function() {

            self.$imagesULlis.eq(self.idx).animate({
                "left":self.width
            },self.animateDuration);
            self.idx--;
            if( self.idx < 0){
                self.idx =  self.pictureLength - 1;
            };
            self.$imagesULlis.eq(self.idx).css("left",-self.width).animate({
                "left":0
            },self.animateDuration);
            self.$circleLis.eq(self.idx).addClass('cur').siblings().removeClass("cur");
        });
        this.$circleLis.click(function(){
            self.show($(this).index())
        });
    };
     Carousel.prototype.show = function(number){
        var old = this.idx;
        this.idx = number;
        if(this.idx > old){
            this.$imagesULlis.eq(old).animate({
                "left":-this.width
            },this.animateDuration);
            this.$imagesULlis.eq(this.idx).css({
                "left":this.width
            }).animate({
                "left":0
            },this.animateDuration);
        }else if(this.idx < old ){
            this.$imagesULlis.eq(old).animate({
                "left":this.width
            },this.animateDuration);
            this.$imagesULlis.eq(this.idx).css({
                "left":-this.width
            }).animate({
                "left":0
            },this.animateDuration);
        }

        this.$circleLis.eq(this.idx).addClass('cur').siblings().removeClass("cur");
     }
})()