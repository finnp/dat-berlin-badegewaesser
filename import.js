var request = require('request')
var xmljson = require('xml-json')
var ldj = require('ldjson-stream')
var map = require('through2').obj
var JSONparse = require('JSONStream').parse
var toCSV = require('csv-write-stream')
var join = require('csv-join')

var baseUrl = 'http://www.berlin.de/badegewaesser/baden-details/index.php/index/'

module.exports = function () {
  var measurements = 
    request(baseUrl + 'all.json?q=')
      .pipe(JSONparse('index.*'))
      .pipe(map(function (obj, enc, next) {
        next(null, {key: obj.id, name: obj.rss_name, quality: obj.wasserqualitaet})
      }))
      .pipe(toCSV())

  var geo = 
    request(baseUrl + 'all.kml?q=')
      .pipe(xmljson('Placemark'))
      .pipe(map(function (obj, enc, next) {
        next(null, {coordinates: obj.Point.coordinates, name: obj.name})
      }))
      .pipe(toCSV())



  var stream = join(geo, measurements, {firstColumn: 'name', secondColumn: 'name'})
    .pipe(map(function(obj, enc, next) {
      delete obj['name-1']
      next(null, obj)
    }))
  
  return stream
}


