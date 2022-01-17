import { Dimension, Location } from "beapi-core"

export interface claim {
  owner: string
  id: string
  pos: Location
  dimension: Dimension
  members: string[]
}
