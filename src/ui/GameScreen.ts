import {BitmapFonts, Images, Spritesheets} from '../assets';
import {BaseScreen} from './BaseScreen';
import {Player} from './components/Player';
import {GameController} from '../controlers/GameControler';
export class GameScreen extends BaseScreen {
	private background: Phaser.TileSprite;
	private dino: Player;
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
		this.attachListeners();
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
		this.gameController.setCactus(cactus);
		this.gameController.cactusPushingIntoArray();
	}

	private initPlayer(): void {
		this.dino = new Player(this.game, 15, 358, Spritesheets.ImagesSpriteSheet88103.getName(), this);
		this.gameController.setDino(this.dino);
	}

	private initScore(): void {
		this.overallScore = this.game.add.bitmapText(700, 100, BitmapFonts.ImagesFont.getName(), '00000', 20);
	}

	private attachListeners(): void {
		this.gameController.onScoreChange.add(this.handleChangeScore, this);
	}

	private handleChangeScore(scoreText: string): void {
		this.overallScore.text = scoreText;
	}

	update() {
		this.gameController.removeingCactusUpdate();
		if (this.isGameOver) return;
		super.update();
		this.background.tilePosition.x -= 5;
		this.gameController.cactusMovementUpdate();
		if (this.gameController.collisionUpdate()) {
			this.dino.animations.play('dead');
			this.game.state.start('gameOver', false, false);
			this.isGameOver = true;
		}
	}
}


