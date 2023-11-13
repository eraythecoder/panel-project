const main = document.querySelector("#main");
const addUserBTn = document.querySelector("#add-user");
const doubleBtn = document.querySelector("#double");
const showMillionaries = document.querySelector("#show-millionaries");
const sortBtn = document.querySelector("#sort");
const calculateWealthBtn = document.querySelector("#calculate-wealth");

let data = [];

// Kullanıcı fetchleme
async function getRandUser() {
  const res = await fetch("https://randomuser.me/api");
  const data = await res.json();

  const user = data.results[0];

  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000),
  };

  addData(newUser);
}

// Parayı ikiye katlama
function doubleMoney() {
  data = data.map((user) => {
    return { ...user, money: user.money * 2 };
  });

  updateDom(data);
}

// Paraya göre sıralama
function sortByWealth() {
  data = data.sort((a, b) => b.money - a.money);
  updateDom(data);
}

// Milyonerleri gösterme
function showMil() {
  data = data.filter((mil) => mil.money >= 1000000);
  updateDom(data);
}

// Toplam parayı gösterme
function calculateTotalMoney() {
  const totalMoney = data.reduce((acc, curNum) => (acc += curNum.money), 0);
  const wealthDiv = document.createElement("div");
  wealthDiv.innerHTML = `<h3>Toplam Para = <strong>${formatMoney(totalMoney)}</strong></h3>`
  main.appendChild(wealthDiv);
}

//Data dizisine yeni kullanıcı objesi yerlertirme
function addData(userObj) {
  data.push(userObj);
  updateDom(data);
}

//Data dizisini DOM'a aktarma
function updateDom(providedData = data) {
  // Main div temizlendi
  main.innerHTML = "<h2><strong>Kişi</strong>Servet</h2>";

  providedData.forEach((item) => {
    const element = document.createElement("div");
    element.classList.add("person");
    element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(
      item.money
    )}`;
    main.appendChild(element);
  });
}

function formatMoney(money) {
  return money.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,") + " ₺";
}

// Eventlisteners
addUserBTn.addEventListener("click", getRandUser);
doubleBtn.addEventListener("click", doubleMoney);
sortBtn.addEventListener("click", sortByWealth);
showMillionaries.addEventListener("click", showMil);
calculateWealthBtn.addEventListener("click", calculateTotalMoney);
