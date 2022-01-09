import "./listeners/index.js"
import "./Command.js"
import {
  getAllClaims,
  isCordInClaim,
} from './utils/index.js'

let claimRadius = 25
let staffTag = "admin"
let borderParticle = "minecraft:heart_particle"

interface options {
  claimRadius: number
  staffTag: string
  borderParticle: string
}

function updateOptions(options: options): void {
 claimRadius = options.claimRadius
 staffTag = options.staffTag
 borderParticle = options.borderParticle
}

export {
  claimRadius,
  staffTag,
  borderParticle,
}

export const Claims = {
  updateOptions,
  getAllClaims,
  isCordInClaim,
}