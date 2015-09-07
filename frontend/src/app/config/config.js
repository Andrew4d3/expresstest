angular.module('app')
  .config(function($logProvider, $locationProvider, API, RESTfulProvider, PageServiceProvider, $provide) {
    // Log configuration
    $logProvider.debugEnabled(true);

    // Negative currency
    $provide.decorator('$locale', ['$delegate', function($delegate) {
      if ($delegate.id == 'en-us') {
        $delegate.NUMBER_FORMATS.PATTERNS[1].negPre = '-\u00A4';
        $delegate.NUMBER_FORMATS.PATTERNS[1].negSuf = '';
      }
      return $delegate;
    }]);

    // Base URL
    RESTfulProvider.setBaseUrl(API.url);

    // Base Title
    PageServiceProvider.setBaseTitle('Scaffolar');

    // Setting this property to true will elimate the # from all URLs
    $locationProvider.html5Mode(false);

    // Scrolling page to the very top no matter what
    $provide.decorator('$uiViewScroll', function ($delegate) {
      return function (uiViewElement) {
        window.scrollTo(0, 0);
      };
    });
  });
