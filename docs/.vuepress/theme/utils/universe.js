
class Star {
    constructor(width, height, first, universe) {
        this.width = width
        this.height = height
        this.universe = universe
        this.first = first
        this.speedCoeff = 0.05
        this.giantColor = "180,184,240"
        this.starColor = "226,225,142"
        this.cometColor = "226,225,224"
    }

    reset() {
        this.giant = this.getProbability(3);
        this.comet = this.giant || this.first ? false : this.getProbability(10);
        this.x = this.getRandInterval(0, this.width - 10);
        this.y = this.getRandInterval(0, this.height);
        this.r = this.getRandInterval(1.1, 2.6);
        this.dx =
            this.getRandInterval(this.speedCoeff, 6 * this.speedCoeff) +
            (this.comet + 1 - 1) * this.speedCoeff * this.getRandInterval(50, 120) +
            this.speedCoeff * 2;
        this.dy =
            -this.getRandInterval(this.speedCoeff, 6 * this.speedCoeff) -
            (this.comet + 1 - 1) * this.speedCoeff * this.getRandInterval(50, 120);
        this.fadingOut = null;
        this.fadingIn = true;
        this.opacity = 0;
        this.opacityTresh = this.getRandInterval(
            0.2,
            1 - (this.comet + 1 - 1) * 0.4
        );
        this.do = this.getRandInterval(0.0005, 0.002) + (this.comet + 1 - 1) * 0.001;
    };

    fadeIn() {
        if (this.fadingIn) {
            this.fadingIn = this.opacity > this.opacityTresh ? false : true;
            this.opacity += this.do;
        }
    };

    fadeOut() {
        if (this.fadingOut) {
            this.fadingOut = this.opacity < 0 ? false : true;
            this.opacity -= this.do / 2;
            if (this.x > this.width || this.y < 0) {
                this.fadingOut = false;
                this.reset();
            }
        }
    };

    draw() {
        this.universe.beginPath();

        if (this.giant) {
            this.universe.fillStyle = "rgba(" + this.giantColor + "," + this.opacity + ")";
            this.universe.arc(this.x, this.y, 2, 0, 2 * Math.PI, false);
        } else if (this.comet) {
            this.universe.fillStyle = "rgba(" + this.cometColor + "," + this.opacity + ")";
            this.universe.arc(this.x, this.y, 1.5, 0, 2 * Math.PI, false);

            //comet tail
            for (var i = 0; i < 30; i++) {
                this.universe.fillStyle =
                    "rgba(" +
                    this.cometColor +
                    "," +
                    (this.opacity - (this.opacity / 20) * i) +
                    ")";
                this.universe.rect(
                    this.x - (this.dx / 4) * i,
                    this.y - (this.dy / 4) * i - 2,
                    2,
                    2
                );
                this.universe.fill();
            }
        } else {
            this.universe.fillStyle = "rgba(" + this.starColor + "," + this.opacity + ")";
            this.universe.rect(this.x, this.y, this.r, this.r);
        }

        this.universe.closePath();
        this.universe.fill();
    };

    move() {
        this.x += this.dx;
        this.y += this.dy;
        if (this.fadingOut === false) {
            this.reset();
        }
        if (this.x > this.width - this.width / 4 || this.y < 0) {
            this.fadingOut = true;
        }
    };

    getProbability(percents) {
        return Math.floor(Math.random() * 1000) + 1 < percents * 10;
    }

    getRandInterval(min, max) {
        return Math.random() * (max - min) + min;
    }
}

export default Star 