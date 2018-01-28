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
      for (let i = 0; i < contactsList.length; i++) {
        let contact = contactsList[i];
        contact.contact = contact.name;
        if (contact.company) contact.contact += ' at ' + contact.company;
        if (contact.email) contact.contact += '\n' + contact.email;
      }
      dataService.allData.contactsLayout = [
        {
          "label": 'Contacts',
          "type": 'directive',
          "dirName": 'contact-tile',
          "dirArgs": [
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
