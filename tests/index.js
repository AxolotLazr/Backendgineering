let cardHolder = document.getElementById('cardHolder');
log('Got horizontal body');

let card = [];

card.newCard = function (image, name, description) {
    let newCard = document.createElement('div');
    newCard.classList = 'card';
        let cardImage = document.createElement('img');
        cardImage.src = image;
        cardImage.classList = 'image above';
        newCard.appendChild(cardImage);


        let cardBottom = document.createElement('div');
        cardBottom.classList = 'cardBottom glass';

            let cardTitle = document.createElement('div');
            cardTitle.classList = 'title';
            cardTitle.innerText = name;
            cardBottom.appendChild(cardTitle);

            let cardDescription = document.createElement('div');
            cardDescription.classList = 'text';
            cardDescription.innerText = description;
            cardBottom.appendChild(cardDescription);
        newCard.appendChild(cardBottom);

        let cardImageCover = document.createElement('span');
        cardImageCover.classList = 'cardCover';
        newCard.appendChild(cardImageCover);
    return newCard;
};
card.newHand = function () {
    let newHand = document.createElement('span');
    newHand.classList = 'hand';

        let handCounter = document.createElement('div');
        handCounter.classList = 'handCounter text';
        newHand.appendChild(handCounter);
    return newHand;
};
card.addToHand = function (obj, hand) {
    hand.appendChild(obj);

    for (i = 0; i < hand.children.length; i++) {
        hand.children[i].style.transform = 'rotate(' + (30/hand.children.length) * (i - 1 - hand.children.length/8) + 'deg) translate(' + (128/hand.children.length) * (i - 1 - hand.children.length/8) + 'px, ' + (-32/hand.children.length) * (i - 1 - hand.children.length/8) + 'px)';
        hand.children[i].style.zIndex = hand.children.length - 1 * i;
    };
    hand.getElementsByClassName('handCounter')[0].innerText = hand.children.length - 1;
    hand.getElementsByClassName('handCounter')[0].style.transform = '';
};

appendAtoB(card.newCard("../SVG's/resources/coal.svg", 'Coal', "Quite useful indeed"), cardHolder);
appendAtoB(card.newCard("", '', "Roughly equal to"), cardHolder);

let hand = card.newHand();
appendAtoB(hand, cardHolder);
card.addToHand(card.newCard("../SVG's/resources/polution.svg", 'Polution', "A common byproduct"), hand);
card.addToHand(card.newCard("../SVG's/resources/polution.svg", 'Polution', "A common byproduct"), hand);