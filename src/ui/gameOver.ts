import {Images} from '../assets';
import {AudioManager} from './managers/AudioManager';
export class GameOver extends Phaser.State {
	private gameOverTitle: Phaser.Sprite;
	private replaySprite: Phaser.Sprite;

	public create(): void {
		AudioManager.instance.playDie();
		this.gameOverTitle = this.game.add.sprite(260, 225, Images.ImagesGameOver.getName());
		this.gameOverTitle.scale.setTo(2, 2);
		this.replaySprite = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, Images.ImagesReplayButton.getName());
		this.replaySprite.inputEnabled = true;
		this.replaySprite.events.onInputUp.add(this.handleClick, this);
	}

	private handleClick(): void {
		this.game.state.start('boot');
	}
}
