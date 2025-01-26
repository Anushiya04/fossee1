import Blockly from 'blockly/core';

// LED Control Block
Blockly.Blocks['led_control'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("LED")
      .appendField(new Blockly.FieldDropdown([["on", "ON"], ["off", "OFF"]]), "STATE");
    this.setColour(230);
    this.setTooltip("Control the LED state.");
    this.setHelpUrl("");
  }
};

Blockly.Python['led_control'] = function (block) {
  const dropdown_state = block.getFieldValue('STATE');
  const code = `led.${dropdown_state}()\n`;
  return code;
};

// Delay Block
Blockly.Blocks['delay_block'] = {
  init: function () {
    this.appendValueInput("DELAY")
      .setCheck("Number")
      .appendField("Delay for")
      .appendField(new Blockly.FieldNumber(1, 0, Infinity, 1), "DELAY_TIME")
      .appendField("seconds");
    this.setColour(120);
    this.setTooltip("Pause execution for a specific time.");
    this.setHelpUrl("");
  }
};

Blockly.Python['delay_block'] = function (block) {
  const delay = block.getFieldValue('DELAY_TIME');
  const code = `time.sleep(${delay})\n`;
  return code;
};

// Logic Condition Block
Blockly.Blocks['logic_condition'] = {
  init: function () {
    this.appendValueInput("A")
      .setCheck("Number")
      .appendField("if");
    this.appendDummyInput()
      .appendField(new Blockly.FieldDropdown([["=", "EQ"], ["<", "LT"], [">", "GT"]]), "CONDITION");
    this.appendValueInput("B")
      .setCheck("Number");
    this.appendStatementInput("DO")
      .setCheck(null)
      .appendField("then");
    this.setColour(210);
    this.setTooltip("Perform actions based on a logic condition.");
    this.setHelpUrl("");
  }
};

Blockly.Python['logic_condition'] = function (block) {
  const a = Blockly.Python.valueToCode(block, 'A', Blockly.Python.ORDER_ATOMIC) || '0';
  const b = Blockly.Python.valueToCode(block, 'B', Blockly.Python.ORDER_ATOMIC) || '0';
  const condition = block.getFieldValue('CONDITION');
  const operator = condition === 'EQ' ? '==' : condition === 'LT' ? '<' : '>';
  const statements_do = Blockly.Python.statementToCode(block, 'DO');
  const code = `if ${a} ${operator} ${b}:\n${statements_do}`;
  return code;
};

// Button Control Block
Blockly.Blocks['button_control'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Button")
      .appendField(new Blockly.FieldDropdown([["pressed", "PRESSED"], ["not pressed", "NOT_PRESSED"]]), "STATE");
    this.appendStatementInput("DO")
      .setCheck(null)
      .appendField("do");
    this.setColour(290);
    this.setTooltip("Perform actions based on button state.");
    this.setHelpUrl("");
  }
};

Blockly.Python['button_control'] = function (block) {
  const dropdown_state = block.getFieldValue('STATE');
  const statements_do = Blockly.Python.statementToCode(block, 'DO');
  const condition = dropdown_state === 'PRESSED' ? 'button.is_pressed()' : '!button.is_pressed()';
  const code = `if ${condition}:\n${statements_do}`;
  return code;
};
