var tankAIWorkspace = Blockly.inject('blocklyDiv',
      {
        media: 'https://blockly-demo.appspot.com/static/media/',
        toolbox: document.getElementById('toolbox')
      });
    Blockly.Xml.domToWorkspace(document.getElementById('startBlocks'),
      tankAIWorkspace);
    // Exit is used to signal the end of a script.
    Blockly.JavaScript.addReservedWords('exit');

    var outputArea = document.getElementById('output');
    var runButton = document.getElementById('runButton');
    var myInterpreter = null;
    var runner;

    function initApi(interpreter, scope) {
      // Add an API function for the alert() block, generated for "text_print" blocks.
      var wrapper = function (text) {
        text = text ? text.toString() : '';
        outputArea.value = outputArea.value + '\n' + text;
      };
      interpreter.setProperty(scope, 'alert',
        interpreter.createNativeFunction(wrapper));


      // Add an API function for the prompt() block.
      var wrapper = function (text) {
        text = text ? text.toString() : '';
        return interpreter.createPrimitive(1);
      };
      interpreter.setProperty(scope, 'prompt',
        interpreter.createNativeFunction(wrapper));
      
      // Add an API function for the jump() block.
      var wrapper = function (text) {
        text = text ? text.toString() : '';
        //return interpreter.createPrimitive(prompt(text));
      };

      interpreter.setProperty(scope, 'jump',
        interpreter.createNativeFunction(wrapper));

      // Add all the custom block api calls here
      initInterpreterWaitForSeconds(interpreter, scope);
      initInterpreterGoRight(interpreter, scope);
      initInterpreterGoLeft(interpreter, scope);
      initInterpreterDisplayText(interpreter, scope);
      // Add an API function for highlighting blocks.
      var wrapper = function (id) {
        id = id ? id.toString() : '';
        return interpreter.createPrimitive(highlightBlock(id));
      };
      interpreter.setProperty(scope, 'highlightBlock',
        interpreter.createNativeFunction(wrapper));

      var wrapper = function (id) {
        id = id ? id.toString() : '';
        return goRightX(id);
        //return interpreter.createPrimitive(highlightBlock(id));
      };
      interpreter.setProperty(scope, 'bb',
        interpreter.createNativeFunction(wrapper));
    }

    var highlightPause = false;
    var latestCode = '';

    function highlightBlock(id) {
      tankAIWorkspace.highlightBlock(id);
      highlightPause = true;
    }

    function resetStepUi(clearOutput) {
      tankAIWorkspace.highlightBlock(null);
      highlightPause = false;
      runButton.disabled = '';

      if (clearOutput) {
        outputArea.value = 'Program output:\n=================';
      }
    }

    function generateCodeAndLoadIntoInterpreter() {
      // Generate JavaScript code and parse it.
      Blockly.JavaScript.STATEMENT_PREFIX = 'highlightBlock(%1);\n';
      Blockly.JavaScript.addReservedWords('highlightBlock');
      latestCode = Blockly.JavaScript.workspaceToCode(tankAIWorkspace);

      resetStepUi(true);
    }

    function resetInterpreter() {
      myInterpreter = null;
      if (runner) {
        clearTimeout(runner);
        runner = null;
      }
    }

    function speak(){
      displayText.setText('Score: ' );
    }

    function runCode() {
      if (!myInterpreter) {
        // First statement of this code.
        // Clear the program output.
        resetStepUi(true);
        runButton.disabled = 'disabled';

        // And then show generated code in an alert.
        // In a timeout to allow the outputArea.value to reset first.
        setTimeout(function () {


          // Begin execution
          highlightPause = false;
          myInterpreter = new Interpreter(latestCode, initApi);
          runner = function () {
            if (myInterpreter) {
              var hasMore = myInterpreter.run();
              if (hasMore) {
                // Execution is currently blocked by some async call.
                // Try again later.
                setTimeout(runner, 10);
              } else {
                // Program is complete.
                outputArea.value += '\n\n<< Program complete >>';
                resetInterpreter();
                resetStepUi(false);
              }
            }
          };
          runner();
        }, 1);
        return;
      }
    }

    //create block saver
    var xml_text = null
    function saveBlock(filename){
      try{
        var xml = Blockly.Xml.workspaceToDom(tankAIWorkspace)
        xml_text = Blockly.Xml.domToText(xml)

        var link = document.createElement('a')
        link.download = filename
        link.href = "data:application/octet-stream;utf-8," + encodeURI(xml_text)
        document.body.appendChild(link)
        link.click()
        link.remove()
        console.log("save success")
      }catch(e){
        console.log(e)
        window.location.href = "data:application/octet-stream;utf-8," + encodeURI(xml_text)
        alert(e)
      }
    }

    function importBlocks(){
      try{
        var xml_text = prompt("Please enter XML code","")
        var xml = Blockly.Xml.textToDom(xml_text)
        tankAIWorkspace.clear()
        Blockly.Xml.domToWorkspace(xml,tankAIWorkspace)
      }catch(e){
        alert(e)
      }
    }
    function importBlocksXML(element){
      try{
        var file = element.files[0]
        var fr = new FileReader()
        fr.onload = function(event){
          var xml = Blockly.Xml.textToDom(event.target.result)
          tankAIWorkspace.clear()
          Blockly.Xml.domToWorkspace(xml,tankAIWorkspace)
        }
        fr.readAsText(file)
      }catch(e){
        console.log(e)
        alert(e)
      }
    }
    
    // Load the interpreter now, and upon future changes.
    generateCodeAndLoadIntoInterpreter();
    tankAIWorkspace.addChangeListener(function (event) {
      if (!(event instanceof Blockly.Events.Ui)) {
        // Something changed. Parser needs to be reloaded.
        resetInterpreter();
        generateCodeAndLoadIntoInterpreter();
      }
    });