function Game(){
  this.players = [];
  this.boxes = [];
  this.playerTurn = 0;
  this.territoryX = [];
  this.territoryO = [];
}

function Player(player){
  this.player = player;
}

function Box() {
  this.boxValue = "";
};

Game.prototype.makeBoard = function(){
  for (var i = 0; i<9; i++) {
    this.boxes.push(new Box());
  }
  this.players.push(new Player("X"));
  this.players.push(new Player("O"));
}

Game.prototype.valid = function(box) {
  if (this.boxes[box].boxValue === "") {
    return true;
  }
  return false;
}

Game.prototype.playerSwitch = function() {
  if (this.playerTurn === 0){
    this.playerTurn++
    return this.players[0].player;
  } else {
    this.playerTurn--
    return this.players[1].player
  }
}

Game.prototype.turn = function(boxId, valid, player) {
  if (valid) {
    this.boxes.splice(boxId, 1, player);
    if (player === "X") {
      this.territoryX.push(boxId);
    } else {
      this.territoryO.push(boxId);
    }
    return this.boxes[boxId];
  }
}

Game.prototype.endOfGame = function() {
  var claimedX = this.territoryX.join("");
  var claimedO = this.territoryO.join("");
  if (/([012]{3}|[345]{3}|[678]{3}|[036]{3}|[147]{3}|[258]{3}|[048]{3}|[246]{3})/.test(claimedX)){
    return "X";
  } else if (/([012]{3}|[345]{3}|[678]{3}|[036]{3}|[147]{3}|[258]{3}|[048]{3}|[246]{3})/.test(claimedO)){
    return "O";
  }
}

$(document).ready(function() {
  var game = new Game();

  game.makeBoard();
  var boxes = ["0", "1", "2", "3", "4", "5", "6", "7", "8"];
  for (var i=0; i<boxes.length; i++) {
    $("#" + boxes[i]).click(function(){
      var boxId = parseInt(this.id);
      var playerSwitch = game.playerSwitch();
      var turn = game.turn(boxId, game.valid(boxId), playerSwitch)
      if (turn === "winner"){
        alert("Winner!");
      } else {
        $("#" + this.id).text(turn);
      }
      var winCheck = game.endOfGame();
      if (winCheck === "X") {
        alert("x tho yo!");
      } else if (winCheck === "O") {
        alert("o tho yo!");
      }
    });
  }
});
