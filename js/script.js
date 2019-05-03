class newGame {
    constructor(name, totalScore) {
        this.name = name
        this.totalScore = totalScore
        this.rounds = 0
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

        document.querySelector('#exit-game').addEventListener('click', (e) => {
            location.reload();
        })
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
        this.addToTable(computerChoice, playerChoice, 'REMIS');  
          return `REMIS`; 
        }        
        if(computerChoice === 'KAMIEŃ' && playerChoice === 'PAPIER') {
            this.addToTable(computerChoice, playerChoice, 'WYGRANA');
            return `WYGRANA`;
        } else if(computerChoice === 'NOŻYCE' && playerChoice === 'PAPIER') {
            this.addToTable(computerChoice, playerChoice, 'PRZEGRANA');
            return `PRZEGRANA`;
        } else if(computerChoice === 'PAPIER' && playerChoice === 'KAMIEŃ') {
            this.addToTable(computerChoice, playerChoice, `PRZEGRANA`);
            return `PRZEGRANA`;
        } else if(computerChoice === 'NOŻYCE' && playerChoice === 'KAMIEŃ') {
            this.addToTable(computerChoice, playerChoice,`WYGRANA`);
            return `WYGRANA`;
        } else if(computerChoice === 'PAPIER' && playerChoice === 'NOŻYCE') {
            this.addToTable(computerChoice, playerChoice, `WYGRANA`);
            return `WYGRANA`;
        } else if(computerChoice === 'KAMIEŃ' && playerChoice === 'NOŻYCE') {
            this.addToTable(computerChoice, playerChoice, `PRZEGRANA`);
            return `PRZEGRANA`;
        }
    }

    andDo(result) {
        if(result === `WYGRANA`) {
            this.playerPoints++;
            this.rounds++;
            this.updateScore();
            this.finalResult();
        }  
        
        if (result === `PRZEGRANA`) {
            this.computerPoints++;
            this.rounds++;
            this.updateScore();
            this.finalResult();
            
        }

        if (result === `REMIS`) {    
            this.rounds++;
            this.finalResult();
        }
    }

    updateScore() {
        document.querySelector('.player-score').innerHTML = this.playerPoints;
        document.querySelector('.computer-score').innerHTML = this.computerPoints;
    }

    addToTable(computerChoice, playerChoice, result) {
        let table = document.querySelector('#score-table');

        let row = document.createElement('tr');
        
        row.innerHTML = `
        <td>${computerChoice}</td>
        <td>${playerChoice}</td> 
        <td>${result}</td>
        `;

        table.appendChild(row);
    }

    finalResult() {
        console.log(this.rounds);
        console.log(this.totalScore);
        if(this.playerPoints >= this.totalScore || this.computerPoints >= this.totalScore ) {
            document.querySelector('#modal-overlay').classList.add('show');
            document.querySelector('#modal-end-game').classList.add('show');

            if(this.playerPoints >= this.totalScore) {
                document.querySelector('.result-name').classList.add('win');
                document.querySelector('.result-name').innerHTML = `WYGRAŁEŚ`;
            }

            if(this.computerPoints >= this.totalScore) {
                document.querySelector('.result-name').classList.add('lose');
                document.querySelector('.result-name').innerHTML = `PRZEGRAŁEŚ`;
            }

            let resultTable = document.querySelector('#result-table');
            let row = document.createElement('tr');

            row.innerHTML = `
            <td>${this.rounds}</td>
            <td>${this.playerPoints}</td> 
            <td>${this.computerPoints}</td>
            `;

            resultTable.appendChild(row);

        }
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

document.querySelector('.overlay').addEventListener('click', (e) => {
    if(e.target.classList.contains('close')) {
        e.target.parentElement.classList.remove('show');
        document.querySelector('#modal-overlay').classList.remove('show');
    }
});

