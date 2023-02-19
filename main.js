var users = [];
var userName = document.querySelector("#username");
var userOld = document.querySelector("#userold");
var userLocation = document.querySelector("#userlocation");
var gender1 = document.querySelector("#gender1");
var gender2 = document.querySelector("#gender2");
var btnAdd = document.querySelector("#btn-add");
var tbody = document.querySelector("tbody");
var errorName = document.querySelector(".errorName");
var errorOld = document.querySelector(".errorOld");
var errorLocation = document.querySelector(".errorLocation");
var errorGender = document.querySelector(".errorGender");

function showUser() {
  tbody.innerHTML = users
    .map(function (item) {
      return `
        <tr>
          <td>${item.userName}</td>
          <td>${item.userOld}</td>
          <td>${item.userLocation}</td>
          <td>${item.gender}</td>
          <td><button onclick="removeUser(${item.id})" class="remove">Xóa</button></td>
        </tr>
      `;
    })
    .join("");
}
showUser();

function addUser(e) {
  e.preventDefault();
  if (
    userName.value.trim() == "" &&
    userOld.value.trim() == "" &&
    userLocation.value.trim() == "" &&
    !gender1.checked &&
    !gender2.checked
  ) {
    errorName.innerHTML = "*Bạn chưa nhập user name";
    errorOld.innerHTML = "*Bạn chưa nhập tuổi";
    errorLocation.innerHTML = "*Bạn chưa nhập địa chỉ";
    errorGender.innerHTML = "*Bạn chưa chọn giới tính";
    return;
  }
  // check họ và tên
  if (userName.value.trim() == "") {
    errorName.innerHTML = "*Bạn chưa nhập họ và tên";
    return;
  } else if (userName.value.length < 8) {
    errorName.innerHTML = "*Fullname phải từ 8 kí tự trở lên";
    return;
  } else {
    errorName.innerHTML = "";
  }
  // check tuổi
  if (userOld.value.trim() == "") {
    errorOld.innerHTML = "*Bạn chưa nhập tuổi";
    return;
  } else if (isNaN(userOld.value) || userOld.value <= 0) {
    errorOld.innerHTML = "*Tuổi phải là số dương";
    return;
  } else {
    errorOld.innerHTML = "";
  }
  // check địa chỉ
  if (userLocation.value.trim() == "") {
    errorLocation.innerHTML = "*Bạn chưa nhập địa chỉ";
    return;
  } else {
    errorLocation.innerHTML = "";
  }
  // check giới tính
  if (!(gender1.checked || gender2.checked)) {
    errorGender.innerHTML = "*Bạn chưa chọn giới tính";
    return;
  } else {
    errorGender.innerHTML = "";
  }
  // add new
  var newUser = {
    id: users.length + 1,
    userName: userName.value,
    userOld: userOld.value,
    userLocation: userLocation.value,
    gender: gender1.checked ? "Nam" : "Nữ",
  };
  users.push(newUser);
  showUser();
}
btnAdd.addEventListener("click", addUser);

function removeUser(id) {
  for (var item of users) {
    if (item.id == id) {
      itemIndex = users.indexOf(item);
      var xoa = confirm("Bạn có chắc chắn muốn xóa");
      if (xoa == true) {
        users.splice(itemIndex, 1);
      } else {
        return;
      }
    }
  }
  showUser();
}
