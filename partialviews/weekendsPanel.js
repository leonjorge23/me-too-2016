function weekendsController(fbRef, $firebaseArray, $location){
	var model = this;


	var weekendsRef = fbRef.getWeekendsRef(),
	$weekends = $firebaseArray(weekendsRef),
	weekendArr = [];


		$weekends.$loaded().then(function(data){
			model.weekends = data;
			angular.forEach(data, function(value, key){
				weekendArr.push({name: value.$id, id: value.$id});
			});

			$("#selectWeekend").kendoComboBox({
				dataSource: weekendArr,
				dataTextField: "name",
				dataValueField: "id"
			});
		})

	// get value when on click
	model.redirectToWeekendGrid = function() {
		var combobox = $("#selectWeekend").data("kendoComboBox");
		var value = combobox.value();
		$location.path('/teamGrid/' + value);
	}
}

angular.module('app').component('weekendsPanel', {
	templateUrl: 'partialviews/weekendsPanel.html',
	controllerAs: "model",
	controller: weekendsController
})

