(function() {
  'use strict'

  angular
    .module('pwComponents')
    .directive('pwAssign', pwAssign);

  pwAssign.$inject = ['$compile'];

  function pwAssign($compile) {

    var directive = {
      restrict: 'EA',
      template: '',
      compile: compileFn,
      scope: {
        type: '@',
        args: '=',
        data: '='
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
        let argsList = '';
        for (let i = 0; i < scope.args.length; i++) {
          argsList += ' ' + scope.args[i].attr + '="' + scope.args[i].value + '"';
        }
        var template = '<pw-' + scope.type + argsList + '></pw-' + scope.type + '>';
        element.replaceWith($compile(template)(scope));
      };
    };
  };
})();
