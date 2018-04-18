(function(){
    var Map = window.Map = function(){
        this.code = (function () {
           var arr = [];
           for (var i = 0; i < 20; i++) {
                arr.push([]);
               for (var j = 0; j < 12; j++) {
                   arr[i].push(0);
               };
           };
           // 来一个一柱擎天，方便调试
           // fill是ES6中的语法
           arr.push(Array(12).fill(1));
           return arr;
        })();

        console.log(this.code);
    };
    Map.prototype.render = function () {
        for (var i = 0; i < 20; i++) {
            for (var j = 0; j < 12; j++) {
                if(this.code[i][j] != 0){
                    game.setClass(i,j,this.code[i][j]);
                }
            };
        };
    }
})()