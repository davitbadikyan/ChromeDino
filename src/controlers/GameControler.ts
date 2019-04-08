import {Images} from '../assets';
export class GameController {
	private readonly cactusAssets: string[] = [
		Images.ImagesBigCactus.getName(),
		Images.ImagesCactus.getName(),
		Images.ImagesCactus2.getName(),
		Images.ImagesCactus3.getName(),
		Images.ImagesCactusGroup.getName()
	];
	private score = 0;
	private scoreString: string;

	constructor(private game: Phaser.Game) {
	}

	public getCactusAsset(): string {
		return this.cactusAssets[Math.floor(Math.random() * 5)];
	}

	public getScore(): string {
		this.game.time.events.loop(Phaser.Timer.SECOND * 0.1, () => {
			this.game.time.events.add(0, () => {
				this.score += 1;
			}, this);
			this.scoreString = this.score.toString();
			for (let i = 0; i <= 5 - this.scoreString.length + 2; i++) {
				this.scoreString = '0' + this.scoreString;
			}
		}, this);
		return this.scoreString;
	}
}
