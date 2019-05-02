class newGame {
    constructor(name, totalScore) {
        this.name = name
        this.totalScore = totalScore
        this.playerPoints = 0
        this.computerPoints = 0 
        this.run()
        this.addListeners()
        this.updateScore() 
        
    }

    run() {
        document.querySelector('#game-container').classList.add('show');
        document.querySelector('#player-name').innerHTML = this.name;
        document.querySelector('#game-scores').innerHTML = this.totalScore;
    }

    addListeners() {
        document.querySelector('#paper').addEventListener('click', (e) => {
            let result = this.checkResult('PAPIER');
            this.andDo(result);
        });

        document.querySelector('#scissors').addEventListener('click', (e) => {
            let result = this.checkResult('NOŻYCE'); 
            this.andDo(result); 
        });

        document.querySelector('#rock').addEventListener('click', (e) => {
            let result = this.checkResult('KAMIEŃ'); 
            this.andDo(result);
        });
    }

    choiceAi () {
        let result = Math.round(Math.random()*2 +1);
        
        if (result === 1) {
            return 'PAPIER';
        } else if(result ===2) {
            return 'KAMIEŃ';
        } else {
            return 'NOŻYCE';
        }
    }

    checkResult(playerChoice) { 
        let computerChoice = this.choiceAi();


        if(computerChoice === playerChoice) {
          return `Komputer wylosował ${computerChoice} jest: &nbsp <b>Remis</b> `; 
        }        
        if(computerChoice === 'KAMIEŃ' && playerChoice === 'PAPIER') {
            return `WYGRANA`;
        } else if(computerChoice === 'NOŻYCE' && playerChoice === 'PAPIER') {
            return `PRZEGRANA`;
        } else if(computerChoice === 'PAPIER' && playerChoice === 'KAMIEŃ') {
            return `PRZEGRANA`;
        } else if(computerChoice === 'NOŻYCE' && playerChoice === 'KAMIEŃ') {
            return `WYGRANA`;
        } else if(computerChoice === 'PAPIER' && playerChoice === 'NOŻYCE') {
            return `WYGRANA`;
        } else if(computerChoice === 'KAMIEŃ' && playerChoice === 'NOŻYCE') {
            return `PRZEGRANA`;
        }
    }

    andDo(result) {
        if(result === `WYGRANA`) {
            this.playerPoints++;
            this.updateScore();
        }  
        
        if (result === `PRZEGRANA`) {
            this.computerPoints++;
            this.updateScore();
        }
    }

    updateScore(){
        document.querySelector('.player-score').innerHTML = this.playerPoints;
        document.querySelector('.computer-score').innerHTML = this.computerPoints;
    }

    
}

document.querySelector('#btn-new-game').addEventListener('click', (e) => {
    let modalOverlay = document.querySelector('#modal-overlay');
    let modalStartGame = document.querySelector('#modal-start-game');

    modalOverlay.classList.add('show');
    modalStartGame.classList.add('show');
});

document.querySelector('#btn-start-game').addEventListener('click', (e) => { 
    e.preventDefault();
    let modalOverlay = document.querySelector('#modal-overlay');
    let modalStartGame = document.querySelector('#modal-start-game');

    let totalScore = document.querySelector('#total-score').value;
    let name = document.querySelector('#name').value;

    new newGame(name, totalScore);

    modalOverlay.classList.remove('show');
    modalStartGame.classList.remove('show');

    window.scroll({
        top: 2500, 
        left: 0, 
        behavior: 'smooth'
    });
});

