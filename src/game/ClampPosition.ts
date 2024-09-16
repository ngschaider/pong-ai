import Component from "../engine/Component";

// TODO: allow minimum and maximum to work independently of each other (only setting a minimum or only setting maximum should be allowed)
class ClampPosition extends Component {

    clampXMin?: number;
    clampXMax?: number;
    clampYMin?: number;
    clampYMax?: number;

    update(): void {
        if(this.clampXMin && this.clampXMax) {
            this.gameObject.transform.position = this.gameObject.transform.position.clampX(this.clampXMin, this.clampXMax);
        }

        if(this.clampYMin && this.clampYMax) {
            this.gameObject.transform.position = this.gameObject.transform.position.clampY(this.clampYMin, this.clampYMax);
        }
        
    }

}

export default ClampPosition;