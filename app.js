var app = angular.module('app', ['ngRoute', 'firebase', 'kendo.directives', 'ngAnimate', 'ui.bootstrap']);

app.run(function($rootScope, $location){
	$rootScope.$on('$routeChangeError', function(e, next, prev, err) {
		if(err==="AUTH_REQUIRED"){
			$location.path('/login');
		}
	})
})

app.config(function($routeProvider){

	$routeProvider
			.when('/dashboard', {
				template: '<dashboard></dashboard>',
				resolve: {
					currentAuth: function(auth) {
						return auth.$requireAuth();
					}
				}
			})
			.when('/teamGrid/:id', {
					template: '<team-grid></team-grid>',
					resolve: {
						currentAuth: function (auth) {
								return auth.$requireAuth();
						}
					}
			})
			.when('/couple/:id', {
				template: '<couple></couple>',
				resolve: {
					currentAuth: function(auth) {
						return auth.$requireAuth();
					}
				}
			})
        	.when('/addCouple/', {
        		template: '<add-couple></add-couple>',
        		resolve: {
        			currentAuth: function (auth) {
        			    return auth.$requireAuth();
        			}
        		}
        	})
			.when('/editCouple/:id', {
				template: '<edit-couple></edit-couple>',
				resolve: {
					currentAuth: function(auth) {
						return auth.$requireAuth();
					}
				}
			})
			.when('/login', {
				template: '<login current-auth="$resolve.currentAuth"></login>',
				resolve: {
					currentAuth: function(auth) {
						return auth.$waitForAuth();
					}
				}
			})
			.when('/logout', {
				template: '<logout></logout>',

			})
			.when('/register', {
				template: '<register></register>'
			})
			.otherwise('/login')
});