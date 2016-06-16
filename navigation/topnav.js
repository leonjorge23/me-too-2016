function topnavController(auth){
	var model = this;
	var user = auth.$getAuth()

		model.currUser = user.password.email;

}

angular.module('app').component('topnav', {
	templateUrl: 'navigation/topnav.html',
	controllerAs: 'model',
	controller: topnavController
})