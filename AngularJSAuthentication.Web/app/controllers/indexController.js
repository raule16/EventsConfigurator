'use strict';
app.controller('indexController', ['$rootScope', '$scope', '$location', 'authService', '$translate', function ($rootScope, $scope, $location, authService, $translate) {

    $scope.logOut = function () {
        authService.logOut();
        $location.path('/home');
    }

    if (authService.authentication.isAuth) {
        $location.path('/orders');
    } else {
        $location.path('/home');
    }

    $scope.authentication = authService.authentication;

    $rootScope.langKey = $translate.preferredLanguage();

    $scope.changeLanguage = function (langKey) {
        $translate.use(langKey);

        sessionStorage.setItem('lang', langKey);//necesario para translate desde server
        document.cookie = "CultureInfo=" + langKey;//necesario para translate desde server

        $rootScope.langKey = langKey;//necesario para translate desde server
    };

}]);