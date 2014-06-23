angular.module('fxApp').controller('MainViewCtrl',
	['$scope', 'fxRepo', function ($scope, fxRepo) {
		$scope.currentIndex = 6;
		$scope.fxData = [];
		$scope.currentFxSelection = [];
		$scope.showRates = true;
		$scope.allData = false;
		$scope.rateConversions = [];
		$scope.ISK = "1000";

		$scope.showMore = function () {
			if (!$scope.allData) {
				for (var i = $scope.currentIndex + 1; i < $scope.fxData.length; i++) {
					$scope.currentFxSelection.push($scope.fxData[i]);	
				}
			} else {
				$scope.currentFxSelection = $scope.fxData.slice(0,$scope.currentIndex);
			}

			$scope.allData = !$scope.allData;
		};

		$scope.switchTable = function () {
			$scope.showRates = !$scope.showRates;
			console.log($scope.rateConversions)
			

		};

		$scope.$watch('rateConversions[0]', function () {
			console.log('did watch');
			calculateRates();
		});

		function calculateRates () {
			for (var i = 1; i < $scope.rateConversions.length; i++) {
				console.log('came hereererere');
					$scope.rateConversions[i] = parseFloat(($scope.rateConversions[0]/$scope.fxData[i].value)).toFixed(2);
				}
		};

		fxRepo.getRates().then(function (data) {
			if (data.results.length > 0) {
				$scope.fxData = data.results;
				$scope.rateConversions[0] = $scope.ISK;
				for (var i = 1; i < $scope.fxData.length; i++) {
					$scope.rateConversions.push($scope.fxData[i].value*$scope.ISK);
				}
				console.log($scope.rateConversions)
				$scope.currentFxSelection = $scope.fxData.slice(0,$scope.currentIndex);
			}	
		});
	}]);