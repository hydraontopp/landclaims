import { Database } from './database/Database.js'
import { Commands } from './commands/Commands.js'
import { Listeners } from './listeners/listeners.js'

export class Claims {
  public readonly database: Database
  public readonly commands: Commands
  public readonly listeners: Listeners
  public options = {
    radius: 25,
    borderParticle: "minecraft:heart_particle"
  }

  constructor () {
    this.database = new Database()
    this.commands = new Commands(this)
    this.listeners = new Listeners(this)
  }
}

export const claims = new Claims
