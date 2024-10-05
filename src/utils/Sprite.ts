class Sprite {

    private _bitmap: ImageBitmap;
    public get bitmap() {
        return this._bitmap;
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