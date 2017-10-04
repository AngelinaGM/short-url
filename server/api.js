const express = require('express');
const router = express.Router();
const config = require('./config');
const base58 = require('./base58');

const Url = require('./models/url');

router.get('/', (req, res) => {
  res.send('api works!');
});

router.post('/shorten', (req,res) => {
  var longUrl = req.body.url;
  console.log(longUrl);
  var shortUrl = '';

  Url.findOne({long_url: longUrl}, (err, doc) => {
    console.log(doc);
    if (doc) {
      console.log('on post: ' + doc._id + ' ' + doc.long_url);
      shortUrl = config.webhost  + base58.encode(doc._id);

      res.json({'shortUrl': shortUrl});
    } else {
      var newUrl = Url({
        long_url: longUrl
      });

      newUrl.save((err) => {
        if (err) {
          console.log(err);
        }

        shortUrl = config.webhost + base58.encode(newUrl._id);

        res.json({'shortUrl': shortUrl});
      });
    }
  });
});

router.get('/:encoded_id', (req, res) => {
  var base58Id = req.params.encoded_id;
  var id = base58.decode(base58Id);

  Url.findOne({_id: id}, (err, doc) => {
    if (doc) {
      console.log(doc);
      res.redirect(doc.long_url);
    } else {
      res.redirect(config.webhost);
    }
  });
})

module.exports = router;
