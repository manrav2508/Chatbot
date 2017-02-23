angular.module('rbbr').service('BarclaysService', function($q, $http) {
    var fetchCustDetails = function() {
        return $q(function(resolve, reject) {
            var req = {
                url: 'http://api108448live.gateway.akana.com:80/customers',
                method: 'GET',
                headers: {
                    'Accept': 'application/json'
                }
            }
            $http(req).then(function(data) {
                if (data.data[0] !== undefined) {
                    resolve(data.data[0]);
                } else {
                    reject('S Failed!');
                }
            }, function(err) {
                reject(err);
            });
        });
    };
    var fetchTansuctionsDetails = function() {
        return $q(function(resolve, reject) {
            var req = {
                url: 'http://api112477live.broker.soa.com:80/transactions/8573315966758940',
                method: 'GET',
                headers: {
                    'Accept': 'application/json'
                }
            }
            $http(req).then(function(data) {
                if (data.data !== undefined) {
                    resolve(data.data);
                } else {
                    reject('S Failed!');
                }
            }, function(err) {
                reject(err);
            });
        });
    };
    var fetchAccountsDetails = function() {
        return $q(function(resolve, reject) {
            var req = {
                url: 'https://api108567live.gateway.akana.com:443/accounts/123123',
                method: 'GET',
                headers: {
                    'Accept': 'application/json'
                }
            }
            $http(req).then(function(data) {
                if (data.data !== undefined) {
                    resolve(data.data["credit card account"]);
                } else {
                    reject('S Failed!');
                }
            }, function(err) {
                reject(err);
            });
        });
    };
    var callFacebook = function(text){
    	return $q(function(resolve, reject) {
            var req = {
                url: 'http://watsonbot.au-syd.mybluemix.net/watsonbot/api/mybot?from=&query=' +text,
                method: 'GET',
            }
            $http(req).then(function(data) {
                if (data.data !== undefined) {
                    resolve(data.data);
                } else {
                    reject('Failed!');
                }
            }, function(err) {
                reject(err);
            });
        });
    };
    var callWatsonAPI = function(text) {
        return $q(function(resolve, reject) {
            var req = {
                url: 'http://watsonbot.au-syd.mybluemix.net/watsonbot/api/mybot?channel=facebook&to=abhinav&from=abhi&query='+text,
                method: 'GET',
            }
            $http(req).then(function(data) {
                if (data.data !== undefined) {
                    resolve(data.data);
                } else {
                    reject('Failed!');
                }
            }, function(err) {
                reject(err);
            });
        });
    };
    var scrollTo = function(eID) {
        // This scrolling function 
        // is from http://www.itnewb.com/tutorial/Creating-the-Smooth-Scroll-Effect-with-JavaScript
        
        var startY = currentYPosition();
        var stopY = elmYPosition(eID);
        var distance = stopY > startY ? stopY - startY : startY - stopY;
        if (distance < 100) {
            scrollTo(0, stopY); return;
        }
        var speed = Math.round(distance / 100);
        if (speed >= 20) speed = 20;
        var step = Math.round(distance / 25);
        var leapY = stopY > startY ? startY + step : startY - step;
        var timer = 0;
        if (stopY > startY) {
            for ( var i=startY; i<stopY; i+=step ) {
                setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
                leapY += step; if (leapY > stopY) leapY = stopY; timer++;
            } return;
        }
        for ( var i=startY; i>stopY; i-=step ) {
            setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
            leapY -= step; if (leapY < stopY) leapY = stopY; timer++;
        }
        
        function currentYPosition() {
            // Firefox, Chrome, Opera, Safari
            if (self.pageYOffset) return self.pageYOffset;
            // Internet Explorer 6 - standards mode
            if (document.documentElement && document.documentElement.scrollTop)
                return document.documentElement.scrollTop;
            // Internet Explorer 6, 7 and 8
            if (document.body.scrollTop) return document.body.scrollTop;
            return 0;
        }
        
        function elmYPosition(eID) {
            var elm = document.getElementById(eID);
            var y = (elm!== null) ? elm.offsetTop : '';
            var node = elm;
            while (node!== null && node.offsetParent && node.offsetParent != document.body) {
                node = node.offsetParent;
                y += node.offsetTop;
            } return y;
        }

    };
    return {
        fetchCustDetails: fetchCustDetails,
        fetchTansuctionsDetails: fetchTansuctionsDetails,
        fetchAccountsDetails: fetchAccountsDetails,
        callWatsonAPI: callWatsonAPI,
        scrollTo:scrollTo
    };
}).factory('focus', function($timeout, $window) {
    return function(id) {
        $timeout(function() {
            var element = $window.document.getElementById(id);
            if (element) element.focus();
        });
    };
})