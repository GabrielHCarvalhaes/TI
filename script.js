class  StarRater extends HTMLElement {
    constructor () {
        super()

        this.build()
    }

    build() {
        const shadow = this.attachShadow({mode: 'open'})

        shadow.appendChild(this.styles())

        const rater = this.createRater()
        this.stars = this.createStars()
        this.stars.forEach(star => rater.appendChild(star))

        this.resetRating()

        shadow.appendChild(rater)
    }  
    
    createRater() {
        const rater =document.createElement('div')
        rater.classList.add('star-rater')
        rater.addEventListener('mouseout', this.resetRating.bind(this))
        return rater
    }

    resetRating() {
        this.currentRatingValue = this.getAttribute('data-rating') || 0
        this.hightlightRating()
    }

    createStars() {
        const createStar = (_,id) => {
            const star = document.createElement('span')
            star.classList.add('star')
            star.setAttribute('data-value', Number(id) + 1)
            star.innerHTML = '&#9733;'

            star.addEventListener('click', this.setRating.bind(this))
            star.addEventListener('mouseover', this.ratingHover.bind(this))
            return star
        }



        return Array.from({ length: 5}, createStar) 
    }

    setRating(event) {
        this.setAttribute('data-rating', event.currentTarget.getAttribute('data-value'))
    }

    ratingHover(event) {
        this.currentRatingValue = event.currentTarget.getAttribute('data-value')
        this.hightlightRating()
    }

    hightlightRating() {
        this.stars.forEach( star => {
            star.style.color = this.currentRatingValue >= star.getAttribute('data-value')?'yellow' :'white'
        })
    }

    styles() {
        const style =document.createElement ('style')
        style.textContent =`
        .star {
            font-size: 5rem;
            cursor:pointer;
        }
        `

        return style
    }
}

customElements.define('star-rater',StarRater)