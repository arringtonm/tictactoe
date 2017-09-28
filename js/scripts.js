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
  } else if (this.boxes[box].boxValue === undefined){
    return false;
  }
}

Game.prototype.playerSwitch = function() {
  if (this.playerTurn === 0){
    this.playerTurn++
    return this.players[0].player;
  } else if (this.playerTurn === 1) {
    this.playerTurn--
    return this.players[1].player
  }
}

Game.prototype.turn = function(boxId, valid) {
  if (valid === true) {
    var player = this.playerSwitch();
    this.boxes.splice(boxId, 1, player);
    if (player === "X") {
      this.territoryX.push(boxId);
    } else {
      this.territoryO.push(boxId);
    }
    return this.boxes[boxId];
  } else if (valid === false) {

  }
}

Game.prototype.computerTurn = function() {
  for (var i = 0; i < 9; i++) {
    var boxId = Math.floor(Math.random() * 8)
    if (this.valid(boxId) === true) {
      this.playerSwitch();
      this.boxes.splice(boxId, 1, "O")
      this.territoryO.push(boxId);
      var computer = [this.boxes[boxId], boxId]
      return computer;
    } else if (this.valid(boxId) === false){

    }
  }
}

Game.prototype.endOfGame = function() {
  var claimedX = this.territoryX.join("");
  var claimedO = this.territoryO.join("");
  if (claimedX.match(/([012](?=.*[012].*[012])|[345](?=.*[345].*[345])|[678](?=.*[678].*[678])|[036](?=.*[036].*[036])|[147](?=.*[147].*[147])|[258](?=.*[258].*[258])|[048](?=.*[048].*[048])|[246](?=.*[246].*[246]))/)){
    return "X";
  } else if (claimedO.match(/([012](?=.*[012].*[012])|[345](?=.*[345].*[345])|[678](?=.*[678].*[678])|[036](?=.*[036].*[036])|[147](?=.*[147].*[147])|[258](?=.*[258].*[258])|[048](?=.*[048].*[048])|[246](?=.*[246].*[246]))/)){
    return "O";
  } else if (this.territoryX.length === 5 && this.territoryO.length === 4) {
    return "Draw"
  }
}

$(document).ready(function() {
  var game = new Game();
  var endOfGame = false;
  game.makeBoard();
  $("#pvp").click(function(){
    $("#buttons").hide();
    $("#board").show();
    var boxes = ["0", "1", "2", "3", "4", "5", "6", "7", "8"];
    for (var i=0; i<boxes.length; i++) {
      $("#" + boxes[i]).click(function(){
        if (endOfGame === false) {
          var boxId = parseInt(this.id);
          var turn = game.turn(boxId, game.valid(boxId));
          $("#" + this.id).text(turn);
          var winCheck = game.endOfGame();
          if (winCheck === "X") {
            alert("X wins!");
            endOfGame = true;
          } else if (winCheck === "O") {
            alert("O wins!");
            endOfGame = true;
          } else if (winCheck === "Draw") {
            alert("It's a draw!")
            endOfGame = true;
          }
        }
      });
    }
  });
  $("#computer").click(function(){
    $("#buttons").hide();
    $("#board").show();
    var boxes = ["0", "1", "2", "3", "4", "5", "6", "7", "8"];
    for (var i=0; i<boxes.length; i++) {
      $("#" + boxes[i]).click(function(){
        if (endOfGame === false) {
          var boxId = parseInt(this.id);
          var turn = game.turn(boxId, game.valid(boxId));
          $("#" + this.id).text(turn);
          var winCheck = game.endOfGame();
          if (winCheck === "X") {
            alert("X wins!");
            endOfGame = true;
          } else if (winCheck === "Draw") {
            alert("It's a draw!")
            endOfGame = true;
          }
        }
        if (endOfGame === false && game.territoryX.length > game.territoryO.length) {
          var computer = game.computerTurn()
          $("#" + computer[1]).text(computer[0]);
          var winCheck = game.endOfGame();
          if (winCheck === "O") {
            alert("O wins!");
            endOfGame = true;
          } else if (winCheck === "Draw") {
            alert("It's a draw!")
            endOfGame = true;
          }
        }
      });
    }
  });
});
