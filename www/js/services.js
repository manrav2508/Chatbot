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
                url: 'http://conversation-enhanced-mjunaidalikhan1-1958.mybluemix.net/rest/conversation/api/v1/workspaces/a40f78e7-8099-45ae-8e62-a826c7f1c374/message',
                method: 'POST',
                headers: {
                	'Authorization': 'Basic MDMwNmM2OTgtMTY0ZS00ZTNjLWI4NzUtYzQxNzg5ZTE3YWU4OmVPWnZRUEQxYmJicw==',
                    'content-type': 'application/json; charset=UTF-8'
                },
                data:{
            		  "input": {
            		    "text": text
            		  },
            		  "context": {
            		    "conversation_id": "ff2f0ee4-b1c9-43b0-94bf-03c91e8522ba",
            		    "system": {
            		      "dialog_stack": [
            		        "root"
            		      ],
            		      "dialog_turn_counter": 7,
            		      "dialog_request_counter": 7
            		    },
            		    "default_counter": 2,
            		    "call_retrieve_and_rank": true
            		  }
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
        // timeout makes sure that is invoked after any other event has been triggered.
        // e.g. click events that need to run before the focus or
        // inputs elements that are in a disabled state but are enabled when those events
        // are triggered.
        $timeout(function() {
            var element = $window.document.getElementById(id);
            if (element) element.focus();
        });
    };
})