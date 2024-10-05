import Polygon from "../engine/Polygon";
import Rect from "../engine/Rect";
import Vector2 from "./Vector2"

export const collideRectRect = function (r1: Rect, r2: Rect) {
  //2d
  if (r1.right >= r2.left &&    // r1 right edge past r2 left
	  r1.left <= r2.right &&    // r1 left edge past r2 right
	  r1.top >= r2.bottom &&    // r1 top edge past r2 bottom
	  r1.bottom <= r2.top) {    // r1 bottom edge past r2 top
		return true;
  }
  return false;
};

export const collideRectCircle = function (rect: Rect, circlePosition: Vector2, diameter: number) {
  //2d
  // temporary variables to set edges for testing
  let testX = circlePosition.x;
  let testY = circlePosition.y;

  // which edge is closest?
  if (circlePosition.x < rect.left){         
	// left edge
	testX = rect.left;       
  } else if (circlePosition.x > rect.right){ 
	// right edge
	testX = rect.right
  }   

  if (circlePosition.y < rect.bottom){
	// top edge
	testY = rect.bottom;       
  } else if (circlePosition.y > rect.top) {  
	// bottom edge
	testY = rect.top;
  }   

  // // get distance from closest edges
  const distance = circlePosition.subtract(new Vector2(testX, testY)).magnitude;

  // if the distance is less than the radius, collision!
  return distance <= diameter/2;
};

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

  export const collidePointPoly = (point: Vector2, poly: Polygon): boolean => {
	let collision = false;

	// go through each of the vertices, plus the next vertex in the list
	for (var current = 0; current < poly.vertices.length; current++) {
  
	  // get next vertex in list if we've hit the end, wrap around to 0
	  const next = current + 1 >= poly.vertices.length ? 0 : current + 1;
  
	  // get the Vectors at our current position this makes our if statement a little cleaner
	  var vc = poly.vertices[current];    // c for "current"
	  var vn = poly.vertices[next];       // n for "next"
  
	  // compare position, flip 'collision' variable back and forth
	  const ySwitches = (vc.y >= point.y && vn.y < point.y) || (vc.y < point.y && vn.y >= point.y)
	  if (ySwitches && (point.x < (vn.x-vc.x)*(point.y-vc.y) / (vn.y-vc.y)+vc.x)) {
			  collision = !collision;
	  }
	}
	return collision;
}

export const collideCirclePoly = (center: Vector2, diameter: number, poly: Polygon): boolean => {
	// go through each of the vertices, plus the next vertex in the list
	for (var current = 0; current < poly.vertices.length; current++) {
	  // get next vertex in list if we've hit the end, wrap around to 0
	  const next = current + 1 >= poly.vertices.length ? 0 : current + 1;
  
	  // get the Vectors at our current position this makes our if statement a little cleaner
	  var vc = poly.vertices[current];    // c for "current"
	  var vn = poly.vertices[next];       // n for "next"
  
	  // check for collision between the circle and a line formed between the two vertices
	  var collision = collideLineCircle(vc, vn, center,diameter);
	  if (collision) return true;
	}
  
	// test if the center of the circle is inside the polygon
	if (collidePointPoly(center, poly)) {
		return true;
	}
  
	// otherwise, after all that, return false
	return false;
  }

  export const collideLineLine = function(p1: Vector2, p2: Vector2, p3: Vector2, p4: Vector2) {

	var intersection;
  
	// calculate the distance to intersection point
	var uA = ((p4.x-p3.x)*(p1.y-p3.y) - (p4.y-p3.y)*(p1.x-p3.x)) / ((p4.y-p3.y)*(p2.x-p1.x) - (p4.x-p3.x)*(p2.y-p1.y));
	var uB = ((p2.x-p1.x)*(p1.y-p3.y) - (p2.y-p1.y)*(p1.x-p3.x)) / ((p4.y-p3.y)*(p2.x-p1.x) - (p4.x-p3.x)*(p2.y-p1.y));
  
	// if uA and uB are between 0-1, lines are colliding
	if (uA >= 0 && uA <= 1 && uB >= 0 && uB <= 1) {
		return true;
	}

	return false;
  }

  export const collideLinePoly = function(p1: Vector2, p2: Vector2, poly: Polygon) {

	// go through each of the vertices, plus the next vertex in the list
	var next = 0;
	for (var current = 0; current < poly.vertices.length; current++) {
  
	  // get next vertex in list if we've hit the end, wrap around to 0
	  next = current+1;
	  if (next === poly.vertices.length) next = 0;
  
	  // get the PVectors at our current position extract X/Y coordinates from each
	  const p3 = poly.vertices[current];
	  const p4 = poly.vertices[next];
  
	  // do a Line/Line comparison if true, return 'true' immediately and stop testing (faster)
	  if (collideLineLine(p1, p2, p3, p4)) {
		return true;
	  }
	}
	// never got a hit
	return false;
  }

  export const collidePolyPoly = function(p1: Polygon, p2: Polygon) {
	// go through each of the vertices, plus the next vertex in the list
	let next = 0;
	for (let current = 0; current < p1.vertices.length; current++) {

		// get next vertex in list, if we've hit the end, wrap around to 0
		next = current+1;
		if (next === p1.vertices.length) next = 0;

		// get the PVectors at our current position this makes our if statement a little cleaner
		var vc = p1.vertices[current];    // c for "current"
		var vn = p1.vertices[next];       // n for "next"

		//use these two points (a line) to compare to the other polygon's vertices using polyLine()
		var collision = collideLinePoly(vc.x,vc.y,vn.x,vn.y,p2);
		if (collision) return true;
		
		//check if the either polygon is INSIDE the other
	
		if(collidePointPoly(p2.vertices[0], p1)) {
			return true;
		}
		if(collidePointPoly(p1.vertices[0], p2)) {
			return true;
		}
	}
  
	return false;
  }