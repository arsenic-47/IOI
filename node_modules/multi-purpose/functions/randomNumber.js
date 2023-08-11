async function randomNumber (number) {
        this.random = Math.floor(Math.random()*number)
        return this.random
    }
module.exports = randomNumber