import { client } from 'beapi-core'
import { Claims } from "../index.js"
import { isCordInClaim } from '../utils/isCordInClaim.js'

export class Commands {
  private claims: Claims
  public enabled = true

  constructor (_claims: Claims) {
    this.claims = _claims
    this.register()
  }
  private register(): void {
    client.commands.register({
      name: "claims",
      description: "Main command to interact with the claims plugin.",
      aliases: [
        "c",
        "cm",
      ],
    }, (data) => {
      if (!this.enabled) return
      if (!data.args[0]) return data.sender.sendMessage("§cInvalid parameter! Expected <set|delete|add-member|remove-member>")
      switch (data.args[0]) {
      default:
        data.sender.sendMessage("§cInvalid parameter! Expected <set|delete|add-member|remove-member>")
        break
      case "set":
        const check = isCordInClaim({
          x: data.sender.getLocation().x,
          z: data.sender.getLocation().z
        }, data.sender.getName())
        if (check.is) return data.sender.sendMessage("§cYou are too close to another claim!")
        const claim = this.claims.database.addClaim(data.sender)
        data.sender.sendMessage(`§aYou have successfully set a claim at §7${claim.pos.x}, ${claim.pos.y}, ${claim.pos.z}§a.`)
        break
      case "delete":
        break
      case "add-member":
        break
      case "l":
        data.sender.sendMessage(`${this.claims.database.getAllClaims().length}`)
        break
      }
    })
  }
}
