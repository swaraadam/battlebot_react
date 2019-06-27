/* Generate blocks with https://blockly-demo.appspot.com/static/demos/blockfactory/index.html */

  Blockly.Blocks['rotate_tank_p2'] = {
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

  

  Blockly.Blocks['rotate_tank_to_right_p2'] = {
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

  Blockly.Blocks['rotate_tank_to_left_p2'] = {
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

  Blockly.Blocks['rotate_turret_p2'] = {
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

  Blockly.Blocks['rotate_turret_to_right_p2'] = {
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

  Blockly.Blocks['rotate_turret_to_left_p2'] = {
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

  Blockly.Blocks['move_forward_p2'] = {
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

  Blockly.Blocks['move_backward_p2'] = {
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

  Blockly.Blocks['move_opposide_p2'] = {
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

  Blockly.Blocks['shoot_p2'] = {
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

  Blockly.Blocks['yell_p2'] = {
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

  Blockly.Blocks['tank_value_of_y_p2'] = {
	  init: function() {
	    this.appendDummyInput()
	        .appendField("value of y");
	    this.setOutput(true, "Number");
	    this.setColour(165);
	    this.setTooltip('');
	    this.setHelpUrl('http://www.example.com/');
		//oncgange Javascript generation
	  }
  };

  Blockly.Blocks['tank_value_of_x_p2'] = {
	  init: function() {
	    this.appendDummyInput()
	        .appendField("value of x");
	    this.setOutput(true, "Number");
	    this.setColour(165);
	    this.setTooltip('');
	    this.setHelpUrl('http://www.example.com/');
		//oncgange Javascript generation
	  }
  };

  Blockly.Blocks['tank_value_of_health_p2'] = {
	  init: function() {
	    this.appendDummyInput()
	        .appendField("value of health");
	    this.setOutput(true, "Number");
	    this.setColour(165);
	    this.setTooltip('');
	    this.setHelpUrl('http://www.example.com/');
		//oncgange Javascript generation
	  }
  };

  Blockly.Blocks['tank_value_of_angle_p2'] = {
	  init: function() {
	    this.appendDummyInput()
	        .appendField("value of tank angle");
	    this.setOutput(true, "Number");
	    this.setColour(165);
	    this.setTooltip('');
	    this.setHelpUrl('http://www.example.com/');
		//oncgange Javascript generation
	  }
  };

  Blockly.Blocks['turret_value_of_angle_p2'] = {
	  init: function() {
	    this.appendDummyInput()
	        .appendField("value of turret angle");
	    this.setOutput(true, "Number");
	    this.setColour(165);
	    this.setTooltip('');
	    this.setHelpUrl('http://www.example.com/');
		//oncgange Javascript generation
	  }
  };

  Blockly.Blocks['enemy_value_of_y_p2'] = {
	  init: function() {
	    this.appendDummyInput()
	        .appendField("value of y");
	    this.setOutput(true, "Number");
	    this.setColour(165);
	    this.setTooltip('');
	    this.setHelpUrl('http://www.example.com/');
		//oncgange Javascript generation
	  }
  };

  Blockly.Blocks['enemy_value_of_x_p2'] = {
	  init: function() {
	    this.appendDummyInput()
	        .appendField("value of x");
	    this.setOutput(true, "Number");
	    this.setColour(165);
	    this.setTooltip('');
	    this.setHelpUrl('http://www.example.com/');
		//oncgange Javascript generation
	  }
  };

  Blockly.Blocks['enemy_value_of_health_p2'] = {
	  init: function() {
	    this.appendDummyInput()
	        .appendField("enemy health");
	    this.setOutput(true, "Number");
	    this.setColour(0);
	    this.setTooltip('');
	    this.setHelpUrl('http://www.example.com/');
		//oncgange Javascript generation
	  }
  };

  Blockly.Blocks['is_enemy_live_p2'] = {
	  init: function() {
	    this.appendDummyInput()
	        .appendField("is enemy live");
	    this.setOutput(true, "Boolean");
	    this.setColour(0);
	    this.setTooltip('');
	    this.setHelpUrl('http://www.example.com/');
		//oncgange Javascript generation
	  }
  };

  Blockly.Blocks['is_colliding_with_enemy'] = {
	  init: function() {
	    this.appendDummyInput()
	        .appendField("is colliding with enemy");
	    this.setOutput(true, "Boolean");
	    this.setColour(0);
	    this.setTooltip('');
	    this.setHelpUrl('http://www.example.com/');
		//oncgange Javascript generation
	  }
  };

  Blockly.Blocks['is_colliding_with_wall'] = {
	  init: function() {
	    this.appendDummyInput()
	        .appendField("is colliding with wall");
	    this.setOutput(true, "Boolean");
	    this.setColour(0);
	    this.setTooltip('');
	    this.setHelpUrl('http://www.example.com/');
		//oncgange Javascript generation
	  }
  };

  Blockly.Blocks['is_hit_by_enemy'] = {
	  init: function() {
	    this.appendDummyInput()
	        .appendField("is hit by enemy");
	    this.setOutput(true, "Boolean");
	    this.setColour(0);
	    this.setTooltip('');
	    this.setHelpUrl('http://www.example.com/');
		//oncgange Javascript generation
	  }
  };