

$(document).ready(function() {
  var boxes = ["1x1", "1x2", "1x3", "2x1", "2x2", "2x3", "3x1", "3x2", "3x3"];
  for (var i=0; i<boxes.length; i++) {
    $("#" + boxes[i]).click(function(){
      alert(this.id);
    });
  }
});
