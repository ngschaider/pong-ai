import { debug } from "..";
import BoxCollider from "../engine/BoxCollider";
import CircleCollider from "../collision/CircleCollider";
import Collider from "../collision/Collider";
import Polygon from "../engine/Polygon";
import PolygonCollider from "../collision/PolygonCollider";
import Collisions from "../collision/Collisions";
import Vector2 from "./Vector2";

type CollisionTestResult = {
    depth: number, 
    normal: Vector2
} | false;

class CollisionChecker {

    public static checkCollision(bodyA: Collider, bodyB: Collider): Collisions|null {
        if(bodyA instanceof CircleCollider && bodyB instanceof CircleCollider) {
            const info = this.circleCircle(bodyA.globalPosition, bodyA.localRadius, bodyB.globalPosition, bodyB.localRadius);
            return info ? new Collisions(bodyA, bodyB, info.depth, info.normal) : null;
        }
        if(bodyA instanceof BoxCollider && bodyB instanceof BoxCollider) {
            const info = this.polygonPolygon(bodyA.getWorldPolygon(), bodyB.getWorldPolygon());
            return info ? new Collisions(bodyA, bodyB, info.depth, info.normal): null;
        };
        if((bodyA instanceof CircleCollider && bodyB instanceof PolygonCollider)) {
            const info = this.circlePolygon(bodyA.globalPosition, bodyA.localRadius, bodyB.getWorldPolygon());
            return info ? new Collisions(bodyA, bodyB, info.depth, info.normal): null;
        };
        if((bodyA instanceof PolygonCollider && bodyB instanceof CircleCollider)) {
            const info = this.circlePolygon(bodyB.globalPosition, bodyB.localRadius, bodyA.getWorldPolygon());
            return info ? new Collisions(bodyB, bodyA, info.depth, info.normal): null;
        };

        throw new Error("Unsupported collision between bodies");
    }

    private static circleCircle(center1: Vector2, radius1: number, center2: Vector2, radius2: number): CollisionTestResult {
        const dist = center1.distance(center2);
        const radii = radius1 + radius2;

        if(dist < radii) {
            return {
                normal: center2.subtract(center1).normalize(),
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