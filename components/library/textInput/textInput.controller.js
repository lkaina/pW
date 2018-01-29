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
