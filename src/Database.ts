import {
  db,
  Database,
} from 'beapi-core'

let claims: Database
if (db.getAllDatabases().has("claims")) {
  claims = db.mountByName("claims")
} else {
  claims = new Database({
    name: "claims",
  })
}

export {
  claims,
}