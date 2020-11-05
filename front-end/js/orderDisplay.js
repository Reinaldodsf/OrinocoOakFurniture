//GET THE LOCALSTORAGE DATA
let cart = JSON.parse(localStorage.getItem('cart'));
let contacts = JSON.parse(localStorage.getItem('userContact'));
let orderIdNumber = localStorage.getItem('orderId');      

//DOM CONTAINER IN orderPage.html
let display = document.getElementById('OrderResume');

//CREATE ELEMENTS
const orderDiv = document.createElement ('div');
const orderTitle = document.createElement ('h5');
const buyId = document.createElement ('span');
const productList = document.createElement ('ul');
let shipping = document.createElement ('li');
let shippingvalue = document.createElement ('span');
let total = document.createElement ('li');
let totalValue = document.createElement ('span');
const userDiv = document.createElement ('div');
const delivery = document.createElement ('div');
const deliveryTitle = document.createElement ('div');
const deliveryAddress = document.createElement ('p');
const deliveryCity = document.createElement ('p');
const buyer = document.createElement ('div');
const buyerTitle = document.createElement ('div');
const buyerName = document.createElement ('p');
const buyerEmail = document.createElement ('p');

//SET STYLE
orderDiv.style.backgroundColor = '#d7e1d8';
orderDiv.classList.add ('rounded'); 
orderTitle.classList.add ('ml-3', 'pt-2');
buyId.classList.add ('ml-3');
productList.classList.add ('list-group', 'list-group-flush');
shipping.classList.add ('list-group-item', 'd-flex', 'justify-content-between', 'border-0', 'px-3', 'mb-1', 'text-secondary');
total.classList.add ('list-group-item', 'd-flex', 'justify-content-between', 'px-1', 'pb-3', 'font-weight-bold');
userDiv.classList.add ('row', 'mt-5');
delivery.classList.add ('col-12', 'col-lg-6', 'my-3');
deliveryTitle.style.backgroundColor = '#d7e1d8';
deliveryTitle.classList.add ('rounded', 'h5', 'p-3');
deliveryAddress.classList.add ('mx-3', 'mb-0');
deliveryCity.classList.add ('mx-3', 'mb-0');
buyer.classList.add ('col-12', 'col-lg-6', 'my-3');
buyerTitle.style.backgroundColor = '#d7e1d8';
buyerTitle.classList.add ('rounded', 'h5', 'p-3');
buyerName.classList.add ('mx-3', 'mb-0');
buyerEmail.classList.add ('mx-3', 'mb-0');

//SET CONTENT
orderTitle.textContent = 'Order Confirmation #';
buyId.textContent = orderIdNumber;

let totalAmount = 0;
for (let item in cart) {
    let productItem = document.createElement ('li');
    let productvalue = document.createElement ('span');
    
    productItem.classList.add ('list-group-item', 'd-flex', 'justify-content-between', 'border-0', 'px-3', 'pb-0', 'text-secondary');

    productItem.textContent = cart[item].itemQuantity + ' x ' + cart[item].itemName;
    productvalue.textContent = (cart[item].itemPrice * cart[item].itemQuantity) + ' $';
    totalAmount += (cart[item].itemPrice * cart[item].itemQuantity);

    productItem.appendChild (productvalue);
    productList.appendChild (productItem);
};

shipping.textContent = 'Shipping';
shippingvalue.textContent = 'Gratis';
total.textContent = 'Total Amount';
totalValue.textContent = totalAmount + ' $';
deliveryTitle.textContent = 'Delivery Address';
deliveryAddress.textContent = 'Address: ' + contacts[0].address;
deliveryCity.textContent = 'City: ' + contacts[0].city;
buyerTitle.textContent = 'User Details';
buyerName.textContent = 'Name: ' + contacts[0].firstName + " " + contacts[0].lastName;
buyerEmail.textContent= 'E-mail: ' + contacts[0].email;

//APPEND TO HTML orderPage.html
shipping.appendChild (shippingvalue);
total.appendChild (totalValue);
productList.appendChild (shipping);
productList.appendChild (total);
orderDiv.appendChild (orderTitle);
orderDiv.appendChild (buyId);
delivery.appendChild (deliveryTitle);
delivery.appendChild (deliveryAddress);
delivery.appendChild (deliveryCity);
buyer.appendChild (buyerTitle);
buyer.appendChild (buyerName);
buyer.appendChild (buyerEmail);
userDiv.appendChild (buyer);
userDiv.appendChild (delivery);
display.appendChild (orderDiv);
display.appendChild (productList);
display.appendChild (userDiv);

//CLEAR THE LOCALSTORAGE -----------
localStorage.clear();