import { Coords } from "./types";

export const exponentialRandom = () => -Math.log(1 - Math.random());

export function pythag(x: number, y: number) {
  return Math.sqrt(x**2 + y**2)
}

export function angle(y: number, x: number) {
  return Math.atan2(x, -y);
}

export const randomAngle = () => Math.random() * Math.PI * 2;

export function randomBool(x: number) {
  return Math.random() < x;
}

export const minMax = (x: number, y: number, z: number) => Math.max(x, Math.min(y, z))

// Coords

export const diffXY = (a: Coords, b: Coords) => ({
  dx: a.x - b.x,
  dy: a.y - b.y
});

export function distance(a: Coords, b: Coords) {
  const { dy, dx } = diffXY(a, b);
  return pythag(dx, dy);
}

export function ratioXY(a: Coords, b: Coords) {
  const { dx, dy } = diffXY(a, b);
  const z = Math.abs(dx) + Math.abs(dy);
  return {
    rx: dx / z,
    ry: dy / z
  }
}

export function coordsAngle(a: Coords, b: Coords) {
  const { dx, dy } = diffXY(a, b);
  return angle(dy, dx);
}

export const angleCoords = (a: number) => ({
  x: Math.sin(a),
  y: -Math.cos(a)
})

export function vectorAdd(a: Coords, b: Coords) {
  a.x += b.x;
  a.y += b.y;
}

export function vectorSub(a: Coords, b: Coords) {
  a.x -= b.x;
  a.y -= b.y;
}

export function vectorScale(a: Coords, x: number) {
  a.x *= x;
  a.y *= x;
}

// Trajectory

const peak = (1/3)**(1/2)-(1/3)**(3/2);

export function trajectory(x: number) {
  return (x-x**3)/peak
}