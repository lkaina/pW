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
