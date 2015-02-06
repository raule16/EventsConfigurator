
var app = angular.module('AngularAuthApp', ['ngRoute', 'LocalStorageModule', 'angular-loading-bar', 'pascalprecht.translate']);

app.config(function ($routeProvider, $locationProvider) {


    $routeProvider.when("/home", {
        controller: "homeController",
        templateUrl: "/app/views/home.html"
    });

    $routeProvider.when("/login", {
        controller: "loginController",
        templateUrl: "/app/views/login.html"
    });

    $routeProvider.when("/signup", {
        controller: "signupController",
        templateUrl: "/app/views/signup.html"
    });

    $routeProvider.when("/orders", {
        controller: "ordersController",
        templateUrl: "/app/views/orders.html"
    });

    $routeProvider.when("/refresh", {
        controller: "refreshController",
        templateUrl: "/app/views/refresh.html"
    });

    $routeProvider.when("/tokens", {
        controller: "tokensManagerController",
        templateUrl: "/app/views/tokens.html"
    });

    $routeProvider.when("/associate", {
        controller: "associateController",
        templateUrl: "/app/views/associate.html"
    });

    $routeProvider.otherwise({ redirectTo: "/home" });

    // use the HTML5 History API
    //$locationProvider.html5Mode(true);

});

//var serviceBase = 'http://localhost:26264/';
var serviceBase = 'http://ngauthenticationapi.azurewebsites.net/';
app.constant('ngAuthSettings', {
    apiServiceBaseUri: serviceBase,
    clientId: 'ngAuthApp'
});

app.config(function ($httpProvider) {
    $httpProvider.interceptors.push('authInterceptorService');
});

app.config(function ($translateProvider) {
    var lstTranslate = ['es', 'en']; //Lista de traducciones
    for (var index in lstTranslate) {
        var translate = lstTranslate[index];
        if ($translateProvider.translations()[translate] === undefined) {
            setTranslation($translateProvider, translate);
        }
    }

    var language = readCookie("Culture");
    if (language !== null) {
        $translateProvider.preferredLanguage(language);
    } else {
        language = window.navigator.userLanguage || window.navigator.language;

        if ($.inArray(language, lstTranslate) > -1) {
            $translateProvider.preferredLanguage(language);
        } else {
            $translateProvider.preferredLanguage('es');
        }
    }
});

function setTranslation(translateProvider, language) {
    $.ajax({
        url: "../app/translations/translation_" + language + ".trjson",
        success: function (data) {
            translateProvider.translations(language, data);
        }
    });
}

function readCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }

    return null;
}

app.run(['authService', function (authService) {
    authService.fillAuthData();
}]);


