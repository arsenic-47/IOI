async function randomNumber (number) {
        random = Math.floor(Math.random()*number)
        return random
    }

module.exports = randomNumber