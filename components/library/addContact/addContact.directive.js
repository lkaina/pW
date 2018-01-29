(function() {
  'use strict'

  angular
    .module('pwComponents')
    .directive('pwAddContact', pwAddContact);

  pwAddContact.$inject = ['$compile', 'dataService'];

  function pwAddContact($compile, dataService) {

    var directive = {
      restrict: 'EA',
      templateUrl: 'http://localhost:3000/components/library/addContact/addContact.tpl.html',
      compile: compileFn,
      scope: {
        close: '&',
        contactInfo: '=',
        saveContact: '&'
      }
    };

    return directive;

    function compileFn(tElement, tAttrs) {

      return {
        post: postLink
      };

      function postLink(scope, element, attrs) {
        scope.data = dataService;
        scope.data.allData.newContact = scope.contactInfo;
      };
    };
  };
})();
