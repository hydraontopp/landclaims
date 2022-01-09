import {
  events,
} from 'beapi-core'
import {
  isCordInClaim,
  showBorder,
} from '../utils/index.js'

events.on("BlockDestroyed", (data) => {
  // TODO: Cancel event once we are able to. Big brain mojang is returning the block as air :)
  const check = isCordInClaim({
    x: data.block.location.x,
    z: data.block.location.z,
  }, data.player.getName())
  if (!check.is) return
  data.player.executeCommand(`titleraw @s actionbar {"rawtext":[{"text":"§c§lYou don't have permission to do that action in ${check.owner}'s claim!§r"}]}`)
  showBorder(data.player, {
    owner: check.owner,
    x: check.pos.x,
    z: check.pos.z,
  })
})