(function() {
  'use strict'

  angular
    .module('pwComponents')
    .directive('pwButton', pwButton);

  pwButton.$inject = ['$compile'];

  function pwButton($compile) {

    var directive = {
      restrict: 'EA',
      templateUrl: 'http://localhost:3000/components/library/button/button.tpl.html',
      compile: compileFn,
      scope: {
        label: '@',
        classList: '@',
        cb: '&'
      }
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
