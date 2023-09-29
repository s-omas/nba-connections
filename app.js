document.addEventListener('DOMContentLoaded', () => {
    const gameContainer = document.getElementById('game-container');
    const submitButton = document.getElementById('submit-btn');

    // Create cards for each player
    playerGroups.forEach(group => {
        group.players.forEach(player => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.dataset.group = group.group;
            card.textContent = player;

            // Attach click event to each card
            card.addEventListener('click', handleCardClick);

            gameContainer.appendChild(card);
        });
    });
    const myContainer = document.getElementById('game-container');
    const children = Array.from(myContainer.children);
    shuffle(children);
    children.forEach(child => myContainer.appendChild(child));


    let selectedCards = [];

    function handleCardClick() {
        const clickedCard = this;

        // Check if the card is already selected
        if (selectedCards.includes(clickedCard)) {
            // Deselect the card
            clickedCard.classList.remove('connected');
            selectedCards = selectedCards.filter(card => card !== clickedCard);
        } else if (selectedCards.length < 4) {
            // Select the card
            clickedCard.classList.add('connected');
            selectedCards.push(clickedCard);
        }
        console.log(selectedCards)

    }

    // Function to handle connections submission
    window.submitConnections = function () {
        if (selectedCards.length === 4) {
            const [card1, card2, card3, card4] = selectedCards;
            if ((card1.dataset.group === card2.dataset.group) && (card1.dataset.group === card3.dataset.group) &&(card1.dataset.group === card4.dataset.group)) {
                const n = card2.dataset.group;
                console.log(n)
                const theme = playerGroups[n-1]["name"];
                selectedCards.forEach(card => card.remove());

                // Create a new card to replace the connected cards
                const newCard = document.createElement('div');
                newCard.classList.add('card', 'connected');
                newCard.style.gridColumn = 'span 4';
                
                newCard.textContent = theme;
                gameContainer.appendChild(newCard);
            } else {
                alert('Connection not valid. Please try again.');
            }

            // Clear selected cards
            selectedCards.forEach(card => card.classList.remove('connected'));
            selectedCards = [];
        } else {
            alert('Please select four cards to submit a connection.');
        }
    };
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }    
});
