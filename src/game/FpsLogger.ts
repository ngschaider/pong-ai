import GameObject from "../engine/GameObject";

class FpsLogger extends GameObject {

    private lastUpdate: number = 0;
    private lastLog: number = 0;

    private lastFixedUpdate: number = 0;
    private lastLogFixed: number = 0;

    update(): void {
        const now = new Date().getTime();

        if(now - this.lastLog > 1000) {
            const delta = now - this.lastUpdate;
            const fps = 1000/delta;
            console.log("update: " + Math.round(fps));

            this.lastLog = now;
        }

        this.lastUpdate = now;
    }

    fixedUpdate(): void {
        const now = new Date().getTime();

        if(now - this.lastLogFixed > 1000) {
            const delta = now - this.lastFixedUpdate;
            const fps = 1000/delta;
            console.log("fixedUpdate: " + Math.round(fps));

            this.lastLogFixed = now;
        }

        this.lastFixedUpdate = now;
    }

}

export default FpsLogger;