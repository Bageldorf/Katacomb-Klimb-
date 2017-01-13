/*global Phaser*/

var game = new Phaser.Game(800, 600, Phaser.AUTO, '');
var game_state = {};

game_state.main = function() {};
game_state.main.prototype = {



    preload: function() {

        game.load.spritesheet('player', 'assets/player.png', 90, 90);
        game.load.image('object', 'assets/object1.png');
        game.load.spritesheet('object2', 'assets/object2.png', 56, 56);
        game.load.audio('noot', 'assets/JUSTICE!.mp3');

    },

    create: function() {


         var music = game.add.audio('noot');
         music.play();
        //noot.loopFull(true);

        //Set the background colour to blue
        game.stage.backgroundColor = '#8e3600';

        // Start the Arcade physics system (for movements and collisions)
        game.physics.startSystem(Phaser.Physics.ARCADE);

        //Add the player at the bottom of the screen 
        this.player = game.add.sprite(200, 450, 'player');
        this.player.animations.add('climb');
        this.player.animations.play('climb', 12, true);

        //We need to enable physics on the this.player
        game.physics.arcade.enable(this.player);

        //Enable body on player
        this.player.enableBody = true

        //Make sure the player won't move when it hits the ball
        this.player.body.immovable = true

        // Create the left/right arrow keys
        this.left = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        this.right = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
        this.up = game.input.keyboard.addKey(Phaser.Keyboard.UP);
        this.down = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);

        //Create objects in group
        this.objects = game.add.group();

        //Enable body for all objects in the group
        this.objects.enableBody = true;

        //Anchor this object to _this variable
        var _this = this;


        //Player Animation



        //Create objects over time
        setInterval(function() {
                //Create an object at the top of the screen at a random x
                var object = _this.objects.create(Math.random() * 800, -64, 'object');
                var object2 = _this.objects.create(Math.random() * 800, -74, 'object2');

                //The Rock Animation
                object2.animations.add('down');
                object2.animations.play('down', 10, true);

                //Let gravity do its thing
                object.body.gravity.y = 600;
                object2.body.gravity.y = 100;


            }, 1000) //1000 = 1000ms = 1 second



    },

    update: function() {

        //Move the player left/right when and arrow key is pressed
        if (this.left.isDown) {
            this.player.body.velocity.x = -200;
        }
        else if (this.right.isDown) {
            this.player.body.velocity.x = 200;

        }
        else if (this.up.isDown) {
            this.player.body.velocity.y = -100;

        }
        else if (this.down.isDown) {
            this.player.body.velocity.y = 100;
        }
        //Stop the player when no key is pressed
        else {
            this.player.body.velocity.x = 0;
            this.player.body.velocity.y = 0;
        }

        //Collision between the player and the object
        game.physics.arcade.overlap(this.player, this.objects, this.hitObject, null, this);





    },

    hitObject: function(player, object, object2) {
        object.kill();
        this.player.body.velocity.y = 500;

    }

};

game.state.add('main', game_state.main);
