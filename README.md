# AngularJS Simple Component Library/Framework

**This project is a quick conceptual exercise in designing and building out a Component Library/Framework using AngularJS.**

## Get Started

1.  Install dependencies using npm & bower:
```
npm install
```
```
bower install
```
2.  Run simple node server (server.js) and update port info if needed.
```
node server.js
```
3.  Open http://localhost:3000/ in browser.


## Overview

### Components

##### Table

The table component is the largest component in the library.  It was designed to be dynamic, able to render both simple text elements and complex components.  This is accomplished by splitting the necessary info needed for the table into 2 parts:

1.  The data to be rendered
2.  The data describing the the layout for the rendered table (a list of properties for each column that tells the component how to render the data from #1)

The component itself does the matching of these 2 parts and renders each row appropriately, according to the configuration passed in.  

##### Contact Tile

The contact tile (when finished) will be incorporated directly into the __*Table*__ component mentioned above.  This is a simple component that takes a contact's information and displays it next to a picture/icon specified by the user.

##### Add Contact Dialog

The dialog component contains a list of form elements needed to add a new contact to our database. When finished, it should incorporate several other components that will allow users' to add/edit/remove contacts.



