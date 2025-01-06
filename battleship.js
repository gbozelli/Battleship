class Ship {
  constructor(length){
    this.length = length;
    this.hits = 0;
    this.sunk = false;
  };

  hit(){
    this.hits++;
    this.isSunk();
  };

  isSunk(){
    if(this.hits === this.length) {
      this.sunk = true
    }
  };

}

class Gameboard {
  constructor(){
    this.attacks = Array(10).fill().map(()=>Array(10).fill());;
    this.board = Array(10).fill().map(()=>Array(10).fill());
    this.battleship = new Ship(4);
    this.cruiser = new Ship(3);
    this.submarine = new Ship(3);
    this.destroyer_1 = new Ship(2);
    this.destroyer_2 = new Ship(2);
    this.boat = new Ship(2);
    this.mine_1 = new Ship(1);
    this.mine_2 = new Ship(1);
    this.mine_3 = new Ship(1);
    this.mine_4 = new Ship(1);
  };

  placeShips(x_0, y_0, x_1, y_1, ship){
    if(x_0 === x_1) {
      for(let i = y_0; i < y_0+ship.length; i++) {
        console.log(i);
        this.board[x_0][i] = ship;
      }
    } else if(y_0 === y_1) {
      for(let i = x_0; i < x_0+ship.length; i++) {
        this.board[i][y_0] = ship;
      }
    }
  };

  receiveAttack(x, y) {
  if (this.attacks[x][y]) return; // Já atacado

  if (this.board[x][y] != null) {
    // Existe um barco na célula
    this.attacks[x][y] = true;
    this.board[x][y].hit(); // Aplica dano ao barco
  } else {
    // Nenhum barco na célula
    this.attacks[x][y] = true;
  }
}


  allSunk(){
    let hits = 0;
    for(let i = 0; i < 10; i++) {
      for(let j = 0; j < 10; j++) {
        if(this.board[i][j] != null  && this.attacks[i][j] === true){
          hits++;
        }
      } 
    }
    if(hits === 20) {
      return true;
    } else {
      return false;
    }
  }
  
}

class Player {
  constructor(){
    this.Gameboard = new Gameboard();
  }
}

let p1 = new Player();
let p2 = new Player();

p1.Gameboard.placeShips(0,0,0,3,p1.Gameboard.battleship);
p1.Gameboard.placeShips(0,5,0,5,p1.Gameboard.mine_1);
p1.Gameboard.placeShips(0,7,0,9,p1.Gameboard.cruiser);
p1.Gameboard.placeShips(2,0,2,1,p1.Gameboard.destroyer_1);
p1.Gameboard.placeShips(2,3,2,4,p1.Gameboard.destroyer_2);
p1.Gameboard.placeShips(2,6,2,6,p1.Gameboard.mine_2);
p1.Gameboard.placeShips(2,8,2,8,p1.Gameboard.mine_3);
p1.Gameboard.placeShips(4,0,6,0,p1.Gameboard.submarine);
p1.Gameboard.placeShips(4,2,4,2,p1.Gameboard.mine_4);
p1.Gameboard.placeShips(8,0,9,0,p1.Gameboard.boat);

p2.Gameboard.placeShips(0,0,0,3,p1.Gameboard.battleship);
p2.Gameboard.placeShips(0,5,0,5,p1.Gameboard.mine_1);
p2.Gameboard.placeShips(0,7,0,9,p1.Gameboard.cruiser);
p2.Gameboard.placeShips(2,0,2,1,p1.Gameboard.destroyer_1);
p2.Gameboard.placeShips(2,3,2,4,p1.Gameboard.destroyer_2);
p2.Gameboard.placeShips(2,6,2,6,p1.Gameboard.mine_2);
p2.Gameboard.placeShips(2,8,2,8,p1.Gameboard.mine_3);
p2.Gameboard.placeShips(4,0,6,0,p1.Gameboard.submarine);
p2.Gameboard.placeShips(4,2,4,2,p1.Gameboard.mine_4);
p2.Gameboard.placeShips(8,0,9,0,p1.Gameboard.boat);

//module.exports = Ship;

const body = document.querySelector('body');
const grid1 = document.createElement('div');
grid1.className = 'grid1';
const grid2 = document.createElement('div');
grid2.className = 'grid2';

for(let i = 0; i < 10; i++) {
  const row = document.createElement('div');
  for(let j = 0; j < 10; j++) {
    const column = document.createElement('div');
    column.addEventListener('click', () => {
      p1.Gameboard.receiveAttack(i, j);
      console.log('k');
    })
    if(p1.Gameboard.board[i][j]!=null){
      column.style.backgroundColor = 'blue';
    }
    row.appendChild(column);
  } 
  grid1.appendChild(row);
}

for(let i = 0; i < 10; i++) {
  const row = document.createElement('div');
  for(let j = 0; j < 10; j++) {
    const column = document.createElement('div');
    column.addEventListener('click', () => {
      p2.Gameboard.receiveAttack(i, j);
    })
    if(p2.Gameboard.board[i][j]!=null){
      column.style.backgroundColor = 'red';
    }
    row.appendChild(column);
  } 
  grid2.appendChild(row);
}

body.appendChild(grid1);
body.appendChild(grid2);

function print(player){
  for(let i = 0; i < 10; i++) {
    const row = document.createElement('div');
    for(let j = 0; j < 10; j++) {
      const column = document.createElement('div');
      column.addEventListener('click', () => {
        player.Gameboard.receiveAttack(i, j);
        console.log('k');
      })
      if(player.Gameboard.board[i][j]!=null){
        column.style.backgroundColor = 'blue';
      }
      if(player.Gameboard.attacks[i][j]===true){
        column.style.backgroundColor = 'white';
      }
      row.appendChild(column);
    } 
    grid1.appendChild(row);
  }
}

function checkGameStatus() {
  if (p1.Gameboard.allSunk()) {
    alert("Player 2 wins!");
    const body = document.querySelector('body');
    const restart = document.createElement('button');
    restart.textContent = 'Restart';
    restart.addEventListener("click", () => {
        p1.Gameboard = new Gameboard();
        p2.Gameboard = new Gameboard();
        updateGrids();
        checkGameStatus();
      });
    body.appendChild(restart);
  } else if (p2.Gameboard.allSunk()) {
    alert("Player 1 wins!");
    const restart = document.createElement('div');
    restart.textContent = 'Restart'
    restart.addEventListener("click", () => {
        p1.Gameboard = new Gameboard();
        p2.Gameboard = new Gameboard();
        updateGrids();
        checkGameStatus();
      });
  } else {
    updateGrids();
  }
}

function updateGrids() {
  grid1.innerHTML = "";
  grid2.innerHTML = "";
  for (let i = 0; i < 10; i++) {
    const row1 = document.createElement("div");
    const row2 = document.createElement("div");
    for (let j = 0; j < 10; j++) {
      const cell1 = document.createElement("div");
      const cell2 = document.createElement("div");
      if (p1.Gameboard.board[i][j] != null) {
        cell1.style.backgroundColor = "blue"; 
      }
      if (p1.Gameboard.attacks[i][j]) {
        cell1.style.backgroundColor = "white"; 
      }
      if (p2.Gameboard.board[i][j] != null && p2.Gameboard.attacks[i][j] === true) {
        cell2.style.backgroundColor = "red"; 
      }
      else if (p2.Gameboard.attacks[i][j]) {
        cell2.style.backgroundColor = "white"; 
      }
      cell1.addEventListener("click", () => {
        p1.Gameboard.receiveAttack(i, j);
        updateGrids();
        checkGameStatus();
      });
      cell2.addEventListener("click", () => {
        p2.Gameboard.receiveAttack(i, j);
        updateGrids();
        checkGameStatus();
      });
      row1.appendChild(cell1);
      row2.appendChild(cell2);
    }
    grid1.appendChild(row1);
    grid2.appendChild(row2);
  }
}



const gameInterval = setInterval(() => {
  checkGameStatus();
  let x = Math.floor(Math.random() * 9);
  let y = Math.floor(Math.random() * 9);
  p1.Gameboard.receiveAttack(x, y);
}, 5000);

updateGrids(); 
