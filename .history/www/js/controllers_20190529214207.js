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
    $scope.myauth = function () {
      if (localStorage.secret == '') {
        $scope.loginCredentials = {
          username: "test",
          password: "test"
        }
        $scope.secretItems = JSON.parse($scope.loginCredentials);

      }else{
      
        $scope.secretItems = JSON.parse(localStorage.getItem('secret'));
        // $scope.loginCredentials = secretItems;
    
    }


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


    /*    $http.get($base_url + '/api/get_nonce/?controller=user&method=generate_auth_cookie')
       .then(function (response){
         $scope.jsondata = [response.data.data];
         var responseText = $scope.jsondata;
         console.log("status:" + responseText.status);
               var names = responseText;
               localStorage.setItem('nonce', names);
               var str1 = names;
               var str2 = "filtering";
               var str3 = str1.replace(str2, "");
               var nonce = JSON.parse(str3)
               console.log('nonce:', nonce);
       }).catch(function(response) {
         console.error('Error occurred:', response.status, response.data);
       }).finally(function() {
          console.log("Task Finished.");
       }); */
    /* $scope.nonceGet = function($scope,){


      $.ajax({
         type: 'GET',
         url: $base_url + '/api/get_nonce/?controller=user&method=generate_auth_cookie',
         data: {
             get_param: 'value'
         },
         complete: function (data) {
             var names = data.responseText;
             localStorage.setItem('nonce', names);
             var str1 = names;
             var str2 = "filtering";
             var str3 = str1.replace(str2, "");
             var nonce = JSON.parse(str3)
             console.log('nonce:', nonce);

             /  if(nonce.status == "ok"  &&  userAuth !== ""){
                  $.mobile.changePage( "#index", { transition: "slide"} );
              }else{
                  $.mobile.changePage( "#login", { transition: "slide"} );
                  
              } *
         }

     }); */


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
      $scope.myauth();
      console.log('loginCredentials', $scope.loginCredentials);

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
      /* 
                } else {
                  isLoggedIn = false;
                  console.log('isLoggedIn', isLoggedIn);
                  localStorage.setItem("secret", JSON.stringify($scope.loginCredentials));
                  $timeout(function () {
                    $scope.login();
                  }, 1000);

                } */

      /*   var getCredentials=  JSON.parse(localStorage.getItem('auth'));
        var itemCredentials=  getCredentials;
        $scope.status = responseText[0].status; */
      /*  if(itemCredentials.status !=="error"){
         console.log(itemCredentials.username);
       }
       else{
         $timeout(function () {
           $scope.login();
         }, 1000);
       } */
    

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
        /*  if (responseText.status == "error") {
          console.log(responseText.status);
          alert('Login failed. Please try again!');
        } else {
          var user = responseText;
          console.log('user',user);
          localStorage.setItem('auth', JSON.stringify(user));
      
        } */
        //  var authItems = JSON.parse(localStorage.getItem('auth'));
        /*  var str2 = "filtering";
         var str3 = str1.replace(str2, ""); */
        // var nonce = str1;
        //   console.log('authItems');
        // console.log(loginData);
        console.log('Doing login', $scope.loginData);

        localStorage.setItem('secret', JSON.stringify($scope.loginData));
      }).then(function error() {
        isLoggedIn = false;
        console.log('isLoggedIn', isLoggedIn);
      });
      /* 
            $http({
              method: "GET",
              url: $base_url + '/api/user/generate_auth_cookie/?username=' + $scope.loginData.username + '&password=' + $scope.loginData.password + '&insecure=cool',
              data: loginData,
              async: true,
              beforeSend: function () {
                $.mobile.loading('show');
              },
              complete: function (loginData) {
                $.mobile.loading('hide');

                console.log('loginData', loginData.responseText);
                var str1 = loginData.responseText;
                var str2 = "filtering"
                var str3 = str1.replace(str2, "");
                localStorage.setItem("auth", str3);

                var lol2 = localStorage.getItem("auth");
                var lol3 = JSON.parse(lol2);
                console.log(lol3);
                if (lol3.status == "error") {
                  alert('Login failed. Please try again!');
                } else {
                  $.mobile.changePage("#index", {
                    transition: "slide"
                  });
                }
              },


            }); */



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
  }

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
