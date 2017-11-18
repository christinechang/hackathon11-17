/* hw2b.js */


// First we do a self-invoking function that contains everything - there will be nothing
//  exposed to the global scope.
(function() {
  "use strict";

  //variables for html elements
  var button = document.getElementById("doit");
  var nameElement = document.getElementById("name");
  var addressElement = document.getElementById("address");
  var emailElement = document.getElementById("email");
  var writeMessage = document.getElementById("message"); // a div to tell the user if input isn't adequate


  var peopleValidated; // inside onclick fxn this is set to false. will become true when inputs are validated
  var existingList = getStorage(); // on page load, check local storage, existingList will be the stored items or an empty array
  var clearButton = document.getElementById("clearStorage"); //make a button to allow user to clear away prior list



  //functions to be used when onclick fired

  //retrieve stored input
  function getStorage() {
    existingList = window.localStorage.getItem("storedPeople"); // if there is something stored, it's now 'existingList'
    if (existingList) { // if there are stored items, parse them and print them to the page
      existingList = JSON.parse(existingList);
      for (var i = 0; i < existingList.length; i++) {
        var value = existingList[i];
        writeRowToPage(value, output);
      } //end of for loop
      return existingList; //function will return existingList to variable existingList
    } //end of if
    else {
      return []; //if there is no stored items,  var existingList is an empty array
    } //end of else clause
  }; //end of storage fxn



  function validate(name) { // very basic  input validation
    if (!(name) || !(name.length > 1)) { // checks there is a name and it's not one letter long
      writeMessage.innerHTML = "Please take some notes.";
      document.getElementById("name").focus();
      return;
    }
     else {
      peopleValidated = true; //rest of script can now continue
      writeMessage.innerHTML = ""; //clears  message if needed from prior unvalidated attempt
    } //end of else
  }; //end of validate fxn


  //clean up text of validated input
  function fixCapitalization(arg) {
    var capitalizedItem = arg.toString().charAt(0).toUpperCase() + arg.toString().slice(1); // make first letter uppercase, tack onto rest of lowercase word
    return capitalizedItem;
  };

  //clean up inputs
  function upperLowerCase(arg) {
    var newArray = [];
    var item = arg.split(" ");
    if (item.length == 1) { //this is basically for name since address has to have two inputs
      var newItem = fixCapitalization(item);
      newArray.push(newItem);
    } else {
      for (var i = 0; i < item.length; i++) {
        var newItem = fixCapitalization(item[i]);
        newArray.push(newItem);
      } // end for
    }; // end else
    return newArray.join(" "); //return string with words separated by a space
  }; //end upperLowerCase fxn


  //fxn to create a new data object
  function makePeople(fullName) { //function to create new list items
    this.name = fullName;
  }; // end makePeople fxn


  //function to write to page
  function writeRowToPage(dataObject, element) {

    var s = "<div class=\"info\">";

    s += '<div class="nameDiv">';
    if (dataObject.name !== 'undefined') {
      s += dataObject.name;
    }
/*
    s += '</div><div class="emailDiv">';
    if (dataObject.email !== 'undefined') {
      s += dataObject.email;
    }

    s += '</div><div class="addrDiv">';
    if (dataObject.address !== 'undefined') {
      s += dataObject.address;
    }
*/
    s += '</div></div>';

    //adds to bottom of list on screen
    element.innerHTML += s;
  }

  function clearFields() { //clear the values in input fields so its ready for next item
    nameElement.value = "";
//    addressElement.value = "";
  //  emailElement.value = "";
  }; //end clearFields

  //input button on click function
  button.onclick = function() {

    //get values from the form
    var name = nameElement.value.trim().toLowerCase();
//    var address = addressElement.value.trim().toLowerCase();
  //  var email = emailElement.value.trim().toLowerCase();

    peopleValidated = false; // will become true when inputs are validated, allowing writing to page and list storage

    validate(name); //validate input

    if (peopleValidated) { // if input has been validated, ie peopleValidated is true, create an object with the input information

      // clean up  names and addresses
      name = upperLowerCase(name);
  //    address = upperLowerCase(address);

      //run the makepeople function and create firstPerson to store the input information
      var firstPerson = new makePeople(name);

      //call on writeRowtoPage() to write your new data object to the page
      writeRowToPage(firstPerson, output);

      //Store your object in localStorage (preserving data that's already in there from prior submissions!)
      existingList.push(firstPerson); //push new item to list
      var jsonPeopleToStore = JSON.stringify(existingList);

      //store existingList in local storage, replacing whatever was there
      window.localStorage.setItem("storedPeople", jsonPeopleToStore);

      clearFields();

    }; //end of people validated if clause

  }; //end of onclick fxn

  //onclick function for removing storage and clear the page of old list
  clearButton.onclick = function() {
    var clearing = confirm("Are you sure you want to clear all your stored data? Items now on your list will disappear, so take a last look at them.", "Yes.");

    if (clearing !== false) {
      localStorage.removeItem("storedPeople");
      existingList = [];
      window.location.reload(); //reload the page to clear list

    } // end of if
    else {
      document.getElementById("name").focus(); //put focus on input box
    }
  }; //end clear storage button

})(); //end of onload fxn
