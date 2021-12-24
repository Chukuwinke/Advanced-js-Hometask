class MoleGame {
  constructor() {
    this.squares = document.querySelectorAll("td")
    this.start = document.getElementById("start-btn");
    this.message = document.querySelector(".message");
    this.main = document.querySelector(".main");
    this.mole = document.querySelector('.mole');
    this.availableSquares;
    this.playerCount = 0;
    this.CPUCount = 0;
    this.speed;

    
  }
  turnOn() {
    console.log("turned on");
    this.updateCount()
    this.start.onclick = (e) => {
      this.menuModal();
    };
  }

  menuModal() {
    const menu = document.createElement("div");
    menu.className = "modal";
    menu.innerHTML = `
        <div class="modal-content">
          <div class="level-container">
            <button class="level__easy" data-dificulty-type = "easy" >Easy</button>
            <button class="level__medium" data-dificulty-type = "medium" >Medium</button>
            <button class="level__hard" data-dificulty-type = "hard" >Hard</button>
          </div>
        </div>`;
    this.main.appendChild(menu);
    menu.onclick = (e) => {
      const selected = e.target.className;
      if (
        selected == "level__easy" ||
        selected == "level__medium" ||
        selected == "level__hard"
      ) {
        this.startGame(selected)
        menu.remove()
      }
    };
  }
  // select random square
  randomPos(selected) {
    let board = document.querySelector('.table')
    if (
      selected == "level__easy"
    ) {
      this.speed = 1500;
    }
    else if (selected == "level__medium"){
      this.speed = 1000;
    }
    else if (selected == "level__hard"){
      this.speed = 500;
    }
    // create an array from the squares
    this.availableSquares = Array.from(this.squares)
    let loop = setInterval(() => {
      
      this.squares.forEach(element => {
        //const cls = ["mole", "hit", "miss"];
        element.classList.remove('mole')
      });
      if(this.CPUCount >= (this.squares.length / 2) ||  this.playerCount >= (this.squares.length / 2)){
        clearInterval(loop)
        this.endGame()
      }
      // check the length of the squares array
      else if(this.availableSquares.length > 0){
        this.availableSquares.forEach(item => {
          // if a square does not contain class available remove it
          if(!(item.classList.contains("available"))){
            this.availableSquares.splice(this.availableSquares.indexOf(item), 1)
          }
          
        })
        // get a random position from the available squares
        let randomPosition = this.availableSquares[Math.floor(Math.random() * this.availableSquares.length)]
       if(randomPosition != undefined){
        randomPosition.classList.remove('available')
        randomPosition.classList.add('mole')
       }
        
        const timeOut = setTimeout(() => {
          if(hit !== randomPosition.className) {
            randomPosition.classList.add('miss');
            this.CPUCount +=1;
            this.updateCount();
          }
        }, this.speed)
       //check for player click
        let hit;
        board.onclick = (e) => {
          hit = e.target.className;
          if (hit == randomPosition.className){
            clearTimeout(timeOut)
            randomPosition.classList.add('hit')
            this.playerCount +=1
            this.updateCount()
            
          }
          
        }
      }
      else{
        clearInterval(loop)
        
      }  
      
    }, this.speed)
    
  }
  updateCount(){
    const cpu = document.querySelector('.cpu-count')
    const player = document.querySelector('.player-count')

    cpu.textContent = this.CPUCount
    player.textContent = this.playerCount
  }
  // end the game
  endGame(){
    const endMenu = document.createElement("div");
    endMenu.className = "modal";
    endMenu.innerHTML = `
        <div class="modal-content">
          <div class="level-container">
            <h2 class =" winner"></h2>
            <button id="retry-btn" >Retry</button>
            <button id="quit-btn" >Quit</button>
          </div>
        </div>`;
    this.main.appendChild(endMenu);

    const winner = document.querySelector('.winner')
    if (this.playerCount > this.CPUCount) {
      winner.innerHTML ="player won";
      
    }
    else if(this.CPUCount > this.playerCount){
      winner.innerHTML ="cpu won";
    }
    const retryBtn = document.getElementById('retry-btn')
    const quitBtn = document.getElementById('quit-btn')

    retryBtn.onclick = () => {
      this.clearBoard();
      this.updateCount();
      endMenu.remove()
      this.menuModal();

    }
    quitBtn.onclick = () => {
      this.clearBoard();
      this.updateCount();
      endMenu.remove();
    }

  }
  clearBoard(){
    this.CPUCount = 0;
    this.playerCount =0;
    this.squares.forEach(element => {
      const cls = ["mole", "hit", "miss", "available"];
      element.classList.remove(...cls);
      element.classList.add('available');
    });
  }
  startGame(selected) {
    this.randomPos(selected)
  }
}