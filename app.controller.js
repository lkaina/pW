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
