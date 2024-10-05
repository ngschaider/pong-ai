import Graphics from "../../graphics/Graphics";
import Matrix3x3 from "../../utils/Matrix3x3";
import Vector2 from "../../utils/Vector2";
import Component from "../Component";

class Transform extends Component {

    parent?: Transform;

    position: Vector2 = Vector2.zero;
    rotation: number = 0;
    scale: Vector2 = Vector2.one;

    onCreate(): void {
    }

    getTransformationMatrix(): Matrix3x3 {
        const scale = new Matrix3x3(
            this.scale.x, 0, 0, 
            0, this.scale.y, 0, 
            0, 0, 1
        );
        const translate = new Matrix3x3(
            1, 0, this.position.x, 
            0, 1, this.position.y, 
            0, 0, 1
        );
        const rotate = new Matrix3x3(
            Math.cos(this.rotation), -Math.sin(this.rotation), 0,
            Math.sin(this.rotation), Math.cos(this.rotation), 0,
            0, 0, 1
        );

        const thisMatrix = translate.multiply(rotate).multiply(scale);

        if(this.parent) {
            return this.parent.getTransformationMatrix().multiply(thisMatrix);
        } else {
            return thisMatrix;
        }
    }

    getChildren(): Transform[] {
        const gameObjects = this.gameObject.engine.gameObjects.filter(gameObject => gameObject.transform.parent === this);
        return gameObjects.map(go => go.transform)
    }

    setParent(t: Transform) {
        this.parent = t;
    }

    beforeDraw(g: Graphics) {
        g.save();
        g.setTransformationMatrix(this.getTransformationMatrix());
    }

    update() {
        for(const child of this.getChildren()) {
            child.gameObject.update();
        }
    }

    afterDraw(g: Graphics) {
        for(const child of this.getChildren()) {
            child.gameObject.draw(g);
        }

        g.restore();
    }

}

export default Transform;