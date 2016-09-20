const request = require("request-promise")
const fs = require("fs")
const r = require("request")

const cheerio = require("cheerio")


var username = "abdulhannanali"

async function loadImage () {
  try {
    let githubPage = await request("https://github.com/" + username);
    let $ = cheerio.load(githubPage)


    var avatar = $($(".avatar")[0])

    return avatar.attr("src")
  }
  catch (error) {
    console.log("An unexpected error occured")
    console.error(error)
  }
}

(async function () {
  var avatarUrl = await loadImage()
  var avatar = await request(avatarUrl)

  fs.writeFile(`${username}.png`, avatar, function (error) {
    if (error) {
      console.error(error);
    }
    else {
      console.log(`Written to ${username}.jpg`)
    }
  })

})()
