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
