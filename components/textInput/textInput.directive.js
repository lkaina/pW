(function() {
  'use strict'

  angular
    .module('pwComponents')
    .directive('pwTextInput', pwTextInput);

  pwTextInput.$inject = ['$compile', 'dataService'];

  function pwTextInput($compile, dataService) {

    var directive = {
      restrict: 'EA',
      templateUrl: 'http://localhost:3000/components/textInput/textInput.tpl.html',
      compile: compileFn,
      scope: {
        name: '@',
        inline: '@',
        label: '@',
        required: '@',
        width: '@'
      },
      controller: 'InputCtrl',
      controllerAs: 'input',
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
        scope.input.data = dataService;
      };
    };
  };
})();
