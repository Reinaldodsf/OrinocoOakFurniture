//SET LOCALSTORAGE
if (!localStorage.getItem('cart')) { 
  localStorage.setItem('cart', JSON.stringify([]));
};

//GET WEBPAGE URL
const url = new URL(window.location.href);
const search_params = url.searchParams; 
const id = search_params.get('id'); //Get 'Id=' from the URL

//DOM CONTAINERS IN product.html
let containerTitle = document.getElementById('ProductName');
let details = document.getElementById('productDetails');
let button = document.getElementById('cartButton');

//SET AJAX 'GET' REQUEST TO LOCALHOST
let xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
  if (this.readyState == 4) {
    if (this.status == 200) {
      const oakFurniture = JSON.parse(xmlhttp.response);

      containerTitle.textContent = 'Oak Furniture: ' + oakFurniture.name; //Change jombotron title

      //CREATE HTML ELEMENTS
      let oakImage = document.createElement ('img');
      let oakDescriptionTitle = document.createElement ('h4');
      let oakDescription = document.createElement ('p');
      let oakPrice = document.createElement ('h3');
      let oakVarnishLabel = document.createElement ('label');
      let oakVarnish = document.createElement ('select');
      let productVarnishDefault = document.createElement('option');
      let varnishAlert = document.createElement ('p');
      let oakButton = document.createElement ('button');
      let divLink =document.createElement ('div');
      let cartLink = document.createElement ('a');
      let successMessage = document.createElement ('p');
      
      //GET DATA FROM THE LOCALHOST SERVER
      oakImage.src = oakFurniture.imageUrl;
      oakDescriptionTitle.textContent = 'Description';
      oakDescription.textContent = oakFurniture.description + oakFurniture.description;
      oakPrice.textContent = 'Price: ' + (oakFurniture.price /100) + ' $';
      oakVarnishLabel.textContent = 'Available varnish: '
      productVarnishDefault.textContent = 'select option';
      varnishAlert.textContent = 'Please select a Varnish!'
      oakButton.textContent = 'Add to cart';
      cartLink.href = "shoppingCart.html"
      cartLink.textContent = "Go to Cart"
      successMessage.textContent = oakFurniture.name + " successfully added to the cart!"

      //CREATE THE SELECT DROP DOWN WITH THE VARNISH OPTIONS
      productVarnishDefault.hidden = true;
      oakVarnish.append(productVarnishDefault); //Default option to empty.
      for (let varnishment in oakFurniture.varnish) {
        let productVarnish = document.createElement('option');
        productVarnish.textContent = oakFurniture.varnish[varnishment];
        productVarnish.value = oakFurniture.varnish[varnishment];
        oakVarnish.append(productVarnish); 
      }
      
      //ADD ATTRIBUTES AND CLASSES
      oakImage.setAttribute ('alt', 'Display foto of ' + oakFurniture.name + ' product');  
      oakImage.classList.add ('img-fluid', 'rounded');
      oakDescriptionTitle.classList.add ('m-3', 'pt-3');
      oakDescription.classList.add ('text-justify');
      oakVarnishLabel.setAttribute ('for', 'Varnish');  
      oakVarnishLabel.classList.add ('m-3', 'h4'); 
      oakVarnish.setAttribute ('id', 'varnishSelect');
      oakVarnish.classList.add ('custom-select');
      varnishAlert.classList.add ('text-danger', 'mx-1');
      varnishAlert.setAttribute ('hidden', 'true');
      oakPrice.classList.add ('text-right', '.text-secondary', 'm-3'); 
      oakButton.setAttribute ('type', 'button');  
      oakButton.classList.add ('btn', 'btn-info', 'btn-rounded', 'btn-lg');
      cartLink.classList.add ('btn', 'btn-success', 'mt-2');
      successMessage.classList.add ('text-success', 'mt-3');
      
      //APPEND TO product.html
      details.appendChild (oakImage);
      details.appendChild (oakDescriptionTitle);
      details.appendChild (oakDescription);
      details.appendChild (oakVarnishLabel);
      details.appendChild (oakVarnish);
      details.appendChild (varnishAlert);
      details.appendChild (oakPrice);
      button.appendChild (oakButton);
      
      //REMOVE ALERT ON VARNISH AFTER BEING SELECTED
      oakVarnish.addEventListener('blur', () => {
        varnishAlert.setAttribute ('hidden', 'true');
        oakVarnish.classList.remove ('border-danger');
      });

      oakVarnish.addEventListener('input', () =>{
        varnishAlert.setAttribute ('hidden', 'true');
        oakVarnish.classList.remove ('border-danger');
      });      
      
      //ADD THE ITEM TO LOCALSTORAGE BY CLICKING IN oakButton
      oakButton.addEventListener('click', () => {

        //CHECK IF VARNISH WAS SELECTED
        if (document.getElementById('varnishSelect').value == 'select option') {
          varnishAlert.removeAttribute ('hidden');
          oakVarnish.classList.add ('border-danger');

        } else {
          let cart = JSON.parse(localStorage.getItem('cart'));

          //SET ITEM TO BE ADDED TO THE LOCALSTORAGE
          let itemId = oakFurniture._id;
          let itemName = oakFurniture.name;
          let itemImage = oakFurniture.imageUrl;
          let itemPrice = (oakFurniture.price /100);
          let itemVarnish = oakVarnish.value;
          let itemQuantity = 1;
        
          //GET THE INDEX OF THE ITEM IN THE LOCALSTORAGE
          let index = cart.findIndex(newitem => newitem.itemId === itemId);
          if (index !== -1) {
            cart[index].itemQuantity++; //Already exists, only update quantity 
          } else {
            cart.push({itemId, itemName, itemImage, itemPrice, itemVarnish, itemQuantity}); //Does not exists, add item to localStorage
          }

          //UPDATE CHANGES
          localStorage.setItem('cart', JSON.stringify(cart));

          //DISPLAY THE 'GO TO CART' BUTTON AND SUCCESS MESSAGE
          button.appendChild (divLink);
          button.appendChild (successMessage);
          button.appendChild (cartLink);
        }
      });
    } else {
      alert('Could not connect to the server! Please try again later.');
    } 
  }
};

//PERFORM THE AJAX REQUEST
xmlhttp.open('GET', 'http://localhost:3000/api/furniture' + '/' + id);
xmlhttp.send();