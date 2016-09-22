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
    var callWatsonAPI = function(text) {
        return $q(function(resolve, reject) {
            var req = {
                url: 'http://watsonbot.au-syd.mybluemix.net/watsonbot/api/mybot?query=hi',
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
    return {
        fetchCustDetails: fetchCustDetails,
        fetchTansuctionsDetails: fetchTansuctionsDetails,
        fetchAccountsDetails: fetchAccountsDetails,
        callWatsonAPI: callWatsonAPI
    };
}).factory('OAuthService', function($resource, apiUrl) {
    var data = $resource('http://inmbz2239.in.dst.ibm.com:8091/bigoauth2server/oauth/token', {}, {
        general: {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'authorization': 'Basic cG9zdG1hbjpwYXNzd29yZDAx'
            }
        }
    });
    return data;
}).factory('focus', function($timeout, $window) {
    return function(id) {
        $timeout(function() {
            var element = $window.document.getElementById(id);
            if (element) element.focus();
        });
    };
})