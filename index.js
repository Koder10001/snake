const numOfSnakes = 1;
var direction;

const boxSize = 30;
const boxMargin = 2.5;

let snakeBodyLoc;

let interval;

let grid;

window.onload = function(ev){

    direction = [[0,1], undefined];


    snakeBodyLoc = new Array();
    snakeBodyLoc[0] = new Array();
    snakeBodyLoc[0] = [0,1];
    snakeBodyLoc[1] = [0,0];

    let wrapper = document.querySelector("#game");

    const width = wrapper.offsetWidth / (boxSize + boxMargin * 2); // num of boxes
    const height = wrapper.offsetHeight / (boxSize + boxMargin * 2); // num of boxes

    // grid  20 * 15
    
    grid = new Array(height);
    

    // let food = document.createElement("div");
    // food.classList.add("food");

    // let head = document.createElement("div");
    // head.classList.add("head");

    // let body = document.createElement("div");
    // body.classList.add("body");

    for(let y = 0 ; y < height; y++){
        for(let x = 0; x < width; x++){
            if(!grid[y]){
                grid[y] = new Array(width);
            }

            let blank = document.createElement("div");
            blank.classList.add("blank");
            grid[y][x] = blank;
            wrapper.appendChild(grid[y][x]);

        }
    }

    grid[0][0].classList.add("body")
    grid[0][1].classList.add("head");
    generateFood();


    setTimeout(run, 150, grid);
    
}

function run(){

    let dirQueue;

    if(direction[1]==undefined){
        dirQueue = direction[0];
    }
    else {
        dirQueue = direction.shift();
    }
    
    let newHeadLoc = [snakeBodyLoc[0][0] + dirQueue[0], snakeBodyLoc[0][1] + dirQueue[1]];



    if(newHeadLoc[0] >= grid.length || newHeadLoc[0] < 0 || newHeadLoc[1] < 0 || newHeadLoc[1] >= grid[0].length || grid[newHeadLoc[0]][newHeadLoc[1]].classList.contains("body")){
        //alert("Game Over");
        grid = undefined;
        snakeBodyLoc = undefined;
        direction = undefined;
        document.querySelector("#game").innerHTML = "";
        window.onload();
        return;
    }


    snakeBodyLoc.splice(1, 0,snakeBodyLoc[0]);


    grid[snakeBodyLoc[0][0]][snakeBodyLoc[0][1]].classList.remove("head");
    grid[snakeBodyLoc[0][0]][snakeBodyLoc[0][1]].classList.add("body");

    snakeBodyLoc[0] = newHeadLoc;
    grid[snakeBodyLoc[0][0]][snakeBodyLoc[0][1]].classList.add("head");

    if(!grid[newHeadLoc[0]][newHeadLoc[1]].classList.contains("food")){
        grid[snakeBodyLoc[snakeBodyLoc.length - 1][0]][snakeBodyLoc[snakeBodyLoc.length - 1][1]].classList.remove("body");
        snakeBodyLoc.pop();
        
        
    }
    else {
        grid[newHeadLoc[0]][newHeadLoc[1]].classList.remove("food");
        generateFood();
    }
    setTimeout(run,150 - snakeBodyLoc.length * 5)
}


document.body.onkeydown = function(ev){
    let temp;
    if(ev.key == "ArrowUp" || ev.key == "w"){
        temp = [-1,0];
    }
    else if (ev.key == "ArrowDown" || ev.key == "s"){
        temp = [1,0];
    }
    else if (ev.key == "ArrowLeft" || ev.key == "a"){
        temp = [0,-1];
        
    }
    else if (ev.key == "ArrowRight" || ev.key == "d"){
        temp = [0,1];
    }


    if (temp[0] + direction[0][0] != 0 && temp[1] + direction[0][1] != 0){
        if(temp[0] != direction[0][0] || temp[1] != direction[0][1]){   
            direction[1] = temp;
        }
    }
    

}

function random(min, max){
    let diff = max - min;
    return Math.round((Math.random() * diff) + min);
}

function generateFood(){

    let blank = new Array();

    for(let i = 0; i < grid.length; i++){
        for(let j = 0; j < grid[0].length; j++){
            if(grid[i][j].classList.contains("body") || grid[i][j].classList.contains("head")){
                continue;
            }
            blank.push(grid[i][j]);
        }
    }


    blank[random(0, blank.length)].classList.add("food");

    
}
