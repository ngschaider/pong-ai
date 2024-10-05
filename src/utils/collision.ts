import Vector2 from "./Vector2"

export const collideCircleCircle = (c1: Vector2, d1: number, c2: Vector2, d2: number) => {
    return c1.subtract(c2).magnitude <= d1/2 + d2/2;
};

export const collidePointLine = (p: Vector2, v1: Vector2, v2: Vector2, buffer?: number) => {
    // since floats are so minutely accurate, add a little buffer zone that will give collision
    if (buffer === undefined){ buffer = 0.1; }   // higher # = less accurate

    // get distance from the point to the two ends of the line
    var d1 = p.subtract(v1).magnitude
    var d2 = p.subtract(v2).magnitude

    // get the length of the line
    var lineLen = v1.subtract(v2).magnitude;

    // if the two distances are equal to the line's length, the point is on the line!
    // note we use the buffer here to give a range, rather than one #
    return d1 + d2 >= lineLen - buffer && d1 + d2 <= lineLen + buffer
};

export const collidePointCircle = (p: Vector2, center: Vector2, diameter: number) => {
    return p.subtract(center).magnitude <= diameter/2;
};

export const collideLineCircle = (v1: Vector2,  v2: Vector2,  center: Vector2,  diameter: number) => {
    // is either end INSIDE the circle?
    // if so, return true immediately
    var inside1 = collidePointCircle(v1, center, diameter);
    var inside2 = collidePointCircle(v2, center, diameter);
    if (inside1 || inside2) return true;
  
    // get length of the line
    const len = v1.subtract(v2).magnitude
  
    // get dot product of the line and circle
    var dot = ((center.x-v1.x)*(v2.x-v1.x)) + ((center.y-v1.y)*(v2.y-v1.y)) / len**2;
  
    // find the closest point on the line
    const closest = new Vector2(v1.x + (dot * (v2.x-v1.x)), v1.y + (dot * (v2.y-v1.y)))
  
    // is this point actually on the line segment?
    // if so keep going, but if not, return false
    var onSegment = collidePointLine(closest, v1, v2);
    if (!onSegment) return false;
  
    // get distance to closest point
    if (closest.subtract(center).magnitude <= diameter/2) {
      return true;
    }
    return false;
  }

  export const collidePointPoly = (point: Vector2, poly: Vector2[]): boolean => {
    let collision = false;

    // go through each of the vertices, plus the next vertex in the list
    for (var current = 0; current < poly.length; current++) {
  
      // get next vertex in list if we've hit the end, wrap around to 0
      const next = current + 1 >= poly.length ? 0 : current + 1;
  
      // get the Vectors at our current position this makes our if statement a little cleaner
      var vc = poly[current];    // c for "current"
      var vn = poly[next];       // n for "next"
  
      // compare position, flip 'collision' variable back and forth
      const ySwitches = (vc.y >= point.y && vn.y < point.y) || (vc.y < point.y && vn.y >= point.y)
      if (ySwitches && (point.x < (vn.x-vc.x)*(point.y-vc.y) / (vn.y-vc.y)+vc.x)) {
              collision = !collision;
      }
    }
    return collision;
}

export const collideCirclePoly = (center: Vector2, diameter: number, vertices: Vector2[], interior?: boolean): boolean => {
    if (interior === undefined){
      interior = false;
    }
  
    // go through each of the vertices, plus the next vertex in the list
    for (var current=0; current<vertices.length; current++) {
      // get next vertex in list if we've hit the end, wrap around to 0
      const next = current + 1 >= vertices.length ? 0 : current + 1;
  
      // get the Vectors at our current position this makes our if statement a little cleaner
      var vc = vertices[current];    // c for "current"
      var vn = vertices[next];       // n for "next"
  
      // check for collision between the circle and a line formed between the two vertices
      var collision = collideLineCircle(vc, vn, center,diameter);
      if (collision) return true;
    }
  
    // test if the center of the circle is inside the polygon
    if(interior === true){
      var centerInside = collidePointPoly(center, vertices);
      if (centerInside) return true;
    }
  
    // otherwise, after all that, return false
    return false;
  }