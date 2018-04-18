(function () {
    var Game = window.Game  =function(){
            this.block = new Block();
            this.map = new Map();
            this.f = 0;
            this.score = 0;
            this.init();
            this.start();
            this.bindEvent();
    };
    Game.prototype.init = function(){
        this.$dom = $("<table></table>");
        var tr = null, td = null;
        for (var i = 0; i < 20 ; i++) {
            tr = $("<tr></tr>")
            for (var j = 0; j < 12; j++) {
                td = $("<td></td>")
                tr.append(td);
            };
            this.$dom.append(tr);
        };

        $("body").append(this.$dom);
    };
    Game.prototype.setClass = function(row,col,classname){
        $("tr").eq(row).children('td').eq(col).attr("class",classname);
    };
    Game.prototype.clearClass = function (row,col,classname) {
        for (var i = 0; i < 20 ; i++) {
            for (var j = 0; j < 12; j++) {
                this.setClass(i,j,"");
            };
        };
    }
    Game.prototype.bindEvent = function  () {
        var self = this;
        $(document).keydown(function () {
           if(event.keyCode == 37){
                self.block.left();
           }else if(event.keyCode == 38){
                self.block.rotate();
           }else if(event.keyCode == 39){
                self.block.right();

           }else if(event.keyCode == 40){
                self.block.godown();
           }
        })
    }
    Game.prototype.start = function () {
            var self = this;
            this.timer = setInterval(function () {
                self.f++;
                self.clearClass();
                self.f % 30 == 0 && self.block.down();
                self.block.render();
                self.map.render();

                $("h1").text(self.score);
            },10)
    }
})();