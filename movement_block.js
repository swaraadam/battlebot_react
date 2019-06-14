/* Generate blocks with https://blockly-demo.appspot.com/static/demos/blockfactory/index.html */

Blockly.Blocks['move_right'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("turn right");
    this.appendValueInput("shouldMove")
        .setCheck("Boolean")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("move?");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(330);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['move_left'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("turn left");
      this.appendValueInput("shouldMove")
          .setCheck("Boolean")
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendField("move?");
      this.setInputsInline(false);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(330);
   this.setTooltip("");
   this.setHelpUrl("");
    }
  };


Blockly.Blocks['forward'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("forward");
      this.setOutput(true, "Boolean");
      this.setColour(330);
   this.setTooltip("");
   this.setHelpUrl("");
    }
  };

  Blockly.Blocks['display_text'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("display text ");
      this.appendValueInput("NAME")
          .setCheck(null);
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(230);
   this.setTooltip("");
   this.setHelpUrl("");
    }
  };

  Blockly.Blocks['turn_right'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("turn right then")
          .appendField(new Blockly.FieldDropdown([["Stop","Stop"], ["Forward","Forward"], ["Backward","Backward"]]), "Movement");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(230);
   this.setTooltip("");
   this.setHelpUrl("");
    }
  };