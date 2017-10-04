# UrlShortener

To run this you should have 'url_shortener' db on you host. Run mongo and execute:
	use url_shortener
	db.counters.insert({ _id: 'url_count', seq: 1 });

In the source folder tou should run 
npm install

For starting server run
node server.js

And for running app
ng serve