(function() {
  'use strict'

  angular
    .module('pwComponents')
    .directive('pwTable', pwTable);

  pwTable.$inject = ['$compile', 'dataService'];

  function pwTable($compile, dataService) {

    var directive = {
      restrict: 'EA',
      templateUrl: 'http://localhost:3000/components/table/table.tpl.html',
      compile: compileFn,
      scope: {
        cbList: '=',
        data: '=',
        layout: '='
      },
      controller: 'TableCtrl',
      controllerAs: 'table',
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
