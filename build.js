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
        dataService.allData.contactsList = response.data.contacts;
        _setupContacts(dataService.allData.contactsList);
      })
      .catch(function(err) {
        console.log('Error getting data.');
      });

    function _setupContacts(contactsList) {
      dataService.allData.contactsLayout = [
        {
          "label": 'Contacts',
          "type": 'directive',
          "dirName": 'contact-tile',
          "dirArgs": [
            {
              attr: 'contact-info',
              value: 'data'
            }
          ]
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
          "cb": 'editContact',
          "class": "glyphicon glyphicon-pencil"
        },
        {
          "label": '',
          "type": 'button',
          "cb": 'deleteContact',
          "class": "glyphicon glyphicon-trash"
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
    app.saveContact = saveContact;

    app.tableCbList = {
      addContact: app.addContact,
      deleteContact: app.deleteContact,
      editContact: app.editContact
    };

    app.data = dataService;

    function addContact() {

      var modalProperties = {
        animation: true,
        backdrop: 'static',
        template: '<pw-add-contact save-contact="app.saveContact(contactInfo)"></pw-add-contact>',
        keyboard: true,
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
        template: '<pw-add-contact save-contact="app.saveContact(contactInfo)" contact-info="addContact.contactInfo"></pw-add-contact>',
        keyboard: false,
        resolve: {
          contactInfo: contact
        },
        size: 'lg',
        windowClass: 'add-contact'
      };
    };

    function saveContact(contactInfo) {
      dataService.saveContact(contactInfo)
        .then(function(response) {
        response.contact = response.name;
        if (response.company) response.contact += ' at ' + response.company;
        if (response.email) response.contact += '\n' + response.email;
          dataService.allData.contactsList.push(response);
        })
        .catch(function(error) {
          console.log('error saving contact info: ', error);
        })
    };
  };
})();


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
