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
      goToTheRight = true;
      goForward = x;
      if (goForward == true){
        setTimeout(function(){ 
          goForward = false;  // kill the upward motion first
          setTimeout(function(){ 
            // next stop moving to the right
            goToTheRight = false; 
            callback(); },  100);
        },300);
      }
      else {
        setTimeout(function(){ goToTheRight = false; callback(); },900);
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
      goToTheLeft = true;
      goForward = x;
      if (goForward == true){
        setTimeout(function(){ 
          goForward = false; 
          setTimeout(function(){ 
            goToTheLeft = false; 
            callback(); },  100);
        },300);
      }
      else {
        setTimeout(function(){ goToTheLeft = false; callback(); },900);
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

