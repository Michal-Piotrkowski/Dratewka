import Game from "./Game.js"

class LevelTransition {
    constructor(map, current_position, items_tab, backpack, isDragonDead) {
        this.map = map
        this.current_position = current_position
        this.items_tab = items_tab
        this.local_items = []
        this.backpack = backpack
        this.isDragonDead = isDragonDead
    }

    showPossibleMoves() {
        let directions = this.map[this.current_position.i][this.current_position.j].route.split("")
        let string = "You can go:"
        if (directions.includes("n")) {
            string += " north, "
            document.getElementById("n").style.display = "none";
        }
        else {
            document.getElementById("n").style.display = "block";
        }
        if (directions.includes("e")) {
            string += " east, "
            document.getElementById("e").style.display = "none";
        }
        else {
            document.getElementById("e").style.display = "block";
        }
        if (directions.includes("w")) {
            string += " west, "
            document.getElementById("w").style.display = "none";
        }
        else {
            document.getElementById("w").style.display = "block";
        }
        if (directions.includes("s")) {
            string += " south, "
            document.getElementById("s").style.display = "none";
        }
        else {
            document.getElementById("s").style.display = "block";
        }
        document.getElementById("possible_directions").innerHTML = string;
    }

    showLocalItems() {
        let items_here = ""
        let tab = []
        tab = this.items_tab.filter(item => item.item_loc.pos.i == this.current_position.i && item.item_loc.pos.j == this.current_position.j && item.item.active == true)
        if (tab.length) {
            tab.forEach(element => {
                items_here += element.item.name + ", "
                document.getElementById("see").innerHTML = "You see " + items_here
            });
        }
        else {
            document.getElementById("see").innerHTML = "See nothing"
        }
    }

    showCarriedItem() {
        if (this.backpack.length) {
            document.getElementById("carry").innerHTML = "You are carrying " + this.backpack[0].item.name_od
        }
        else {
            document.getElementById("carry").innerHTML = "You are carrying nothing"
        }
    }

    changeScreen() {
        document.getElementById("screen").style.backgroundImage = "url(\'img/" + this.map[this.current_position.i][this.current_position.j].img + "\') "
        document.getElementById("screen").style.backgroundColor = this.map[this.current_position.i][this.current_position.j].color
        document.getElementById("location_name").innerHTML = this.map[this.current_position.i][this.current_position.j].description
        this.showCarriedItem()
        this.showLocalItems()
        this.showPossibleMoves()
    }
}

export default LevelTransition