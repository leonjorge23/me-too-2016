
function loginController(auth, $location) {
	var model = this;

	model.loggedIn = !!model.currentAuth;
	
	if(model.loggedIn) {
		$location.path('/dashboard');
	}
	
	model.errorMessage='';
	
	model.submitAuth = function(){
		auth.$authWithPassword({
			email    : model.email,
			password : model.password
		}, {
			remember: "sessionOnly"
		}).then(function(authData) {
			$location.path('/dashboard');
		}).catch(function(err) {
			if (err.code == 'INVALID_USER'){
				model.errorMessage = "Invalid User Email, Try again"
			} else if (err.code == 'INVALID_PASSWORD'){
				model.errorMessage = "Invalid Password, Try again"
			} else {
				model.errorMessage = err.code;
			}

		});
	}
	
}

angular.module('app').component('login', {
	templateUrl: 'security/login.html',
	controllerAs: 'model',
	bindings: {
		currentAuth: '='
	},
	controller: loginController
})