import {GameScreen} from '../ui/GameScreen';
import {BaseScreen} from '../ui/BaseScreen';
export default class Title extends Phaser.State {

	private currentScreen: BaseScreen;

	public create(): void {
		this.initGame();
	}

	private initGame(): void {
		this.currentScreen = new GameScreen(this.game, this.game.world);
	}
}
