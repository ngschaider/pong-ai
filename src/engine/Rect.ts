import Vector2 from "../utils/Vector2";
import AnchorPoint from "./AnchorPoint";

class Rect {

    anchorPoint: AnchorPoint = AnchorPoint.CenterCenter;

    position: Vector2;
    size: Vector2;

    constructor(position: Vector2, size: Vector2) {
        this.position = position;
        this.size = size;
    }

    public get topLeft(): Vector2 {
        return new Vector2(this.left, this.top);
    }

    public get topCenter(): Vector2 {
        return new Vector2(this.horizontalCenter, this.top);
    }

    public get topRight(): Vector2 {
        return new Vector2(this.right, this.top);
    }

    public get leftCenter(): Vector2 {
        return new Vector2(this.left, this.verticalCenter);
    }

    public get centerCenter(): Vector2 {
        return new Vector2(this.horizontalCenter, this.verticalCenter);
    }

    public get rightCenter(): Vector2 {
        return new Vector2(this.right, this.verticalCenter);
    }

    public get bottomLeft(): Vector2 {
        return new Vector2(this.left, this.bottom);
    }

    public get bottomCenter(): Vector2 {
        return new Vector2(this.horizontalCenter, this.bottom);
    }

    public get bottomRight(): Vector2 {
        return new Vector2(this.right, this.bottom);
    }

    public get horizontalCenter(): number {
        if([AnchorPoint.TopLeft, AnchorPoint.LeftCenter, AnchorPoint.BottomLeft].includes(this.anchorPoint)) {
            return this.position.x + this.size.x/2;
        } else if([AnchorPoint.TopCenter, AnchorPoint.CenterCenter, AnchorPoint.BottomCenter].includes(this.anchorPoint)) {
            return this.position.x;
        } else if([AnchorPoint.TopRight, AnchorPoint.RightCenter, AnchorPoint.BottomRight].includes(this.anchorPoint)) {
            return this.position.x - this.size.x/2;
        } else {
            throw new Error("Unsupported AnchorPoint encountered.")
        }
    }

    public get verticalCenter(): number {
        if([AnchorPoint.TopLeft, AnchorPoint.TopCenter, AnchorPoint.TopRight].includes(this.anchorPoint)) {
            return this.position.y;
        } else if([AnchorPoint.LeftCenter, AnchorPoint.CenterCenter, AnchorPoint.RightCenter].includes(this.anchorPoint)) {
            return this.position.y + this.size.y/2;
        } else if([AnchorPoint.BottomLeft, AnchorPoint.BottomCenter, AnchorPoint.BottomRight].includes(this.anchorPoint)) {
            return this.position.y + this.size.y;
        } else {
            throw new Error("Unsupported AnchorPoint encountered.")
        }
    }

    public get top(): number {
        if([AnchorPoint.TopLeft, AnchorPoint.TopCenter, AnchorPoint.TopRight].includes(this.anchorPoint)) {
            return this.position.y;
        } else if([AnchorPoint.LeftCenter, AnchorPoint.CenterCenter, AnchorPoint.RightCenter].includes(this.anchorPoint)) {
            return this.position.y + this.size.y/2;
        } else if([AnchorPoint.BottomLeft, AnchorPoint.BottomCenter, AnchorPoint.BottomRight].includes(this.anchorPoint)) {
            return this.position.y + this.size.y;
        } else {
            throw new Error("Unsupported AnchorPoint encountered.")
        }
    }

    public get bottom(): number {
        if([AnchorPoint.TopLeft, AnchorPoint.TopCenter, AnchorPoint.TopRight].includes(this.anchorPoint)) {
            return this.position.y - this.size.y;
        } else if([AnchorPoint.LeftCenter, AnchorPoint.CenterCenter, AnchorPoint.RightCenter].includes(this.anchorPoint)) {
            return this.position.y - this.size.y/2;
        } else if([AnchorPoint.BottomLeft, AnchorPoint.BottomCenter, AnchorPoint.BottomRight].includes(this.anchorPoint)) {
            return this.position.y;
        } else {
            throw new Error("Unsupported AnchorPoint encountered.")
        }
    }

    public get left(): number {
        if([AnchorPoint.TopLeft, AnchorPoint.LeftCenter, AnchorPoint.BottomLeft].includes(this.anchorPoint)) {
            return this.position.x;
        } else if([AnchorPoint.TopCenter, AnchorPoint.CenterCenter, AnchorPoint.BottomCenter].includes(this.anchorPoint)) {
            return this.position.x - this.size.x/2;
        } else if([AnchorPoint.TopRight, AnchorPoint.RightCenter, AnchorPoint.BottomRight].includes(this.anchorPoint)) {
            return this.position.x - this.size.x;
        } else {
            throw new Error("Unsupported AnchorPoint encountered.")
        }
    }

    public get right(): number {
        if([AnchorPoint.TopLeft, AnchorPoint.LeftCenter, AnchorPoint.BottomLeft].includes(this.anchorPoint)) {
            return this.position.x + this.size.x;
        } else if([AnchorPoint.TopCenter, AnchorPoint.CenterCenter, AnchorPoint.BottomCenter].includes(this.anchorPoint)) {
            return this.position.x + this.size.x/2;
        } else if([AnchorPoint.TopRight, AnchorPoint.RightCenter, AnchorPoint.BottomRight].includes(this.anchorPoint)) {
            return this.position.x;
        } else {
            throw new Error("Unsupported AnchorPoint encountered.")
        }
    }

}

export default Rect;