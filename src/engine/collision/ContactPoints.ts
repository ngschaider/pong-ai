import NumberUtils from "../../utils/NumberUtils";
import Vector2 from "../../utils/Vector2";
import Polygon from "../Polygon";

class ContactPoints {

    private static pointLineDistance(p: Vector2, a: Vector2, b: Vector2): Vector2 {
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

    public static polygonPolygon(polygonA: Polygon, polygonB: Polygon): Vector2[] {
        let contact1 = Vector2.zero;
        let contact2 = Vector2.zero;
        let contactCount = 0;

        let minDistSq = Infinity;

        for(const point of polygonA.vertices) {
            for(let i = 0; i < polygonB.vertices.length; i++) {
                const va = polygonB.vertices[i];
                const vb = polygonB.vertices[(i + 1) % polygonB.vertices.length];
    
                const cp = this.pointLineDistance(point, va, vb);
                const distSq = point.subtract(cp).magnitudeSquared;
    
                if(NumberUtils.nearlyEquals(distSq, minDistSq)) {
                    if(!cp.nearlyEquals(contact1)) {
                        contact2 = cp;
                        contactCount = 2;
                    }
                } else if(distSq < minDistSq) {
                    minDistSq = distSq;
                    contact1 = cp;
                    contactCount = 1;
                }
            }
        }

        for(const point of polygonB.vertices) {
            for(let i = 0; i < polygonA.vertices.length; i++) {
                const va = polygonA.vertices[i];
                const vb = polygonA.vertices[(i + 1) % polygonA.vertices.length];
    
                const cp = this.pointLineDistance(point, va, vb);
                const distSq = point.subtract(cp).magnitudeSquared;
    
                if(NumberUtils.nearlyEquals(distSq, minDistSq)) {
                    if(!cp.nearlyEquals(contact1)) {
                        contact2 = cp;
                        contactCount = 2;
                    }
                } else if(distSq < minDistSq) {
                    minDistSq = distSq;
                    contact1 = cp;
                    contactCount = 1;
                }
            }
        }

        if(contactCount == 0) {
            return [];
        } else if(contactCount == 1) {
            return [contact1];
        } else if(contactCount == 2) {
            return [contact1, contact2]
        } else {
            throw new Error();
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
            const contact = this.pointLineDistance(circleCenter, va, vb);
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