import { Database as _db, genUuid, Player } from 'beapi-core'
import { claim } from '../types/claim.i.js'

export const db = new _db("landclaims")
export const claimsCollection = db.mount<string, claim>("claims")

export class Database {
  public getClaimsByOwner(owner: string): claim[] | undefined {
    return claimsCollection.values().filter((x) => x.owner === owner)
  }
  public getClaimById(id: string): claim | undefined {
    return claimsCollection.values().find((x) => x.id === id)
  }
  public getMemberClaims(member: string): claim[] | undefined {
    return claimsCollection.values().filter((x) => x.members.includes(member))
  }
  public getAllClaims(): claim[] {
    return claimsCollection.values()
  }
  public addClaim(player: Player): claim | undefined {
    const id = genUuid()
    if (claimsCollection.has(id)) return console.error(`[§9landclaims§r] A claim with the id "${id}" already exists!`) as undefined
    claimsCollection.set(id, {
      owner: player.getName(),
      id: id,
      pos: player.getLocation(),
      dimension: player.getDimensionName(),
      members: [],
    })
    claimsCollection.save()

    return claimsCollection.get(id)
  }
  public removeClaim(id: string): void {
    if (!claimsCollection.has(id)) return console.error(`[§9landclaims§r] The claim with the id "${id}" was not found!`)
    claimsCollection.delete(id)
    claimsCollection.save()

    return
  }
}