(function () {
    //食物类
    var Food = window.Food = function(){
        while(true){
            // 随机的产生位置，但是不能再蛇身上
            this.row = parseInt(Math.random() * 15) // [0,14];
            this.col = parseInt(Math.random() * 15) // [0,14];

            for (var i = 0; i < game.snake.body.length; i++) {

                if(
                     game.snake.body[i].row == this.row
                     &&
                     game.snake.body[i].col == this.col
                    ){
                    // 结束for循环
                    break;
                }
            };
            // 当i 等于蛇的长度的时候说明没有一组值和蛇的值一样，符合条件。
            if( i == game.snake.body.length){
                // 结束while循环
                break;
            };
        };
        // 显示自己
        game.changeHTML(this.row,this.col,"❤");
    };
    Food.prototype.check = function(){
        if(
            this.row == game.snake.body[0].row
            &&
            this.col == game.snake.body[0].col
            ){

            // 我被吃了
            return true;
        }
        return false;
    }
})()