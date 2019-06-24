/*
Define the move_right function without js interpreter. 
*/

Blockly.JavaScript['rotate_tank_p1'] = function(block) {
  var value_degrees = Blockly.JavaScript.valueToCode(block, 'degrees', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = 'rotate_tank(' + value_degrees + ');\n';
  return code;
};

function initInterpreterRotateTankP1(interpreter, scope) {
  // Ensure function name does not conflict with variable names.
  Blockly.JavaScript.addReservedWords('rotate_tank');
  // x use as timeOut , 1t = 1x
  var wrapper = interpreter.createAsyncFunction(
    function(x, callback) {
      if(x<0){
        p1_rotateTankLeft = true
      }else if(x>0){
        p1_rotateTankRight = true
      }
      setTimeout(function(){ 
        // next stop moving forward
        p1_rotateTankLeft = false
        p1_rotateTankRight = false 
        callback(); },  Math.abs(x)*10);
      setTimeout(callback,  10);
    });
  interpreter.setProperty(scope, 'rotate_tank', wrapper);
}

Blockly.JavaScript['rotate_tank_to_right_p1'] = function(block) {
  var dropdown_should_move = block.getFieldValue('should_move');
  // TODO: Assemble JavaScript into code variable.
  var code = 'rotate_tank_to_right('+dropdown_should_move+');\n';
  return code;
};


Blockly.JavaScript['rotate_tank_to_left_p1'] = function(block) {
  var dropdown_should_move = block.getFieldValue('should_move');
  // TODO: Assemble JavaScript into code variable.
  var code = '...;\n';
  return code;
};

Blockly.JavaScript['rotate_turret_p1'] = function(block) {
  var value_degrees = Blockly.JavaScript.valueToCode(block, 'degrees', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = 'rotate_turret('+value_degrees+');\n';
  return code;
};

function initInterpreterRotateTurretP1(interpreter, scope) {
  // Ensure function name does not conflict with variable names.
  Blockly.JavaScript.addReservedWords('rotate_turret');
  // x use as timeOut , 1t = 1x
  var wrapper = interpreter.createAsyncFunction(
    function(x, callback) {
      if(x<0){
        p1_rotateTurretLeft = true
      }else if(x>0){
        p1_rotateTurretRight = true
      }
      setTimeout(function(){ 
        // next stop moving forward
        p1_rotateTurretLeft = false
        p1_rotateTurretRight = false 
        callback(); },  Math.abs(x)*10);
      setTimeout(callback,  10);
    });
  interpreter.setProperty(scope, 'rotate_turret', wrapper);
}

Blockly.JavaScript['rotate_turret_to_right_p1'] = function(block) {
  var dropdown_should_move = block.getFieldValue('should_shoot');
  // TODO: Assemble JavaScript into code variable.
  var code = '...;\n';
  return code;
};

Blockly.JavaScript['rotate_turret_to_left_p1'] = function(block) {
  var dropdown_should_move = block.getFieldValue('should_shoot');
  // TODO: Assemble JavaScript into code variable.
  var code = '...;\n';
  return code;
};

Blockly.JavaScript['move_forward_p1'] = function(block) {
  var value_name = Blockly.JavaScript.valueToCode(block, 'distance', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = 'move_forward('+ value_name +');\n';
  return code;
};

function initInterpreterMoveForwardP1(interpreter, scope) {
  // Ensure function name does not conflict with variable names.
  Blockly.JavaScript.addReservedWords('move_forward');
  // x use as timeOut , 1t = 1x
  var wrapper = interpreter.createAsyncFunction(
    function(x, callback) {
      p1_forward = true;
      setTimeout(function(){ 
        // next stop moving forward
        p1_forward = false; 
        callback(); },  x*10);
      setTimeout(callback,  10);
    });
  interpreter.setProperty(scope, 'move_forward', wrapper);
}

Blockly.JavaScript['move_backward_p1'] = function(block) {
  var value_name = Blockly.JavaScript.valueToCode(block, 'distance', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = 'move_backward('+ value_name +');\n';
  return code;
};

function initInterpreterMoveBackwardP1(interpreter, scope) {
  // Ensure function name does not conflict with variable names.
  Blockly.JavaScript.addReservedWords('move_backward');
  // x use as timeOut , 1t = 1x
  var wrapper = interpreter.createAsyncFunction(
    function(x, callback) {
      p1_backward = true;
      setTimeout(function(){ 
        // next stop moving backward
        p1_backward = false; 
        callback(); },  x*10);
      setTimeout(callback,  10);
    });
  interpreter.setProperty(scope, 'move_backward', wrapper);
}

Blockly.JavaScript['move_opposide_p1'] = function(block) {
  var value_name = Blockly.JavaScript.valueToCode(block, 'distance', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = '...;\n';
  return code;
};

Blockly.JavaScript['shoot_p1'] = function(block) {
  var value_name = Blockly.JavaScript.valueToCode(block, 'ammo', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = 'shoot('+value_name+');\n';
  return code;
};

function initInterpreterShootP1(interpreter, scope) {
  // Ensure function name does not conflict with variable names.
  Blockly.JavaScript.addReservedWords('shoot');
  // x use as timeOut , 1t = 1x
  var wrapper = interpreter.createAsyncFunction(
    function(x, callback) {
      p1_shoot = true
      setTimeout(function(){ 
        // next stop shhoting
        p1_shoot = false 
        callback(); },  Math.abs(x)*10);
      setTimeout(callback,  10);
    });
  interpreter.setProperty(scope, 'shoot', wrapper);
}

Blockly.JavaScript['yell_p1'] = function(block) {
  var colour_yell_color = block.getFieldValue('yell_color');
  var value_message = Blockly.JavaScript.valueToCode(block, 'message', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = 'yell('+ value_message +');\n';
  return code;
};

function initInterpreterYellP1(interpreter, scope) {
  // Ensure function name does not conflict with variable names.
  Blockly.JavaScript.addReservedWords('yell');

  var wrapper = interpreter.createAsyncFunction(
    function(x, callback) {
      p1_displayText = x;
      setTimeout(function(){ 
        // next stop moving to the left
        p1_displayText = ''; 
        callback(); },  600);
      setTimeout(callback,  10);
    });
  interpreter.setProperty(scope, 'yell', wrapper);
}