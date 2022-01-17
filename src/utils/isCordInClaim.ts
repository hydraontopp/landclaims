import { checkArea } from './checkArea.js'
import { claimsCollection } from '../database/Database.js'
import { claims } from '../index.js'
import { claim } from '../types/claim.i.js'

export function isCordInClaim(loc: {x: number, z: number}, player: string): {is: boolean, claim?: claim} {
  const claimRadius = claims.options.radius
  // for (const [, claim] of ) {
  //   // if (/*claim.owner === player ||*/ claim.members.includes(player)) return {
  //     // is: false,
  //     // pos: {
  //       // x: claim.pos.x,
  //       // z: claim.pos.z,
  //     // },
  //     // id: claim.id,
  //     // owner: claim.owner
  //   // }
  //   enemyClaimPos.push({
  //     x: claim.pos.x,
  //     z: claim.pos.z,
  //     id: claim.id,
  //     owner: claim.owner
  //   })
  // }
  for (const [, claim] of claimsCollection.entries()) {
    // TODO: Return if memeber
    if (checkArea([claim.pos.x - claimRadius, claim.pos.z - claimRadius], [claim.pos.x + claimRadius, claim.pos.z + claimRadius], [loc.x, loc.z])) {
      return {
        is: true,
        claim,
      }
    }
  }

  return {
    is: false,
  }
}