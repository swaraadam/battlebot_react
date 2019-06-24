var game

window.onload = function(){
    // start() //load blockly component
    var config = {
        type : Phaser.AUTO,
        width: 600,
        height : 480,
        backgroundColor : 0xeaf0f1,
        parent : "phaser-game",
        physics : {
            default : 'arcade',
            arcade :{
                fps :60,
                gravity: {y: 0},
                debug: true
            }
        },
        render: {pixelArt: false, antialias: true},
        scene : [BootScene, GameplayScene]
    }
    game = new Phaser.Game(config)
    window.focus()
}

class Bullet extends Phaser.GameObjects.Image{
    constructor(props){
        super(props.scene, props.x, props.y, props.key)

        this.rotation = props.rotation
        this.initImage()
        this.scene.add.existing(this)
    }

    initImage(){
        //var
        this.bulletSpeed = 1000

        //img
        this.setOrigin(0.5, 0.5)
        this.setDepth(2)

        //psc
        this.scene.physics.world.enable(this)
        this.scene.physics.velocityFromRotation(
            this.rotation - Math.PI / 2,
            this.bulletSpeed,
            this.body.velocity
        )
    }

    update(){

    }
}

var p1_rotate_tank = false;
var p1_rotateTankLeft = false;
var p1_rotateTankRight = false;
var p1_rotateTurretLeft = false;
var p1_rotateTurretRight = false;
var p1_forward = false;
var p1_backward = false;
var p1_shoot = false;
var p1_displayText

class Player1 extends Phaser.GameObjects.Image{
    constructor(props){
        super(props.scene, props.x, props.y, props.key, props.frame)
        
        //var
        this.health = null
        this.lastShoot = null
        this.speed = null
        //child
        this.barrel = Phaser.GameObjects.Image
        this.lifeBar = Phaser.GameObjects.Graphics
        this.yell = Phaser.GameObjects.text
        //game object
        this.bullets = Phaser.GameObjects.Group
        //input - edit this type later for bot
        this.cursors = Phaser.Input.Keyboard.CursorKeys
        this.rotateTurretLeft = Phaser.Input.Keyboard.Key
        this.rotateTurretRight = Phaser.Input.Keyboard.Key
        this.shootingKey = Phaser.Input.Keyboard.Key
        this.rotateTankLeft = Phaser.Input.Keyboard.Key
        this.rotateTankRight = Phaser.Input.Keyboard.Key
        this.tankForward = Phaser.Input.Keyboard.Key
        this.tankBackward = Phaser.Input.Keyboard.Key

        this.getBullets()
        this.initImage()
        this.scene.add.existing(this)
    }

    getBullets(){
        return this.bullets
    }

    initImage(){
        //var
        this.health = 1
        this.lastShoot = 0
        this.speed = 100

        //img
        this.setOrigin(0.5 ,0.5)
        this.setDepth(0)
        this.angle = 180

        //child
        this.barrel = this.scene.add.image(this.x, this.y, "barrelBlue")
        this.barrel.setOrigin(0.5, 1)
        this.barrel.setDepth(1)
        this.barrel.angle = 180

        this.lifeBar = this.scene.add.graphics()
        this.redrawLifebar()

        this.yell = this.scene.add.text(this.x, this.y, '', { fontSize: '12px', fill: '#000' })
        this.yell.setOrigin(-0.5, 3.2)

        //game objects
        this.bullets=this.scene.add.group({
            active: true,
            maxSize: 10,
            runChildUpdate: true
        })

        //input
        this.cursors = this.scene.input.keyboard.createCursorKeys()
        this.rotateTurretLeft = this.scene.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.Q
        )
        this.rotateTurretRight = this.scene.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.E
        )
        this.shootingKey = this.scene.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.ALT
        )
        this.rotateTankLeft = this.scene.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.A
        )
        this.rotateTankRight = this.scene.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.D
        )
        this.tankForward = this.scene.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.W
        )
        this.tankBackward = this.scene.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.S
        )

        //physics
        this.scene.physics.world.enable(this)
    }

    update(){
        if(this.active){
          this.barrel.x = this.x
          this.barrel.y = this.y
          this.lifeBar.x = this.x
          this.lifeBar.y = this.y
          this.yell.x = this.x
          this.yell.y = this.y
          this.handleInput()
          this.handleShooting()  
        }else{
            this.destroy()
            this.barrel.destroy()
            this.lifeBar.destroy()
            this.yell.destroy()
        }
    }

    handleInput(){
        //move forward & backward then stop
        if(this.tankForward.isDown || p1_forward){
            this.scene.physics.velocityFromRotation(
                this.rotation - Math.PI / 2,
                this.speed,
                this.body.velocity 
            )
        }else if(this.tankBackward.isDown || p1_backward){
            this.scene.physics.velocityFromRotation(
                this.rotation - Math.PI / 2,
                -this.speed,
                this.body.velocity 
            )
        }else{
            this.body.setVelocity(0, 0)
        }
        //Rotate tank
        if(this.rotateTankLeft.isDown || p1_rotateTankLeft){
            this.angle -= 1
        }else if(this.rotateTankRight.isDown || p1_rotateTankRight){
            this.angle += 1
        }
        //Rotate barrel
        if(this.rotateTurretLeft.isDown || p1_rotateTurretLeft){
            this.barrel.angle -= 1
        }else if(this.rotateTurretRight.isDown || p1_rotateTurretRight){
            this.barrel.angle += 1
        }
    }

    handleShooting(){
        if((p1_shoot || this.shootingKey.isDown ) && this.scene.time.now > this.lastShoot){
            this.scene.cameras.main.shake(20, 0.005)
            this.scene.tweens.add({
                targets: this,
                props: { alpha: 0.8 },
                delay: 0,
                duration: 5,
                ease: "Power1",
                easeParams: null,
                hold: 0,
                repeat: 0,
                repeatDelay: 0,
                yoyo: true,
                paused: false
            })

            if(this.bullets.getLength()<3){
                this.bullets.add(
                    new Bullet({
                        scene: this.scene,
                        x: this.barrel.x,
                        y: this.barrel.y,
                        key: "bulletBlue",
                        rotation: this.barrel.rotation
                    })
                )
            }
        }
    }

    redrawLifebar(){
        this.lifeBar.clear()
        this.lifeBar.fillStyle(0xe66a28, 1)
        this.lifeBar.fillRect(
            -this.width / 2,
            this.height / 2,
            this.width * this.health,
            15
        )
        this.lifeBar.lineStyle(2, 0xffffff)
        this.lifeBar.strokeRect(-this.width / 2, this.height / 2, this.width, 15)
        this.lifeBar.setDepth(1)
    }

    updateHealth(){
        if(this.health > 0){
            this.health -= 0.05
            this.redrawLifebar()
        }else{
            this.health = 0
            this.active = false
        }
    }
}

var p2_rotate_tank = false;
var p2_rotateTankLeft = false;
var p2_rotateTankRight = false;
var p2_rotateTurretLeft = false;
var p2_rotateTurretRight = false;
var p2_forward = false;
var p2_backward = false;
var p2_shoot = false;
var p2_displayText

class Player2 extends Phaser.GameObjects.Image{
    constructor(props){
        super(props.scene, props.x, props.y, props.key, props.frame)
        
        //var
        this.health = null
        this.lastShoot = null
        this.speed = null
        //child
        this.barrel = Phaser.GameObjects.Image
        this.lifeBar = Phaser.GameObjects.Graphics
        this.yell = Phaser.GameObjects.text
        //game object
        this.bullets = Phaser.GameObjects.Group
        //input - edit this type later for bot
        this.cursors = Phaser.Input.Keyboard.CursorKeys
        this.rotateTurretLeft = Phaser.Input.Keyboard.Key
        this.rotateTurretRight = Phaser.Input.Keyboard.Key
        this.shootingKey = Phaser.Input.Keyboard.Key
        this.rotateTankLeft = Phaser.Input.Keyboard.Key
        this.rotateTankRight = Phaser.Input.Keyboard.Key
        this.tankForward = Phaser.Input.Keyboard.Key
        this.tankBackward = Phaser.Input.Keyboard.Key

        this.getBullets()

        this.initImage()
        this.scene.add.existing(this)
    }

    getBullets(){
        return this.bullets
    }

    initImage(){
        //var
        this.health = 1
        this.lastShoot = 0
        this.speed = 100

        //img
        this.setOrigin(0.5 ,0.5)
        this.setDepth(0)
        this.angle = 180

        //child
        this.barrel = this.scene.add.image(this.x, this.y, "barrelRed")
        this.barrel.setOrigin(0.5, 1)
        this.barrel.setDepth(1)
        this.barrel.angle = 180
        this.yell = this.scene.add.text(this.x, this.y, '', { fontSize: '12px', fill: '#000' })
        this.yell.setOrigin(-0.5, 3.2)

        this.lifeBar = this.scene.add.graphics()
        this.redrawLifebar()

        //game objects
        this.bullets=this.scene.add.group({
            active: true,
            maxSize: 10,
            runChildUpdate: true
        })

        //input
        this.cursors = this.scene.input.keyboard.createCursorKeys()
        this.rotateTurretLeft = this.scene.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.NUMPAD_ONE
        )
        this.rotateTurretRight = this.scene.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.NUMPAD_TWO
        )
        this.shootingKey = this.scene.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.NUMPAD_ZERO
        )
        this.rotateTankLeft = this.scene.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.LEFT
        )
        this.rotateTankRight = this.scene.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.RIGHT
        )
        this.tankForward = this.scene.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.UP
        )
        this.tankBackward = this.scene.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.DOWN
        )

        //physics
        this.scene.physics.world.enable(this)
    }

    update(){
        if(this.active){
          this.barrel.x = this.x
          this.barrel.y = this.y
          this.lifeBar.x = this.x
          this.lifeBar.y = this.y
          this.yell.x = this.x
          this.yell.y = this.y
          this.handleInput()
          this.handleShooting()  
        }else{
            this.destroy()
            this.barrel.destroy()
            this.lifeBar.destroy()
        }
    }

    handleInput(){
        //move forward & backward then stop
        if(this.tankForward.isDown || p2_forward){
            this.scene.physics.velocityFromRotation(
                this.rotation - Math.PI / 2,
                this.speed,
                this.body.velocity 
            )
        }else if(this.tankBackward.isDown || p2_backward){
            this.scene.physics.velocityFromRotation(
                this.rotation - Math.PI / 2,
                -this.speed,
                this.body.velocity 
            )
        }else{
            this.body.setVelocity(0, 0)
        }
        //Rotate tank
        if(this.rotateTankLeft.isDown || p2_rotateTankLeft){
            this.angle -= 1
        }else if(this.rotateTankRight.isDown || p2_rotateTankRight){
            this.angle += 1
        }
        //Rotate barrel
        if(this.rotateTurretLeft.isDown || p2_rotateTurretLeft){
            this.barrel.angle -= 1
        }else if(this.rotateTurretRight.isDown || p2_rotateTurretRight){
            this.barrel.angle += 1
        }
    }

    handleShooting(){
        if((this.shootingKey.isDown || p2_shoot) && this.scene.time.now > this.lastShoot){
            this.scene.cameras.main.shake(20, 0.005)
            this.scene.tweens.add({
                targets: this,
                props: { alpha: 0.8 },
                delay: 0,
                duration: 5,
                ease: "Power1",
                easeParams: null,
                hold: 0,
                repeat: 0,
                repeatDelay: 0,
                yoyo: true,
                paused: false
            })

            if(this.bullets.getLength()<10){
                this.bullets.add(
                    new Bullet({
                        scene: this.scene,
                        x: this.barrel.x,
                        y: this.barrel.y,
                        key: "bulletRed",
                        rotation: this.barrel.rotation
                    })
                )
            }
        }
    }

    redrawLifebar(){
        this.lifeBar.clear()
        this.lifeBar.fillStyle(0xe66a28, 1)
        this.lifeBar.fillRect(
            -this.width / 2,
            this.height / 2,
            this.width * this.health,
            15
        )
        this.lifeBar.lineStyle(2, 0xffffff)
        this.lifeBar.strokeRect(-this.width / 2, this.height / 2, this.width, 15)
        this.lifeBar.setDepth(1)
    }

    updateHealth(){
        if(this.health > 0){
            this.health -= 0.05
            this.redrawLifebar()
        }else{
            this.health = 0
            this.active = false
        }
    }
}

class Obstacle extends Phaser.GameObjects.Image{
    constructor(props){
        super(props.scene, props.x, props.y, props.key)

        this.initImage()
        this.scene.add.existing(this)
    }

    initImage(){
        //img
        this.setOrigin(0,0)

        //physics
        this.scene.physics.world.enable(this)
        this.body.setImmovable(true)
    }

    update(){
        
    }
}

class BootScene extends Phaser.Scene{
    constructor(){
        super({
            key: "BootScene"
        })

        this.loadingBar = Phaser.GameObjects.Graphics
        this.progressBar = Phaser.GameObjects.Graphics
    }

    preload(){
        console.log("BootScene")
        // this.scene.start("MenuScene")
        this.cameras.main.setBackgroundColor(0x000000)
        this.createLoadingGraphics()

        this.load.on(
            "progress",
            function(value){
                this.progressBar.clear()
                this.progressBar.fillStyle(0x88e453, 1);
                this.progressBar.fillRect(
                    this.cameras.main.width / 4,
                    this.cameras.main.height / 2 - 16,
                    (this.cameras.main.width / 2) * value,
                    16
                )
            },
            this
        )

        this.load.on(
            "complete",
            function(){
                this.progressBar.destroy()
                this.loadingBar.destroy()
            },
            this
        )

        // this.load.pack("preload", "../.././Assets/tank_att/pack.json", "preload")
    }

    update(){
        this.scene.start("GameScene")
        // console.log("MenuScene")
    }

    createLoadingGraphics(){
        this.loadingBar = this.add.graphics()
        this.loadingBar.fillStyle(0xffffff, 1)
        this.loadingBar.fillRect(
            this.cameras.main.width / 4 - 2,
            this.cameras.main.height / 2 - 18,
            this.cameras.main.width / 2 + 4,
            20
        )
        this.progressBar = this.add.graphics()
    }
}

class GameplayScene extends Phaser.Scene{

    constructor(){
        super({
            key: "GameScene"
        })

        this.blueSide = Player1
        this.redSide = Player2

        this.wall = Phaser.GameObjects.Group
        this.textLog1
        this.textlog2
    }

    init(){

    }

    create(){
        this.textLog1 = this.add.text(30,30,'',{font:'16px Courier', fill: '#00ff00'})
        this.textLog2 = this.add.text(30,390,'',{font:'16px Courier', fill: '#f442ad'})

        this.wall = this.add.group({
            /*classType: Obstacle,*/
            runChildUpdate: true
          });

        //set collider for player
        
        this.convertObjects()
        
        this.physics.add.collider(this.redSide, this.blueSide)
        this.physics.add.collider(this.redSide, this.wall)
        this.physics.add.collider(this.blueSide, this.wall)

        //set collider for bullets
        this.physics.add.overlap(
            this.redSide.getBullets(),
            this.blueSide,
            this.redBulletHitBlue,
            null,
            this
        )

        this.physics.add.overlap(
            this.blueSide.getBullets(),
            this.redSide,
            this.blueBulletHitRed,
            null,
            this
        )

        this.physics.add.overlap(
            this.blueSide.getBullets(),
            this.wall,
            this.blueBulletHitWall,
            null,
            this
        )

        this.physics.add.overlap(
            this.redSide.getBullets(),
            this.wall,
            this.redBulletHitWall,
            null,
            this
        )
    }

    update(){
        this.textLog1.setText('tank1 Y : '+parseInt(this.blueSide.y) +' tank1 X : '+parseInt(this.blueSide.x)+'\n'
        +'tank1 angle : '+ parseInt(this.blueSide.angle)+'\n'+'turret1 angle : '+parseInt(this.blueSide.barrel.angle)
        +'\n'+'health : '+(this.blueSide.health * 100))

        this.textLog2.setText('tank2 Y : '+parseInt(this.redSide.y) +' tank2 X : '+parseInt(this.redSide.x)+'\n'
        +'tank2 angle : '+ parseInt(this.redSide.angle)+'\n'+'turret2 angle : '+parseInt(this.redSide.barrel.angle)
        +'\n'+'health : '+(this.redSide.health * 100))

        this.blueSide.yell.setText(p1_displayText)
        this.redSide.yell.setText(p2_displayText)

        this.redSide.update()
        this.blueSide.update()
    }

    convertObjects(){
        this.redSide = new Player2({
            scene: this,
            x: 400,
            y: 240,
            key: "tankRed"
        })

        this.blueSide = new Player1({
            scene: this,
            x: 200,
            y: 240,
            key: "tankBlue"
        })

        for(let j= 0 ; j<4;j++){
            if(j == 0 || j == 1){
                let xPos
                if( j == 0){
                    xPos = 0
                }else{
                    xPos = 570
                }
                for(let i = 0; i<16;i++){
                    let obstacle = new Obstacle({
                        scene: this,
                        x: xPos,
                        y: 30*i,
                        key: "object.type"
                    });
              
                    this.wall.add(obstacle);
                }
            }else{
                let yPos
                if( j == 2){
                    yPos = 0
                }else{
                    yPos = 449
                }
                for(let i = 0; i<18;i++){
                    let obstacle = new Obstacle({
                        scene: this,
                        x: (30*i)+30,
                        y: yPos,
                        key: "object.type"
                    });
              
                    this.wall.add(obstacle);
                }
            }
        }
    }

    redBulletHitBlue(bullet, blueSide){
        bullet.destroy()
        blueSide.updateHealth()
    }

    blueBulletHitRed(bullet, redSide){
        bullet.destroy()
        redSide.updateHealth()
    }

    redBulletHitWall(bullet, wall){
        bullet.destroy()
    }

    blueBulletHitWall(bullet,wall){
        bullet.destroy()
    }
}
