var list = [];
var name = localStorage.getItem("name");
document.getElementById("userNav").innerHTML = name;
document.getElementById("userPage").innerHTML = name;

function proceed() {
  var name = document.getElementById("name").value;
  if (name != "") {
    localStorage.setItem("name", name);
    window.location.href = "main.html";
  } else {
    alert("Please enter your name.");
  }
}

function addItem() {
  var item = document.getElementById("item").value;
  if (item != "") {
    list.push(item);
    displayList();
    document.getElementById("item").value = "";
    localStorage.setItem("list", JSON.stringify(list));
  } else {
    alert("Please enter an item.");
  }
}

function editItem(index) {
  var modal = document.getElementById("myModal");
  var newItemInput = document.getElementById("newItemInput");
  var mainPage = document.getElementById("mainPage");
  var modalClose = document.getElementById("modalClose");

  mainPage.classList.add("hidden");

  newItemInput.value = list[index];

  modal.style.display = "block";

  modalClose.onclick = function () {
    modal.style.display = "none";
    mainPage.classList.remove("hidden");
  };

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
      mainPage.classList.remove("hidden");
    }
  };

  saveNewItem = function () {
    var newItem = newItemInput.value;
    if (newItem != null && newItem != "") {
      list[index] = newItem;
      displayList();
      localStorage.setItem("list", JSON.stringify(list));
      modal.style.display = "none";
      mainPage.classList.remove("hidden");
    }
  };
}

function deleteItem(index) {
  list.splice(index, 1);
  displayList();
  localStorage.setItem("list", JSON.stringify(list));
}

function exit() {
  localStorage.removeItem("name");
  localStorage.removeItem("list");
  localStorage.clear();
  window.location.href = "index.html";
}

function displayList() {
  var html = "";
  for (var i = 0; i < list.length; i++) {
    html +=
      "<li class='list-group-item mb-2 shadow-lg'>" +
      "<span class='todo-item'>" +
      list[i] +
      "</span>" +
      "<button type='button' class='close ml-1' onclick='deleteItem(" +
      i +
      ")'><i class='fa fa-trash btn btn-warning'></i></button>" +
      "<button type='button' class='close ml-1' onclick='editItem(" +
      i +
      ")'><i class='fa fa-edit btn btn-danger'></i></button>" +
      "<button type='button' class='close' onclick='markDone(" +
      i +
      ")'><i class='fa fa-check btn btn-success'></i></button>" +
      "</li>";
  }
  document.getElementById("list").innerHTML = html;
}

function markDone(index) {
  if (list[index].startsWith("<del>")) {
    list[index] = list[index].substring(5, list[index].length - 6);
  } else {
    list[index] = "<del>" + list[index] + "</del>";
  }
  displayList();
  localStorage.setItem("list", JSON.stringify(list));
}

function filterList() {
  var select = document.getElementById("filterSelect");
  var option = select.value;

  if (option == "all") {
    displayList();
  } else if (option == "completed") {
    var filteredList = list.filter(function (item) {
      return item.startsWith("<del>");
    });
    displayFilteredList(filteredList);
  } else if (option == "uncompleted") {
    var filteredList = list.filter(function (item) {
      return !item.startsWith("<del>");
    });
    displayFilteredList(filteredList);
  }
}

function displayFilteredList(filteredList) {
  var html = "";
  for (var i = 0; i < filteredList.length; i++) {
    html +=
      "<li class='list-group-item mb-2 shadow-lg'>" +
      "<span class='todo-item'>" +
      filteredList[i] +
      "</span>" +
      "<button type='button' class='close ml-1' onclick='deleteItem(" +
      i +
      ")'><i class='fa fa-trash btn btn-warning'></i></button>" +
      "<button type='button' class='close ml-1' onclick='editItem(" +
      i +
      ")'><i class='fa fa-edit btn btn-danger'></i></button>" +
      "<button type='button' class='close' onclick='markDone(" +
      i +
      ")'><i class='fa fa-check btn btn-success'></i></button>" +
      "</li>";
  }
  document.getElementById("list").innerHTML = html;
}

var storedList = JSON.parse(localStorage.getItem("list"));
if (storedList != null) {
  list = storedList;
  filterList();
}
