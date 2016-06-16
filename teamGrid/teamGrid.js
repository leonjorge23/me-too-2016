var teamGridController = function (fbRef, fbConfig, coupleInfo,  $firebaseObject, $location, $routeParams, $scope) {
    var model = this;

    // modals code
    model.status = {
        isFirstOpen: true,
        isFirstDisable: false
    };
    model.oneAtATime = true;
    model.hide = true;


    var selectedWeekendRef = fbRef.getWeekendRef($routeParams.id),
        $weekend = $firebaseObject(selectedWeekendRef);
    $weekend.$loaded().then(function (data) {
        model.weekend = data;
        console.log(model.weekend);

        // build teams
        // Speakers
        model.speakers = data.speakers;
        model.speakerChallenges = model.speakers['Challenges in Marriage'];
        if ( !!model.speakerChallenges.id ){
            populateRoleOnInit(model.speakerChallenges.id, model.speakerChallenges.name, "speakerChallenges");
        }else{
            model.hide = false;
        }

        model.speakerChallengesNoP = {};

        model.speakerRelatives = model.speakers['Children Family and Relatives'];
        model.speakerChallenges = model.speakers['Challenges in Marriage'];
        model.speakerChristianMarriage = model.speakers['Christian Marriage'];
        model.speakerCommunication = model.speakers['Communication'];
        model.speakerGodPlan = model.speakers['Gods Plan for Marriage'];
        model.speakerJoysMarriage = model.speakers['Joys of Marriage'];
        model.speakerLoveSex = model.speakers['Love & Sex'];
        model.speakerMenWomenGod = model.speakers['Man Woman God'];
        model.speakerMarrPartner = model.speakers['Marriage Partners'];
        model.speakerMarrSacrament = model.speakers['Marriage as a Sacrament'];
        model.speakerMarrCommunity = model.speakers['Marriage in the Community'];
        model.speakerProblems = model.speakers['Problem Marriage'];
        model.speakerUnderstandingSelf = model.speakers['Understanding of Self'];
        console.log(model.speakerChallenges);

        // reunion
        model.reunion = data['Reunion Team'];
        model.reunionLead = model.reunion.lead;
        model.reunionOne = model.reunion.team.one;
        model.reunionTwo = model.reunion.team.two;
        model.reunionThree = model.reunion.team.three;
        // console.log(model.Reunion);
    });

    function populateRoleOnInit(id, name, role){
        var roleN = role + 'NoP';
        var promise = coupleInfo.get(id);
        promise.then(function(couple){
            model[role].id = couple.$id;
            model[role].name = name;
            model[roleN].city = couple.city;
            model[roleN].homePhone = couple.home_phone;
            model[roleN].hisCell = couple.his_cell || "N/A";
            model[roleN].herCell = couple.her_cell || "N/A";
            model[roleN].email = couple.primary_email || "N/A";
            model.hide = true;
            $scope.$digest();
        })
    }
    model.selectedProfile = function (id) {
        return id;
    };
    function actualizeSelectedRole(coupleInfo) {
        couple = coupleInfo.info;
        var role = coupleInfo.role, id = couple.$id, name = coupleInfo.name,
            roleN = role + 'NoP';

        model[role].id = id;
        model[role].name = name;
        model[roleN].city = couple.city;
        model[roleN].homePhone = couple.home_phone;
        model[roleN].hisCell = couple.his_cell || "N/A";
        model[roleN].herCell = couple.her_cell || "N/A";
        model[roleN].email = couple.primary_email || "N/A";
        $scope.$digest();

        // save to firebase
        $weekend.$save().then(function(ref) {
            console.log('saved')
        }, function(error) {
            console.log("Error:", error);
        });
    }
    model.updateId = function (selectedCouple) {
        actualizeSelectedRole(selectedCouple)
    }

}


angular.module('app').component('teamGrid', {
    templateUrl: 'teamGrid/teamGrid.html',
    controllerAs: 'model',
    controller: teamGridController
})