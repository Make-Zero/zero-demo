(function(){
    // 蛇的构造函数
    var Snake = window.Snake = function () {
        // 自己的身体
        this.body = [
            {"row":3,"col":10},
            {"row":3,"col":9}
        ];
        // 蛇的方向4
        this.direction = "R";
        this.olddirection = "R";
    };
    // 修改方向
     Snake.prototype.changeDirection = function(str){
        this.direction = str;
     }
    // 渲染
    Snake.prototype.render = function (aaa) {
        game.changeColor(this.body[0].row,this.body[0].col,"darkblue");
       for (var i = 1; i < this.body.length; i++) {
           game.changeColor(this.body[i].row,this.body[i].col,"red");
       };
    };
    // 蛇的更新的方法
    Snake.prototype.update = function () {
        // 蛇的方向的检测
        if(
            this.olddirection == "U" && this.direction == "D"
            ||
            this.olddirection == "D" && this.direction == "U"
            ||
            this.olddirection == "L" && this.direction == "R"
            ||
            this.olddirection == "R" && this.direction == "L"
            ){

            // 把不合理的方向换回来
            this.direction = this.olddirection;
        };
        // 方向合法
        this.olddirection = this.direction;
        switch (this.direction){
            case "L":
                var head = {"row":this.body[0].row,"col":this.body[0].col-1}
            break;
            case "R":
                var head = {"row":this.body[0].row,"col":this.body[0].col+1}
            break;
            case "D":
                var head = {"row":this.body[0].row+1,"col":this.body[0].col}
            break;
            case "U":
                var head = {"row":this.body[0].row-1,"col":this.body[0].col}
            break;
        }
        // 插入头部
        this.body.unshift(head);
        if( game.food.check() ){
            // 产生新的食物
            game.createFood();
            game.score++;
        }else{
            // 去掉尾部
            this.body.pop();
        }
    }

    // 检测自己是否死亡
    Snake.prototype.checkDie = function(){
        // 检测自己是否出界
        if(
                this.body[0].row < 0 || this.body[0].row > 14 || this.body[0].col < 0 ||  this.body[0].col > 14
            ){
                // 出界了
                return false;
        };
        // 检测是否撞到自己
        for( var i = 1; i < this.body.length ; i++ ){

            if(
                this.body[0].row == this.body[i].row
                &&
                this.body[0].col == this.body[i].col
                ){
                // 撞到自己了
                return false;
            }
        };

        return true;
    }
})()