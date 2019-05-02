class newGame {
    constructor(name, totalScore) {
        this.name = name;
        this.totalScore = totalScore;
        this.addListeners() 
    }

    addListeners() {
        document.querySelector('#game-container').classList.add('show');
        document.querySelector('#player-name').innerHTML = this.name;
        document.querySelector('#game-scores').innerHTML = this.totalScore;
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

