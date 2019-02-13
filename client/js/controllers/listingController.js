angular.module('listings').controller('ListingsController', ['$scope', 'Listings',
  function($scope, Listings) {
    /* Get all the listings, then bind it to the scope */
    Listings.getAll().then(function(response) {
      $scope.listings = response.data;
    }, function(error) {
      console.log('Unable to retrieve listings:', error);
    });

    $scope.detailedInfo = undefined;
    $scope.newCode = "";
    $scope.newName = "";
    $scope.newAddress = "";
    $scope.newLat = "";
    $scope.newLon = "";

    $scope.addListing = function() {
	  /**TODO
	  *Save the article using the Listings factory. If the object is successfully
	  saved redirect back to the list page. Otherwise, display the error
	 */
   var newListing = {"code":$scope.newCode,"name":$scope.newName,"address":$scope.newAddress, "coordinates":{"latitude":$scope.newLat,"longitude":$scope.newLon}};
   Listings.create(newListing);
   $scope.listings.push(newListing);
   //SUCCESSFULLY ADDED BUT NEED TO REFRESH TO SEE IT
		};


    $scope.deleteListing = function(entry) {
      /**TODO
         Delete the article using the Listings factory. If the removal is successful,
 		navigate back to 'listing.list'. Otherwise, display the error.
        */
        Listings.delete(entry._id);
        $scope.listings.splice($scope.listings.indexOf(index),1);
        //NEED TO REFRESH TO SEE THE DELETIONS
    };

    $scope.showDetails = function(selection) {
      $scope.object = selection;
    };
  }
]);
