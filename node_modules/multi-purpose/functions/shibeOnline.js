async function shibeOnline (option) {
  const options = ["shibes", "birds", "cats"]
  switch (option) {
    case !Boolean(options.find(name => name===option)):
      return console.log("Invalid option!")
      
  }
  const Fetch = async function (option_2) {
    const fetch = require("node-fetch")
    var data;

      if(option_2 === "json") data = fetch(`http://shibe.online/api/${option}?count=1&urls=true&httpsUrls=true`)
    .then(response => response.json())
      if(option_2 === "string") data = fetch(`http://shibe.online/api/${option}?count=1&urls=true&httpsUrls=true`)
    .then(response => response.text())
    
    return data
  }
  const object = {}
  object.json = async function () {
    return Fetch("json")
  }
  object.string = async function () {
    return Fetch("string")
  }
  return object
}
module.exports = shibeOnline