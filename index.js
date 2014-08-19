var request = require('request')
var xmljson = require('xml-json')
var ldj = require('ldjson-stream')
var map = require('jsonmap')
var JSONparse = require('JSONStream').parse
var toCSV = require('csv-write-stream')
var join = require('csv-join')
var gasket = require('gasket')

var baseUrl = 'http://www.berlin.de/badegewaesser/baden-details/index.php/index/'

var measurements = 
  request(baseUrl + 'all.json?q=')
    .pipe(JSONparse('index.*'))
    .pipe(ldj.serialize())
    .pipe(map('{id: this.id, name: this.rss_name, quality: this.wasserqualitaet}'))
    .pipe(toCSV())

var geo = 
  request(baseUrl + 'all.kml?q=')
    .pipe(xmljson('Placemark'))
    .pipe(ldj.serialize())
    .pipe(map('{coordinates: this.Point.coordinates, name: this.name}'))
    .pipe(toCSV())


join(geo, measurements, {firstColumn: 'name', secondColumn: 'name'})
  .pipe(ldj.serialize())
  .pipe(map('delete this["name-1"]'))
  .pipe(ldj.serialize())
  .pipe(process.stdout)
