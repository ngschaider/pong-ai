import GameObject from "../engine/core/GameObject";
import StringBuilder from "../utils/StringBuilder";

class HierarchyLogger extends GameObject {

    update() {
        super.update();

        const sb = new StringBuilder();

        const helper = (go: GameObject) => {
            sb.addLine(go.name + " (" + go.constructor.name + ")");
            sb.indent();
            for(const child of go.transform.getChildren()) {
                helper(child.gameObject);
            }
            sb.unindent();
        }

        for(const rootObject of this.scene.getRootObjects()) {
            helper(rootObject);
        }

        console.log(sb.build());
    }



}

export default HierarchyLogger;