var playerTwoInterpreter = Blockly.inject('workspacePlayerTwo',
      {
        media: 'https://blockly-demo.appspot.com/static/media/',
        toolbox: document.getElementById('toolbox-p2'),
        rtl: true,
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

    var xmlAreaP2 = document.getElementById('XMLP2')

    var outputAreaP2 = document.getElementById('outputP2');
    var runButtonP2 = document.getElementById('runButtonP2');
    var myInterpreterP2 = null;
    var runnerP2;

    function initApiP2(interpreter, scope) {
      // Add an API function for the alert() block, generated for "text_print" blocks.
      var wrapper = function (text) {
        text = text ? text.toString() : '';
        outputAreaP2.value = outputAreaP2.value + '\n' + text;
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
      initInterpreterMoveForwardP2(interpreter, scope);
      initInterpreterMoveBackwardP2(interpreter, scope);
      initInterpreterRotateTurretP2(interpreter, scope);
      initInterpreterRotateTankP2(interpreter, scope);
      initInterpreterShootP2(interpreter, scope);
      initInterpreterYellP2(interpreter, scope);
      // initInterpreterRotateTankToRight(interpreter, scope);
      // initInterpreterRotateTankToLeft(interpreter, scope);
      // initInterpreterRotateTurretLeft(interpreter, scope);
      // initInterpreterRotateTurretRight(interpreter, scope);
      // initInterpreterMoveOpposide(interpreter, scope);
      // Add an API function for highlighting blocks.
      // initInterpreterGoRight(interpreter, scope);
      // initInterpreterGoLeft(interpreter, scope);
      // initInterpreterDisplayText(interpreter, scope);

      var wrapper = function() {
        return interpreter.createPrimitive(get_player_pos_y_p2());
      };
      interpreter.setProperty(scope, 'get_player_pos_y',
          interpreter.createNativeFunction(wrapper));

      var wrapper = function() {
        return interpreter.createPrimitive(get_player_pos_x_p2());
      };
      interpreter.setProperty(scope, 'get_player_pos_x',
          interpreter.createNativeFunction(wrapper));

      var wrapper = function() {
        return interpreter.createPrimitive(get_player_health_p2());
      };
      interpreter.setProperty(scope, 'get_player_health',
          interpreter.createNativeFunction(wrapper));

      var wrapper = function() {
        return interpreter.createPrimitive(get_player_tank_angle_p2());
      };
      interpreter.setProperty(scope, 'get_player_tank_angle',
          interpreter.createNativeFunction(wrapper));

      var wrapper = function() {
        return interpreter.createPrimitive(get_player_turret_angle_p2());
      };
      interpreter.setProperty(scope, 'get_player_turret_angle',
          interpreter.createNativeFunction(wrapper));

      var wrapper = function() {
        return interpreter.createPrimitive(get_enemy_pos_y_p2());
      };
      interpreter.setProperty(scope, 'get_enemy_pos_y',
          interpreter.createNativeFunction(wrapper));

      var wrapper = function() {
        return interpreter.createPrimitive(get_enemy_pos_x_p2());
      };
      interpreter.setProperty(scope, 'get_enemy_pos_x',
          interpreter.createNativeFunction(wrapper));

      var wrapper = function() {
        return interpreter.createPrimitive(get_enemy_health_p2());
      };
      interpreter.setProperty(scope, 'get_enemy_health',
          interpreter.createNativeFunction(wrapper));

      var wrapper = function() {
        return interpreter.createPrimitive(get_enemy_status_p2());
      };
      interpreter.setProperty(scope, 'get_enemy_status',
          interpreter.createNativeFunction(wrapper));

      var wrapper = function() {
        return interpreter.createPrimitive(is_colliding_with_enemy_p2());
      };
      interpreter.setProperty(scope, 'is_colliding_with_enemy',
          interpreter.createNativeFunction(wrapper));

      var wrapper = function() {
        return interpreter.createPrimitive(is_colliding_with_wall_p2());
      };
      interpreter.setProperty(scope, 'is_colliding_with_wall',
          interpreter.createNativeFunction(wrapper));

      var wrapper = function() {
        return interpreter.createPrimitive(is_hit_by_enemy_p2());
      };
      interpreter.setProperty(scope, 'is_hit_by_enemy',
          interpreter.createNativeFunction(wrapper));

      var wrapper = function (id) {
        id = id ? id.toString() : '';
        return interpreter.createPrimitive(highlightBlockP2_p2(id));
      };
      interpreter.setProperty(scope, 'highlightBlockP2',
        interpreter.createNativeFunction(wrapper));

      var wrapper = function (id) {
        id = id ? id.toString() : '';
        return goRightX(id);
        //return interpreter.createPrimitive(highlightBlockP2(id));
      };
      interpreter.setProperty(scope, 'bb',
        interpreter.createNativeFunction(wrapper));

    ///////////////////////////////////////////////////////// function
      function get_player_pos_y_p2(){
        return redSide_.y
      }
      function get_player_pos_x_p2(){
        return redSide_.x
      }

      function get_player_health_p2(){
        return redSide_.health
      }

      function get_player_tank_angle_p2(){
        return redSide_.angle
      }

      function get_player_turret_angle_p2(){
        return redSide_.barrel.angle
      }

      function get_enemy_health_p2(){
        return blueSide_.health
      }

      function get_enemy_status_p2(){
        return blueSide_.active
      }

      function is_colliding_with_enemy_p2(){
        return collideEachOther_
      }

      function is_colliding_with_wall_p2(){
        return blueCollideWall_
      }

      function is_hit_by_enemy_p2(){
        return blueHitByRed_
      }
    }

    var highlightPauseP2 = false;
    var latestCodeP2 = '';
    var xmlP2 ='';

    function highlightBlockP2(id) {
      playerTwoInterpreter.highlightBlockP2(id);
      highlightPauseP2 = true;
    }

    function resetStepUiP2(clearOutput) {
      playerTwoInterpreter.highlightBlock(null);
      highlightPauseP2 = false;
      runButtonP2.disabled = '';

      if (clearOutput) {
        outputAreaP2.value = latestCodeP2;
        xmlAreaP2.value = Blockly.Xml.domToText(xmlP2);
      }
    }

    function generateCodeAndLoadIntoInterpreterP2() {
      // Generate JavaScript code and parse it.
    //   Blockly.JavaScript.STATEMENT_PREFIX = 'highlightBlockP2(%1);\n';
    //   Blockly.JavaScript.addReservedWords('highlightBlockP2');
      latestCodeP2 = Blockly.JavaScript.workspaceToCode(playerTwoInterpreter);
      xmlP2 = Blockly.Xml.workspaceToDom(playerTwoInterpreter);
      resetStepUiP2(true);
    }

    function resetInterpreterP2() {
      myInterpreterP2 = null;
      if (runnerP2) {
        clearTimeout(runnerP2);
        runnerP2 = null;
      }
    }

    function runCodeP2() {
      if (!myInterpreterP2) {
        // First statement of this code.
        // Clear the program output.
        resetStepUiP2(true);
        runButtonP2.disabled = 'disabled';

        // And then show generated code in an alert.
        // In a timeout to allow the outputAreaP2.value to reset first.
        setTimeout(function () {


          // Begin execution
          highlightPauseP2 = false;
          myInterpreterP2 = new Interpreter(latestCodeP2, initApiP2);
          runnerP2 = function () {
            if (myInterpreterP2) {
              var hasMore = myInterpreterP2.run();
              if (hasMore) {
                // Execution is currently blocked by some async call.
                // Try again later.
                setTimeout(runnerP2, 10);
              } else {
                // Program is complete.
                outputAreaP2.value += '\n\n<< Program complete >>';
                resetInterpreterP2();
                resetStepUiP2(false);
              }
            }
          };
          runnerP2();
        }, 1);
        return;
      }
    }
    //create block saver
    var xml_text = null
    function saveBlockP2(filename){
      try{
        var xml = Blockly.Xml.workspaceToDom(playerTwoInterpreter)
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

    function importBlocksP2(){
      try{
        var xml_text = prompt("Please enter XML code","")
        var xml = Blockly.Xml.textToDom(xml_text)
        playerTwoInterpreter.clear()
        Blockly.Xml.domToWorkspace(xml,playerTwoInterpreter)
      }catch(e){
        alert(e)
      }
    }
    function importBlocksXMLP2(element){
      try{
        var file = element.files[0]
        var fr = new FileReader()
        fr.onload = function(event){
          var xml = Blockly.Xml.textToDom(event.target.result)
          playerTwoInterpreter.clear()
          Blockly.Xml.domToWorkspace(xml,playerTwoInterpreter)
        }
        fr.readAsText(file)
      }catch(e){
        console.log(e)
        alert(e)
      }
    }

    // Load the interpreter now, and upon future changes.
    generateCodeAndLoadIntoInterpreterP2();
    playerTwoInterpreter.addChangeListener(function (event) {
      if (!(event instanceof Blockly.Events.Ui)) {
        // Something changed. Parser needs to be reloaded.
        resetInterpreterP2();
        generateCodeAndLoadIntoInterpreterP2();
      }
    });