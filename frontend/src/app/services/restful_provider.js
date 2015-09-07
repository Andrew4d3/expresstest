angular.module('app')
  .provider('RESTful', function() {
    var _baseUrl = '';

    /**
     * Create the URL to use
     * @param  {String} url The endpoint
     * @param  {Object} params     Query strings
     * @return {String}          The URL
     */
    var _createUrl = function(url, params) {
      // Has query strings?
      if (params && !_.isEmpty(params)) {
        url += url.indexOf('?') === -1 ? '?' : '&';
        url += jQuery.param(params);
      }
      return _baseUrl + url;
    };

    return {
      // Provider API
      setBaseUrl: function(url) {
        _baseUrl = url;
      },
      // Services API
      $get: ['$http', '$q', function($http, $q) {
        return {
          /**
           * GET
           * @param  {String} url The endpoint
           * @param  {Object} params     Query strings
           * @return {Promise}
           */
          get: function(url, params) {
            var deferred = $q.defer();

            if (!_.isString(url))
              deferred.reject('"url" isn\'t a string.');

            $http.get(_createUrl(url, params))
              .success(function(response, status, headers, config) {
                deferred.resolve(response);
              })
              .error(function(response, status, headers, config) {
                deferred.reject(response);
              });

            return deferred.promise;
          },

          /**
           * POST
           * @param  {String} url The endpoint
           * @param  {Object} payload
           * @param  {Object} params     Query strings
           * @return {Promise}
           */
          post: function(url, payload, params) {
            var deferred = $q.defer();

            if (!_.isString(url))
              deferred.reject('"url" isn\'t a string.');

            if (!payload || !_.isObject(payload)) payload = {};

            $http.post(_createUrl(url, params), payload)
              .success(function(response, status, headers, config) {
                deferred.resolve(response);
              })
              .error(function(response, status, headers, config) {
                deferred.reject(response);
              });

            return deferred.promise;
          },

          /**
           * PUT
           * @param  {String} url The endpoint
           * @param  {Object} payload
           * @param  {Object} params     Query strings
           * @return {Promise}
           */
          put: function(url, payload, params) {
            var deferred = $q.defer();

            if (!_.isString(url))
              deferred.reject('"url" isn\'t a string.');

            if (!payload || !_.isObject(payload)) payload = {};

            $http.put(_createUrl(url, params), payload)
              .success(function(response, status, headers, config) {
                deferred.resolve(response);
              })
              .error(function(response, status, headers, config) {
                deferred.reject(response);
              });

            return deferred.promise;
          },

          /**
           * DELETE
           * @param  {String} url The endpoint
           * @param  {Object} params     Query strings
           * @return {Promise}
           */
          delete: function(url, params) {
            var deferred = $q.defer();

            if (!_.isString(url))
              deferred.reject('"url" isn\'t a string.');

            $http.delete(_createUrl(url, params))
              .success(function(response, status, headers, config) {
                deferred.resolve(response);
              })
              .error(function(response, status, headers, config) {
                deferred.reject(response);
              });

            return deferred.promise;
          },
        };
      }],
    };
  });
