import {
  events,
  players,
} from 'beapi-core'
import {
  isCordInClaim,
  showBorder,
} from '../utils/index.js'
import {
  staffTag,
} from '../index.js'

events.on("tick", (tick) => {
  if (tick % 5 != 0) return
  for (const [, player] of players.getPlayerList()) {
    if (player.hasTag(staffTag)) continue
    const check = isCordInClaim({
      x: player.getLocation().x,
      z: player.getLocation().z,
    }, player.getName())
    if (!check.is) {
      if (player.getGamemode() === "survival") return
      player.sendMessage("§7You have just entered the §cWild§7.")
      player.removeTag("inClaim")
      player.executeCommand("gamemode s")
      showBorder(player, {
        owner: check.owner,
        x: check.pos.x,
        z: check.pos.z,
      })
    } else {
      if (player.getGamemode() === "adventure") return
      player.sendMessage(`§7You have just entered §a${check.owner}'s§7 claim.`)
      player.addTag("inClaim")
      player.executeCommand("gamemode a")
      showBorder(player, {
        owner: check.owner,
        x: check.pos.x,
        z: check.pos.z,
      })
    }
  }
})