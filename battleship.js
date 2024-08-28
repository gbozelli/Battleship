class Ship {
  constructor(lenght){
    this.lenght = length;
    this.hits = 0;
    this.sunk = false;
  };

  hit(){
    this.hits++;
  };

  isSunk(){
    if(this.hits === this.lenght) {
      this.sunk = true;
    }
  };

}

class Gameboard {
  constructor(){
    this.atacks = [];

  }
  receiveAttack(x, y){

  }
}

class Player {
  
}