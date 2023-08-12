# Multi-Purpose Package

## Description

Welcome to the Multi-Purpose package, a versatile toolkit that offers a wide range of functionalities to enhance your projects. This package includes several useful functions, each designed to simplify various tasks. Whether you need cute animal pictures, random numbers, language translation, or even personalized name generation, Multi-Purpose has got you covered!

## Installation

To get started with the Multi-Purpose package, you can install it using npm:

```bash
npm install multi-purpose
```

## Usage

Below are the details and examples for each function provided by the Multi-Purpose package:

### shibeOnline

Fetch adorable animal pictures, such as shibes (a type of dog), birds, and cats, from shibe.online. You can choose from a variety of animal categories and obtain image data in JSON format.

#### Example

```js
const { shibeOnline } = require("multi-purpose");

async function fetchShibe() {
  try {
    const shibeData = await shibeOnline("shibes");
    const jsonData = await shibeData.json();
    console.log(jsonData);
  } catch (error) {
    console.error("Error fetching shibe data:", error);
  }
}

fetchShibe();
```

### randomNumber

Generate a random number within a specified range.

#### Example

```js
const { randomNumber } = require("multi-purpose");

async function generateRandomNumber() {
  try {
    const randomNumberWithinRange = await randomNumber(100);
    console.log(randomNumberWithinRange);
  } catch (error) {
    console.error("Error generating random number:", error);
  }
}

generateRandomNumber();
```

### translateText

Translate text from one language to another using the Multi-Purpose package's translation functionality.

#### Example

```js
const { translateText } = require("multi-purpose");

async function translate() {
  try {
    const translatedText = await translateText({
      text: "hola",
      from: "spanish",
      to: "english",
    });
    console.log(translatedText);
  } catch (error) {
    console.error("Error translating text:", error);
  }
}

translate();
```

### randomName

Get random boy or girl names, or even your custom list of names.

#### Example

```js
const { randomName } = require("multi-purpose");

async function getRandomName() {
  try {
    const randomNameString = await randomName({ String: true });
    console.log(randomNameString);
  } catch (error) {
    console.error("Error fetching random name:", error);
  }
}

getRandomName();
```

### googleImageSearch

Perform an image search on Google and fetch a list of image results based on a given query.

#### Example

```js
const googleImageSearch = require("multi-purpose/googleImageSearch");

(async () => {
  try {
    const query = "cute puppies";
    const results = await googleImageSearch(query);

    if (results) {
      console.log(results);
    } else {
      console.error("Error fetching image results.");
    }
  } catch (error) {
    console.error("Error performing Google Image search:", error);
  }
})();
```

Please ensure that you have the necessary dependencies, such as `node-fetch`, installed for the functions to work correctly.

### randomTOD

Fetch random truths and dares for an exciting experience.

#### Example

```js
const {randomTOD} = require("multi-purpose");

(async () => {
  try {
    const selectedChallenges = await randomTOD(maxValues = 1);

    // Additional options: onlyTruth or onlyDare.

    console.log(selectedChallenges);
  } catch (error) {
    console.error("Error fetching random truths and dares:", error);
  }
})();
```

## Contribution

We welcome contributions to the Multi-Purpose package. If you encounter any issues or have ideas for improvements, feel free to open an issue or submit a pull request on our [GitHub repository](https://github.com/your-username/your-repo). Let's build an even more powerful and user-friendly package together!

## License

This package is licensed under the [MIT License](https://opensource.org/licenses/MIT). Feel free to use it in your projects, commercial or personal.

We hope you find the Multi-Purpose package helpful in your development endeavors. Happy coding!