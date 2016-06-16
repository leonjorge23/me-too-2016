function couplesController(fbRef, $firebaseArray, $scope, $location) {
    var model = this;
    var couplesRef = fbRef.getCouplesRef(),
	$couples = $firebaseArray(couplesRef),
	coupleArr = [], data = {};

    // load data to kendo autocomplete
    $couples.$loaded().then(function (dataRaw) {
        model.couples = dataRaw;
        angular.forEach(dataRaw, function (value, key) {
            var thisCouple = value.her_name + ' & ' + value.his_name + ' ' + value.last_name;
            coupleArr.push({ coupleName: thisCouple, id: value.$id });
        });

        $("#selectCouple").kendoAutoComplete({
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

    // get value when on click
    model.findProfileId = function (couple) {
        angular.forEach(coupleArr, function (value, key) {
            if (couple === value.coupleName) {
                var $id = value.id;
                model.redirectToCoupleProfile($id);
            }
        })
    }
    model.redirectToCoupleProfile = function (id) {
        $scope.$apply(function () {
            $location.path('/couple/' + id);
        });
    }


}

angular.module('app').component('couplesPanel', {
	templateUrl: 'partialviews/couplesPanel.html',
	controllerAs: 'model',
	controller: couplesController
})
