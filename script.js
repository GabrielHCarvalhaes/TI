// Estrelas
class StarRater extends HTMLElement {
    constructor() {
        super();
        this.build();
    }

    build() {
        const shadow = this.attachShadow({ mode: 'open' });
        shadow.appendChild(this.styles());

        const rater = this.createRater();
        this.stars = this.createStars();
        this.stars.forEach(star => rater.appendChild(star));

        this.resetRating();
        shadow.appendChild(rater);
    }

    createRater() {
        const rater = document.createElement('div');
        rater.classList.add('star-rater');
        rater.addEventListener('mouseout', this.resetRating.bind(this));
        return rater;
    }

    resetRating() {
        this.currentRatingValue = this.getAttribute('data-rating') || 0;
        this.hightlightRating();
    }

    createStars() {
        const createStar = (_, id) => {
            const star = document.createElement('span');
            star.classList.add('star');
            star.setAttribute('data-value', Number(id) + 1);
            star.innerHTML = '&#9733;';

            star.addEventListener('click', this.setRating.bind(this));
            star.addEventListener('mouseover', this.ratingHover.bind(this));
            return star;
        };

        return Array.from({ length: 5 }, createStar);
    }

    setRating(event) {
        this.setAttribute('data-rating', event.currentTarget.getAttribute('data-value'));
    }

    ratingHover(event) {
        this.currentRatingValue = event.currentTarget.getAttribute('data-value');
        this.hightlightRating();
    }

    hightlightRating() {
        this.stars.forEach(star => {
            star.style.color = this.currentRatingValue >= star.getAttribute('data-value') ? 'yellow' : 'white';
        });
    }

    styles() {
        const style = document.createElement('style');
        style.textContent = `
            .star {
                font-size: 40px;
                cursor: pointer;
            }
        `;
        return style;
    }
}

customElements.define('star-rater', StarRater);

// Comentário

const userId = {
    name: null,
    identity: null,
    rating: null,
    image: null,
    message: null,
    date: null
};

const userComment = document.querySelector(".usercomment");
const publishBtn = document.querySelector("#publish");
const comments = document.querySelector(".comments");
const userName = document.querySelector(".user");

userComment.addEventListener("input", e => {
    if (!userComment.value) {
        publishBtn.setAttribute("disabled", "disable");
        publishBtn.classList.remove("abled");
    } else {
        publishBtn.removeAttribute("disabled");
        publishBtn.classList.add("abled");
    }
});

function addPost() {
    if (!userComment.value) return;
    userId.name = userName.value;
    if (userId.name === "Anônimo") {
        userId.identity = false;
        userId.image = "./image/user1.png";
    } else {
        userId.identity = true;
        userId.image = "./image/user1.png";
    }
    userId.message = userComment.value;
    userId.date = new Date().toLocaleString();
    userId.rating = document.querySelector('star-rater').getAttribute('data-rating') || 0;

    let published = `
    <div class="parents">
        <img src="${userId.image}">
        <div>
            <h1>${userId.name}</h1>
            <p>${userId.message}</p>
            <span class="date">${userId.date}</span>
            <div class="user-rating">
                ${createStarsHTML(userId.rating)}
            </div>
        </div>
    </div>`;
    comments.innerHTML += published;
    userComment.value = "";
}

publishBtn.addEventListener("click", addPost);

function createStarsHTML(rating) {
    let starsHTML = '';
    for (let i = 1; i <= 5; i++) {
        const color = i <= rating ? 'yellow' : 'white';
        starsHTML += `<span class="star" style="font-size: 40px; color: ${color};">&#9733;</span>`;
    }
    return starsHTML;
}