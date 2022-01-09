import {
  events,
  Player,
} from 'beapi-core'
import {
  isCordInClaim,
  showBorder,
} from '../utils/index.js'
import {
  staffTag,
} from '../index.js'

events.on("ItemUseOn", (data) => {
  const player = data.source as Player
  if (player.hasTag(staffTag)) return
  const check = isCordInClaim({
    x: data.block.location.x,
    z: data.block.location.z,
  }, player.getName())
  if (!check.is) return
  player.executeCommand(`titleraw @s actionbar {"rawtext":[{"text":"§c§lYou don't have permission to do that action in ${check.owner}'s claim!§r"}]}`)
  showBorder(player, {
    owner: check.owner,
    x: check.pos.x,
    z: check.pos.z,
  })
  data.cancelEvent()
})