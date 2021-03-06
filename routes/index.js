var express = require('express');
var router = express.Router();

var axios = require('axios');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('/users/login');
});

router.get('/teaser',async function(req, res, next) {
	console.clear();
	console.log('\n\n')


	var url = "https://www.googleapis.com/youtube/v3/search?key=AIzaSyCj2R221-MWHoia8Hpx824iDbas9ShM0pg&type=video&part=snippet&maxResults=10&q=tamil-movie-teaser";

	var getRes = {};
	var teaserRslt = [];

	getRes = await new Promise(async function (resolve, reject){
	axios.get(url).then(response => {
	// get the result with loop:
    
		for (var i in response.data.items) {
			var item = response.data.items[i];
				teaserRslt.push([ item.id.videoId, item.snippet.title, item.snippet.thumbnails.default.url ]);
			}	
		resolve(teaserRslt);
		})
	});

  res.send(JSON.stringify(getRes));
});

module.exports = router;
