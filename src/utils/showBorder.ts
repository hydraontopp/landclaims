import {
  executeCommand,
  Player,
  setTimeout,
} from 'beapi-core'
import {
  range,
} from './range.js'
import {
  claimRadius,
  borderParticle,
} from '../index.js'

let cooldown = false
export function showBorder(player: Player, pos: {x: number, z: number, owner: string}): void {
  if (cooldown) return
  cooldown = true
  const cords1 = range(pos.x - claimRadius, pos.x + claimRadius)
  const cords2 = range(pos.z - claimRadius, pos.z + claimRadius)
  for (const cord of cords1) {
    executeCommand(`particle ${borderParticle} ${cord} ${player.getLocation().y + 2} ${pos.z - claimRadius}`, player.getDimensionName())
    executeCommand(`particle ${borderParticle} ${cord} ${player.getLocation().y + 2} ${pos.z + claimRadius}`, player.getDimensionName())
  }
  for (const cord of cords2) {
    executeCommand(`particle ${borderParticle} ${pos.x - claimRadius} ${player.getLocation().y + 2} ${cord}`, player.getDimensionName())
    executeCommand(`particle ${borderParticle} ${pos.x + claimRadius} ${player.getLocation().y + 2} ${cord}`, player.getDimensionName())
  }
  startCooldown()
}

// Cooldown for the claim border
function startCooldown(): void {
  setTimeout(() => {
    cooldown = false
  }, 10)
}
