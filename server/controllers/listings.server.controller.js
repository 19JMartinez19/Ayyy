
/* Dependencies */
var mongoose = require('mongoose'),
    config = require('../config/config'),
    Listing = require('../models/listings.server.model.js');

/*
  In this file, you should use Mongoose queries in order to retrieve/add/remove/update listings.
  On an error you should send a 404 status code, as well as the error message.
  On success (aka no error), you should send the listing(s) as JSON in the response.

  HINT: if you are struggling with implementing these functions, refer back to this tutorial
  from assignment 3 https://scotch.io/tutorials/using-mongoosejs-in-node-js-and-mongodb-applications
 */

/* Create a listing */
exports.create = function(req, res) {

  /* Instantiate a Listing */
  var listing = new Listing(req.body);


  /* Then save the listing */
  listing.save(function(err) {
    if(err) {
      console.log(err);
      res.status(400).send(err);
    } else {
      res.json(listing);
    }
  });
};

/* Show the current listing */
exports.read = function(req, res) {
  /* send back the listing as json from the request */
  res.json(req.listing);
};

/* Update a listing */
exports.update = function(req, res) {
  var listing = req.body;

  /** TODO **/
  /* Replace the article's properties with the new properties found in req.body */
  /* Save the article */

//The sources for the bottom code are found below:
//https://stackoverflow.com/questions/27108177/mongoose-findbyidandupdate-doesnt-work-with-req-body
//https://stackoverflow.com/questions/30419575/mongoose-findbyidandupdate-not-returning-correct-model
	Listing.findByIdAndUpdate(req.params.listingId, listing, {new: true}, function(err, upList){
	if(err){
		res.status(400).send(err);
    return;
  }
	else
		res.status(200).send(upList);
	});
};

/* Delete a listing */
exports.delete = function(req, res) {
  var listing = req.listing;

  /** TODO **/
  /* Remove the article */
  listing.remove(function(err) {
    if(err) {
      console.error(err);
      res.status(400).send(err);
      return;
    }
    else {
      res.end()
      console.log("The listing has been deleted.");
      return;
    }
  });
};

/* Retreive all the directory listings, sorted alphabetically by listing code */
exports.list = function(req, res) {
  /** TODO **/
     Listing.find().sort('code').exec(function (err,entries) {
	   if(err){
       console.error(err);
		   res.status(400).send(err);
       return;
     }
	  else
		  res.status(200).json(entries);
    });
};

/*
  Middleware: find a listing by its ID, then pass it to the next request handler.

  Find the listing using a mongoose query,
        bind it to the request object as the property 'listing',
        then finally call next
 */
exports.listingByID = function(req, res, next, id) {
  Listing.findById(id).exec(function(err, listing) {
    if(err) {
      res.status(400).send(err);
    } else {
      req.listing = listing;
      next();
    }
  });
};
