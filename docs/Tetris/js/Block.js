(function(){

    var Block = window.Block = function () {
            // 选择一个随机的形状
            // ~~的意思和parseInt()一样.
            this.allType = ["I","L","T","Z","S","O","J"][~~(Math.random()*7)];
            // 该形状所有方向的个数
            this.allDirectionNumber = block_json[this.allType].length;
            // 随机出一个方向
            this.direction = ~~(Math.random() * this.allDirectionNumber);
            // 得到自己的code
            this.code = block_json[this.allType][this.direction]

            this.row = 0;
            // 保证4*4的矩阵小格格从中间出来
            this.col = 4;
    };
    Block.prototype.render = function () {
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
                // game.setClass(this.row+i,this.col+j,"lightseagreen")
                if( this.code[i][j] == 1){
                    game.setClass(this.row+i,this.col+j,this.allType)
                }
            };
        };
    };
    Block.prototype.down = function () {
        // 判断第一行的数组的code是不是有不等于0的那一项，若有的话，干掉定时器，游戏结束
        game.map.code[0].forEach(function (item) {
            if(item != 0 ){
                clearInterval(game.timer);
                alert("游戏结束！")
                return;
            }
        });
        if(this.check(this.row+1,this.col)){
             this.row++
         }else{
            this.addDie();
            game.block = new Block();
            this.remove();
         };

    };
    Block.prototype.left = function () {
        if(this.check(this.row,this.col-1)) {
            document.getElementById("rotate").load();
            document.getElementById("move").play();
            this.col--
        };

    };
    Block.prototype.right = function () {
        if(this.check(this.row,this.col+1)){
            document.getElementById("rotate").load();
            document.getElementById("move").play();
            this.col++;
        }


    };
    Block.prototype.rotate = function () {
        // 备份旧的方向
        var oldDirection = this.direction;
       if( this.direction == this.allDirectionNumber - 1){
             this.direction = 0;
       }else{
         this.direction++;
       };
       // 若果重新改变了方向记得把砖块的code再赋值一次
       this.code = block_json[this.allType][this.direction];
       //若不可以旋转的话，就给我撤回来
       if(!this.check(this.row,this.col)){
            this.direction = oldDirection;
            // 改变了方向，把砖块的code重新赋值
             this.code = block_json[this.allType][this.direction];
       }else{
            document.getElementById("rotate").load();
            document.getElementById("rotate").play();

       }
    };
     Block.prototype.godown = function () {
        while(this.check(this.row+1,this.col)){
            this.row++;
        }
        document.getElementById("doDown").play();
     }
    Block.prototype.check = function (row,col) {
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
                if( this.code[i][j] !== 0 && game.map.code[row+i][col+j] != 0 ){
                    // 碰撞了
                    return false;
                }
            };
        };
        // 没有碰撞
        return true;
    };
    Block.prototype.addDie = function  () {
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
                if( this.code[i][j] !== 0 ){
                    game.map.code[i+this.row][j+this.col] = this.allType;
                }
            };
        };
    };
    Block.prototype.remove = function () {
        for (var i = 0; i < 20; i++) {
                if( !game.map.code[i].includes(0)){
                    game.map.code.splice(i,1);
                    game.map.code.unshift(new Array(12).fill(0));
                    game.score++;
                    document.getElementById("remove").play();

                }
        };
    };
})()