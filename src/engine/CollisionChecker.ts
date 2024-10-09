import CircleCollider from "./CircleCollider";
import Collider from "./Collider";
import Polygon from "./Polygon";
import PolygonCollider from "./PolygonCollider";
import Collision from "../utils/Collision";
import Vector2 from "../utils/Vector2";
import RigidBody from "./RigidBody";
import Rect from "./Rect";

type CollisionTestResult = {
    depth: number, 
    normal: Vector2
} | false;

class CollisionChecker {

    private static findCircleCircleContactPoint(centerA: Vector2, radiusA: number, centerB: Vector2): Vector2 {
        const dir = centerB.subtract(centerA).normalize();

        return dir.scalarMul(radiusA);
    }

    public static checkCollision(bodyA: Collider, bodyB: Collider): Collision|null {
        const boxA = bodyA.getWorldAABB();
        const boxB = bodyB.getWorldAABB();

        if(!this.areRectsIntersecting(boxA, boxB)) {
            return null;
        }

        if(bodyA instanceof CircleCollider && bodyB instanceof CircleCollider) { // Circle <-> Circle
            const info = this.circleCircle(bodyA.globalPosition, bodyA.globalRadius, bodyB.globalPosition, bodyB.globalRadius);
            const contact = this.findCircleCircleContactPoint(bodyA.globalPosition, bodyA.globalRadius, bodyB.globalPosition);
            return info ? new Collision(bodyA, bodyB, info.depth, info.normal, [contact]) : null;
        }
        if(bodyA instanceof PolygonCollider && bodyB instanceof PolygonCollider) { // Polygon <-> Polygon
            const info = this.polygonPolygon(bodyA.getWorldPolygon(), bodyB.getWorldPolygon());
            return info ? new Collision(bodyA, bodyB, info.depth, info.normal, []): null;
        }
        if((bodyA instanceof CircleCollider && bodyB instanceof PolygonCollider)) { // Circle <-> Polygon
            const info = this.circlePolygon(bodyA.globalPosition, bodyA.globalRadius, bodyB.getWorldPolygon());
            return info ? new Collision(bodyA, bodyB, info.depth, info.normal, []): null;
        }
        if((bodyA instanceof PolygonCollider && bodyB instanceof CircleCollider)) { // Polygon <-> Circle
            const info = this.circlePolygon(bodyB.globalPosition, bodyB.globalRadius, bodyA.getWorldPolygon());
            return info ? new Collision(bodyB, bodyA, info.depth, info.normal, []): null;
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

        const normal = dist === 0 ? new Vector2(0, -1) : center2.subtract(center1);

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
    private static polygonPolygon(polygonA: Polygon, polygonB: Polygon): CollisionTestResult {
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

        const dir = centerB.subtract(centerA);

        if(dir.dot(resolutionNormal) < 0) {
            resolutionNormal = resolutionNormal.scalarMul(-1);
        }

        return {
            normal: resolutionNormal,
            depth: minDepth,
        };
    }

    private static circlePolygon(circleCenter: Vector2, circleRadius: number, polygon: Polygon): CollisionTestResult {
        let resolutionNormal = Vector2.zero;
        let minDepth = Infinity;

        // for each edge, get the normal vector
        // Flächennormalvektor (zeigt aus dem Material heraus)
        const axes: Vector2[] = polygon.getEdges().map(edge => edge.normal().normalize());

        const cp = polygon.getClosestVertex(circleCenter);
        axes.push(cp.subtract(circleCenter).normalize());

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

        const dir = polygon.getArithmeticMean().subtract(circleCenter);

        if(dir.dot(resolutionNormal) < 0) {
            resolutionNormal = resolutionNormal.scalarMul(-1);
        }

        return {
            normal: resolutionNormal,
            depth: minDepth,
        };
    }

    private static projectCircle(circleCenter: Vector2, circleRadius: number, axis: Vector2): {min: number, max: number} {
        const p1 = circleCenter.subtract(axis.scalarMul(circleRadius))
        const p2 = circleCenter.add(axis.scalarMul(circleRadius))
        
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

export default CollisionChecker;