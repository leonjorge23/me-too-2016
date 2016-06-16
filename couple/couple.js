function coupleController(fbRef, $firebaseObject, $location, $routeParams) {
	var model = this;

	var coupleProfileRef = fbRef.getCoupleProf($routeParams.id),
			$coupleProfle = $firebaseObject(coupleProfileRef);
	    $coupleProfle.$loaded().then(function(data){
				model.profile = data;
			});
	
	model.goToEditCouple = function($id){
		$location.path('/editCouple/' + $id);
	}
}


angular.module('app').component('couple', {
	templateUrl: 'couple/couple.html',
	controllerAs: 'model',
	controller: coupleController
})
