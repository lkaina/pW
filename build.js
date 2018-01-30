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
          ],
          "sort": 'name'
        },
        {
          "label": 'Title',
          "type": 'text',
          "key": 'title',
          "sort": 'title'
        },
        {
          "label": 'Group',
          "type": 'text',
          "key": 'group',
          "sort": 'group'
        },
        {
          "label": '',
          "type": 'directive',
          "dirName": 'button',
          "dirArgs": [
            {
              attr: 'class-list',
              value: 'glyphicon glyphicon-pencil'
            }
          ],
          "cb": 'editContact'
        },
        {
          "label": '',
          "type": 'directive',
          "dirName": 'button',
          "dirArgs": [
            {
              attr: 'class-list',
              value: 'glyphicon glyphicon-trash'
            }
          ],
          "cb": 'deleteContact'
        }
      ];
    };
  };
})();


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
        template: '<pw-add-contact save-contact="add.saveContact(contactInfo)" close="add.close()"></pw-add-contact>',
        controller: 'AddContactCtrl',
        controllerAs: 'add',
        bindToController: true,
        resolve: {
          contactInfo: null,
          saveContact: function() { return app.saveContact; }
        },
        keyboard: false,
        size: 'md',
        windowClass: 'add-contact'
      };
      $uibModal.open(modalProperties);
    };

    function deleteContact(contact) {
      for (let i = 0; i < app.data.allData.contactsList.length; i++) {
        if (contact.id === app.data.allData.contactsList[i].id) return app.data.allData.contactsList.splice(i, 1);
      }
      //delete contact dataService.contactList
    };

    function editContact(contact) {
      var modalProperties = {
        animation: true,
        backdrop: 'static',
        template: '<pw-add-contact save-contact="add.saveContact(contactInfo)" close="add.close()" contact-info="add.contactInfo"></pw-add-contact>',
        controller: 'AddContactCtrl',
        controllerAs: 'add',
        bindToController: true,
        resolve: {
          contactInfo: contact,
          saveContact: function() { return app.saveContact; }
        },
        keyboard: false,
        size: 'md',
        windowClass: 'add-contact'
      };
      $uibModal.open(modalProperties);
    };

    function saveContact(contactInfo) {
      contactInfo.id = app.data.allData.contactsList.length + 1;
      contactInfo.imgUrl = "http://lorempixel.com/40/40/transport"
      app.data.allData.contactsList.push(contactInfo);
      app.data.allData.newContact = null;
      this.$close();
      // dataService.saveContact(contactInfo)
      //   .then(function(response) {
      //   response.contact = response.name;
      //   if (response.company) response.contact += ' at ' + response.company;
      //   if (response.email) response.contact += '\n' + response.email;
      //     dataService.allData.contactsList.push(response);
      //   })
      //   .catch(function(error) {
      //     console.log('error saving contact info: ', error);
      //   })
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
    .module('pwComponents')
    .controller('AddContactCtrl', AddContactCtrl);

  AddContactCtrl.$inject = ['dataService', '$uibModalInstance', 'saveContact', 'contactInfo'];

  function AddContactCtrl(dataService, $uibModalInstance, saveContact, contactInfo) {
    var add = this;

    add.close = $uibModalInstance.close;
    add.saveContact = saveContact;
    add.contactInfo = contactInfo;
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
        data: '=',
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
        let argsList = '';
        for (let i = 0; i < scope.args.length; i++) {
          argsList += ' ' + scope.args[i].attr + '="' + scope.args[i].value + '"';
        }
        if (scope.cb) {
          scope.cb = scope.cb();
          argsList += ' cb="cb(data)"';
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


(function() {
  'use strict'

  angular
    .module('pwComponents')
    .directive('pwContactTile', pwContactTile);

  pwContactTile.$inject = ['$compile', 'dataService'];

  function pwContactTile($compile, dataService) {

    var directive = {
      restrict: 'EA',
      templateUrl: 'http://localhost:3000/components/library/contactTile/contactTile.tpl.html',
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
      templateUrl: 'http://localhost:3000/components/library/table/table.tpl.html',
      compile: compileFn,
      scope: {
        cbList: '&',
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
    .controller('InputCtrl', InputCtrl);

  InputCtrl.$inject = ['dataService', 'validationService'];

  function InputCtrl(dataService, validationService) {
    var input = this;
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
