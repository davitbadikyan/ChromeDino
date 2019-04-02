import {AudioManager} from '../managers/AudioManager';
export class Player extends Phaser.Sprite {
	private jumpButton: Phaser.Key;
	private jump: boolean;
	private fall: boolean;
	private gravSpeed: number;
	private jumpSpeed: number;

	constructor(game: Phaser.Game, x: number, y: number, key: string, parent: PIXI.DisplayObjectContainer) {
		super(game, x, y, key);
		parent.addChild(this);
		this.init();
	}

	private init(): void {
		this.initDino();
		this.initAnimation();
	}

	private dinoJump(): void {
		if (this.y >= 358) {
			this.jump = true;
			AudioManager.instance.playJump();
			this.gravSpeed = 1;
			this.jumpSpeed = 20;
		}
	}

	private initDino(): void {
		this.inputEnabled = true;
		this.jumpButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		this.jumpButton.onDown.add(this.dinoJump, this);
	}

	private initAnimation(): void {
		this.animations.add('jump', [1]);
		this.animations.add('walk', [0, 2, 3]);
		this.animations.add('dead', [4]);
	}

	update() {
		this.animations.play('walk', 15, true);
		if (this.jump) {
			this.animations.play('jump');
			this.y -= this.jumpSpeed;
			this.jumpSpeed -= this.gravSpeed;
		}
		if (this.jumpSpeed <= 0) {
			this.jump = false;
			this.fall = true;
		}
		if (this.fall) {
			this.animations.play('jump');
			this.jumpSpeed += this.gravSpeed;
			this.y += this.jumpSpeed;
		}
		if (this.y >= 358) {
			this.fall = false;
		}
	}
}
