import Polygon from "../engine/Polygon";
import Vector2 from "../utils/Vector2";

class ContactPoints {

    private static pointSegmentDistance(p: Vector2, a: Vector2, b: Vector2): Vector2 {
        const ab: Vector2 = b.subtract(a);
        const ap: Vector2 = p.subtract(a);

        const proj: number = ap.dot(ab);
        const abLenSq: number = ab.magnitudeSquared;
        const d: number = proj / abLenSq;

        if(d <= 0) {
            return a;
        } else if(d >= 1) {
            return b;
        } else {
            return a.add(ab.scalarMul(d));
        }
    }

    public static circleCircle(centerA: Vector2, radiusA: number, centerB: Vector2): Vector2 {
        const dir = centerB.subtract(centerA).normalize();

        return centerA.add(dir.scalarMul(radiusA));
    }

    public static circlePolygon(circleCenter: Vector2, _circleRadius: number, polygon: Polygon) {
        // const polygonCenter = polygon.getArithmeticMean();

        let minDistSq: number = Infinity;
        let cp: Vector2 = Vector2.zero;

        for(let i = 0; i < polygon.vertices.length; i++) {
            const va = polygon.vertices[i];
            const vb = polygon.vertices[(i + 1) % polygon.vertices.length];
            const contact = this.pointSegmentDistance(circleCenter, va, vb);
            const distSq = circleCenter.distanceSquared(contact);
            if(distSq < minDistSq) {
                minDistSq = distSq;
                cp = contact;
            }
        }

        return cp;
    }

}

export default ContactPoints;