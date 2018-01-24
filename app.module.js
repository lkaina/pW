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
