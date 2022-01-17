import { client, Player } from 'beapi-core'
import { Claims } from '../index.js'
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
        const check = isCordInClaim({
          x: player.getLocation().x,
          z: player.getLocation().z,
        }, player.getName())
        if (!check.is) {
          const tag = player.getTags().find((x) => x.startsWith('claim:'))
          if (!tag) return
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
          if (tag) return
          player.sendMessage(`§7You have just entered §a${check.claim.owner}'s§7 claim.`)
          player.addTag(`claim:${check.claim.id}`)
          showBorder(player, {
            owner: check.claim.owner,
            x: check.claim.pos.x,
            z: check.claim.pos.z,
          })
        }
      }
    })
  }
  private verify(): void {
    client.on("Tick", (tick) => {
      if (tick.currentTick % 5 != 0) return
      for (const [, player] of client.players.getAll()) {
        const check = isCordInClaim({
          x: player.getLocation().x,
          z: player.getLocation().z,
        }, player.getName())
        if (check.is) {
          const tag = player.getTags().find((x) => x.startsWith('claim:'))
          if (!tag) return
          const claim = this.claims.database.getClaimById(tag.replace('claim:', ''))
          if (claim.id === check.claim.id) return
          player.removeTag(tag)
        }
      }
    })
  }
  private itemInteract(): void {
    client.on('ItemInteract', (data) => {
      const player = data.source as Player
      const check = isCordInClaim({
        x: data.block.location.x,
        z: data.block.location.z,
      }, player.getName())
      if (!check.is) return
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
      const check = isCordInClaim({
        x: data.blockLocation.x,
        z: data.blockLocation.z,
      }, player.getName())
      if (!check.is) return
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