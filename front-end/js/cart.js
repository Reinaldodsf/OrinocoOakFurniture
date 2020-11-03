//SET LOCALSTORAGE
if (!localStorage.getItem('cart')) { 
  localStorage.setItem('cart', JSON.stringify([]));
};

//Get and Parse data from the localStorage
let cart = JSON.parse(localStorage.getItem('cart'));

//DOM containers in shoppingCart.html
let productContainer = document.getElementById('ProductResume');
let userInput = document.getElementById('userForm');
let OrderIdContainer = document.getElementById('OrderDetails');
const submitButton = document.getElementById('orderButton');
var url = localStorage.getItem('baseURL');

//Create dom elements
let div0 = document.createElement ('div');
let div1 = document.createElement ('div');
let productCount = document.createElement ('h5');

//style
div0.classList.add ('col-lg-8', 'mb-3', 'pt-4', 'wish-list');
productCount.classList.add ('mb-4');

//Products count and amount
let itemsCount = 0;
let totalAmount = 0;

//START PRODUCT SECTION - Create structure for each item in the cart
for (let item in cart) {
    //CREATE HTML ELEMENTS
    const div2 = document.createElement ('div');
    const oakImage = document.createElement ('img');
    const div3 = document.createElement ('div');
    const div4 = document.createElement ('div');
    const div5 = document.createElement ('div');
    const oakName = document.createElement ('h5');
    const oakVarnish = document.createElement ('p');
    const div6 = document.createElement ('div');
    const div7 = document.createElement ('div');
    const increaseButton = document.createElement ('button');
    const oakQuantity = document.createElement ('input');
    const decreaseButton = document.createElement ('button');
    const div8 = document.createElement ('div');
    const div9 = document.createElement ('div');
    const productDelete = document.createElement ('a');
    const deleteIcon = document.createElement ('i');
    const oakPrice = document.createElement ('p');
    //SET CONTENT
    increaseButton.textContent = '+';
    decreaseButton.textContent = '-';
    oakImage.src = cart[item].itemImage;
    oakName.textContent = cart[item].itemName;
    oakVarnish.textContent = "Varnish: " + cart[item].itemVarnish;
    oakQuantity.value = cart[item].itemQuantity;
    productDelete.textContent = 'Remove item'
    oakPrice.textContent = cart[item].itemPrice + ' $';
    itemsCount += cart[item].itemQuantity;
    totalAmount += (cart[item].itemPrice * cart[item].itemQuantity);
    //STYLE
    div1.classList.add ('row', 'mb-4');
    div2.classList.add ('col-md-5', 'col-lg-3', 'col-xl-3', 'py-3', 'border-top', 'px-0');
    oakImage.classList.add ('img-fluid', 'rounded', 'w-100');
    oakImage.setAttribute ('alt', 'Display foto of ' + cart[item].itemName + ' product');  
    div3.classList.add ('col-md-7', 'col-lg-9', 'col-xl-9','py-3','px-3', 'px-lg-5', 'border-top', 'px-0');
    div4.classList.add ('d-flex', 'justify-content-between');
    oakVarnish.classList.add ('mb-3', 'text-muted', 'text-uppercase', 'small');
    div7.classList.add ('def-number-input', 'number-input', 'safari_only', 'mb-0', 'w-100', 'text-right');
    div7.style.maxWidth = '135px';
    div7.style.minWidth = '135px';
    oakQuantity.min = '0';
    oakQuantity.name = 'quantity';
    oakQuantity.type = 'number';
    oakQuantity.setAttribute ('onkeypress', "return false;");
    oakQuantity.classList.add ('btn', 'bg-light');
    oakQuantity.style.maxWidth = '65px';
    decreaseButton.classList.add ('btn', 'btn-outline-secondary');
    decreaseButton.setAttribute ('onclick', "window.location.reload();");
    increaseButton.classList.add ('btn', 'btn-outline-secondary');
    increaseButton.setAttribute ('onclick', "window.location.reload();")
    div8.classList.add ('d-flex', 'justify-content-between', 'align-items-center');
    productDelete.href='#!';
    productDelete.type='button';
    productDelete.classList.add ('card-link-secondary', 'small', 'text-uppercase', 'mt-lg-3');
    deleteIcon.classList.add ('fas', 'fa-trash-alt', 'ml-2');
    oakPrice.classList.add ('mb-0');
    //APPEND TO ShoppingCart.html
    div5.appendChild (oakName);
    div5.appendChild (oakVarnish);
    div7.appendChild (decreaseButton);
    div7.appendChild (oakQuantity);
    div7.appendChild (increaseButton);
    div6.appendChild (div7);
    productDelete.appendChild (deleteIcon);
    div9.appendChild (productDelete);
    div8.appendChild (div9);
    div8.appendChild (oakPrice);
    div4.appendChild (div5);
    div4.appendChild (div6);
    div3.appendChild (div4);
    div3.appendChild (div8);
    div2.appendChild (oakImage);
    div1.appendChild (div2);
    div1.appendChild (div3);

    //INCREASE ITEM  QUANTITY
    increaseButton.addEventListener ('click', () => {
        //Get and Parse data from the localStorage
        let cart = JSON.parse(localStorage.getItem('cart')); 

        //Gets the Index of the item in the localStorage.
        let index = cart.findIndex(itemIncrease => itemIncrease.itemId === cart[item].itemId);
        cart[index].itemQuantity++;
        localStorage.setItem('cart', JSON.stringify(cart));
    });
    
    //DECREASE ITEM  QUANTITY
    decreaseButton.addEventListener('click', () => {
        //Get and Parse data from the localStorage
        let cart = JSON.parse(localStorage.getItem('cart'));
        
        //Gets the Index of the item in the localStorage.
        let index = cart.findIndex(itemDecrease => itemDecrease.itemId === cart[item].itemId);
        if (cart[index].itemQuantity > 1) {
          //More than one item, decrease the product quantity by one unit 
          cart[index].itemQuantity--;
        } else {
          //Only one unit, remove product from the cart
          cart.splice(index, 1);
        } 
        localStorage.setItem('cart', JSON.stringify(cart));
    });

    productDelete.addEventListener('click', () => {
        //Get and Parse data from the localStorage
        let cart = JSON.parse(localStorage.getItem('cart'));   

        //Gets the Index of the item in the localStorage. If item does not exists return -1
        let index = cart.findIndex(itemDecrease => itemDecrease.itemId === cart[item].itemId);
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        window.location.reload();
    });
}
//END PRODUCT SECTION--

//START AMOUNT SECTION--
//SET DOM ELEMENTS
const costdiv1 = document.createElement ('div');
const costTitle = document.createElement ('h4');
const costList = document.createElement ('ul');
const costItem1 = document.createElement ('li');
const costItem2 = document.createElement ('li');
const costItem3 = document.createElement ('li');
const checkOutButton = document.createElement ('button');
const value1 = document.createElement ('span');
const value2 = document.createElement ('span');
const value3 = document.createElement ('span');
//SET CONTEXT
costTitle.textContent = 'The total amount of';
costItem1.textContent = 'Product(s) amount';
value1.textContent = totalAmount + ' $';
costItem2.textContent = 'Shipping';
value2.textContent = 'Free';
costItem3.textContent = 'Total amount';
value3.textContent = totalAmount + ' $';
checkOutButton.textContent = 'Checkout';
//STYLE
costdiv1.classList.add ('col-lg-4', 'mb-3', 'pt-4');
costTitle.classList.add ('mb-3');
costList.classList.add ('list-group', 'list-group-flush');
costItem1.classList.add ('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center', 'border-0', 'px-2', 'pb-0', 'text-secondary');
costItem2.classList.add ('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center', 'border-0', 'px-2', 'mb-1', 'text-secondary');
costItem3.classList.add ('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center', 'px-1', 'pb-3', 'font-weight-bold');
checkOutButton.type = 'button';
checkOutButton.classList.add ('btn', 'btn-primary', 'btn-block');

//GET THE NUMBER OF PRODUCTS IN THE CART
productCount.textContent = 'Summary (' + itemsCount + ' items)'; //Count the number of items in the cart

//APPEND TO shoppingCart.html
costItem1.appendChild (value1);
costItem2.appendChild (value2);
costItem3.appendChild (value3);
costList.appendChild (costItem1);
costList.appendChild (costItem2);
costList.appendChild (costItem3);
costdiv1.appendChild (costTitle);
costdiv1.appendChild (costList);
costdiv1.appendChild (checkOutButton);
div0.appendChild(productCount);
div0.appendChild (div1);
productContainer.appendChild (div0);
productContainer.appendChild (costdiv1);
//END AMOUNT SECTION--

//WHEN CLICK ON CHECKOUT SHOW THE USER FORM
checkOutButton.addEventListener('click', () => {
  if (cart[0] == null) {
    alert('Error - Your Cart is empty!');

  } else {
    userInput.removeAttribute ('hidden');
    userInput.scrollIntoView();
  }
});

//USER FORM SECTION--
submitButton.addEventListener('click', ($event) => {
  $event.preventDefault ();
  
  if (inputValidation () == true ) {
    //GET USER INPUT
    const clientFirstName = document.getElementById('orderFirstName');
    const clientLastName = document.getElementById('orderLastName');
    const clientEmail = document.getElementById('orderEmail');
    const clientAddress = document.getElementById('orderAddress');
    const clientCity = document.getElementById('orderCity');
    let products = [];

    //SET DATA TO BE SEND TO THE LOCALHOST SERVER
    let contact = {
      firstName: clientFirstName.value,
      lastName: clientLastName.value,
      email: clientEmail.value,
      address: clientCity.value,
      city: clientAddress.value,
    };
    for (let item in cart) {
      products.push (cart[item].itemId);
    };
    let orderData = {contact, products};

    //SET THE AJAX 'POST' REQUEST
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4) {
        if (this.status == 201) {
          const response = JSON.parse(this.response);
          
          let contacts = localStorage.setItem('userContact', contact);
          contacts = [];
          let firstName = clientFirstName.value;
          let lastName = clientLastName.value;
          let email = clientEmail.value;
          let address = clientAddress.value;
          let city = clientCity.value;

          contacts.push({firstName, lastName, address, city, email});
          localStorage.setItem('userContact', JSON.stringify(contacts));

          localStorage.setItem('orderId', response.orderId);
          document.location.href = 'orderPage.html';          
        } else {
          alert('Could not connect to the server! Please try again later.');
        } 
      }
    };
    //SEND AJAX REQUEST
    xmlhttp.open('POST', 'http://localhost:3000/api/furniture' + '/order');
    xmlhttp.setRequestHeader ('Content-Type', 'application/json');
    xmlhttp.send (JSON.stringify(orderData));
  }
});

//vALIDATE IF USERINPUT IS FILLED (EMPTYCONTROL) + EMAIL FORMAT CHECK (CONTROLEMAIL)
function inputValidation () {
  let error = 0;
  emptyControl ('orderFirstName', 'msgFirstName');
  emptyControl ('orderLastName', 'msgLastName');
  emptyControl ('orderEmail', 'msgEmail');
  emptyControl ('orderAddress', 'msgAddress');
  emptyControl ('orderCity', 'msgCity');
  controlEmail ('orderEmail', 'msgInvalidEmail');

  function emptyControl (inputId, msgId) {
    let inputElement = document.getElementById(inputId);
    let msgElement = document.getElementById(msgId);

    if (!inputElement.value) {
      msgElement.removeAttribute ('hidden');
      inputElement.classList.add ('border-danger');
      return error++;
    } else {
      inputElement.classList.remove ('border-danger');
      inputElement.classList.add ('border-success');
      msgElement.setAttribute ('hidden', 'true');
    };
  };

  function controlEmail (inputId, msgId) {
    let inputElement = document.getElementById(inputId);
    let msgElement = document.getElementById(msgId);

    if (inputElement.value) {
      if (!validateEmail(inputElement.value)) {
        msgElement.removeAttribute ('hidden');
        inputElement.classList.add ('border-danger');
        return error++;
      } else {
        inputElement.classList.remove ('border-danger');
        inputElement.classList.add ('border-success');
        msgElement.setAttribute ('hidden', 'true');
      };
    };
  };

  if (error == 0) {
    return true;
  } else {
    return false;
  };

  //Validate email format function
  function validateEmail(email) {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
};