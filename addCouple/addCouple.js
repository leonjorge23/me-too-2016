function addCoupleController(fbRef, fbConfig, $firebaseObject, $location, $routeParams, $scope) {
    var model = this; model.submitMessage = ''; model.initPhotoUrl = 'uploads/gravatar-temp.png';

    var coupleParent = fbRef.getCouplesRef();

    model.submit = function () {
        $coupleProfle = coupleParent.push(model.profile);
        var $id = $coupleProfle.path.u[1];
        $location.path('/couple/' + $id);
    }
    model.cancel = function () {
        $location.path('/dashboard/');
    }
    // upload on file select or drop
    model.uploadFiles = function (file) {

        // Upload file and metadata to the object 'images/mountains.jpg'
        var storageRef = fbConfig.getImageStorageRef();
        var uploadTask = storageRef.child(file.name).put(file);

        // Listen for state changes, errors, and completion of the upload.
        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
				function (snapshot) {
				    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
				    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
				    console.log('Upload is ' + progress + '% done');
				}, function (error) {
				    switch (error.code) {
				        case 'storage/unauthorized':
				            console.log("User doesn't have permission to access the object");
				            break;

				        case 'storage/canceled':
				            console.log("User canceled the upload");// User canceled the upload
				            break;

				        case 'storage/unknown':
				            console.log("Unknown error occurred, inspect error.serverResponse");
				            break;
				    }
				}, function () {
				    // Upload completed successfully, now we can get the download URL
				    var downloadURL = uploadTask.snapshot.downloadURL;
				    model.onSelect(downloadURL);
				});
    };


    model.onSelect = function (photoURL) {
        console.log(photoURL);

        if (photoURL !== null || photoURL !== undefined) {
            model.profile.couple_photo = model.initPhotoUrl = photoURL;
            model.submitMessage = "don't forget to submit your changes";
            $scope.$digest();
        }
    }
}

angular.module('app').component('addCouple', {
    templateUrl: 'addCouple/addCouple.html',
    controllerAs: 'model',
    controller: addCoupleController
})
