angular.module('app').factory('coupleInfo', function(fbRef, $firebaseObject, $q){

	function get(id){
		var couplesRef = fbRef.getCoupleProf(id),
				$couples = $firebaseObject(couplesRef),
				data = 'not Set';

   var p1 = new Promise(function(resolve){
		 $couples.$loaded().then(function (dataRaw) {
			 data = dataRaw;
			 resolve(dataRaw);
		 })
	 });

		return p1.then(function(value) {
			return (value); // Success!
		});

	}

	return {
		get : get
	}
});