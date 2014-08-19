var request = require('request')
var xmljson = require('xml-json')
var ldj = require('ldjson-stream')
var map = require('jsonmap')
var JSONparse = require('JSONStream').parse
var toCSV = require('csv-write-stream')
var join = require('/Users/finn/code/npm/csv-join')

var baseUrl = 'http://www.berlin.de/badegewaesser/baden-details/index.php/index/'

var measurements = 
  request(baseUrl + 'all.json?q=')
    .pipe(JSONparse('index.*'))
    .pipe(ldj.serialize())
    .pipe(map('{name: this.rss_name, quality: this.wasserqualitaet}'))
    .pipe(toCSV())

var geo = 
  request(baseUrl + 'all.kml?q=')
    .pipe(xmljson('Placemark'))
    .pipe(ldj.serialize())
    .pipe(map('{coordinates: this.Point.coordinates, name: this.name}'))
    .pipe(toCSV())
  
// geo.pipe(process.stdout)

join(geo, measurements, {firstColumn: 'name', secondColumn: 'name'})
  .pipe(toCSV())
  .pipe(process.stdout)

  // 
  // "gasket": {
  //   "import": [
  //     "json-merge http://www.berlin.de/badegewaesser/baden-details/index.php/index/all.json?q= --parse=\"index.*\" http://www.berlin.de/badegewaesser/baden-details/index.php/index/all.kml?q= --parse=\"features.*\""
  //   ],
  //   "main": [
  //     "gasket run import",
  //     "sleep 43200",
  //     null,
  //     "gasket run main"
  //   ],
  //   "kml": [
  //     "curl http://www.berlin.de/badegewaesser/baden-details/index.php/index/all.kml?q=",
  //     "togeojson",
  //     "jsonfilter ",
  //     "jsonmap '{geometry: this.geometry.coordinates, rss_name: this.properties.name}'",
  //     "dat import --json --primary=rss_name"
  //   ]
