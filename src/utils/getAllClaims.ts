import {
  Claim,
} from '../Claim.js'
import {
  claims,
} from '../Database.js'

export function getAllClaims(): Map<string, Claim> {
  const knownclaims = new Map<string, Claim>()
  for (const [owner, entry] of claims.getEntries()) {
    knownclaims.set(owner, new Claim({
      owner: owner,
      pos: entry.value.pos,
      dimension: entry.value.dimension,
    }, true))
  }

  return knownclaims
}