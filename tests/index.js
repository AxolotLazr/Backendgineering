let card = [];

card.create = function (image, name, description) {
    let card = document.createElement('div');
    card.classList = 'card';
        let cardImage = document.createElement('img');
        cardImage.src = image;
        cardImage.classList = 'image above';
        card.appendChild(cardImage);


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
        card.appendChild(cardBottom);

        let cardImageCover = document.createElement('span');
        cardImageCover.classList = 'cardCover';
        card.appendChild(cardImageCover);
    body.appendChild(card);
}

card.create('../images/resources/my-new-character-transparent.png', 'My New Character', "He's just a chill guy who doesn't really give a fuck.");