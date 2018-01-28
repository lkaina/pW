(function() {
  'use strict'

  angular
    .module('pwComponents')
    .directive('pwAddContact', pwAddContact);

  pwAddContact.$inject = ['$compile', 'dataService'];

  function pwAddContact($compile, dataService) {

    var directive = {
      restrict: 'EA',
      templateUrl: 'http://localhost:3000/components/addContact/addContact.tpl.html',
      compile: compileFn,
      scope: {
        contactInfo: '=',
        saveContact: '&'
      },
      controller: function() {},
      controllerAs: 'add',
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
        scope.add.data = dataService;
      };
    };
  };
})();
