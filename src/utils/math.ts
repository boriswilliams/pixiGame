import { Coords } from "./types";

export function pythag(x: number, y: number) {
  return Math.sqrt(x**2 + y**2)
}

export function distance(a: Coords, b: Coords) {
  return pythag(a.x - b.x, a.y - b.y);
}