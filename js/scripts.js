function Game(){
  this.players = [];
  this.boxes = [];
  this.playerTurn = 0;
}

function Player(player){
  this.player = player;
}

function Box() {
  this.empty = "";
};

Game.prototype.makeBoard = function(){
  for (var i = 0; i<9; i++) {
    this.boxes.push(new Box());
  }
  this.players.push(new Player("X"));
  this.players.push(new Player("O"));
}

Game.prototype.valid = function(box) {
  if (this.boxes[box].empty === "") {
    return true;
  }
  return false;
}

Game.prototype.playerSwitch = function() {
  if (this.playerTurn === 0){
    this.playerTurn++
    return this.players[1].player;
  } else {
    this.playerTurn--
    return this.players[0].player
  }
}

Game.prototype.turn = function(boxId, valid, player) {
  console.log(valid, boxId);
  if (valid) {
    this.boxes.splice(boxId, 1, player);
    console.log(this.boxes);
  }
  //if(endOfGame){
    //return
  //}
}

Game.prototype.endOfGame = function() {

}

$(document).ready(function() {
  var game = new Game();

  game.makeBoard();
  var boxes = ["0", "1", "2", "3", "4", "5", "6", "7", "8"];
  for (var i=0; i<boxes.length; i++) {
    $("#" + boxes[i]).click(function(){
      var boxId = parseInt(this.id);
      var playerSwitch = game.playerSwitch();
      console.log("player turn",game.players[1].player);
      var turn = game.turn(boxId, game.valid(boxId), playerSwitch)
      $("#" + this.id).text(turn)
    });
  }
});
