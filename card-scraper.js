const fs = require('fs')
const axios = require('axios')

axios({
    method:'get',
    url: 'https://omgvamp-hearthstone-v1.p.mashape.com/cards',
    headers: {"X-Mashape-Key": "BhtFx5NH0bmshlnQj9CkNKDDWrrjp1gr6JXjsnJ81pEtaCDfHV"}
}).then(data => {
    // fs.writeFileSync('cards.json', JSON.stringify(data.data))
    // console.log("done?")

    for (var key in data.data) {
        data.data[key].forEach(card => {
            fs.appendFile(`${key}.json`, JSON.stringify(card))
        })
    }
})