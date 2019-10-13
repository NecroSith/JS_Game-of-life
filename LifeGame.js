class LifeGame {
    constructor(rows, columns) {
        this.rows = rows;
        this.columns = columns;
        this.generationNumber = 0;

        this.map = [];
        for (let i = 0; i < this.columns; i++) {
            const row = [];

            for (let j = 0; j < this.rows; j++) {
                row.push(false);
            }
            this.map.push(row);
        }
    }

    changeGeneration() {
        const map = [];
        for (let i = 0; i < this.rows; i++) {
            const row = [];

            for (let j = 0; j < this.columns; j++) {
                let neigborsNumber = 0;
                let state = false;

                for (let dx = -1; dx <= 1; dx++) {
                    for (let dy = -1; dy <= 1; dy++) {
                        if (dx === 0 && dy === 0) {
                            continue;
                        }
                        neigborsNumber += this.getField(i + dx, j + dy);
                    }
                }
                if (this.getField(i, j)) {
                    if (neigborsNumber === 2 || neigborsNumber === 3) {
                        state = true;
                    }
                } else {
                    if (neigborsNumber === 3) {
                        state = true;
                    }
                }
                row.push(state);
            }
            map.push(row);
        }

        this.map = map;
        this.generationNumber++;
    }

    reviveRandomCells(n = 1) {
        const blankCells = [];

        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
                if (this.getField(j, i) === false) {
                    blankCells.push({ j, i });
                }
            }
        }

        n = parseInt(n);
        n = Math.min(n, blankCells.length);

        while (n-- > 0) {
            const index = Math.floor(Math.random() * blankCells.length);
            const { i, j } = blankCells.splice(index, 1)[0];
            this.setField(i, j, true);
        }
    }

    forFreeEach(handler) {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
                if (this.getField(j, i) === true) {
                    handler(j, i);
                }
            }
        }
    }

    getField(x, y) {
        if (x < 0 || x >= this.columns || y < 0 || y >= this.rows) {
            return false;
        }
        return this.map[x][y];
    }

    setField(x, y, value) {
        if (x < 0 || x >= this.columns || y < 0 || y >= this.rows) {
            return value;
        }
        return this.map[y][x] = value;
    }
}