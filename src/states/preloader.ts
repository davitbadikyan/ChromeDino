import * as AssetUtils from '../utils/assetUtils';
import {AudioManager} from '../ui/managers/AudioManager';
export default class Preloader extends Phaser.State {
	private preloadBarSprite: Phaser.Sprite;
	private preloadFrameSprite: Phaser.Sprite;

	public preload(): void {
		// Setup your loading screen and preload sprite (if you want a loading progress indicator) here
		AudioManager.instance.initialize(this.game);
		AssetUtils.Loader.loadAllAssets(this.game, this.waitForSoundDecoding, this);
	}

	private waitForSoundDecoding(): void {
		AssetUtils.Loader.waitForSoundDecoding(this.loadTitle, this);
	}

	private loadTitle(): void {
		this.game.state.start('title');
	}
}
