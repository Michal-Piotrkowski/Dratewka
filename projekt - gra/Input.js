import Move from "./Move.js";
import Action from "./Action.js";
import Game from "./Game.js"
class Input {
    constructor(map, current_position, items_locations_tab, items_tab, backpack, dependencies_tab, ok, isDragonDead) {
        this.command;
        this.allcommand;
        this.variable = "";
        this.move;
        this.action;
        this.map = map;
        this.current_position = current_position;
        this.items_locations_tab = items_locations_tab;
        this.items_tab = items_tab;
        this.backpack = backpack;
        this.dependencies_tab = dependencies_tab
        this.ok = ok
        this.isDragonDead = isDragonDead
    }

    getValue() {
        this.allcommand = document.getElementById("terminal").value.split(" ")
        this.command = this.allcommand[0].toUpperCase()
        if (this.allcommand.length > 1)
            this.variable = this.allcommand[1].toUpperCase()
        let actions_command = ["T", "TAKE", "t", "D", "DROP", "d", "U", "USE", "d", "G", "GOSSIP", "g", "V", "VOCABULARY", "v", "P", "END"]
        if (actions_command.includes(this.command)) {
            this.action = new Action(this.command, this.variable, this.items_tab, this.map, this.backpack, this.current_position, this.dependencies_tab, this.ok, this.isDragonDead)
            this.action.checkChosenAction()
        }
        else {
            this.move = new Move(this.command, this.map, this.current_position, this.isDragonDead)
            this.move.isMovePossible()
        }
        document.getElementById("terminal").value = ""
    }
}

export default Input