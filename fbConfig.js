angular.module('app').factory('fbConfig', function () {

    var config = {
        apiKey: "AIzaSyBiDBLyg8qC5o8EFCUsDdO54sst9XTlqs8",
        authDomain: "me-tool.firebaseapp.com",
        databaseURL: "https://me-tool.firebaseio.com",
        storageBucket: "me-tool.appspot.com",
    };
    firebase.initializeApp(config);
    // Get a reference to the storage service, which is used to create references in your storage bucket
    var storage = firebase.storage();
    var storageRef = storage.ref();

    return {
        getStorageRef: function () {
            return storageRef;
        },
        getImageStorageRef: function () {
            var imagesRef = storageRef.child('couples-images/');
            return imagesRef;
        }
    }

});
