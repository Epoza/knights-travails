function knightMoves(start, end) {
    // Check if position is on the board
    const isValidPosition = (x, y) => {
        return x >= 0 && x <= 7 && y >= 0 && y <= 7;
    };

    // Find the adjecencies of the specified location
    const generateAdjacencyList = () => {
        // Stores all the possible moves depending on starting location
        const adjacencyList = new Map();

        // Possible moves that a knight can make
        const possibleMovements = [
            [2,1], [1,2], [-1,2], [-2,1], [-2,-1], [-1,-2], [1,-2], [2,-1],
        ]

        // Cycles through all possible positions
        for (let x = 0; x <= 7; x++) {
            for (let y = 0; y <= 7; y++) {
                const pos = `${x},${y}`;
                adjacencyList.set(pos, []);
                
                // Calculates new x & y coordinate after knight moves
                for (const [dx, dy] of possibleMovements) {
                    const nx = x + dx;
                    const ny = y + dy;
                    // Adds new coordinates if they are on the board
                    if (isValidPosition(nx, ny)) {
                        adjacencyList.get(pos).push(`${nx},${ny}`);
                    }
                }
            }
        }
        return adjacencyList
    };

    // Implement Breadth-First Search algorithm to find shortest path
    const BFS = (start, end) => {
        const adjacencyList = generateAdjacencyList();
        // Hold the visited moves
        let visited = new Set()
        
        // Holds the queue as moves are cycled
        let queue = [[start, [start]]];

        while(queue.length > 0){
            
            const [current, path] = queue.shift();

            // Current location in queue
            const currentKey = `${current[0]},${current[1]}`;

            if (current[0] === end[0] && current[1] === end[1]) {
                // Count how many moves it took
                const count = path.length - 1;
                // Path has been found
                console.log(`You made it in ${count} moves! Here is your path: ${path.map(pos => `[${pos}]`).join(' -> ')}`);
                return path;
            }

            // Get the next set of moves
            const moves = adjacencyList.get(currentKey);

            for (const move of moves){
                const [mx, my] = move.split(',').map(Number);
                const moveKey = `${mx},${my}`;

                // Queue the move if it has not already been visited
                if (!visited.has(moveKey)) {
                    visited.add(moveKey);
                    queue.push([[mx, my], path.concat([[mx, my]])]);
                }
            }
        }
        // No path found
        return null;
    }
    // Start finding the shortest path
    return BFS(start, end);
}

// Example usage
const start = [7, 2];
const end = [0, 0];
knightMoves(start, end);
