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
}).controller('ChatCtrl', function($scope, $stateParams, $ionicPopup, $timeout, ionicMaterialInk, ionicMaterialMotion, $ionicScrollDelegate, BarclaysService, $interval) {
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
    $scope.typing = false;
    $scope.sendMessage = function() {
        //BarclaysService.scrollTo('bottom');
        $ionicScrollDelegate.scrollBottom(true);
        alternate = !alternate;
        var d = new Date();
        d = d.toLocaleTimeString().replace(/:\d+ /, ' ');
        if ($scope.data.message !== undefined) {
            $scope.messages.push({
                image: 'img/arya.jpg',
                userId: '12345',
                text: $scope.data.message,
                time: d
            });
            $scope.custMessage = "";
            for (var i = 0; i < $scope.messages.length; i++) {
                if ($scope.messages[i].userId === "12345") {
                    $scope.custMessage += $scope.messages[i].text + "+ "
                }
            }
            var progValHappy = 0;
            var progValAngry = 0;
            var progValSad = 0;
            var nlcOutput = "";
            
                BarclaysService.nlcOutput($scope.data.message).then(function(customerService){
                    $scope.typing = false;
                    var cardText = '';
                    nlcOutput = customerService.topClass;
                   
                    
                }, function(err) {
                    $scope.typing = false;
                    $scope.messages.push({
                        image: 'img/icon.png',
                        userId: '54321',
                        text: 'Unfortunately there was some problem with server. I m still learning.',
                        time: d
                    });
                });
            
            BarclaysService.calltoneAnalyzer($scope.custMessage).then(function(toneAnalyzerResp) {
                for (var i = 0; i < toneAnalyzerResp.emotionTone.length; i++) {
                    if (toneAnalyzerResp.emotionTone[i].name === 'Joy') {
                        progValHappy = toneAnalyzerResp.emotionTone[i].score;
                        starthappyProgress(progValHappy * 100);
                    }
                    if (toneAnalyzerResp.emotionTone[i].name === 'Anger') {
                        progValAngry = toneAnalyzerResp.emotionTone[i].score;
                        startAngryProgress(progValAngry * 100);
                    }
                    if (toneAnalyzerResp.emotionTone[i].name === 'Sadness') {
                        progValSad = toneAnalyzerResp.emotionTone[i].score;
                        startSadProgress(progValSad * 100);
                    }
                    if (toneAnalyzerResp.emotionTone[i].highScore) {
                        $scope.text = getEmotion(toneAnalyzerResp.emotionTone[i].name);
                    }
                }
                function getEmotion(emtVal) {
                    var emj = "";
                    emj += (emtVal === 'Sadness') ? ":disappointed:" : '';
                    emj += (emtVal === 'Anger') ? ":rage:" : '';
                    emj += (emtVal === 'Disgust') ? ":unamused:" : '';
                    emj += (emtVal === 'Fear') ? ":fearful:" : '';
                    emj += (emtVal === 'Joy') ? ":smile:" : '';
                    return emj;
                }
                function starthappyProgress(maxVal) {
                    $scope.progValHappy = 0;
                    $scope.happyInterval = $interval(function() {
                        $scope.progValHappy = $scope.progValHappy + 1;
                        if ($scope.progValHappy >= maxVal) {
                            $interval.cancel($scope.happyInterval);
                        }
                    }, 50);
                }
                function startSadProgress(maxVal) {
                    $scope.progValSad = 0;
                    $scope.sadInterval = $interval(function() {
                        $scope.progValSad = $scope.progValSad + 1;
                        if ($scope.progValSad >= maxVal) {
                            $interval.cancel($scope.sadInterval);
                        }
                    }, 50);
                }
                function startAngryProgress(maxVal) {
                    $scope.progValAngry = 0;
                    $scope.angryInterval = $interval(function() {
                        $scope.progValAngry = $scope.progValAngry + 1;
                        if ($scope.progValAngry >= maxVal) {
                            $interval.cancel($scope.angryInterval);
                        }
                    }, 50);
                }
            }, function(err) {
                $scope.typing = false;
                var alertPopup = $ionicPopup.alert({
                    title: 'failed!',
                    template: 'There is some proble to call API!'
                });
            });
            if ($scope.data.message.toLowerCase().includes('details')) {
                $scope.typing = true;
                BarclaysService.fetchCustDetails().then(function(custDetails) {
                    $scope.typing = false;
                    var accountDetails = "";
                    for (var i = 0; i < custDetails.accountList.length; i++) {
                        accountDetails += "<div class='row'><strong>" + custDetails.accountList[i].accountType + "</strong></div>" + "<div class='row'><strong>A/c no:</strong>" + custDetails.accountList[i].id + "</div>" + "<div class='row'><strong>Bal:</strong>" + custDetails.accountList[i].currentBalance + "</div>"
                    }
                    var tabelresp = "Customer Details <BR> " + "<div class='row'><div class='col header'>Customer Name</div><div class='col'>" + custDetails.title + " " + custDetails.firstName + " " + custDetails.lastName + "</div></div>" + "<div class='row'><div class='col'>Contact Details</div><div class='col'>" + custDetails.mobileNo + "</div></div>" + "<div class='row'><div class='col'>DOB</div><div class='col'>" + new Date(custDetails.dateOfBirth) + "</div></div>" + "<div class='row'><div class='col'>Customer Address</div><div class='col'>" + custDetails.address.street + ", " + custDetails.address.town + "<br> " + custDetails.address.postalCode + ", " + custDetails.address.country + "</div></div>" + "<div class='row'><div class='col'>Customer Accounts</div><div class='col'>" + accountDetails + "</div>";
                    $scope.messages.push({
                        image: 'img/icon.png',
                        userId: '54321',
                        text: tabelresp,
                        time: d
                    });
                    $ionicScrollDelegate.scrollBottom(true);
                }, function(err) {
                    $scope.typing = false;
                    var alertPopup = $ionicPopup.alert({
                        title: 'failed!',
                        template: 'There is some proble to call API!'
                    });
                });
            } else if ($scope.data.message.toLowerCase().includes('trans')) {
                $scope.typing = true;
                BarclaysService.fetchTansuctionsDetails().then(function(transDetails) {
                    $scope.typing = false;
                    var tabelresp = "Transaction Details <BR> " + "<div class='row'><div class='col'>Transuction ID</div><div class='col'>" + transDetails.id + "</div></div>" + "<div class='row'><div class='col'>Money In</div><div class='col'>" + transDetails.amount.moneyIn + "</div></div>" + "<div class='row'><div class='col'>Money Out</div><div class='col'>" + transDetails.amount.moneyOut + "</div></div>" + "<div class='row'><div class='col'>Payment Method</div><div class='col'>" + transDetails.paymentMethod + "</div></div>" + "<div class='row'><div class='col'>Balance After Transaction <BR></div><div class='col'>" + transDetails.accountBalanceAfterTransaction.amount + "</div></div>";
                    $scope.messages.push({
                        image: 'img/icon.png',
                        userId: '54321',
                        text: tabelresp,
                        time: d
                    });
                    $ionicScrollDelegate.scrollBottom(true);
                }, function(err) {
                    $scope.typing = false;
                    var alertPopup = $ionicPopup.alert({
                        title: 'failed!',
                        template: 'There is some proble to call API!'
                    });
                });
            } else if ($scope.data.message.toLowerCase().includes('acc')) {
                $scope.typing = true;
                BarclaysService.fetchAccountsDetails().then(function(accDetails) {
                    $scope.typing = false;
                    var tabelresp = "Account Details <BR> " + "<div class='row'><div class='col'>Account ID</div><div class='col'>" + accDetails.id + "</div></div>" + "<div class='row'><div class='col'>Account Type</div><div class='col'>" + accDetails.accountType + "</div></div>" + "<div class='row'><div class='col'>Account Description</div><div class='col'>" + accDetails.description + "</div></div>" + "<div class='row'><div class='col'>Account Card Number</div><div class='col'>" + accDetails.card.cardNumber + "</div></div>" + "<div class='row'><div class='col'>Account Card Current Balance</div><div class='col'>" + accDetails.card.currentBalance + "</div></div>" + "<div class='row'><div class='col'>Account Card Type<BR></div><div class='col'>" + accDetails.card.type + "</div></div>";
                    $scope.messages.push({
                        image: 'img/icon.png',
                        userId: '54321',
                        text: tabelresp,
                        time: d
                    });
                    $ionicScrollDelegate.scrollBottom(true);
                }, function(err) {
                    $scope.typing = false;
                    var alertPopup = $ionicPopup.alert({
                        title: 'failed!',
                        template: 'There is some proble to call API!'
                    });
                });
            } /*else if ($scope.data.message.toLowerCase().includes('loss') || $scope.data.message.toLowerCase().includes('lost') || $scope.data.message.toLowerCase().includes('wallet')) {
                $scope.typing = false;
                var tabelresp = "I see that your complaint is related to Cards <BR> <BR> Can I get your customer ID? (Prefix @ before customer ID)";
                $scope.messages.push({
                    image: 'img/icon.png',
                    userId: '54321',
                    text: tabelresp,
                    time: d
                });
            } */else if ($scope.data.message.toLowerCase().includes('@') && $scope.data.message.length === 11 && nlcOutput === "CARDS") {
                $scope.typing = true;
                var indexOfTo = $scope.data.message.indexOf("@");
                var custId = $scope.data.message.substring(indexOfTo + 1);
                BarclaysService.callCustomerDetails(custId).then(function(customerService) {
                    $scope.typing = false;
                    var cardText = '';
                    for (var i = 0; i < customerService.length; i++) {
                        cardText += customerService[i].cardNumber + ' / ';
                    }
                    $scope.messages.push({
                        image: 'img/icon.png',
                        userId: '54321',
                        text: 'Can you confim which of the '+ customerService.length  +' cards, ' + cardText + 'to block? ((Prefix @ before Card Number))',
                        time: d
                    });
                    $ionicScrollDelegate.scrollBottom(true);
                }, function(err) {
                    $scope.typing = false;
                    $scope.messages.push({
                        image: 'img/icon.png',
                        userId: '54321',
                        text: 'Unfortunately there was some problem with server. Im still learning.',
                        time: d
                    });
                });
            } else if ($scope.data.message.toLowerCase().includes('@') && $scope.data.message.length > 11) {
            	var indexOfTo = $scope.data.message.indexOf("@");
                var cardNum = $scope.data.message.substring(indexOfTo + 1);
                $scope.typing = false;
                BarclaysService.blockCustomerCard(cardNum).then(function(customerService) {
                    $scope.typing = false;
                    var cardText = '';
                    $scope.messages.push({
                        image: 'img/icon.png',
                        userId: '54321',
                        text: customerService.message,
                        time: d
                    });
                    $ionicScrollDelegate.scrollBottom(true);
                }, function(err) {
                    $scope.typing = false;
                    $scope.messages.push({
                        image: 'img/icon.png',
                        userId: '54321',
                        text: 'Unfortunately there was some problem with server. Im still learning.',
                        time: d
                    });
                });
            } else if ($scope.data.message.toLowerCase().includes('all')) {
                $scope.typing = false;
                BarclaysService.blockCustomerCard().then(function(customerService) {
                    $scope.typing = false;
                    var cardText = '';
                    $scope.messages.push({
                        image: 'img/icon.png',
                        userId: '54321',
                        text: customerService.message,
                        time: d
                    });
                    $ionicScrollDelegate.scrollBottom(true);
                }, function(err) {
                    $scope.typing = false;
                    $scope.messages.push({
                        image: 'img/icon.png',
                        userId: '54321',
                        text: 'Unfortunately there was some problem with server. Im still learning.',
                        time: d
                    });
                });
            } else {
                $scope.typing = true;
                BarclaysService.callWatsonAPI($scope.data.message).then(function(watsonReply) {
                    if (watsonReply.output.text[0].includes('?')) {
                        $scope.typing = true;
                        BarclaysService.rnrDetails(watsonReply.output.text[0]).then(function(customerService) {
                            $scope.typing = false;
                            var cardText = '';
                            var cardTitle = customerService.title;
                            var nextStep = customerService.nextStep;
                            var htmlContent =  '<B>' + customerService.title + '</B>' + customerService.contentHtml + '<BR>' + customerService.nextStep;
                            $scope.messages.push({
                                image: 'img/icon.png',
                                userId: '54321',
                                text: htmlContent,
                                time: d
                            });
                            $ionicScrollDelegate.scrollBottom(true);
                        }, function(err) {
                            $scope.typing = false;
                            $scope.messages.push({
                                image: 'img/icon.png',
                                userId: '54321',
                                text: 'Unfortunately there was some problem with server. Im still learning.',
                                time: d
                            });
                        });
                    } 
                    else{
                    	
                    	$scope.messages.push({
                        image: 'img/icon.png',
                        userId: '54321',
                        text: watsonReply.output.text,
                        time: d
                    });
                    	
                    }
                    $ionicScrollDelegate.scrollBottom(true);
                }, function(err) {
                    $scope.typing = false;
                    $scope.messages.push({
                        image: 'img/icon.png',
                        userId: '54321',
                        text: 'Unfortunately there was some proble with server. Im still learning.',
                        time: d
                    });
                });
            }
        }
        delete $scope.data.message;
        $ionicScrollDelegate.scrollBottom(true);
        document.getElementById("message_input").focus();
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