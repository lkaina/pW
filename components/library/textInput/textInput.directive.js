(function() {
  'use strict'

  angular
    .module('pwComponents')
    .directive('pwTextInput', pwTextInput);

  pwTextInput.$inject = ['$compile', 'dataService'];

  function pwTextInput($compile, dataService) {

    var directive = {
      restrict: 'EA',
      templateUrl: 'http://localhost:3000/components/library/textInput/textInput.tpl.html',
      compile: compileFn,
      scope: {
        default: '@',
        name: '@',
        label: '@',
        required: '@',
        model: '@',
        classList: '@'
      },
      controller: 'InputCtrl',
      controllerAs: 'input',
      bindToController: true
    };

    return directive;

    function compileFn(tElement, tAttrs) {
      const dataPrefix = 'input.data.';
      let el = tElement.find('input');

      el.attr('ng-model', dataPrefix + tAttrs.model);
      if (tAttrs.required) {
        el.attr('required', true);
        let label = tElement.find('label').addClass('required');
      }

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
