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
