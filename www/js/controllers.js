angular.module('starter.controllers', [])

.filter('Datetm', function() {
  return function(input) {
    myObj = input;
    myDate = new Date(1000*myObj);
    return myDate.toUTCString();
  }
})

.controller('AppCtrl', function($scope,$rootScope, $ionicModal, $timeout,$state,$ionicPopup,$ionicLoading,$http,$window) {


  if(localStorage.getItem('lOGIN_DATA') == undefined || localStorage.getItem('lOGIN_DATA') == null){
    
}else{
  $rootScope.User=JSON.parse(localStorage.getItem('lOGIN_DATA')).data[0].StudentFirstName;
  console.log($rootScope.User);
}
 

$scope.doreload=function(){
  
  $scope.loadsheets();
   // Stop the ion-refresher from spinning
   $scope.$broadcast('scroll.refreshComplete');

};

$scope.doreload1=function(){
  
  $scope.loadtests();
   // Stop the ion-refresher from spinning
   $scope.$broadcast('scroll.refreshComplete');

};

  $scope.emailFeedBack = function(){
    var link = "mailto:?to=ajeetsrpandey@gmail.com.com&bcc=shwetankrdwivedih@gmail.com&subject=Feedback"
    window.location.href = link;
  }

  $scope.loadprofile=function(){

  var data={
  incoming:JSON.parse(localStorage.getItem('lOGIN_DATA')).data[0].StudentID
  }

  $ionicLoading.show({
    content: 'Loading Profile'
    , animation: 'fade-in'
    , showBackdrop: true
    , maxWidth: 200
    , template: 'Loading..'
    , showDelay: 0
});  
  $http({
    method: 'post'
    , url: apilink+'loadprofile'
    , data: data
}).then(function successCallback(response) {
     if (response.data.length == 0) {
         $ionicLoading.hide();
        $scope.showAlert('Error', 'couldnt fetch approriate details for the user')
    } else {
    $ionicLoading.hide();
        $scope.profiledata=response.data[0]
        console.log($scope.profiledata)
       
    }
})

}


$scope.filldropdown=function(){

  var data={}
  $http({
    method: 'post'
    , url: apilink+'schoolmaster'
    , data: data
}).then(function successCallback(response) {
     if (response.data.length == 0) {
         $ionicLoading.hide();
        $scope.showAlert('Error', 'couldnt fetch approriate details for the user')
    } else {
            

    $ionicLoading.hide();
        $scope.schooldata=response.data
        console.log($scope.schooldata)
       
    }
})


}

$scope.loadsheets=function(){
 
  $ionicLoading.show({
    content: 'Loading'
    , animation: 'fade-in'
    , showBackdrop: true
    , maxWidth: 200
    , template: 'Loading..'
    , showDelay: 0
});  

    var data = {
      schoolid: JSON.parse(localStorage.getItem('lOGIN_DATA')).data[0].SchoolID,
      classid: JSON.parse(localStorage.getItem('lOGIN_DATA')).data[0].ClassID
 
      
    }
    $http({
        method: 'post'
        , url: apilink+'worksheets'
        , data: data
    }).then(function successCallback(response) {
         if (response.data.length == 0) {
             $ionicLoading.hide();
            $scope.showAlert('Error', 'couldnt fetch approriate details for the user')
        } else {
                

        $ionicLoading.hide();
            $scope.worksheets=response.data
            console.log($scope.worksheets)
           
        }
    })

}

$scope.loadtests=function(){
  
   $ionicLoading.show({
     content: 'Loading'
     , animation: 'fade-in'
     , showBackdrop: true
     , maxWidth: 200
     , template: 'Loading..'
     , showDelay: 0
 });  
 
     var data = {
       schoolid: JSON.parse(localStorage.getItem('lOGIN_DATA')).data[0].SchoolID,
       classid:JSON.parse(localStorage.getItem('lOGIN_DATA')).data[0].ClassID
       
     }
     $http({
         method: 'post'
         , url: apilink+'tests'
         , data: data
     }).then(function successCallback(response) {
          if (response.data.length == 0) {
              $ionicLoading.hide();
             $scope.showAlert('Error', 'couldnt fetch approriate details for the user')
         } else {
                 
 
         $ionicLoading.hide();
             $scope.tests=response.data
             console.log($scope.tests)
            
         }
     })
 
 }

 
$scope.logout=function(){
  localStorage.clear();
  $state.go('app.intro');

  

}
$scope.showtest=function(incom){
  
   link="http://student.asrtutorials.com/test-files/"+incom;
   window.open(link,"_system");
 }
 $scope.showtestans=function(incom){
   
    link="http://student.asrtutorials.com/answerset-files/"+incom;
    window.open(link,"_system");
  }
 $scope.showtestResult=function(incom){
   
    link="http://student.asrtutorials.com/result-files/"+incom;
    window.open(link,"_system");
  }

$scope.showsheet=function(incom){
 
  link="http://student.asrtutorials.com/worksheet-files/"+incom;
  window.open(link,"_system");
}
$scope.showanswer=function(incom){
  
   link="http://student.asrtutorials.com/worksheet-answer/"+incom;
   window.open(link,"_system");
 }




  $scope.showAlert=function(title,content){
    $ionicPopup.alert({
                title: title,
                content: content
            }).then(function (res) {

            });
}

  // Called to navigate to the main app
  $scope.startApp = function() {
    $state.go('worksheets');
  };
  $scope.next = function() {
    $ionicSlideBoxDelegate.next();
  };
  $scope.previous = function() {
    $ionicSlideBoxDelegate.previous();
  };

  // Called each time the slide changes
  $scope.slideChanged = function(index) {
    $scope.slideIndex = index;
  };
    
    
//    ON LOAD FUNCTIONS
    
    $scope.filldata=function(){}
        
    
    
//    ON LOAD FUNCTIONS
    
/*SIGNUP DATA*/   
   
    
     $ionicModal.fromTemplateUrl('templates/signup.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modalsignup = modal;
  });
    
      $scope.closeSignup = function() {
    $scope.modalsignup.hide();
  };

  // Open the login modal
  $scope.signup = function() {
    $scope.modalsignup.show();
  };
  $scope.loginData1 = {
    fname:'',
    lname:'',
    email:'',
    schoolname:'',
    classid:'',
    password:''
};
      $scope.doSignup= function(loginData1) {
    console.log('Doing Signup', loginData1);

    if ($scope.loginData1.fname == '') {
      $scope.showAlert('Error','Please Enter First Name')
     return;
 }
 if ($scope.loginData1.lname == '') {
      $scope.showAlert('Error','Please Enter Last Name')
     return;
 }
 if ($scope.loginData1.email == '') {
      $scope.showAlert('Error','Please Enter Email')
     return;
 }
 if ($scope.loginData1.schoolname == '') {
      $scope.showAlert('Error','Please Select Schoolname')
     return;
 }
 if ($scope.loginData1.classid == '') {
      $scope.showAlert('Error','Please Select classid')
     return;
 }
 if ($scope.loginData1.password == '') {
      $scope.showAlert('Error','Please Enter password')
     return;
 }
 


 $ionicLoading.show({
  content: 'Signing you up'
  , animation: 'fade-in'
  , showBackdrop: true
  , maxWidth: 200
  , template: 'Loading..'
  , showDelay: 0
}); 

var data = {
  fname:loginData1.fname,
  lname:loginData1.lname,
  email:loginData1.email,
  schoolname:loginData1.schoolname,
  classid:loginData1.classid,
  password:loginData1.password
 
}
console.log(data)
$http({
  method: 'post'
  , url: apilink+'RegUser'
  , data: data
}).then(function successCallback(response) {
   if (response.data== 'fail') {
       $ionicLoading.hide();
      $scope.showAlert('Error', 'Signup Failed. Please try again with valid credentials.')
  } else {
           $scope.closeSignup();
// $window.location = '#/app/messages'
  $ionicLoading.hide();
  $scope.showAlert('Success','Please wait as admin activates your profile')
      // localStorage.setItem('lOGIN_DATA', JSON.stringify(response));
      // window.plugins.OneSignal.sendTag("ClassID", response.data[0].ClassID);
     
      // window.plugins.OneSignal.sendTags({"ClassID": response.data[0].ClassID, "SchoolID": response.data[0].SchoolID});
      // $state.go('app.worksheets');
      //$rootScope.isAdmin=(JSON.parse(localStorage.getItem('lOGIN_DATA')).data[0].type=='1'?true:false)
  }
})



  };
   
    
      
    
/*SIGNUP DATA*/    
    
    

  // Form data for the login modal
 

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.loginData = {
    username:'',
    password:''
};
  $scope.doLogin = function(loginData) {
    console.log('Doing login', $scope.loginData);
    if ($scope.loginData.username == null || $scope.loginData.username == undefined || $scope.loginData.username == '') {
      $scope.showAlert('Error','Please Enter Userid')
     return;
 }
 if ($scope.loginData.password == null || $scope.loginData.password == undefined || $scope.loginData.password == '') {
      $scope.showAlert('Error','Please Enter Password')
     return;
 }

 $ionicLoading.show({
  content: 'Loading'
  , animation: 'fade-in'
  , showBackdrop: true
  , maxWidth: 200
  , template: 'Loading..'
  , showDelay: 0
}); 

var data = {
  username: loginData.username,
  password: loginData.password
}
console.log(data)
$http({
  method: 'post'
  , url: apilink+'logon'
  , data: data
}).then(function successCallback(response) {
   if (response.data.length == 0) {
       $ionicLoading.hide();
      $scope.showAlert('Error', 'Login Failed. Please try again with valid credentials.')
      
  } else {
           $scope.closeLogin();
$window.location = '#/app/messages'
  $ionicLoading.hide();
      localStorage.setItem('lOGIN_DATA', JSON.stringify(response));
      
      // window.plugins.OneSignal.sendTag("ClassID", response.data[0].ClassID);
     
      window.plugins.OneSignal.sendTags({"ClassID": response.data[0].ClassID, "SchoolID": response.data[0].SchoolID});
      $state.go('app.worksheets');
      //$rootScope.isAdmin=(JSON.parse(localStorage.getItem('lOGIN_DATA')).data[0].type=='1'?true:false)
  }
})



 

  };
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});
