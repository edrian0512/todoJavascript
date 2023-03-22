var list = [];
function proceed() {
  var name = document.getElementById("name").value;
  if (name != "") {
    localStorage.setItem("name", name);
    window.location.href = "main.html";
  } else {
    alert("Please enter your name.");
  }
}

var name = localStorage.getItem("name");
document.getElementById("userNav").innerHTML = name;
document.getElementById("userPage").innerHTML = name;

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

var storedList = JSON.parse(localStorage.getItem("list"));
if (storedList != null) {
  list = storedList;
  displayList();
}

function displayList() {
  var html = "";
  for (var i = 0; i < list.length; i++) {
    html +=
      "<li class='list-group-item mb-2 shadow-lg' style='max-width: 100%; word-wrap: break-word;'>" +
      list[i] +
      "<button type='button' class='close ml-1' onclick='deleteItem(" +
      i +
      ")'><i class='fa fa-trash btn btn-warning'></i></button>" +
      "<button type='button' class='close ml-3 ' onclick='editItem(" +
      i +
      ")'><i class='fa fa-edit btn btn-danger' ></i></button></li>";
  }
  document.getElementById("list").innerHTML = html;
}

function editItem(index) {
  var newItem = prompt("Please Enter a New Value to Edit:");
  if (newItem != null) {
    list[index] = newItem;
    displayList();
    localStorage.setItem("list", JSON.stringify(list));
  }
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
