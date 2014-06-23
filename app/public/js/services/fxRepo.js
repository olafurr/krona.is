angular.module('fxApp').factory('fxRepo', 
	['$http', '$q', function ($http, $q) {
		return {
			url: 'http://apis.is/currency/arion',
			getRates: function () {
				var deferred =  $q.defer();
				$http.get(this.url).success(function (data) {
					deferred.resolve(data);
				});
				return deferred.promise;
			}
		}
	}]);