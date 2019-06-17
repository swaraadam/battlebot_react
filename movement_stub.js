/*
Define here
*/
Blockly.JavaScript['move_right'] = function(block) {
  var shouldMove = Blockly.JavaScript.valueToCode(block, 'shouldMove', Blockly.JavaScript.ORDER_ATOMIC);
  x = Boolean(shouldMove);
  var code = 'goRightBlock(' + x + ');\n';
  return code;
};


function initInterpreterGoRight(interpreter, scope) {
  Blockly.JavaScript.addReservedWords('goRightBlock');
  var wrapper = interpreter.createAsyncFunction(
    function(x, callback) {
      p1_rotateTankRight = true;
      p1_forward = x;
      if (p1_forward == true){
        setTimeout(function(){ 
          p1_forward = false;  // kill the upward motion first
          setTimeout(function(){ 
            // next stop moving to the right
            p1_rotateTankRight = false; 
            callback(); },  100);
        },300);
      }
      else {
        setTimeout(function(){ p1_rotateTankRight = false; callback(); },900);
      }

    });
  interpreter.setProperty(scope, 'goRightBlock', wrapper);
}

Blockly.JavaScript['move_left'] = function(block) {
  var shouldMove = Blockly.JavaScript.valueToCode(block, 'shouldMove', Blockly.JavaScript.ORDER_ATOMIC);
  x = Boolean(shouldMove);
  var code = 'goLeftBlock(' + x + ');\n';
  return code;
};


function initInterpreterGoLeft(interpreter, scope) {
  Blockly.JavaScript.addReservedWords('goLeftBlock');
  var wrapper = interpreter.createAsyncFunction(
    function(x, callback) {
      p1_rotateTankLeft = true;
      p1_forward = x;
      if (p1_forward == true){
        setTimeout(function(){ 
          p1_forward = false; 
          setTimeout(function(){ 
            p1_rotateTankLeft = false; 
            callback(); },  100);
        },300);
      }
      else {
        setTimeout(function(){ p1_rotateTankLeft = false; callback(); },900);
      }

    });
  interpreter.setProperty(scope, 'goLeftBlock', wrapper);
}


/* function does not do anything, but blockly complained without it. */
Blockly.JavaScript['forward'] = function(block) {
  var code = true;
  return [code, Blockly.JavaScript.ORDER_NONE];
};


Blockly.JavaScript['display_text'] = function(block) {
  var string = Blockly.JavaScript.valueToCode(block, 'NAME', Blockly.JavaScript.ORDER_ATOMIC);
  string = string ? string.toString() : '';
  x = String(string);
  var code = 'displayText(' + x + ');\n';
  return code;
};

function initInterpreterDisplayText(interpreter, scope) {
  Blockly.JavaScript.addReservedWords('displayText');
  var wrapper = interpreter.createAsyncFunction(
    function(x, callback) {
      displayText.setText(x );
      setTimeout(callback,  10);
    });
  interpreter.setProperty(scope, 'displayText', wrapper);
}



function goRight() {
  player.angle += 1;
}

function goLeft() {
  player.angle -= 1;
}

/* added this function for easy testing */
function myClick(el) {
}

