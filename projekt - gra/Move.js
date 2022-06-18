class Move {
    constructor(command, map, current_position, isDragonDead) {
        this.command = command
        this.map = map
        this.current_position = current_position
        this.isDragonDead = isDragonDead
        this.possibleMoves;
    }

    isMovePossible() {
        this.possibleMoves = this.map[this.current_position.i][this.current_position.j].route.split("")
        if (this.command[0] == "N") {
            if (this.possibleMoves.includes("n")) {
                this.current_position.i--
            }
        }
        else if (this.command[0] == "S") {
            if (this.possibleMoves.includes("s")) {
                this.current_position.i++
            }
        }
        else if (this.command[0] == "E") {
            if (this.possibleMoves.includes("e")) {
                this.current_position.j++
            }
        }
        else if (this.command[0] == "W") {
            if (this.possibleMoves.includes("w")) {
                this.current_position.j--
            }
        }
        else if (this.command == "") {
            console.log("BLANK")
        }
        else {
            alert("Try another word or V for vocabulary")
        }
    }
}

export default Move