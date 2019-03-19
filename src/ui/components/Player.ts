export class Player extends Phaser.Sprite {
    private jumpButton: Phaser.Key;
    private jump: boolean;
    private fall: boolean;
    constructor(game: Phaser.Game, x: number, y: number, key: string, parent: PIXI.DisplayObjectContainer) {
        super(game, x, y, key);
        parent.addChild(this);
        this.init();
    }
    private init(): void {
        this.initDino();
    }
    private dinoJump(): void {
        if (this.y >= 358) {
            this.jump = true;
        }
    }

    private initDino (): void {
        this.inputEnabled = true;
        this.jumpButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.jumpButton.onDown.add(this.dinoJump, this);
    }

    update() {
        if (this.jump) {
            this.y -= 4;
        }
            if (this.y <= 270) {
            this.jump = false;
            this.fall = true;
        }
        if (this.fall) {
            this.y += 4;
        }
        if (this.y >= 358) {
            this.fall = false;
        }
        }
}