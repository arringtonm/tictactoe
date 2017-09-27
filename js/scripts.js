function Game(){
  this.player1 = new Player(1),
  this.player2 = new Player(2),
  this.boxes = [];
}

function Player(player){
  this.player = player;
}

function Box() {
  this.empty = "";
};

Game.prototype.makeBoard = function(){
  for (var i = 0; i<9; i++) {
    var box = new Box();
    this.boxes.push(box);
  }
}
Game.prototype.valid = function(box) {
  if (this.boxes[box].empty === "") {
    return true;
  }
  return false;
}

Game.prototype.turn = function(boxId, valid, player) {
  console.log(valid, boxId);
  if (valid) {
    this.boxes.splice(boxId, 1, "X");
    console.log(this.boxes);
  }
}

$(document).ready(function() {
  var game = new Game();
  game.makeBoard();
  var boxes = ["0", "1", "2", "3", "4", "5", "6", "7", "8"];
  //var boxes = ["0", "1x2", "1x3", "2x1", "2x2", "2x3", "3x1", "3x2", "3x3"];
  for (var i=0; i<boxes.length; i++) {
    $("#" + boxes[i]).click(function(){
      var boxId = parseInt(this.id);
    //  console.log(game, boxId);
      var turn = game.turn(boxId, game.valid(boxId))
      $("#" + this.id).text(turn)
    });
  }
});
