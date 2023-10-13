const addtoCartButton = document.querySelectorAll(".addtoCart");

function increaseQuantity(event) {
  var buttonClicked = event.target;
  var qt = buttonClicked.parentElement.children[1];
  var qtValue = qt.innerText;
  var newValue = parseInt(qtValue) + 1;
  qt.innerText = newValue;
  updateHarga(buttonClicked, qt);
  updateTotal();
}

function decreaseQuantity(event) {
  var buttonClicked = event.target;
  var qt = buttonClicked.parentElement.children[1];
  var qtValue = qt.innerText;
  var newValue = parseInt(qtValue) - 1;
  newValue = newValue <= 0 ? 1 : newValue;
  qt.innerText = newValue;
  updateHarga(buttonClicked, qt);
  updateTotal();
}

function updateHarga(buttonClicked, qt) {
  var hargaPertama = buttonClicked.parentElement.parentElement.children[3];
  var harga = buttonClicked.parentElement.parentElement.children[2].children[0];
  var price = hargaPertama.innerText;
  var hrg = parseInt(price);
  var qt = parseInt(qt.innerText);
  var total = hrg * qt;
  harga.innerText = `${total}.000`;
}

function updateTotal() {
  var harga = document.querySelectorAll(".itemPrice");
  var sumTotal = 0;
  for (var i = 0; i < harga.length; i++) {
    var prices = parseInt(harga[i].children[0].innerText);
    sumTotal += prices;
  }
  if (sumTotal == 0) {
    document.querySelectorAll(".total")[0].innerText = `Rp. ${sumTotal}`;
    return;
  }
  document.querySelectorAll(".total")[0].innerText = `Rp. ${sumTotal}.000`;
}

function updateBag(itemRow) {
  var bagNotif = document.querySelectorAll(".bagNotif")[0];
  var bagNotifvalue = itemRow.length;
  bagNotif.style.display = "flex";
  bagNotif.innerText = bagNotifvalue;
}

function detectItem() {
  var itemRow = document.querySelectorAll(".itemRow");
  var itemCart = document.querySelectorAll(".itemCart")[0];
  var bagNotif = document.querySelectorAll(".bagNotif")[0];
  updateBag(itemRow);
  if (itemRow.length < 1) {
    itemCart.classList.remove("reveal");
    bagNotif.style.display = "none";
    return;
  }
}

for (var i = 0; i < addtoCartButton.length; i++) {
  const buttons = addtoCartButton[i];
  buttons.addEventListener("click", addtocartclicked);
}

function addtocartclicked(event) {
  var button = event.target;
  var shopItem = button.parentElement.parentElement;
  var title = shopItem.querySelectorAll(".title")[0].innerText;
  var price = shopItem.children[2].querySelectorAll(".hargaProduk")[0].innerText;
  var image = shopItem.children[1].src;
  addItemtoCart(title, image, price);
}

function deleteItem(event) {
  var button = event.target;
  button.parentElement.parentElement.remove();
  updateTotal();
  detectItem();
}

function addItemtoCart(title, image, price) {
  var cartRow = document.createElement("div");
  cartRow.classList.add("itemRow");
  var itemCart = document.querySelectorAll(".itemCart")[0];
  var cartFooter = itemCart.querySelectorAll(".cartFooter")[0];
  var itemTitles = itemCart.querySelectorAll(".itemTitle");

  for (var i = 0; i < itemTitles.length; i++) {
    if (itemTitles[i].innerText == title) {
      alert("barang sudah ada di keranjang");
      return;
    }
  }
  var cartRowContents = `
          <span class="itemImage"> <img src="${image}" alt="" /> </span>
          <span class="itemTitle"> ${title} </span>
          <span class="itemPrice"> Rp. <span>${price}</span> </span>
          <span class="hargaPertama" style="display:none;"> ${price} </span>
          <span class="itemQt">
            <button type="button" class="minus">-</button>
            <span class="qt">1</span>
            <button type="button" class="plus">+</button>
            <button type="button" class="delete">X</span>
          </span>
         `;

  cartRow.innerHTML = cartRowContents;
  itemCart.insertBefore(cartRow, cartFooter);
  cartRow.querySelectorAll(".minus")[0].addEventListener("click", decreaseQuantity);
  cartRow.querySelectorAll(".plus")[0].addEventListener("click", increaseQuantity);
  cartRow.querySelectorAll(".delete")[0].addEventListener("click", deleteItem);
  updateTotal();
  var itemRow = document.querySelectorAll(".itemRow");
  updateBag(itemRow);
}

function revealCart() {
  var itemCart = document.querySelectorAll(".itemCart")[0];

  itemCart.classList.toggle("reveal");
}

document.querySelectorAll(".shopping-bag")[0].addEventListener("click", revealCart);

function beliItem() {
  var cartRow = document.querySelectorAll(".itemRow");
  if (cartRow.length <= 0) {
    alert("KERANJANG ANDA MASIH KOSONG");
    return;
  }
  for (let i = 0; i < cartRow.length; i++) {
    cartRow[i].remove();
  }
  alert("TERIMA KASIH TELAH MEMBELI");
  detectItem();
  updateTotal();
}
document.querySelectorAll(".beli")[0].addEventListener("click", beliItem);
