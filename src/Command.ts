import {
  commands,
} from 'beapi-core'
import {
  claimRadius,
} from './index.js'
import {
  isCordInClaim,
  checkArea,
  getAllClaims,
} from './utils/index.js'
import {
  Claim,
} from './Claim.js'
import {
  claims,
} from './Database.js'

commands.registerCommand({
  command: "claims",
  description: "Main command to interact with the claims plugin.",
  aliases: [
    "c",
    "cm",
  ],
}, (data) => {
  if (!data.args[0]) return data.sender.sendMessage("§cInvalid parameter! Expected <set|delete|add-member|remove-member>")
  switch (data.args[0]) {
  default:
    data.sender.sendMessage("§cInvalid parameter! Expected <set|delete|add-member|remove-member>")
    break
  case "set":
    if (claims.getEntries().has(data.sender.getName())) {
      data.sender.sendMessage("You already have a claim!")
    } else {
      if (isCordInClaim({
        x: data.sender.getLocation().x,
        z: data.sender.getLocation().z,
      }, data.sender.getName()).is || isCordInClaim({
        x: data.sender.getLocation().x + claimRadius,
        z: data.sender.getLocation().z + claimRadius,
      }, data.sender.getName()).is || isCordInClaim({
        x: data.sender.getLocation().x - claimRadius,
        z: data.sender.getLocation().z - claimRadius,
      }, data.sender.getName()).is || isCordInClaim({
        x: data.sender.getLocation().x + claimRadius,
        z: data.sender.getLocation().z - claimRadius,
      }, data.sender.getName()).is || isCordInClaim({
        x: data.sender.getLocation().x - claimRadius,
        z: data.sender.getLocation().z + claimRadius,
      }, data.sender.getName()).is) {
        return data.sender.sendMessage("§cYou are too close to another claim!")
      }
      data.sender.sendMessage(`§aSuccessfully made your claim! The center of your claim is at §7${data.sender.getLocation().x} ${data.sender.getLocation().y} ${data.sender.getLocation().z}§a.`)
      new Claim({
        owner: data.sender.getName(),
        dimension: data.sender.getDimensionName(),
        pos: data.sender.getLocation(),
      })
    }
    break
  case "delete":
    const claimPos = []
    for (const [owner, claim] of getAllClaims()) {
      if (owner !== "NotPMK") continue
      claimPos.push({
        x: claim.pos.x,
        z: claim.pos.z,
        owner,
      })
    }
    for (const pos of claimPos) {
      if (checkArea([pos.x - claimRadius, pos.z - claimRadius], [pos.x + claimRadius, pos.z + claimRadius], [data.sender.getLocation().x, data.sender.getLocation().z])) {
        const claim = getAllClaims().get("NotPMK") //data.sender.getName()
        claim.destroy()
        data.sender.sendMessage("§aYour claim has be removed.")
      } else {
        if (data.sender.hasTag("inClaim")) return data.sender.sendMessage("§cYou don't own this claim!")

        return data.sender.sendMessage("§cYou aren't in a claim! You must be inside of the claim you want to remove.")
      }
    }
    break
  case "add-member":
    break
  }
})