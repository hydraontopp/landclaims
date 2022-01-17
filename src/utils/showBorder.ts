import { Player, runCommand } from 'beapi-core'
import { claims } from '../index.js'

export const range = (min: number, max: number) => [...Array(max - min + 1).keys()].map(i => i + min)

let cooldown = false
export function showBorder(player: Player, pos: {x: number, z: number, owner: string}): void {
  if (cooldown) return
  cooldown = true
  const claimRadius = claims.options.radius
  const borderParticle = claims.options.borderParticle
  const cords1 = range(pos.x - claimRadius, pos.x + claimRadius)
  const cords2 = range(pos.z - claimRadius, pos.z + claimRadius)
  for (const cord of cords1) {
    runCommand(`particle ${borderParticle} ${cord} ${player.getLocation().y + 2} ${pos.z - claimRadius}`)
    runCommand(`particle ${borderParticle} ${cord} ${player.getLocation().y + 2} ${pos.z + claimRadius}`)
  }
  for (const cord of cords2) {
    runCommand(`particle ${borderParticle} ${pos.x - claimRadius} ${player.getLocation().y + 2} ${cord}`)
    runCommand(`particle ${borderParticle} ${pos.x + claimRadius} ${player.getLocation().y + 2} ${cord}`)
  }
  startCooldown()
}

// Cooldown for the claim border
function startCooldown(): void {
  setTimeout(() => {
    cooldown = false
  }, 10)
}