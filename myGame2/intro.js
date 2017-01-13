/* global game Phaser game_state */


game_state.story = function() {};
game_state.story.prototype = {
    preload: function() {



   },
    create: function() {
        
        
        
        this.spaceBar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

        var _this = this;
        // setInterval(function() {
            this.scoreText = game.add.text(16, 16, '   There was a dude named Conan \n He was a conspiracy theorist \n He spotted a UFO landing into a mountain \n He decided to investigate \n  \n But while he was searching there was a cave in, and rocks \n fell on his head! Now he must dodge them and get OUT.', {
                fontSize: "120px",
                fill: '#10ce79'
            });

        // });
        // setInterval(function() {
            _this.scoreText = game.add.text(360, 509, '<Press Space>', {
                fontSize: "60px",
                fill: '#b2b2b2'
                
                

            });


        // });
    },

    update: function() {

    if (this.spaceBar.isDown) {
        game.state.start('main');
    }
  },
  
};

game.state.add('story', game_state.story);
game.state.start('story');