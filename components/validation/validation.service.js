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
