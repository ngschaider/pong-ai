import Vector2 from "./Vector2";

class Sprite {

    private _bitmap: ImageBitmap;
    public get bitmap() {
        return this._bitmap;
    }

    public get size(): Vector2 {
        return new Vector2(this.bitmap.width, this.bitmap.height);
    }

    public static async fromUrl(url: string): Promise<Sprite> {
        const res = await fetch(url);
        const blob = await res.blob();
        const bitmap = await window.createImageBitmap(blob);
        return new Sprite(bitmap);
    }

    constructor(bitmap: ImageBitmap) {
        this._bitmap = bitmap;
    }

}

export default Sprite;