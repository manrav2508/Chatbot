angular.module('rbbr').service('CustomerService', function($q, $http) {
	var fetchCustDetails = function() {
        return $q(function(resolve, reject) {
            var req = {
                url: 'http://api108448live.gateway.akana.com:80/customers',
                method: 'GET',
                headers: {
                    'Authorization': ''
                }
            }
            $http(req).then(function(data) {
                if (data.data[0] !==undefined) {
                    resolve(data.data[0]);
                } else {
                    reject('S Failed!');
                }
            }, function(err) {
                reject(err);
            });
        });
    };
    return {
    	fetchCustDetails: fetchCustDetails
    };
}).factory('OAuthService', function($resource,apiUrl){
    var data = $resource('http://inmbz2239.in.dst.ibm.com:8091/bigoauth2server/oauth/token' , {}, {
        general:{
            method:'POST',
            headers: {
                  'Content-Type': 'application/x-www-form-urlencoded',
                  'authorization': 'Basic cG9zdG1hbjpwYXNzd29yZDAx'
              }
            }
        });
        return data;
});