function logoutController(auth, $location) {
	model = this;

	auth.$unauth();
	$location.path('/login');
}


angular.module('app').component('logout', {
	controllerAs: 'model',
	controller: logoutController
})
