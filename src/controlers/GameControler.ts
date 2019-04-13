import {Images} from '../assets';
import {Player} from '../ui/components/Player';
import {GameScreen} from '../ui/GameScreen';
export class GameController {
	private readonly cactusAssets: string[] = [
		Images.ImagesBigCactus.getName(),
		Images.ImagesCactus.getName(),
		Images.ImagesCactus2.getName(),
		Images.ImagesCactus3.getName(),
		Images.ImagesCactusGroup.getName()
	];
	private cactusArray: Phaser.Sprite[] = [];
	private removed: Phaser.Sprite[] = [];
	private score = 0;
	private scoreString: string;
	public onScoreChange: Phaser.Signal = new Phaser.Signal();
	private dino: Player;
	private cactus: Phaser.Sprite;

	constructor(private game: Phaser.Game) {
		this.game.time.events.loop(Phaser.Timer.SECOND * 0.1, this.changeAndDispatchScore, this);
	}

	public setDino(dino: Player): void {
		this.dino = dino;
	}

	public getCactusAsset(): string {
		return this.cactusAssets[Math.floor(Math.random() * 5)];
	}

	public setCactus(cactus: Phaser.Sprite): void {
		this.cactus = cactus;
	}

	public cactusPushingIntoArray(): void {
		this.cactusArray.push(this.cactus);
	}


	public removeingCactusUpdate(): void {
		if (this.cactusArray[0].x + this.cactusArray[0].width <= this.dino.x) {
			this.removed = this.cactusArray.splice(0, 1);
			this.removed[0].x -= 15;
		}
		if (this.removed[0] && this.removed[0].x + this.removed[0].width <= 0) {
			this.removed[0].destroy();
		}

	}

	public cactusMovementUpdate(): void {
		this.cactusArray.forEach((this.cactus) => this.cactus.x -= 5);
	}

	public collisionUpdate(): boolean {
		if (this.cactusArray[0] && (this.dino.x + this.dino.width >= this.cactusArray[0].x &&
			this.dino.y + this.dino.height >= this.cactusArray[0].y + this.cactusArray[0].height)) {
			return true;
		}
	}

	private changeAndDispatchScore(): void {
		this.score += 1;
		this.scoreString = this.score.toString();
		for (let i = 0; i <= 5 - this.scoreString.length + 2; i++) {
			this.scoreString = '0' + this.scoreString;
		}
		this.onScoreChange.dispatch(this.scoreString);
	}
}
