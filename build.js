(function() {
  'use strict'

  angular
    .module('pwApp', [
      'pwComponents'
    ])
    .run(initApp);

  initApp.$inject = ['dataService', '$http'];

  function initApp(dataService, $http) {
    var options = {
      method: 'GET',
      url: 'mockData/contactList.json'
    };

    $http(options)
      .then(function(response) {
        dataService.allData.contactsList = _setupColumns();
      })
      .catch(function(err) {
        console.log('Error getting data.');
      });

    function _setupColumns() {
      dataService.allData.contactsList.columns = [
        {
          "label": 'Contacts',
          "type": 'directive',
          "key": 'contact'
        },
        {
          "label": 'Title',
          "type": 'text',
          "key": 'title'
        },
        {
          "label": 'Group',
          "type": 'text',
          "key": 'group'
        },
        {
          "label": '',
          "type": 'button',
          "cb": 'editContact'
        },
        {
          "label": '',
          "type": 'button',
          "cb": 'deleteContact'
        }
      ];
    };
  };
})();

/*

{
  "contacts": [
    {
      "id": 1,
      "name": "Amanda Mooney",
      "title": "Managing Director",
      "group": "People, Leads, and Companies",
      "email": "amooney@trestleglenpartners.com"
    },
    {
      "id": 2,
      "name": "April Rose Gregorio",
      "title": "Mortgage Loan Officer",
      "group": "People, Leads, and Companies",
      "email": "aaregorio@pnc.com"
    }
  ]
}

*/


(function() {
  'use strict'

  angular
    .module('pwComponents', [
      'ui.bootstrap',
      'ui.mask'
    ])
    .run(initComponents);

  initComponents.$inject = [];

  function initComponents() {

  };
})();


(function() {
  'use strict'

  angular
    .module('pwApp')
    .controller('AppCtrl', AppCtrl);

  AppCtrl.$inject = ['dataService', 'validationService', '$uibModal'];

  function AppCtrl(dataService, validationService, $uibModal) {
    var app = this;

    app.addContact = addContact;
    app.deleteContact = deleteContact;
    app.editContact = editContact;

    function addContact() {

      var modalProperties = {
        animation: true,
        backdrop: 'static',
        template: '<pw-add-contact></pw-add-contact>',
        controller: 'AppCtrl',
        controllerAs: 'addContact',
        bindToController: true,
        keyboard: false,
        size: 'lg',
        windowClass: 'add-contact'
      };
      var modalInstance = $uibModal.open(modalProperties);
    };

    function deleteContact(contact) {
      //search for contact
      //delete contact dataService.contactList
    };

    function editContact(contact) {
      var modalProperties = {
        animation: true,
        backdrop: 'static',
        template: '<pw-add-contact contact="addContact.contactInfo"></pw-add-contact>',
        controller: 'AppCtrl',
        controllerAs: 'addContact',
        bindToController: true,
        keyboard: false,
        resolve: {
          contactInfo: contact
        },
        size: 'lg',
        windowClass: 'add-contact'
      };
    };
  };
})();




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
        item: '='
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
        var template = '<pw-' + scope.item.directive + ' item="item"></pw-' + scope.item.directive + '>';
        element.replaceWith($compile(template)(scope));
      };
    };
  };
})();




(function() {
  'use strict'

  angular
    .module('pwApp')
    .service('dataService', dataService);

  dataService.$inject = [];

  function dataService() {
    var svc = this;

    svc.allData = {};

    _init();

    function _init() {
    };

  };
})();


(function() {
  'use strict'

  angular
    .module('pwApp')
    .controller('TableCtrl', TableCtrl);

  TableCtrl.$inject = ['dataService', 'validationService', '$uibModal'];

  function TableCtrl(dataService, validationService, $uibModal) {
    var table = this;
  };
})();


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
        tableData: '=',
        label: '@'
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




(function() {
  'use strict'

  angular
    .module('pwApp')
    .service('validationService', validationService);

  validationService.$inject = [];

  function validationService() {
    var validation = this;

    validation.rules = {};

    _init();

    function _init() {
    };

  };
})();
