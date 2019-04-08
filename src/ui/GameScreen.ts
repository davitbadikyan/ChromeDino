import {BitmapFonts, Images, Spritesheets} from '../assets';
import {BaseScreen} from './BaseScreen';
import {Player} from './components/Player';
import {GameController} from '../controlers/GameControler';
export class GameScreen extends BaseScreen {
	private background: Phaser.TileSprite;

	private cactusArray: Phaser.Sprite[] = [];
	private dino: Player;
	private removed: Phaser.Sprite[] = [];
	private isGameOver: boolean;
	private overallScore: Phaser.BitmapText;
	private gameController: GameController;
	constructor(game: Phaser.Game, parent: PIXI.DisplayObjectContainer) {
		super(game, parent);
		this.initialize();
	}

	private initialize(): void {
		this.gameController = new GameController(this.game);
		this.initBackground();
		this.initCactuses();
		this.initPlayer();
		this.initScore();
	}

	private initBackground(): void {
		this.background = this.game.add.tileSprite(0, 450, 800, 33, Images.ImagesGround.getName());
		this.add(this.background);
	}

	private initCactuses(): void {
		this.initCactus();
		this.game.time.events.loop(Phaser.Timer.SECOND * 2, () => {
			this.game.time.events.add(Phaser.Timer.SECOND * Math.random(), this.initCactus, this);
		}, this);
	}

	private initCactus(): void {
		const cactus = this.game.add.sprite(800, 450, this.gameController.getCactusAsset(), null, this);
		cactus.y -= cactus.height;
		this.cactusArray.push(cactus);
	}

	private initPlayer(): void {
		this.dino = new Player(this.game, 15, 358, Spritesheets.ImagesSpriteSheet88103.getName(), this);
	}

	private initScore(): void {
		this.overallScore = this.game.add.bitmapText(700, 100, BitmapFonts.ImagesFont.getName(), this.gameController.getScore(), 20);
	}

	update() {
		if (this.isGameOver) return;
		super.update();
		this.background.tilePosition.x -= 5;
		this.cactusArray.forEach((cactus) => cactus.x -= 5);
		if (this.cactusArray[0].x + this.cactusArray[0].width <= this.dino.x) {
			this.removed = this.cactusArray.splice(0, 1);
			this.removed[0].x -= 15;
		}
		if (this.removed[0] && this.removed[0].x + this.removed[0].width <= 0) {
			this.removed[0].destroy();
		}

		if (this.cactusArray[0] && (this.dino.x + this.dino.width >= this.cactusArray[0].x &&
			this.dino.y + this.dino.height >= this.cactusArray[0].y + this.cactusArray[0].height)) {
			this.dino.animations.play('dead');
			this.game.state.start('gameOver', false, false);
			this.isGameOver = true;
		}
	}
}


