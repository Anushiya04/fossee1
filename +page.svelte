<script>
  import { onMount } from 'svelte';
  import Blockly from 'blockly/core';
  import 'blockly/blocks'; // Core blocks
  import 'blockly/python'; // Python generator
  import './customBlocks.js'; // Custom blocks

  let workspace;
  const toolbox = {
    "kind": "flyoutToolbox",
    "contents": [
      { "kind": "block", "type": "controls_if" },
      { "kind": "block", "type": "logic_compare" },
      { "kind": "block", "type": "led_control" },
      { "kind": "block", "type": "delay_block" },
      { "kind": "block", "type": "button_control" },
      { "kind": "block", "type": "logic_condition" }
    ]
  };

  function onWorkspaceChange() {
    const code = Blockly.Python.workspaceToCode(workspace);
    console.log(code);
  }

  function downloadCode() {
    const code = Blockly.Python.workspaceToCode(workspace);
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'generated_code.py';
    a.click();
    URL.revokeObjectURL(url);
  }

  onMount(() => {
    workspace = Blockly.inject('blocklyDiv', {
      toolbox,
      grid: { spacing: 20, length: 3, colour: '#ccc', snap: true },
      trashcan: true
    });

    workspace.addChangeListener(onWorkspaceChange);
  });
</script>

<div class="heading">
  <h1>Interactive Python Code Generator for Arduino Control Using SvelteKit and Blockly</h1>
</div>
<div class="blockly-container">
  <div id="blocklyDiv" style="height: 600px; width: 100%;"></div>
</div>
<div class="actions">
  <button on:click={downloadCode}>Download Code</button>
</div>

<style>
  .heading {
    text-align: center;
    margin-bottom: 20px;
    font-weight: bold; /* Makes the heading bold */
    font-size: 24px; /* Adjusts font size for emphasis */
  }
  .blockly-container {
    border: 1px solid black;
  }
  .actions {
    margin-top: 10px;
    text-align: center;
  }
  button {
    padding: 10px 15px;
    font-size: 16px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  button:hover {
    background-color: #0056b3;
  }
</style>
