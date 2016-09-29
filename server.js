var express = require('express'),
	app = express(),
	mongojs = require('mongojs'),
	db = mongojs('contactlist', ['contactlist']),
	bodyParser = require('body-parser');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.get('/contactlist', function(request, response) {

	db.contactlist.find(function(err, docs) {
		console.log(docs);
		response.json(docs);
	});
});

app.post('/contactlist', function(request, response) {
	console.log(request.body);

	db.contactlist.insert(request.body, function(err, docs) {
		response.json(docs);
	});
});

app.delete('/contactlist:id', function(request, response) {
	var id = request.params.id;
	console.log(id);

	db.contactlist.remove({_id: mongojs.ObjectId(id)}, function(err, docs) {
		response.json(docs);
	});
});

app.get('/contactlist:id', function(request, response) {
	var id = request.params.id;

	db.contactlist.findOne({_id: mongojs.ObjectId(id)}, function(err, docs) {
		response.json(docs);
	});
});

app.put('/contactlist:id', function(request, response) {
	var id = request.params.id;
	console.log(request.body.name+"    "+request.body.email+"   "+request.body.phone);

	db.contactlist.findAndModify({ 
		query: {_id: mongojs.ObjectId(id)},
		update : {
			$set : {
				name : request.body.name,
				email : request.body.email,
				phone : request.body.phone
			}
		},
		new : true}, function(err, docs) {
			response.json(docs);
		});
});

app.listen(8000);
console.log("Server running on port 8000");