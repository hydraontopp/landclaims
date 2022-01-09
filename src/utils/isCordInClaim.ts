import {
  getAllClaims,
} from './getAllClaims.js'
import {
  claimRadius,
} from '../index.js'
import {
  checkArea,
} from './checkArea.js'

export function isCordInClaim(loc: {x: number, z: number}, player: string): {is: boolean, owner?: string, pos?: {x: number, z: number}} {
  const enemyClaimPos = []
  for (const [owner, claim] of getAllClaims()) {
    if (owner === player || claim.getMemebers().includes(player)) return {
      is: false,
    }
    enemyClaimPos.push({
      x: claim.pos.x,
      z: claim.pos.z,
      owner,
    })
  }
  for (const pos of enemyClaimPos) {
    if (checkArea([pos.x - claimRadius, pos.z - claimRadius], [pos.x + claimRadius, pos.z + claimRadius], [loc.x, loc.z])) {
      return {
        is: true,
        owner: pos.owner,
        pos: {
          x: pos.x,
          z: pos.z,
        },
      }
    } else {
      return {
        is: false,
        owner: pos.owner,
        pos: {
          x: pos.x,
          z: pos.z,
        },
      }
    }
  }

  return {
    is: false,
    owner: "unknown",
    pos: {
      x: 0,
      z: 0,
    },
  }
}