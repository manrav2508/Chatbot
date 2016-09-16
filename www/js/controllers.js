/* global angular, document, window */
'use strict';
angular.module('rbbr').controller('AppCtrl', function($scope, $ionicModal, $ionicPopover, $timeout) {
    // Form data for the login modal
    $scope.loginData = {};
    $scope.isExpanded = false;
    $scope.hasHeaderFabLeft = false;
    $scope.hasHeaderFabRight = false;
    var navIcons = document.getElementsByClassName('ion-navicon');
    for (var i = 0; i < navIcons.length; i++) {
        navIcons.addEventListener('click', function() {
            this.classList.toggle('active');
        });
    }
    $scope.hideNavBar = function() {
        document.getElementsByTagName('ion-nav-bar')[0].style.display = 'none';
    };
    $scope.showNavBar = function() {
        document.getElementsByTagName('ion-nav-bar')[0].style.display = 'block';
    };
    $scope.noHeader = function() {
        var content = document.getElementsByTagName('ion-content');
        for (var i = 0; i < content.length; i++) {
            if (content[i].classList.contains('has-header')) {
                content[i].classList.toggle('has-header');
            }
        }
    };
    $scope.setExpanded = function(bool) {
        $scope.isExpanded = bool;
    };
    $scope.setHeaderFab = function(location) {
        var hasHeaderFabLeft = false;
        var hasHeaderFabRight = false;
        switch (location) {
            case 'left':
                hasHeaderFabLeft = true;
                break;
            case 'right':
                hasHeaderFabRight = true;
                break;
        }
        $scope.hasHeaderFabLeft = hasHeaderFabLeft;
        $scope.hasHeaderFabRight = hasHeaderFabRight;
    };
    $scope.hasHeader = function() {
        var content = document.getElementsByTagName('ion-content');
        for (var i = 0; i < content.length; i++) {
            if (!content[i].classList.contains('has-header')) {
                content[i].classList.toggle('has-header');
            }
        }
    };
    $scope.hideHeader = function() {
        $scope.hideNavBar();
        $scope.noHeader();
    };
    $scope.showHeader = function() {
        $scope.showNavBar();
        $scope.hasHeader();
    };
    $scope.clearFabs = function() {
        var fabs = document.getElementsByClassName('button-fab');
        if (fabs.length && fabs.length > 1) {
            fabs[0].remove();
        }
    };
}).controller('LoginCtrl', function($scope, $timeout, $stateParams, ionicMaterialInk) {
    $scope.$parent.clearFabs();
    $timeout(function() {
        $scope.$parent.hideHeader();
    }, 0);
    ionicMaterialInk.displayEffect();
}).controller('ChatCtrl', function($scope, $stateParams, $ionicPopup, $timeout, ionicMaterialInk, ionicMaterialMotion, $ionicScrollDelegate, BarclaysService) {
    // Set Header
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.$parent.setHeaderFab('left');
    // Delay expansion
    $timeout(function() {
        $scope.isExpanded = true;
        $scope.$parent.setExpanded(true);
    }, 300);
    // Set Motion
    ionicMaterialMotion.fadeSlideInRight();
    // Set Ink
    ionicMaterialInk.displayEffect();
    $scope.hideTime = true;
    var alternate,
        isIOS = ionic.Platform.isWebView() && ionic.Platform.isIOS();
    $scope.sendMessage = function() {
        alternate = !alternate;
        var d = new Date();
        d = d.toLocaleTimeString().replace(/:\d+ /, ' ');
        $scope.messages.push({
            image: '../www/img/arya.jpg',
            userId: '12345',
            text: $scope.data.message,
            time: d
        });
        if ($scope.data.message.toLowerCase() == 'c') {
            BarclaysService.fetchCustDetails().then(function(custDetails) {
                var accountDetails = "";
                for (var i = 0; i < custDetails.accountList.length; i++) {
                    accountDetails += "<div class='row'><strong>" + custDetails.accountList[i].accountType + "</strong></div>" + 
                    "<div class='row'><strong>A/c no:</strong>" + custDetails.accountList[i].id + "</div>" + 
                    "<div class='row'><strong>Bal:</strong>" + custDetails.accountList[i].currentBalance + "</div>"
                }
                var tabelresp = "Customer Details <BR> " + "<div class='row'><div class='col header'>Customer Name</div><div class='col'>" + custDetails.title + " " + custDetails.firstName + " " + custDetails.lastName + "</div></div>" + 
                "<div class='row'><div class='col'>Contact Details</div><div class='col'>" + custDetails.mobileNo + "</div></div>" + 
                "<div class='row'><div class='col'>DOB</div><div class='col'>" + new Date(custDetails.dateOfBirth) + "</div></div>" + 
                "<div class='row'><div class='col'>Customer Address</div><div class='col'>" + custDetails.address.street + ", " + custDetails.address.town + "<br> " + custDetails.address.postalCode + ", " + custDetails.address.country + "</div></div>" +
                "<div class='row'><div class='col'>Customer Accounts</div><div class='col'>" + accountDetails + "</div>";
                $scope.messages.push({
                    image: '../www/img/icon.png',
                    userId: '54321',
                    text: tabelresp,
                    time: d
                });
                $ionicScrollDelegate.scrollBottom(true);
            }, function(err) {
                var alertPopup = $ionicPopup.alert({
                    title: 'failed!',
                    template: 'There is some proble to call API!'
                });
            });
        } else if ($scope.data.message.toLowerCase() == 't') {
            BarclaysService.fetchTansuctionsDetails().then(function(transDetails) {
            	var tabelresp = "Transuction Details <BR> " + 
            	"<div class='row'><div class='col'>Transuction ID</div><div class='col'>" + transDetails.id + "</div></div>" + 
                "<div class='row'><div class='col'>Money In</div><div class='col'>" + transDetails.amount.moneyIn + "</div></div>" +
                "<div class='row'><div class='col'>Money Out</div><div class='col'>" + transDetails.amount.moneyOut + "</div></div>" +
                "<div class='row'><div class='col'>Payment Method</div><div class='col'>" + transDetails.paymentMethod+ "</div></div>" +
                "<div class='row'><div class='col'>Balance After Transaction <BR></div><div class='col'>" + transDetails.accountBalanceAfterTransaction.amount+ "</div></div>";
                $scope.messages.push({
                    image: '../www/img/icon.png',
                    userId: '54321',
                    text: tabelresp,
                    time: d
                });
                $ionicScrollDelegate.scrollBottom(true);
            }, function(err) {
                var alertPopup = $ionicPopup.alert({
                    title: 'failed!',
                    template: 'There is some proble to call API!'
                });
            });
        } else if ($scope.data.message.toLowerCase() == 'a') {
            BarclaysService.fetchAccountsDetails().then(function(accDetails) {
                $scope.messages.push({
                    image: '../www/img/icon.png',
                    userId: '54321',
                    text: 'Accounts Details <BR>' + accDetails,
                    time: d
                });
                $ionicScrollDelegate.scrollBottom(true);
            }, function(err) {
                var alertPopup = $ionicPopup.alert({
                    title: 'failed!',
                    template: 'There is some proble to call API!'
                });
            });
        } else {
            $scope.messages.push({
                image: '../www/img/icon.png',
                userId: '54321',
                text: 'No keyword found : ' + $scope.data.message,
                time: d
            });
        }
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
}).controller('ProfileCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk) {
    // Set Header
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab(false);
    // Set Motion
    $timeout(function() {
        ionicMaterialMotion.slideUp({
            selector: '.slide-up'
        });
    }, 300);
    $timeout(function() {
        ionicMaterialMotion.fadeSlideInRight({
            startVelocity: 3000
        });
    }, 700);
    // Set Ink
    ionicMaterialInk.displayEffect();
}).controller('ActivityCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk) {
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = true;
    $scope.$parent.setExpanded(true);
    $scope.$parent.setHeaderFab('right');
    $timeout(function() {
        ionicMaterialMotion.fadeSlideIn({
            selector: '.animate-fade-slide-in .item'
        });
    }, 200);
    // Activate ink for controller
    ionicMaterialInk.displayEffect();
}).controller('GalleryCtrl', function($scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion) {
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = true;
    $scope.$parent.setExpanded(true);
    $scope.$parent.setHeaderFab(false);
    // Activate ink for controller
    ionicMaterialInk.displayEffect();
    ionicMaterialMotion.pushDown({
        selector: '.push-down'
    });
    ionicMaterialMotion.fadeSlideInRight({
        selector: '.animate-fade-slide-in .item'
    });
});