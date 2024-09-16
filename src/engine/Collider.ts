import Component from "./Component";

class Collider extends Component {

    onCollision: MyEvent = new MyEvent();

    private currentlyColliding: Collider[] = []

    colliding(collider: Collider) {
        if(!this.currentlyColliding.includes(collider)) {
            this.currentlyColliding.push(collider);
            this.onCollision.emit();
        }
    }

    notColliding(collider: Collider) {
        this.currentlyColliding = this.currentlyColliding.filter(c => c !== collider);
    }

}

export default Collider;