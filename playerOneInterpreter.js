var playerOneInterpreter = Blockly.inject('workspacePlayerOne',
      {
        media: 'https://blockly-demo.appspot.com/static/media/',
        toolbox: document.getElementById('toolbox-p1'),
        rtl: false,
        zoom: {
          controls: true,
          wheel: false,
          startScale: 1.0,
          maxScale: 4,
          minScale: 0.25,
          scaleSpeed: 1.1
        }
      });

    Blockly.JavaScript.addReservedWords('exit');

    var outputAreaP1 = document.getElementById('outputP1');
    var runButtonP1 = document.getElementById('runButtonP1');
    var myInterpreterP1 = null;
    var runnerP1;

    function initApiP1(interpreter, scope) {
      // Add an API function for the alert() block, generated for "text_print" blocks.
      var wrapper = function (text) {
        text = text ? text.toString() : '';
        outputAreaP1.value = outputAreaP1.value + '\n' + text;
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
      initInterpreterMoveForwardP1(interpreter, scope);
      initInterpreterMoveBackwardP1(interpreter, scope);
      initInterpreterRotateTurretP1(interpreter, scope);
      initInterpreterRotateTankP1(interpreter, scope);
      initInterpreterShootP1(interpreter, scope);
      initInterpreterYellP1(interpreter, scope);
      // initInterpreterRotateTankToRight(interpreter, scope);
      // initInterpreterRotateTankToLeft(interpreter, scope);
      // initInterpreterRotateTurretLeft(interpreter, scope);
      // initInterpreterRotateTurretRight(interpreter, scope);
      // initInterpreterMoveOpposide(interpreter, scope);
      // Add an API function for highlighting blocks.
      // initInterpreterGoRight(interpreter, scope);
      // initInterpreterGoLeft(interpreter, scope);
      // initInterpreterDisplayText(interpreter, scope);
      var wrapper = function (id) {
        id = id ? id.toString() : '';
        return interpreter.createPrimitive(highlightBlockP1(id));
      };
      interpreter.setProperty(scope, 'highlightBlockP1',
        interpreter.createNativeFunction(wrapper));

      var wrapper = function (id) {
        id = id ? id.toString() : '';
        return goRightX(id);
        //return interpreter.createPrimitive(highlightBlockP1(id));
      };
      interpreter.setProperty(scope, 'bb',
        interpreter.createNativeFunction(wrapper));
    }

    var highlightPauseP1 = false;
    var latestCodeP1 = '';

    function highlightBlockP1(id) {
      playerOneInterpreter.highlightBlockP1(id);
      highlightPauseP1 = true;
    }

    function resetStepUiP1(clearOutput) {
      playerOneInterpreter.highlightBlock(null);
      highlightPauseP1 = false;
      runButtonP1.disabled = '';

      if (clearOutput) {
        outputAreaP1.value = latestCodeP1;
      }
    }

    function generateCodeAndLoadIntoInterpreterP1() {
      // Generate JavaScript code and parse it.
    //   Blockly.JavaScript.STATEMENT_PREFIX = 'highlightBlockP1(%1);\n';
    //   Blockly.JavaScript.addReservedWords('highlightBlockP1');
      latestCodeP1 = Blockly.JavaScript.workspaceToCode(playerOneInterpreter);

      resetStepUiP1(true);
    }

    function resetInterpreterP1() {
      myInterpreterP1 = null;
      if (runnerP1) {
        clearTimeout(runnerP1);
        runnerP1 = null;
      }
    }

    function runCodeP1() {
      if (!myInterpreterP1) {
        // First statement of this code.
        // Clear the program output.
        resetStepUiP1(true);
        runButtonP1.disabled = 'disabled';

        // And then show generated code in an alert.
        // In a timeout to allow the outputArea.value to reset first.
        setTimeout(function () {


          // Begin execution
          highlightPauseP1 = false;
          myInterpreterP1 = new Interpreter(latestCodeP1, initApiP1);
          runnerP1 = function () {
            if (myInterpreterP1) {
              var hasMore = myInterpreterP1.run();
              if (hasMore) {
                // Execution is currently blocked by some async call.
                // Try again later.
                setTimeout(runnerP1, 10);
              } else {
                // Program is complete.
                outputAreaP1.value += '\n\n<< Program complete >>';
                resetInterpreterP1();
                resetStepUiP1(false);
              }
            }
          };
          runnerP1();
        }, 1);
        return;
      }
    }
    //create block saver
    var xml_text = null
    function saveBlockP1(filename){
      try{
        var xml = Blockly.Xml.workspaceToDom(playerOneInterpreter)
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

    function importBlocksP1(){
      try{
        var xml_text = prompt("Please enter XML code","")
        var xml = Blockly.Xml.textToDom(xml_text)
        playerOneInterpreter.clear()
        Blockly.Xml.domToWorkspace(xml,playerOneInterpreter)
      }catch(e){
        alert(e)
      }
    }
    function importBlocksXMLP1(element){
      try{
        var file = element.files[0]
        var fr = new FileReader()
        fr.onload = function(event){
          var xml = Blockly.Xml.textToDom(event.target.result)
          playerOneInterpreter.clear()
          Blockly.Xml.domToWorkspace(xml,playerOneInterpreter)
        }
        fr.readAsText(file)
      }catch(e){
        console.log(e)
        alert(e)
      }
    }

    // Load the interpreter now, and upon future changes.
    generateCodeAndLoadIntoInterpreterP1();
    playerOneInterpreter.addChangeListener(function (event) {
      if (!(event instanceof Blockly.Events.Ui)) {
        // Something changed. Parser needs to be reloaded.
        resetInterpreterP1();
        generateCodeAndLoadIntoInterpreterP1();
      }
    });