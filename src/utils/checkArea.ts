import {
  between,
} from 'beapi-core'

export function checkArea(a: [number, number], b: [number, number], event: [number, number]): boolean {
  const [ax, az] = a
  const [bx, bz] = b
  const [ex, ez] = event

  return between(ax, bx, ex) && between(az, bz, ez)
}