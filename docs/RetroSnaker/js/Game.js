(function(){
    // 游戏类
    var Game = window.Game = function(){
        // 表格
        this.table = null;
        //初始化
        this.init();
        // 自己的蛇类
        this.snake = new Snake();
        // 自己的食物
        this.food = null;
        // 游戏的分数
        this.score = 0;
        //游戏的开始
        this.start();
        // 键盘的事件
        this.bindEvent();
    }
    Game.prototype.init = function(){
        // 创建一个表格
        this.table = document.createElement("table");
        // 上树
        document.body.appendChild(this.table);
        // 创建小格格
        for (var row = 0; row < 15; row++) {
            var tr = document.createElement("tr");
            for (var col = 0; col < 15; col++) {
                var td = document.createElement("td");
                // td上树
                tr.appendChild(td);
            };
            this.table.appendChild(tr)
        };
    };
    // 让小格格变色的方法
    Game.prototype.changeColor = function (row,col,color) {

        this.table.getElementsByTagName("tr")[row].getElementsByTagName("td")[col].style.background = color;
    };
    // 让小格格变变成食物的方法
    Game.prototype.changeHTML = function (row,col,str) {

        this.table.getElementsByTagName("tr")[row].getElementsByTagName("td")[col].innerHTML = str;
    };
    // 清屏
    Game.prototype.clear = function () {
        for (var row = 0; row < 15; row++) {
            for (var col = 0; col < 15; col++) {
                this.changeColor(row,col,"#fff");
            };
        };
    }
    Game.prototype.bindEvent  = function(){
        var self = this;
        // 页面添加键盘的监听
        document.onkeydown = function(event){
            var event = event || window.event;
            switch( event.keyCode ){
                case 37:
                    self.snake.changeDirection("L");
                break;
                case 38:
                    self.snake.changeDirection("U");
                break;
                case 39:
                    self.snake.changeDirection("R");
                break;
                case 40:
                    self.snake.changeDirection("D");
                break;
            }
        }
    };
    Game.prototype.createFood = function(){
        // 两个业务
        // 去掉已经被吃的食物
        this.changeHTML(this.food.row,this.food.col,"");
        // 产生新的食物
        this.food = new Food();
    }
    Game.prototype.start = function () {
        var self = this;
        this.timer = setInterval(function () {
            if(!self.food){
                self.food = new Food();
            };
            // 清屏 -----> 更新  -------> 渲染   -------> 清屏 -----> 更新  -------> 渲染
            self.clear();
            self.snake.update();
            if(self.snake.checkDie()){
                // 若没有死亡，蛇可以继续渲染
                self.snake.render();
            }else{
                // 蛇死了
                clearInterval(self.timer);
                alert("Game Over!")
            }
            document.querySelector("h1").innerHTML = "当前游戏的分数是"+ self.score;
        },200)
    }
})()