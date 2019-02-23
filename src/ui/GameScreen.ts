import {Images} from '../assets';
import {BaseScreen} from './BaseScreen';


export class GameScreen extends BaseScreen {
    private background: Phaser.TileSprite;
    private cactusAssets: string[];
    private cactusGroup: Phaser.Group;
    private lastCactusPosX = 800;

    constructor(game: Phaser.Game, parent: PIXI.DisplayObjectContainer) {
        super(game, parent);
        this.initialize();
    }

    private initialize(): void {
        this.initBackground();
        this.cactusGroup = this.game.add.group();
        this.initCactus();
        this.game.time.events.loop(Phaser.Timer.SECOND * 2, this.initCactus.bind(this));
        }

    private initBackground(): void {
        this.background = this.game.add.tileSprite(0, 400, 800, 33, Images.ImagesGround.getName());
        this.add(this.background);
    }

    private initCactus(): void {
        this.cactusAssets = [Images.ImagesBigCactus.getName(), Images.ImagesCactus.getName(), Images.ImagesCactus2.getName(), Images.ImagesCactus3.getName(), Images.ImagesCactusGroup.getName()];
        const cactus = this.game.add.sprite(800, 367, this.cactusAssets[Math.floor(Math.random() * 5)]);
        cactus.x = this.lastCactusPosX + 200;
        this.cactusGroup.addChild(cactus);
        this.lastCactusPosX = cactus.x;
    }
    update() {
        super.update();
        this.background.tilePosition.x -= 1;
        this.cactusGroup.x -= 1;
    }
}


