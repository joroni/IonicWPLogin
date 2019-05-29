//$base_url = "http://178.128.63.151/bnext2";
$base_url = "https://justinpineda.com";

angular.module('starter.controllers', [])

  .controller('AppCtrl', function ($scope, $ionicModal, $timeout, $http) {

    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //$scope.$on('$ionicView.enter', function(e) {
    //});
    //$scope.myauth = function () {
      if (localStorage.secret == '') {
        $scope.loginCredentials = {
          username: "test",
          password: "test"
        }
        $timeout(function () {
          console.log($scope.loginCredentials);
          localStorage.setItem('secret', JSON.stringify($scope.loginCredentials));
        $scope.secretItems = JSON.parse(localStorage.getItem('secret'));

        }, 1000);
      
      } else {
        localStorage.setItem('secret', JSON.stringify($scope.loginData));
      }

  //  }


    $http({
      method: 'GET',
      url: $base_url + '/api/get_nonce/?controller=user&method=generate_auth_cookie',
      dataType: "json",
      contentType: "application/json; charset=utf-8"
    }).then(function successCallback(obj) {
      responseText = [obj.data]; // response data 
      var names = responseText;
      console.log(names);
      localStorage.setItem('nonce', JSON.stringify(names));
      var str1 = JSON.parse(localStorage.getItem('nonce'));
      /*  var str2 = "filtering";
       var str3 = str1.replace(str2, ""); */
      var nonce = str1;
      console.log(nonce);
    });




    // Form data for the login modal
    $scope.loginData = {};

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/login.html', {
      scope: $scope
    }).then(function (modal) {
      $scope.modal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeLogin = function () {
      $scope.modal.hide();
    };

    // Open the login modal
    $scope.login = function () {
      $scope.modal.show();
    };


    $scope.logout = function () {
      $scope.modal.show();
      let keysToRemove = ["auth", "secret", "nonce"];

      for (key of keysToRemove) {
        localStorage.removeItem(key);
      }

      $timeout(function () {
        $scope.login();
      }, 1000);

    }



    $scope.checkAuth = function () {
    //  $scope.myauth();

      $scope.secretItems = JSON.parse(localStorage.getItem('secret'));
      console.log('secretItems', $scope.secretItems);
      /*   if (localStorage.secret !== '') {
        $scope.secretItems = JSON.parse(localStorage.getItem('secret'));
        // $scope.loginCredentials = secretItems;
      }else{
        $scope.secretItems = JSON.parse($scope.loginCredentials);
      } */
      $http({
        method: 'POST',
        url: $base_url + '/api/user/generate_auth_cookie/?username=' + $scope.loginCredentials.username + '&password=' + $scope.loginCredentials.password + '&insecure=cool',
        dataType: "json",
        contentType: "application/json; charset=utf-8"
      }).then(function successCallback(obj) {
        responseText = [obj.data]; // response data 
        $scope.authItems = responseText;
        var user = responseText;
        $scope.status = responseText[0].status;
        console.log('user', user);
        console.log('Doing status', responseText[0].status);
        localStorage.setItem('auth', JSON.stringify(user));
        isLoggedIn = true;
        console.log('isLoggedIn', isLoggedIn);
      }).then(function error() {
        isLoggedIn = false;
        console.log('isLoggedIn', isLoggedIn);
        localStorage.setItem("secret", JSON.stringify($scope.loginCredentials));
        $timeout(function () {
          $scope.login();
        }, 1000);


      })
    }


    $scope.checkAuth();

    // Perform the login action when the user submits the login form
    $scope.doLogin = function (loginData) {
      $http({
        method: 'POST',
        url: $base_url + '/api/user/generate_auth_cookie/?username=' + $scope.loginData.username + '&password=' + $scope.loginData.password + '&insecure=cool',
        dataType: "json",
        contentType: "application/json; charset=utf-8"
      }).then(function successCallback(obj) {
        isLoggedIn = true;
        responseText = [obj.data]; // response data 
        $scope.authItems = responseText;
        var user = responseText;
        $scope.status = responseText[0].status;
        console.log('user', user);
        console.log('Doing status', responseText[0].status);
        localStorage.setItem('auth', JSON.stringify(user));
        isLoggedIn = false;
        console.log('isLoggedIn', isLoggedIn);

        console.log('Doing login', $scope.loginData);

        localStorage.setItem('secret', JSON.stringify($scope.loginData));
      }).then(function error() {
        isLoggedIn = false;
        console.log('isLoggedIn', isLoggedIn);
      });



      $timeout(function () {
        $scope.closeLogin();
      }, 1000);

      //console.log('Doing login', $scope.loginData);

      // Simulate a login delay. Remove this and replace with your login
      // code if using a login system
      /*  $timeout(function() {
         $scope.closeLogin();
       }, 1000); */
    };
  })

  .controller('PlaylistsCtrl', function ($scope) {
    $scope.playlists = [{
        title: 'Reggae',
        id: 1
      },
      {
        title: 'Chill',
        id: 2
      },
      {
        title: 'Dubstep',
        id: 3
      },
      {
        title: 'Indie',
        id: 4
      },
      {
        title: 'Rap',
        id: 5
      },
      {
        title: 'Cowbell',
        id: 6
      }
    ];
  })

  .controller('PlaylistCtrl', function ($scope, $stateParams) {});
