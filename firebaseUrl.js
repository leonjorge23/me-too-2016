angular.module('app').constant('FirebaseUrl', 'https://metool.firebaseio.com/')
		.service('rootRef', ['FirebaseUrl', Firebase]);
