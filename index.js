var fetch = require('./import.js')

module.exports = function (dat, ready) {
  ready()
  startFetch()
  
  function startFetch() {
    setTimeout(startFetch, 3000)
    console.log('Fetching data...')
    fetch().pipe(dat.createWriteStream({primary: 'id', force: true}))
  }

}