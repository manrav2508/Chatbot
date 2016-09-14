angular.module('starter').controller('DashCtrl', function($scope, $state) {
		 $scope.logout = function(chat) {
	     	$state.go('login', {}, {
	             reload: true
	         });
	     };
    }).controller('ChatsCtrl', function($scope, Chats, $state) {
        // With the new view caching in Ionic, Controllers are only called
        // when they are recreated or on app start, instead of every page change.
        // To listen for when this page is active (for example, to refresh data),
        // listen for the $ionicView.enter event:
        //
        //$scope.$on('$ionicView.enter', function(e) {
        //});

        $scope.chats = Chats.all();
        $scope.remove = function(chat) {
            Chats.remove(chat);
        };
        $scope.logout = function(chat) {
        	$state.go('login', {}, {
                reload: true
            });
        };
    }).controller('loginCtrl', function($scope, $state) {
        $scope.data = {};
        $scope.login = function(data) {
        	if(data.username ==='Abhinav' && data.password ==='123123'){
        		$state.go('tab.dash', {}, {
                    reload: true
                });
        	}
        };
    }).controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
        $scope.chat = Chats.get($stateParams.chatId);
    }).controller('Messages', function($scope, $timeout, $ionicScrollDelegate) {

        $scope.hideTime = true;

        var alternate,
            isIOS = ionic.Platform.isWebView() && ionic.Platform.isIOS();

        $scope.sendMessage = function() {
            alternate = !alternate;

            var d = new Date();
            d = d.toLocaleTimeString().replace(/:\d+ /, ' ');

            $scope.messages.push({
                userId: alternate ? '12345' : '54321',
                text: $scope.data.message,
                time: d
            });

            delete $scope.data.message;
            $ionicScrollDelegate.scrollBottom(true);

        };


        $scope.inputUp = function() {
            if (isIOS) $scope.data.keyboardHeight = 216;
            $timeout(function() {
                $ionicScrollDelegate.scrollBottom(true);
            }, 300);

        };

        $scope.inputDown = function() {
            if (isIOS) $scope.data.keyboardHeight = 0;
            $ionicScrollDelegate.resize();
        };

        $scope.closeKeyboard = function() {
            // cordova.plugins.Keyboard.close();
        };


        $scope.data = {};
        $scope.myId = '12345';
        $scope.messages = [];

    })
    .controller('AccountCtrl', function($scope,$state) {
        $scope.settings = {
            enableFriends: true
        };
        $scope.logout = function(chat) {
        	$state.go('login', {}, {
                reload: true
            });
        };
        
    });