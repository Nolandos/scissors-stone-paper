
/*FUNCTION "andDo" -  EXECUTING FUNCTION "updateScore" AND "finalResult" based on result duel*/

class newGame {
    constructor(selector) {
        this.selector = selector;
        this.render()
        this.name
        this.totalScore 
        this.rounds = 0
        this.playerPoints = 0
        this.computerPoints = 0 
        this.addListeners()
        this.updateScore()      
    }

    /*FUNCTION RUN GAME*/
    run() {
        document.querySelector('#game-container').classList.add('show');                    
        document.querySelector('#player-name').innerHTML = this.name;                       
        document.querySelector('#game-scores').innerHTML = this.totalScore;                 
    }

    /*FUNCTION ADD LISTENERS*/
    addListeners() {                                                                            

        /*ADD LISTENERS FOR BUTTONS PAPER, SCISSORS AND ROCK*/
        let choiceButtons = document.querySelectorAll('.choice-buttons');

        for(let i=0; i<choiceButtons.length; i++) {
            console.log(choiceButtons[i].id);
            choiceButtons[i].addEventListener('click', (e) => {
                let result = this.checkResult(choiceButtons[i].id);
                this.andDo(result);
            });
        }

        /*FUNCTION FOR NEW GAME*/
        document.querySelector('#btn-new-game').addEventListener('click', (e) => {
            let modalOverlay = document.querySelector('#modal-overlay');
            let modalStartGame = document.querySelector('#modal-start-game');
        
            modalOverlay.classList.add('show');
            modalStartGame.classList.add('show');
        });

        
        /*FUNCTION FOR START GAME BUTTON */
        document.querySelector('#btn-start-game').addEventListener('click', (e) => { 
    
            e.preventDefault();

            let modalOverlay = document.querySelector('#modal-overlay');
            let modalStartGame = document.querySelector('#modal-start-game');
        
            this.totalScore = document.querySelector('#total-score').value;
            this.name = document.querySelector('#name').value;
           
            
            this.run();
            modalOverlay.classList.remove('show');
            modalStartGame.classList.remove('show');
        
            window.scroll({
                top: 2500, 
                left: 0, 
                behavior: 'smooth'
            });
        });

        /*FUNCTION FOR CLOSE BUTTON*/
        document.querySelector('.overlay').addEventListener('click', (e) => {
            if(e.target.classList.contains('close')) {
                e.target.parentElement.classList.remove('show');
                document.querySelector('#modal-overlay').classList.remove('show');
            }
        });

        /*FUNCTION FOR CLOSE GAME BUTTON*/
        document.querySelector('#exit-game').addEventListener('click', (e) => {
            new newGame(document.querySelector('#main'));
        });

    }

    /*FUNCTION RANDOMIZING FOR COMPUTER */
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

    /*FUNCTION COMPARING CHOICE PLAYER AND COMPUTER*/
    checkResult(playerChoice) { 
        let computerChoice = this.choiceAi();


        if(computerChoice === playerChoice) {
            this.rounds++;
            this.addToTable(computerChoice, playerChoice, 'REMIS');  
            return `REMIS`; 
        }  

        if(computerChoice === 'KAMIEŃ' && playerChoice === 'PAPIER' || computerChoice === 'NOŻYCE' && playerChoice === 'KAMIEŃ' || computerChoice === 'PAPIER' && playerChoice === 'NOŻYCE' ) {
            this.playerPoints++;
            this.rounds++;
            this.addToTable(computerChoice, playerChoice, 'WYGRANA');
            return `WYGRANA`;
        } else if(computerChoice === 'NOŻYCE' && playerChoice === 'PAPIER' || computerChoice === 'PAPIER' && playerChoice === 'KAMIEŃ' || computerChoice === 'KAMIEŃ' && playerChoice === 'NOŻYCE' ) {
            this.computerPoints++;
            this.rounds++;
            this.addToTable(computerChoice, playerChoice, 'PRZEGRANA');
            return `PRZEGRANA`;
        } 
    }

    /*FUNCTION "andDo" -  EXECUTING FUNCTION "updateScore" AND "finalResult" based on result duel*/
    andDo(result) {
        if(result === `WYGRANA`) {
            this.updateScore();
            this.finalResult();
        }  
        
        if (result === `PRZEGRANA`) {
            this.updateScore();
            this.finalResult();
            
        }

        if (result === `REMIS`) {    
            this.finalResult();
        }
    }

    /*FUNCTION FOR UPDATE SCORE*/    
    updateScore() {
        document.querySelector('.player-score').innerHTML = this.playerPoints;
        document.querySelector('.computer-score').innerHTML = this.computerPoints;
    }

    /*FUNCTION FOR ADD INFORMATION ABOUT DUEL*/
    addToTable(computerChoice, playerChoice, result) {
        let table = document.querySelector('#score-table');

        let row = document.createElement('tr');
        
        row.innerHTML = `
        <td>${this.rounds}</td>
        <td>${computerChoice}</td>
        <td>${playerChoice}</td> 
        <td>${result}</td>
        <td>${this.playerPoints} - ${this.computerPoints}</td>
        `;

        table.appendChild(row);
    }

    /*FUNCTION CHECKING CURRENTLY RESULT BATTLE*/
    finalResult() {
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
            let draw = this.rounds - (this.playerPoints + this.computerPoints );
            
            row.innerHTML = `
            <td>${this.rounds}</td>
            <td>${this.playerPoints}</td> 
            <td>${this.computerPoints}</td>
            <td>${draw}</td>
            `;

            resultTable.appendChild(row);

        }
    }

    /*FUNCTION RENDER BASIC STRUCTURE APLICATION*/
    render() {
        this.selector.innerHTML = `
        <div class="overlay" id="modal-overlay">
            <div class="modal" id="modal-start-game">
                <a href="#" class="close">x</a>
                <header>Nowa gra</header>
                <div class="content">
                    <form class="new-game-form">
                        <input type="text" class="name" id="name" placeholder="Nazwa gracza" required>
                        <input type="number" class="total-score" id="total-score" placeholder="Ilość gier" min=0 required>
                        <button type="submit" class="btn-start-game" id="btn-start-game">Rozpocznij !</button>
                    </form>
                </div>
            </div>
            <div class="modal" id="modal-end-game">
                <header>Koniec Gry</header>
                <div class="content">
                    <div class="result-game" id="result-game">
                        <p class="result-name" id="result-name"></p>
                        <table class="result-table" id="result-table">
                            <tr>
                                <th>Ilość rund</th>
                                <th>Wygrane rundy</th>
                                <th>Przegrane rundy</th> 
                                <th>Remisy</th> 
                            </tr>
                        </table>
                        <button class="exit-game" id="exit-game">Wyjście</button>
                    </div>  
                </div>
                                
            </div>
        </div>
        <div class="container">
        <section class="jumbotron">
            <header class="jumbotron-header">
                <h1 class="title">Papier Nożyce Kamień</h1> 
                <p class="text">Podejmij wyzwanie !</p>
            </header>
            <button class="btn btn-new-game" id="btn-new-game">Nowa Gra</button>
        </section>

        <section class="game-container" id="game-container">
            <div class="player-info">
                <p class="player-name" id="player-name"></p>
                <p class="game-scores" id="game-scores"></p>
            </div>
            <div class="options-container">
                <div class="star8 gold"><a class="fa icon-hand-paper-o choice-buttons" id="PAPIER"></a></div>    
                <div class="star8 orange"><a class="fa icon-hand-scissors-o choice-buttons" id="NOŻYCE"></a></div>
                <div class="star8 blue"><a class="fa icon-hand-grab-o choice-buttons" id="KAMIEŃ"></a></div>
            </div>
            <div class="score">
                <div class="player-score"></div>
                <div class="computer-score"></div>
            </div>
            <table class="score-table" id="score-table">
                <tr>
                    <th>Runda</th>
                    <th>Komputer Wylosował:</th>
                    <th>Gracz Wylosował</th> 
                    <th>Wynik starcia</th>
                    <th>Wynik ogólny</th>
                </tr>
            </table>
            
        </section>
        </div>
        `;        
    }
    
}

new newGame(document.querySelector('#main'));