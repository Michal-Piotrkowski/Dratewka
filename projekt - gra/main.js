import locations from "./assets/locations.json" assert {type: "json"}
import items from "./assets/items.json" assert {type: "json"}
import items_locations from "./assets/items_locations.json" assert {type: "json"}
import dependencies from "./assets/dependencies.json" assert {type: "json"}
import { Location, Item } from "./Map.js"
import Game from "./Game.js"
import Input from "./Input.js"

let start = new Game(locations, items, items_locations, dependencies)
start.init()
