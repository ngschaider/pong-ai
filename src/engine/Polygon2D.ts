import Vector2 from "../utils/Vector2";

class Polygon2D {

    vertices: Vector2[] = [];

    constructor(vertices: Vector2[]) {
        this.vertices = vertices;
    }


    getEdges(): Vector2[] {
        const edges: Vector2[] = [];

        for(let i = 0; i < this.vertices.length; i++) {
            const v1 = this.vertices[i];
            const v2 = this.vertices[(i + 1) % this.vertices.length];

            const edge = v2.sub(v1);
            edges.push(edge);
        }

        return edges;
    }

    project(axis: Vector2): number[] {
        return this.vertices.map(vertex => vertex.dot(axis))
    }

    getArithmeticMean(): Vector2 {
        let sum = new Vector2(0, 0);

        for(const vertex of this.vertices) {
            sum = sum.add(vertex);
        }

        return sum.div(this.vertices.length);
    }

    getClosestVertex(point: Vector2): Vector2 {
        let minDistance = Infinity;
        let index = -1;

        for(let i = 0; i < this.vertices.length; i++) {
            const vertex = this.vertices[i];
            const distance = point.distance(vertex);

            if(distance < minDistance) {
                minDistance = distance;
                index = i;
            }
        }

        return this.vertices[index];
    }

}

export default Polygon2D;