import {
  Location,
  Dimensions,
  entry,
} from 'beapi-core'
import {
  claims,
} from './Database.js'

interface ClaimOptions {
  pos: Location
  dimension: Dimensions
  owner: string
}

export class Claim {
  public readonly pos: Location
  public readonly dimension: Dimensions
  public readonly owner: string
  private dbEntry: entry

  constructor(options: ClaimOptions, mount = false) {
    this.pos = options.pos
    this.dimension = options.dimension
    this.owner = "NotPMK" // this.owner
    if (mount) {
      this.dbEntry = claims.getEntries().get(this.owner)
    } else {
      claims.addEntry({
        name: this.owner,
        value: {
          owner: this.owner,
          dimension: this.dimension,
          pos: this.pos,
          members: [],
        },
      })
      this.dbEntry = claims.getEntries().get(this.owner)
    }
  }
  public addMemeber(player: string): void {
    const members = this.dbEntry.value.members.push(player)
    claims.removeEntry(this.owner)
    claims.addEntry({
      name: this.owner,
      value: {
        owner: this.owner,
        dimension: this.dimension,
        pos: this.pos,
        members: members,
      },
    })
  }
  public removeMember(player: string): void {
    const members = this.dbEntry.value.members.filter((x: any) => x !== player)
    claims.removeEntry(this.owner)
    claims.addEntry({
      name: this.owner,
      value: {
        owner: this.owner,
        dimension: this.dimension,
        pos: this.pos,
        members: members,
      },
    })
  }
  public destroy(): void {
    claims.removeEntry(this.owner)
  }
  public getMemebers(): string[] {
    return this.dbEntry.value.members
  }
}