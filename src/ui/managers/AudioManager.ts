import {Audio} from '../../assets';
export class AudioManager {
	private static _instance: AudioManager;
	private game: Phaser.Game;
	private constructor() {
	}

	public initialize(game: Phaser.Game): void {
		this.game = game;
	}

	static get instance(): AudioManager {
		return this._instance || (this._instance = new this());
	}

	public playJump(): void {
		const jumpSound = this.game.add.audio(Audio.AudioJump.getName());
		jumpSound.play();
	}

	public playDie(): void {
		const dieSound = this.game.add.audio(Audio.AudioDie.getName());
		dieSound.play();
	}
	public playCheckPoint(): void {
		const checkPointSound = this.game.add.audio(Audio.AudioCheckPoint.getName());
		checkPointSound.play();
		}

}
