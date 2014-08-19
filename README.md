# Berlin Badegewässer für dat

## Install

You need to have Node and npm installed, for installation have a look [here](http://nodejs.org/).
After that you need to install [dat](http://dat-data.com) with `npm install dat -g`.

```bash
git clone https://github.com/finnp/dat-berlin-badegewaesser.git
cd dat-berlin-badegewaesser
npm install --no-optional # do not install dat
dat init
dat listen
```
Instead of the last commands you can also do `npm start` with a `PORT`, which
is handy for Heroku.
```
PORT=6461;npm start
```

After that the data is available at `localhost:6461` and gets imported every 
24 hours.

## Data Source

* [Berlin Open Data](http://daten.berlin.de/datensaetze/liste-der-badestellen-badegew%C3%A4sserqualit%C3%A4t)
* Data is licensed with [Creative Commons BY SA](http://creativecommons.org/licenses/by-sa/3.0/)
