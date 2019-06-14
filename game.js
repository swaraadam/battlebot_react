var config = {
    type: Phaser.AUTO,
    width: 600,
    height: 480,
    backgroundColor : 0xeaf0f1,
    parent: document.getElementById("right"),
    physics: {
      default: 'arcade',
      arcade: {
        fps : 60,
        gravity: { y: 0 },
        debug: true
      }
    },
    scene: {
      preload: preload,
      create: create,
      update: update
    }
  };

  var game = new Phaser.Game(config);
  window.focus();

  var text;
  var player;
  var turret;

  var cursors;
  var bombs;
  var displayText;


  function preload() {
    this.load.atlas('tank','Assets/tanks.png','Assets/tanks.json')
    this.load.atlas('enemy','Assets/enemy-tanks.png','Assets/tanks.json')
    this.load.image('logo','Assets/logo.png')
  }

  function create() {
    text = this.add.text(10,10,'',{font:'16px Courier', fill: '#00ff00'})
    cursors = this.input.keyboard.createCursorKeys();

    //my Tank
    player = this.physics.add.sprite(200,150,'tank','tank1').setOrigin(0.5,0.5)
    player.setDamping(true)
    player.setDrag(0.1)
    player.setMaxVelocity(200)
    player.setCollideWorldBounds(true);

    // //my turret
    turret = this.add.sprite(200,150,'tank','turret').setOrigin(0.3,0.5)

    displayText = this.add.text(10, 280, '', { fontSize: '16px', fill: '#000' });

    cursors = this.input.keyboard.createCursorKeys();
  }

  var goToTheRight = false;
  var goToTheLeft = false;
  var goToTheLeftTurret = false;
  var goToTheRightTurret = false;
  var goForward = false;
  var goShoot = false;
  function update() {
    text.setText('tank Y : '+parseInt(player.y) +' tank X : '+parseInt(player.x)+'\n'
      +'tank angle : '+ parseInt(player.angle)+'\n'+'turret angle : '+parseInt(turret.angle))
    turret.x  = player.x;
    turret.y  = player.y;
    if (cursors.up.isDown) {

    }
    if (cursors.left.isDown || goToTheLeft) {
      goLeft()
    }else{
      goToTheLeft=false;
    }
    if (cursors.right.isDown || goToTheRight) {
      goRight()
    }else{
      goToTheRight=false;
    }

    if(goToTheLeftTurret){
      goLeftTurret()
    }else{
      goToTheLeftTurret=false;
    }

    if(goToTheRightTurret){
      goRightTurret()
    }else{
      goToTheRightTurret=false;
    }

    if ((cursors.up.isDown||goForward==true)) {
      this.physics.velocityFromAngle(player.angle, 200, player.body.acceleration);
    }else{
      this.physics.velocityFromAngle(player.angle, 0, player.body.acceleration);
    }
  }
