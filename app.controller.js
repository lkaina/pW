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
