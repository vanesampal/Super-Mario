var lvl1 ={


preload:function() {
			this.load.audio('coinsound','audio/coin.wav');
                        this.load.audio('stompsound','audio/stomp.wav');
			this.load.audio('themesound','audio/theme.mp3');

			this.load.spritesheet('tiles', 'assets/super_mario_tiles1.png', 16,
					16);
			this.load.spritesheet('goomba', 'assets/goomba.png', 16, 16);
			this.load.spritesheet('mario', 'assets/mario1.png', 16, 16);
			this.load.spritesheet('coin', 'assets/coin2.png', 16, 16);
			this.load.spritesheet('bugs', 'assets/stupid.png', 16, 16);
			
			this.load.tilemap('level', 'assets/P2016161.json', null,
					Phaser.Tilemap.TILED_JSON);
		},
			create: function() {
			Phaser.Canvas.setImageRenderingCrisp(game.canvas)
			game.stage.backgroundColor = '#5c94fc';

			map = game.add.tilemap('level');
			map.addTilesetImage('tiles', 'tiles');
			map.setCollisionBetween(3, 12, true, 'solid');
			map.setCollisionBetween(3, 12, true, 'pipes');

			map.createLayer('background');
			pipes = map.createLayer('pipes');
			pipes.resizeWorld();

			layer = map.createLayer('solid');
			layer.resizeWorld();

			coins = game.add.group();
			coins.enableBody = true;
			map.createFromTiles(2, null, 'coin', 'stuff', coins);
			coins.callAll('animations.add', 'animations', 'spin',
					[ 0, 0, 1, 2,3,4,5 ], 10, true);
			coins.callAll('animations.play', 'animations', 'spin');

			goombas = game.add.group();
			goombas.enableBody = true;
			map.createFromTiles(1, null, 'goomba', 'stuff', goombas);
			goombas.callAll('animations.add', 'animations', 'walk', [ 0, 1 ],
					2, true);
			goombas.callAll('animations.play', 'animations', 'walk');
			goombas.setAll('body.bounce.x', 1);
			goombas.setAll('body.velocity.x', -20);
			goombas.setAll('body.gravity.y', 500);

			bugs=game.add.group();
			bugs.enableBody=true;
			map.createFromTiles(3,null,'bugs','stuff',bugs);
			bugs.callAll('animations.add', 'animations', 'walk', [ 0,1 ],
					2, true);
			bugs.callAll('animations.play', 'animations', 'walk');	
			bugs.setAll('body.bounce.x', 1);
			bugs.setAll('body.velocity.x', -20);
			bugs.setAll('body.gravity.y', 500);

			player = game.add.sprite(16, game.world.height - 48, 'mario');
			game.physics.arcade.enable(player);
			player.body.gravity.y = 370;
			player.body.collideWorldBounds = true;
			player.animations.add('walkRight', [ 1, 2, 3 ], 10, true);
			player.animations.add('walkLeft', [ 8, 9, 10 ], 10, true);
			player.goesRight = true;
                        score=this.add.text(16,10,'Score:'+ sc,{fontSize:'10px',fill: 'green'});
			score.fixedToCamera=true;
                        lives=this.add.text(150,10,'lives:'+ livescount,{fontSize:'10px',fill: 'red'});
			lives.fixedToCamera=true;
			
			game.camera.follow(player);

			cursors = game.input.keyboard.createCursorKeys();
			hxos=this.add.audio('coinsound');
                        hxos2=this.add.audio('stompsound');
                        hxos3=this.add.audio('themesound');
			hxos3.play();
			hxos3.loop=true;
		},

		update:function(){
			game.physics.arcade.collide(player, layer);
			game.physics.arcade.collide(goombas, layer);
			game.physics.arcade.overlap(player, goombas, goombaOverlap);
			game.physics.arcade.overlap(player, coins, coinOverlap);
			game.physics.arcade.collide(bugs,layer);
			game.physics.arcade.overlap(player,bugs,bugsOverlap);
			game.physics.arcade.collide(player,pipes,pipesOverlap);

			if (player.body.enable) {
				player.body.velocity.x = 0;
				if (cursors.left.isDown) {
					player.body.velocity.x = -90;
					player.animations.play('walkLeft');
					player.goesRight = false;
				} else if (cursors.right.isDown) {
					player.body.velocity.x = 90;
					player.animations.play('walkRight');
					player.goesRight = true;
				} else {
					player.animations.stop();
					if (player.goesRight)
						player.frame = 0;
					else
						player.frame = 7;
				}

				if (cursors.up.isDown && player.body.onFloor()) {
					player.body.velocity.y = -190;
					player.animations.stop();
				}

				if (player.body.velocity.y != 0) {
					if (player.goesRight)
						player.frame = 5;
					else
						player.frame = 12;
				}
			}
		}

	}