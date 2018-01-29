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
