class Action {
    constructor(command, variable, items_tab, map, backpack, current_position, dependencies_tab, ok, isDragonDead) {
        this.command = command
        this.variable = variable
        this.items_tab = items_tab
        this.map = map
        this.backpack = backpack
        this.current_position = current_position
        this.dependencies_tab = dependencies_tab
        this.tab = []
        this.current_dependencies = []
        this.ok = ok
        this.isDragonDead = isDragonDead
    }

    checkChosenAction() {
        if (this.command[0] == "T" || this.command[0] == "t") {
            this.Take();
        }
        else if (this.command[0] == "D" || this.command[0] == "d") {
            this.Drop();
        }
        else if (this.command[0] == "U" || this.command[0] == "u") {
            this.Use();
        }
        else if (this.command[0] == "V" || this.command[0] == "v") {
            this.Vocabulary();
        }
        else if (this.command[0] == "G" || this.command[0] == "g") {
            this.Gossip();
        }
        else if (this.command[0] == "P" || this.command[0] == "p") {
            this.tp();
        }
        else if (this.command == "END") {
            this.end()
        }
    }

    Take() {
        this.tab = this.items_tab.filter(item => item.item_loc.pos.i == this.current_position.i && item.item_loc.pos.j == this.current_position.j)
        // console.table(this.tab)
        if (this.tab.length > 0 && this.backpack.length == 0) {
            if (this.variable) {
                if (this.tab.filter(item => item.item.name == this.variable && item.item.flag == 0 && item.item.active == true)[0] == undefined) {
                    this.backpack.push(this.tab.filter(item => item.item.name == this.variable && item.item.flag != 0 && item.item.active == true)[0])
                    this.backpack[0].item_loc.pos.i = ""
                    this.backpack[0].item_loc.pos.j = ""
                }
                else {
                    alert("YOU CAN'T TAKE IT!")
                }
            }
            else {
                if (this.tab[0].item.flag != 0 && this.tab[0].item.active == true) {
                    this.backpack[0] = this.tab[0]
                    this.backpack[0].item_loc.pos.i = ""
                    this.backpack[0].item_loc.pos.j = ""
                }
                else if (this.tab[0].item.flag == 0 && this.tab[0].item.active == true) {
                    alert("YOU CAN'T TAKE IT!")
                }
                else {
                    alert("YOU BLIND FAT BASTARD, WHAT DO YOU WANNNA TAKE?")
                }
            }
        }
        else if (this.backpack.length != 0) {
            alert("DROP SOMETHING")
        }
        else {
            alert("YOU BLIND FAT BASTARD, WHAT DO YOU WANNNA TAKE?")
        }
    }

    Drop() {
        if (this.backpack.length) {
            this.backpack[0].item_loc.pos.i = this.current_position.i
            this.backpack[0].item_loc.pos.j = this.current_position.j
            this.backpack.pop()
        }
    }

    Use() {
        if (this.backpack.length) {
            this.current_dependencies.push(this.dependencies_tab.filter(dependency =>
                dependency.pos.i == this.current_position.i && dependency.pos.j == this.current_position.j && dependency.itemU_id == this.backpack[0].item.id
            )[0])

            if (this.current_dependencies[0] != undefined) {
                if (this.items_tab.filter(item => item.item.id == this.current_dependencies[0].prize_id)[0].item.flag == 1) {
                    this.backpack.pop()
                    this.backpack.push(this.items_tab.filter(item => item.item.id == this.current_dependencies[0].prize_id)[0])
                    this.backpack[0].item_loc.pos.i = ""
                    this.backpack[0].item_loc.pos.j = ""
                    this.backpack[0].item.active = true
                }
                else {
                    this.backpack.pop()
                    this.items_tab.filter(item => item.item.id == this.current_dependencies[0].prize_id)[0].item_loc.pos.i = this.current_position.i
                    this.items_tab.filter(item => item.item.id == this.current_dependencies[0].prize_id)[0].item_loc.pos.j = this.current_position.j
                    this.items_tab.filter(item => item.item.id == this.current_dependencies[0].prize_id)[0].item.active = true
                }
                if (this.current_dependencies[0].text.includes("(timeout)")) {
                    let timeouts = this.current_dependencies[0].text.split("(timeout)")
                    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
                    (async () => {
                        for (let index = 0; index < json.objects.length; ++index) {
                            // Wait to do this one until a delay after the last one
                            if (index > 0) {
                                await delay(1000); // 5000 for five seconds
                            }

                            // Do this one
                            /*self.*/insertDesignJsonObject(json.objects[index], index);
                        }
                    })();
                }
                else {
                    document.getElementById("get").innerHTML = this.current_dependencies[0].text
                }
                if (this.current_dependencies[0].ok == "yes") {
                    this.ok += 1
                    console.log("OK:" + this.ok)
                }
                if (this.ok == 6) {
                    this.backpack.pop()
                    // this.backpack.push(this.items_tab.filter(item => item.item.id == 37)[0])
                    // this.backpack[0].item_loc.pos.i = ""
                    // this.backpack[0].item_loc.pos.j = ""
                    // this.backpack[0].item.active = true
                    if (this.items_tab.filter(item => item.item.id == 37)[0]) {
                        this.items_tab.filter(item => item.item.id == 37)[0].item_loc.pos.i = this.current_position.i
                        this.items_tab.filter(item => item.item.id == 37)[0].item_loc.pos.j = this.current_position.j
                        this.items_tab.filter(item => item.item.id == 37)[0].item.active = true
                    }
                    this.isDragonDead = true;
                }
                if (this.current_dependencies[0].prize_id == 30) {
                    this.map[3][2].img = "smok.bmp"
                }
                console.log(this.backpack)
                console.log(this.current_dependencies)
            }
            else {
                alert("WHY HERE DUDE?")
            }
        }
    }

    tp() {
        this.current_position.i = this.variable[0]
        this.current_position.j = this.variable[1]
    }

    end() {
        this.ok == 6
        this.backpack.pop()
        if (this.items_tab.filter(item => item.item.id == 37)[0]) {
            this.items_tab.filter(item => item.item.id == 37)[0].item_loc.pos.i = this.current_position.i
            this.items_tab.filter(item => item.item.id == 37)[0].item_loc.pos.j = this.current_position.j
            this.items_tab.filter(item => item.item.id == 37)[0].item.active = true
        }
        this.isDragonDead = true;
    }

    Vocabulary() {
        document.getElementById("carry").style.display = "none"
        document.getElementById("see").style.display = "none"
        document.getElementById("terminal").style.display = "none"
        document.getElementById("possible_directions").style.display = "none"
        document.getElementById("v").style.display = "block"
        document.getElementById("location_name").innerHTML = "CLICK ENTER"
        window.addEventListener("keydown", (e) => {
            document.getElementById("terminal").focus()
            if (e.key != "x") return
            document.getElementById("carry").style.display = "block"
            document.getElementById("see").style.display = "block"
            document.getElementById("terminal").style.display = "block"
            document.getElementById("possible_directions").style.display = "block"
            document.getElementById("v").style.display = "none"
        })
    }

    Gossip() {
        document.getElementById("carry").style.display = "none"
        document.getElementById("see").style.display = "none"
        document.getElementById("terminal").style.display = "none"
        document.getElementById("possible_directions").style.display = "none"
        document.getElementById("g").style.display = "block"
        document.getElementById("location_name").innerHTML = "CLICK ENTER"
        window.addEventListener("keydown", (e) => {
            document.getElementById("terminal").focus()
            if (e.key != "x") return
            document.getElementById("carry").style.display = "block"
            document.getElementById("see").style.display = "block"
            document.getElementById("terminal").style.display = "block"
            document.getElementById("possible_directions").style.display = "block"
            document.getElementById("g").style.display = "none"
        })
    }

    showNext(element) {
        document.getElementById("get").innerHTML = element
    }
}

export default Action