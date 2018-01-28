(function() {
  'use strict'

  angular
    .module('pwComponents')
    .directive('pwContactTile', pwContactTile);

  pwContactTile.$inject = ['$compile', 'dataService'];

  function pwContactTile($compile, dataService) {

    var directive = {
      restrict: 'EA',
      templateUrl: 'http://localhost:3000/components/contactTile/contactTile.tpl.html',
      compile: compileFn,
      scope: {
        contactInfo: '='
      },
      controller: function(){},
      controllerAs: 'cTile',
      bindToController: true
    };

    return directive;

    function compileFn(tElement, tAttrs) {

      return {
        pre: preLink,
        post: postLink
      };

      function preLink(scope, element, attrs) {

      };

      function postLink(scope, element, attrs) {

      };
    };
  };
})();
