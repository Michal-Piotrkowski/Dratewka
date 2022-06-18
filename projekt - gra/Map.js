class Location {
    constructor({ description, img, color, opens, xpos, ypos }) {
        this.description = description
        this.img = img
        this.color = color
        this.route = opens
        this.xpos = xpos
        this.ypos = ypos
    }
}

class Item {
    constructor({ id, name_od, flag, name, active }) {
        this.id = id
        this.name_od = name_od
        this.flag = flag
        this.name = name
        this.active = active
    }
}

class ItemsLoc {
    constructor({ id, pos }) {
        this.id = id
        this.pos = pos
    }
}

class Dependency {
    constructor({ itemU_id, pos, prize_id, text, ok }) {
        this.itemU_id = itemU_id
        this.pos = pos
        this.prize_id = prize_id
        this.text = text
        this.ok = ok
    }
}

export { Location, Item, ItemsLoc, Dependency }