import {Images} from '../assets';
import {BaseScreen} from './BaseScreen';
import {Player} from './components/Player';


export class GameScreen extends BaseScreen {
    private background: Phaser.TileSprite;
    private readonly cactusAssets: string[] = [
        Images.ImagesBigCactus.getName(),
        Images.ImagesCactus.getName(),
        Images.ImagesCactus2.getName(),
        Images.ImagesCactus3.getName(),
        Images.ImagesCactusGroup.getName()
    ];
    private cactusArray: Phaser.Sprite[] = [];
    private dino: Player;

    constructor(game: Phaser.Game, parent: PIXI.DisplayObjectContainer) {
        super(game, parent);
        this.initialize();
    }

    private initialize(): void {
        this.initBackground();
        this.initCactuses();
        this.initPlayer();
    }

    private initBackground(): void {
        this.background = this.game.add.tileSprite(0, 450, 800, 33, Images.ImagesGround.getName());
        this.add(this.background);
    }

    private initCactuses(): void {
        this.initCactus();
        this.game.time.events.loop(Phaser.Timer.SECOND * 2, () => {
            this.game.time.events.add(Phaser.Timer.SECOND * (Math.floor(Math.random())), this.initCactus, this);
        }, this);
    }

    private initCactus(): void {
        const cactus = this.game.add.sprite(800, 450, this.cactusAssets[Math.floor(Math.random() * 5)], null, this);
        cactus.y -= cactus.height;
        this.cactusArray.push(cactus);
    }

    private initPlayer(): void {
        this.dino = new Player(this.game, 0, 358, Images.ImagesPlayerStand.getName(),  this);
    }

    update() {
        super.update();
        this.background.tilePosition.x -= 2;
        this.cactusArray.forEach((cactus) => {
            cactus.x -= 2;
        });
        if (this.cactusArray[0].x + this.cactusArray[0].width === 0) {
            this.cactusArray[0].destroy();
            this.cactusArray.splice(0, 1);
        }
    }
}


