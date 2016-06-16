angular.module('app').factory('fbRef', function(FirebaseUrl, auth) {
	var ref = new Firebase(FirebaseUrl);
	return {
		getCouplesRef: function() {
			return ref.child('couples');
		},
		getWeekendsRef: function() {
			return ref.child('weekends');
		},
		getCoupleProf: function(param) {
			return ref.child('couples/' + param);
		},
		getWeekendRef: function(param) {
			return ref.child('weekends/' + param);
		},
	}
})