if (document.addEventListener) {
  document.addEventListener('DOMContentLoaded', app, false);
} else if (document.attachEvent) {
  document.attachEvent("onreadystatechange", app);
}

var app = function() {
  var list = document.getElementById('list');
  var myForm = document.getElementById('form');
  var itemToAdd = document.getElementById('itemToAdd');
  var response = document.getElementById('response');
  var selectedDiv = document.getElementById('selected');
  var listObject = {};

  var selectedBtnCheck = function() {
    if (list.childNodes.length > 0) {
      selectedDiv.innerHTML = '<button type="button" class="deleteSelected">Delete Selected</button>';
    } else {
      selectedDiv.innerHTML = '';
    }
  };

  var addItem = function() {
    if (itemToAdd.value.length > 0) {
      response.innerHTML = "";
      newNode = document.createElement('LI');
      newNode.innerHTML = itemToAdd.value + ' <button type="button" class="delete">Delete</button>';
      list.appendChild(newNode);

    } else {
      response.innerHTML = 'Please enter an item in the text input!';
    }
    selectedBtnCheck();
  };
  
  //create object with values
  var updateListObject = function() {
    var currentListItems = document.getElementById('list').childNodes;
    for (var j = 0; j < currentListItems.length; j++) {
      listObject[j] = currentListItems[j].firstChild.nodeValue;
      console.log(listObject);
      listJSON = JSON.stringify(listObject);
      console.log(listJSON);
    }

  };

  //add item to list
  document.getElementById('form').addEventListener('submit', function(e) {

    e.preventDefault();
    addItem();
    updateListObject();

  });

  //delete item from list
  if (document.addEventListener) {
    list.addEventListener('click', function(e) {
      if (e.target && e.target.nodeName == 'BUTTON') {
        e.target.parentNode.outerHTML = '';
        updateListObject();
      }
    });
  } else if (document.attachEvent) {
    document.attachEvent("onclick", function(e) {
      if (e.target && e.target.nodeName == 'BUTTON') {
        e.target.parentNode.outerHTML = '';
        updateListObject();
      }
    });
  }


  //add selected class to list items
  if (document.addEventListener) {
    list.addEventListener('click', function(e) {
      if (e.target.nodeName !== 'BUTTON' && e.target.nodeName !== 'OL') {
        e.target.classList.add('selected');
      }
    });
  } else if (document.attachEvent) {
    document.attachEvent("onclick", function(e) {
      if (e.target.nodeName !== 'BUTTON' && e.target.nodeName !== 'OL') {
        e.target.classList.add('selected');
      }
    });
  }

  //delete all selected
  if (document.addEventListener) {
    selectedDiv.addEventListener('click', function() {
      var toDeleteArray = document.querySelectorAll('.selected');
      if (toDeleteArray.length > 0) {
        response.innerHTML = '';
        for (var i = 0; i < toDeleteArray.length; i++) {
          toDeleteArray[i].outerHTML = '';
          updateListObject();
        }
      } else {
        response.innerHTML = 'Please select multiple items from the list!';
      }
    });
  } else if (document.attachEvent) {
    selectedDiv.attachEvent("onclick", function() {
      var toDeleteArray = document.querySelectorAll('.selected');
      if (toDeleteArray.length > 0) {
        response.innerHTML = '';
        for (var i = 0; i < toDeleteArray.length; i++) {
          toDeleteArray[i].outerHTML = '';
          updateListObject();
        }
      } else {
        response.innerHTML = 'Please select multiple items from the list!';
      }
    });
  }

}();
