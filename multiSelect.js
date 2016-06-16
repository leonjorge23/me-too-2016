function multiSelectCtrl (fbRef, $firebaseArray, $scope, $location){
	var model = this;
	var role = model.role, couples;
	var couplesRef = fbRef.getCouplesRef(),
			$couples = $firebaseArray(couplesRef),
			coupleArr = [], data = {};

	// load data to kendo autocomplete
	$couples.$loaded().then(function (dataRaw) {
		couples = dataRaw;
		angular.forEach(dataRaw, function (value, key) {
			var thisCouple = value.her_name + ' & ' + value.his_name + ' ' + value.last_name;
			coupleArr.push({ coupleName: thisCouple, id: value.$id });
		});

		$(".selectCouple").kendoAutoComplete({
			dataSource: coupleArr,
			dataTextField: "coupleName",
			filter: "contains",
			minLength: 2,
			placeholder: "Enter couple's name ...",
			change: function (e) {
				var couple = this.value();
				model.findProfileId(couple);
			}
		});
	});



	function findCoupleInfo(id) {
		var coupleInfo;
		angular.forEach(couples, function (value, key){
			if(id == value.$id){
				coupleInfo = value;
				return;
			}
		})
		return coupleInfo;
	}
	// get value when on click
	model.findProfileId = function (couple) {
		angular.forEach(coupleArr, function (value, key) {
			if (couple === value.coupleName) {
				var coupleInfo = findCoupleInfo(value.id);
				var selectedCouple = {
					id: value.id,
					name: couple,
					role: role,
					info: coupleInfo
				}
				model.parent.updateId(selectedCouple);
				$scope.$apply(function () {
					model.parent.hide = true;
				})
				return;
			}
		})
	}


}


angular.module('app').component('multiSelect', {
	template: '<div ng-hide="model.hide" ><input class="selectCouple"/></div>',
	controllerAs: 'model',
	controller: multiSelectCtrl,
	require: {
		'parent': '^teamGrid'
	},
	bindings: {
		role: '<'
	}
});
