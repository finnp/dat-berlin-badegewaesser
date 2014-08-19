var fetch = require('./import.js')

module.exports = function (dat, ready) {
  ready()
  startFetch()
  
  // update stuff is workaround for
  // https://github.com/maxogden/dat/issues/154
  function startFetch() {
  setTimeout(startFetch, 12*60*60*1000)
    console.log('Fetching data...')
    fetch().pipe(dat.createWriteStream({force: false}))
  }

}