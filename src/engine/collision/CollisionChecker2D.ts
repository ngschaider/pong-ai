import CircleCollider2D from "./CircleCollider2D";
import Collider2D from "./Collider2D";
import PolygonCollider2D from "./PolygonCollider2D";
import Collision2D from "./Collision2D";
import ContactPoints2D from "./ContactPoints2D";
import Vector2 from "../../utils/Vector2";
import Polygon2D from "../Polygon2D";
import Rect from "../Rect";

type CollisionTestResult = {
    depth: number, 
    normal: Vector2
} | false;

class CollisionChecker2D {

    public static checkCollision(bodyA: Collider2D, bodyB: Collider2D): Collision2D|null {
        const boxA = bodyA.getBounds();
        const boxB = bodyB.getBounds();

        if(!this.areRectsIntersecting(boxA, boxB)) {
            return null;
        }

        if(bodyA instanceof CircleCollider2D && bodyB instanceof CircleCollider2D) { // Circle <-> Circle
            const info = this.circleCircle(bodyA.globalPosition, bodyA.globalRadius, bodyB.globalPosition, bodyB.globalRadius);
            const contact = ContactPoints2D.circleCircle(bodyA.globalPosition, bodyA.globalRadius, bodyB.globalPosition);
            return info ? new Collision2D(bodyA, bodyB, info.depth, info.normal, [contact]) : null;
        }
        if(bodyA instanceof PolygonCollider2D && bodyB instanceof PolygonCollider2D) { // Polygon <-> Polygon
            const info = this.polygonPolygon(bodyA.getWorldPolygon(), bodyB.getWorldPolygon());
            const contacts = ContactPoints2D.polygonPolygon(bodyA.getWorldPolygon(), bodyB.getWorldPolygon());
            return info ? new Collision2D(bodyA, bodyB, info.depth, info.normal, contacts): null;
        }
        if((bodyA instanceof CircleCollider2D && bodyB instanceof PolygonCollider2D)) { // Circle <-> Polygon
            const info = this.circlePolygon(bodyA.globalPosition, bodyA.globalRadius, bodyB.getWorldPolygon());
            const contact = ContactPoints2D.circlePolygon(bodyA.globalPosition, bodyA.globalRadius, bodyB.getWorldPolygon())
            return info ? new Collision2D(bodyA, bodyB, info.depth, info.normal, [contact]): null;
        }
        if((bodyA instanceof PolygonCollider2D && bodyB instanceof CircleCollider2D)) { // Polygon <-> Circle
            const info = this.circlePolygon(bodyB.globalPosition, bodyB.globalRadius, bodyA.getWorldPolygon());
            const contact = ContactPoints2D.circlePolygon(bodyB.globalPosition, bodyB.globalRadius, bodyA.getWorldPolygon())
            return info ? new Collision2D(bodyB, bodyA, info.depth, info.normal, [contact]): null;
        }

        throw new Error("Unsupported collision between bodies");
    }

    private static areRectsIntersecting(rect1: Rect, rect2: Rect): boolean {
        if(rect1.right < rect2.left) return false;
        if(rect1.bottom < rect2.top) return false;
        if(rect1.top > rect2.bottom) return false;
        if(rect1.left > rect2.right) return false;

        return true;
    }

    private static circleCircle(center1: Vector2, radius1: number, center2: Vector2, radius2: number): CollisionTestResult {
        const dist = center1.distance(center2);
        const radii = radius1 + radius2;

        const normal = dist === 0 ? new Vector2(0, -1) : center2.sub(center1);

        if(dist < radii) {
            return {
                normal: normal,
                depth: radii - dist,
            }
        } else {
            return false;
        }
    }

    // Uses the separated axis thereom (SAT)
    private static polygonPolygon(polygonA: Polygon2D, polygonB: Polygon2D): CollisionTestResult {
        let resolutionNormal = Vector2.zero;
        let minDepth = Infinity;

        // vertices are ordered clockwise
        const edges: Vector2[] = [
            ...polygonA.getEdges(),
            ...polygonB.getEdges(),
        ];

        // for each edge, get the normal vector
        // Flächennormalvektor (zeigt aus dem Material heraus)
        const axes: Vector2[] = edges.map(edge => edge.normal().normalize());

        // use the normal vectors as a axis, project all vertices and see if there is a gap
        for(const axis of axes) {
            const projectionA = polygonA.project(axis);
            const [minA, maxA] = [Math.min(...projectionA), Math.max(...projectionA)];

            const projectionB = polygonB.project(axis);
            const [minB, maxB] = [Math.min(...projectionB), Math.max(...projectionB)];

            if(minA >= maxB || minB >= maxA) {
                // we have a gap
                return false;
            }

            const axisDepth = Math.min(maxB - minA, maxA - minB);
            if(axisDepth < minDepth) {
                resolutionNormal = axis;
                minDepth = axisDepth;
            }
        }

        const centerA = polygonA.getArithmeticMean();
        const centerB = polygonB.getArithmeticMean();

        const dir = centerB.sub(centerA);

        if(dir.dot(resolutionNormal) < 0) {
            resolutionNormal = resolutionNormal.mul(-1);
        }

        return {
            normal: resolutionNormal,
            depth: minDepth,
        };
    }

    private static circlePolygon(circleCenter: Vector2, circleRadius: number, polygon: Polygon2D): CollisionTestResult {
        let resolutionNormal = Vector2.zero;
        let minDepth = Infinity;

        // for each edge, get the normal vector
        // Flächennormalvektor (zeigt aus dem Material heraus)
        const axes: Vector2[] = polygon.getEdges().map(edge => edge.normal().normalize());

        const cp = polygon.getClosestVertex(circleCenter);
        axes.push(cp.sub(circleCenter).normalize());

        // use the normal vectors as a axis, project all vertices and see if there is a gap
        let i = 0;
        for(const axis of axes) {
            
            i++;

            const {min: minA, max: maxA} = this.projectCircle(circleCenter, circleRadius, axis);

            const projectionB = polygon.project(axis);
            const [minB, maxB] = [Math.min(...projectionB), Math.max(...projectionB)];

            if(minA >= maxB || minB >= maxA) {
                // we have a gap
                return false;
            }

            const axisDepth = Math.min(maxB - minA, maxA - minB);
            if(axisDepth < minDepth) {
                resolutionNormal = axis;
                minDepth = axisDepth;
            }
        }

        const dir = polygon.getArithmeticMean().sub(circleCenter);

        if(dir.dot(resolutionNormal) < 0) {
            resolutionNormal = resolutionNormal.mul(-1);
        }

        return {
            normal: resolutionNormal,
            depth: minDepth,
        };
    }

    private static projectCircle(circleCenter: Vector2, circleRadius: number, axis: Vector2): {min: number, max: number} {
        const p1 = circleCenter.sub(axis.mul(circleRadius))
        const p2 = circleCenter.add(axis.mul(circleRadius))
        
        const min = p1.dot(axis);
        const max = p2.dot(axis);
    
        if(min >= max) {
            throw new Error("Should this be swapped?");
        }

        return {
            min,
            max
        }
    }
}

export default CollisionChecker2D;