/* Generate blocks with https://blockly-demo.appspot.com/static/demos/blockfactory/index.html */

  Blockly.Blocks['rotate_tank_p1'] = {
    init: function() {
      this.appendValueInput("degrees")
          .setCheck("Number")
          .appendField("rotate tank");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(60);
   this.setTooltip("");
   this.setHelpUrl("");
    }
  };

  

  Blockly.Blocks['rotate_tank_to_right_p1'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("rotate tank to the right");
      this.appendDummyInput()
          .appendField("have to move after rotate ?")
          .appendField(new Blockly.FieldDropdown([["no","NO"], ["forward","FORWARD"], ["backward","BACKWARD"]]), "should_move");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(60);
   this.setTooltip("");
   this.setHelpUrl("");
    }
  };

  Blockly.Blocks['rotate_tank_to_left_p1'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("rotate tank to the left");
      this.appendDummyInput()
          .appendField("have to move after rotate ?")
          .appendField(new Blockly.FieldDropdown([["no","NO"], ["forward","FORWARD"], ["backward","BACKWARD"]]), "should_move");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(60);
   this.setTooltip("");
   this.setHelpUrl("");
    }
  };

  Blockly.Blocks['rotate_turret_p1'] = {
    init: function() {
      this.appendValueInput("degrees")
          .setCheck("Number")
          .appendField("rotate turret");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(60);
   this.setTooltip("");
   this.setHelpUrl("");
    }
  };

  Blockly.Blocks['rotate_turret_to_right_p1'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("rotate turret to the right");
      this.appendDummyInput()
          .appendField("have to shoot after rotate ?")
          .appendField(new Blockly.FieldDropdown([["no","NO"], ["yes","YES"]]), "should_shoot");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(60);
   this.setTooltip("");
   this.setHelpUrl("");
    }
  };

  Blockly.Blocks['rotate_turret_to_left_p1'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("rotate turret to the left");
      this.appendDummyInput()
          .appendField("have to shoot after rotate ?")
          .appendField(new Blockly.FieldDropdown([["no","NO"], ["yes","YES"]]), "should_shoot");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(60);
   this.setTooltip("");
   this.setHelpUrl("");
    }
  };

  Blockly.Blocks['move_forward_p1'] = {
    init: function() {
      this.appendValueInput("distance")
          .setCheck("Number")
          .appendField("move forward");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(60);
   this.setTooltip("");
   this.setHelpUrl("");
    }
  };

  Blockly.Blocks['move_backward_p1'] = {
    init: function() {
      this.appendValueInput("distance")
          .setCheck("Number")
          .appendField("move backward");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(60);
   this.setTooltip("");
   this.setHelpUrl("");
    }
  };

  Blockly.Blocks['move_opposide_p1'] = {
    init: function() {
      this.appendValueInput("distance")
          .setCheck("Number")
          .appendField("move opposide");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(60);
   this.setTooltip("");
   this.setHelpUrl("");
    }
  };

  Blockly.Blocks['shoot_p1'] = {
    init: function() {
      this.appendValueInput("ammo")
          .setCheck("Number")
          .appendField("shoot");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(60);
   this.setTooltip("");
   this.setHelpUrl("");
    }
  };

  Blockly.Blocks['yell_p1'] = {
    init: function() {
      this.appendValueInput("message")
          .setCheck("String")
          .appendField("yell")
          .appendField(new Blockly.FieldColour("#ff0000"), "yell_color");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(60);
   this.setTooltip("");
   this.setHelpUrl("");
    }
  };
