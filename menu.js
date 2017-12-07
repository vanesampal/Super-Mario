var menu= {
	preload:function(){
		game.load.image('logo', 'assets/mario3.jpg');
		game.load.image('lvl','assets/play.png');
		game.load.image('mariopic','assets/mario67.png');
	},
	create:function(){	
		game.scale.pageAlignHorizontally = true;
		game.scale.pageAlignVertically = true;
		game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		game.physics.startSystem(Phaser.Physics.ARCADE);

		var menu = game.add.sprite(100,60, 'logo');
		menu.anchor.set(0.5,0.5);
		var mariopic=game.add.sprite(220,120,'mariopic');
		mariopic.anchor.set(0.5,0.5);

		var button1 = game.add.button(100 , 190, "lvl", function(){
			game.state.start('lvl1');
		});
		button1.anchor.set(0.5, 0.5);

	}
}