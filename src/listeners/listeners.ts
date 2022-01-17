import { client, Player } from 'beapi-core'
import { Claims, claims } from '../index.js'
import { isCordInClaim } from '../utils/isCordInClaim.js'
import { showBorder } from '../utils/showBorder.js'

export class Listeners {
  private claims: Claims

  constructor (_claims: Claims) {
    this.claims = _claims
    this.tick()
    this.verify()
    this.itemInteract()
    this.blockBreak()
  }
  private tick(): void {
    client.on("Tick", (tick) => {
      if (tick.currentTick % 5 != 0) return
      for (const [, player] of client.players.getAll()) {
        if (player.hasTag(claims.options.staffTag)) continue
        const check = isCordInClaim({
          x: player.getLocation().x,
          z: player.getLocation().z,
        })
        if (!check.is) {
          const tag = player.getTags().find((x) => x.startsWith('claim:'))
          if (!tag) continue
          const claim = this.claims.database.getClaimById(tag.replace('claim:', ''))
          player.sendMessage("§7You have just entered the §cWild§7.")
          player.removeTag(tag)
          showBorder(player, {
            owner: claim.owner,
            x: claim.pos.x,
            z: claim.pos.z,
          })
        } else {
          const tag = player.getTags().find((x) => x.startsWith('claim:'))
          if (tag) continue
          player.addTag(`claim:${check.claim.id}`)
          showBorder(player, {
            owner: check.claim.owner,
            x: check.claim.pos.x,
            z: check.claim.pos.z,
          })
          if (check.claim.owner === player.getName()) {
            player.sendMessage(`§7You have just entered §aYour§7 claim.`)
          } else if (check.claim.members.includes(player.getName())) {
            player.sendMessage(`§7You have just entered §e${check.claim.owner}'s§7 claim, which you are a member in.`)
          } else {
            player.sendMessage(`§7You have just entered §4${check.claim.owner}'s§7 claim.`)
          }
        }
      }
    })
  }
  private verify(): void {
    client.on("Tick", (tick) => {
      if (tick.currentTick % 5 != 0) return
      for (const [, player] of client.players.getAll()) {
        if (player.hasTag(claims.options.staffTag)) continue
        const check = isCordInClaim({
          x: player.getLocation().x,
          z: player.getLocation().z,
        })
        if (check.is) {
          const tag = player.getTags().find((x) => x.startsWith('claim:'))
          if (!tag) continue
          const claim = this.claims.database.getClaimById(tag.replace('claim:', ''))
          if (claim.id === check.claim.id) continue
          player.removeTag(tag)
        }
      }
    })
  }
  private itemInteract(): void {
    client.on('ItemInteract', (data) => {
      const player = data.source as Player
      if (player.hasTag(claims.options.staffTag)) return
      const check = isCordInClaim({
        x: data.block.location.x,
        z: data.block.location.z,
      })
      if (!check.is) return
      if (check.claim.owner === player.getName() || check.claim.members.includes(player.getName())) return
      player.executeCommand(`titleraw @s actionbar {"rawtext":[{"text":"§c§lYou don't have permission to do that action in ${check.claim.owner}'s claim!§r"}]}`)
      showBorder(player, {
        owner: check.claim.owner,
        x: check.claim.pos.x,
        z: check.claim.pos.z,
      })

      return data.cancel()
    })
  }
  private blockBreak(): void {
    client.on('BlockDestroyed', (data) => {
      const player = data.player
      if (player.hasTag(claims.options.staffTag)) return
      const check = isCordInClaim({
        x: data.blockLocation.x,
        z: data.blockLocation.z,
      })
      if (!check.is) return
      if (check.claim.owner === player.getName() || check.claim.members.includes(player.getName())) return
      player.executeCommand(`titleraw @s actionbar {"rawtext":[{"text":"§c§lYou don't have permission to do that action in ${check.claim.owner}'s claim!§r"}]}`)
      showBorder(player, {
        owner: check.claim.owner,
        x: check.claim.pos.x,
        z: check.claim.pos.z,
      })

      return data.cancel()
    })
  }
}