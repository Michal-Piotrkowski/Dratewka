import locations from "./assets/locations.json" assert {type: "json"}
import items from "./assets/items.json" assert {type: "json"}
import items_locations from "./assets/items_locations.json" assert {type: "json"}
import dependencies from "./assets/dependencies.json" assert {type: "json"}
import { Location, Item, ItemsLoc, Dependency } from "./Map.js"
import Input from "./Input.js"
import LevelTransition from "./LevelTransition.js"

class Game {
    constructor(locations, items, items_locations, dependencies) {
        this.map = []
        this.items_tab = []
        this.items_locations_tab = []
        this.dependencies_tab = []
        this.locations = locations
        this.items = items
        this.items_locations = items_locations
        this.dependencies = dependencies
        this.input
        this.start_position = { i: 3, j: 6 }
        this.current_position
        this.backpack = []
        this.ok = 0
        this.isDragonDead;
    }

    init() {
        this.makeMap()
        this.makeItems()
        this.makeDependencies()
        this.intro()
        window.addEventListener("keydown", (e) => {
            document.getElementById("terminal").focus()
            if (e.key != "Enter") return
            this.input = new Input(this.map, this.current_position, this.items_locations_tab, this.items_tab, this.backpack, this.dependencies_tab, this.ok, this.isDragonDead)
            this.input.getValue()
            this.leveltransition = new LevelTransition(this.map, this.current_position, this.items_tab, this.backpack, this.isDragonDead)
            this.leveltransition.changeScreen()
        })
    }

    makeMap() {
        let i = 0;
        let j = 0;
        let pomoc = 0;
        for (let i = 0; i < 6; i++) {
            this.map[i] = []
            for (let j = 0; j < 7; j++) {
                if (j >= 0 && j <= 2 && i == 4 || j >= 0 && j <= 2 && i == 5) {
                    this.map[i][j] = new Location(" ")
                }
                else {
                    this.map[i][j] = new Location(this.locations[pomoc])
                    pomoc += 1
                }
            }
        }

        this.current_position = this.start_position
    }

    makeItems() {
        for (let i = 0; i < this.items.length; i++) {
            this.items_tab[i] = { item: new Item(this.items[i]), item_loc: new ItemsLoc(this.items_locations[i]) }
        }
    }

    makeDependencies() {
        for (let i = 0; i < this.dependencies.length; i++) {
            this.dependencies_tab[i] = new Dependency(this.dependencies[i])
        }
    }

    intro() {
        var audio = new Audio('hejnal.mp3');
        audio.addEventListener('loadeddata', () => {
            audio.play();
        })
        document.getElementById("compass").style.display = "none"
        document.getElementById("screen").style.display = "none"
        document.getElementById("terminal").style.display = "none"
        const intro = setTimeout(this.show1, 1000)
        const intro2 = setTimeout(this.show2, 5000)
        document.getElementById("location_name").innerHTML = "CLICK ENTER"
        window.addEventListener("keydown", (e) => {
            document.getElementById("terminal").focus()
            if (e.key != "Enter") return
            audio.pause();
            audio.currentTime = 0;
            document.getElementById("compass").style.display = "block"
            document.getElementById("screen").style.display = "block"
            document.getElementById("terminal").style.display = "block"
            document.getElementById("all").style.display = "none"
        })

    }

    show1() {
        document.getElementById("all").style.backgroundImage = "url(\'img/show1.jpg\') "
    }
    show2() {
        document.getElementById("all").style.backgroundImage = "url(\'img/show2.jpg\') "
    }
}
export default Game
