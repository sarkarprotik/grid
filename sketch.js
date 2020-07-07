


let cols, rows
let w = 40
let background_color = 'black'
let grid = []
let current // Starting Cell
// frameRate(1)

function setup() {
    createCanvas(400, 400)
    cols = (width / w)
    rows = (height / w)


    for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
            let cell = new Cell(i, j)
            grid.push(cell)
        }
    }

    current = grid[0]

};

function in_dex(i, j) {
    return (i < 0 || j < 0 || i > (cols - 1) || j > (rows - 1))
        ? (- 1) :
        i + (j * cols)
}

function Cell(i, j) {
    this.i = i;
    this.j = j;

    // walls => [TOP, RIGHT, BOTTOM, LEFT]
    this.walls = [true, true, true, true]
    this.visited = false

    this.check_neighbours = function () {
        let neighbours = []

        let top = grid[in_dex(i + 0, j - 1)]
        let right = grid[in_dex(i + 1, j + 0)]
        let bottom = grid[in_dex(i + 0, j + 1)]
        let left = grid[in_dex(i - 1, j + 0)]

        if (top && !top.visited) {
            neighbours.push(top)
        }
        if (right && !right.visited) {
            neighbours.push(right)
        }
        if (bottom && !bottom.visited) {
            neighbours.push(bottom)
        }
        if (left && !left.visited) {
            neighbours.push(left)
        }
        // console.log('neighbours', neighbours)

        if (neighbours.length > 0) {
            let r = floor(random(0, neighbours.length))
            return neighbours[r]
        } else {
            return undefined
        }

    }



    this.show = function () {
        let x = this.i * w;
        let y = this.j * w;

        stroke(255);
        // strokeWeight(3);
        if (this.walls[0]) {
            // Top Line
            line(x + 0, y + 0, x + w, y + 0)
        }
        if (this.walls[1]) {
            // Right Line
            line(x + w, y + 0, x + w, y + w)
        }
        if (this.walls[2]) {
            // Bottom Line
            line(x + w, y + w, x + 0, y + w)
        }
        if (this.walls[3]) {
            // Left Line
            line(x + 0, y + w, x + 0, y + 0)
        }
        if (this.visited) {
            fill(255, 0, 255, 200)
            rect(x + (w / 4), y + (w / 4), w / 2, w / 2)
            // circle(x, y, w / 4, w / 4)
        }
    };
}

function draw() {
    background(51)
    console.log(grid.length)
    for (let i = 0; i < grid.length; i++) {
        console.log('grid.length', grid.length)
        grid[i].show()
  
        current.visited = true;
        let next = current.check_neighbours()
        if (next) {
          next.visited = true
          current = next
        }
};

}


