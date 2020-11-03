//DOM CONTAINER IN index.html
let display = document.getElementById('productsDisplay');

//SET AJAX 'GET' REQUEST TO LOCALHOST
let xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
  if (this.readyState == 4) {
    if (this.status == 200) {
      const oakFurniture = JSON.parse(xmlhttp.response);   
      
      //FOR EACH PRODUCT IN THE SERVER RESPONSE:
      for (let item in oakFurniture) {
        //CREATE THE ELEMENTS
        let newProduct = document.createElement ('div');
        let newCard = document.createElement ('div');
        let newCardBody = document.createElement ('div');
        let newCardBodyButton = document.createElement ('div');
        let newImage = document.createElement ('img');
        let newName = document.createElement ('h2');
        let newDescription = document.createElement ('p');
        let newVarnishTitle = document.createElement ('h5');
        let newVarnish = document.createElement ('h6');
        let newPrice = document.createElement ('h5');
        let newButton = document.createElement ('a');

        //SET CONTENT
        newImage.src = oakFurniture[item].imageUrl;
        newImage.setAttribute ('alt', 'Display foto of ' + oakFurniture[item].name + ' product');
        newName.textContent = oakFurniture[item].name;
        newDescription.textContent = oakFurniture[item].description;
        newPrice.textContent = (oakFurniture[item].price /100) + ' $'; //divides the price for 100 since price info comes with decimals without a coma/dot
        newVarnishTitle.textContent = "Available varnishes:";
        newVarnish.textContent = oakFurniture[item].varnish;
        newButton.href = "product.html?id=" + oakFurniture[item]._id; //Will set the new page with the product_Id
        newButton.textContent = "See more details"

        //STYLE
        newProduct.classList.add ('col-12', 'col-lg-4');
        newCard.classList.add ('card', 'mb-3');
        newCardBody.classList.add ('card-body');
        newCardBodyButton.classList.add ('card-footer', 'text-center');
        newImage.classList.add ('card-img-top', 'rounded');
        newName.classList.add ('card-title', 'text-center', 'mt-3');
        newDescription.classList.add ('card-text', 'text-center');
        newPrice.classList.add ('text-center');
        newVarnishTitle.classList.add ('text-center', 'mt-3');
        newVarnish.classList.add ('text-center');
        newButton.classList.add ('btn', 'btn-primary');

        //APPEND TO HTML index.html
        newCardBody.appendChild (newName);
        newCardBody.appendChild (newPrice);
        newCardBody.appendChild (newDescription);
        newCardBody.appendChild (newVarnishTitle);
        newCardBody.appendChild (newVarnish);
        newCardBodyButton.appendChild (newButton);
        newCard.appendChild (newImage);
        newCard.appendChild (newCardBody);
        newCard.appendChild (newCardBodyButton);
        newProduct.appendChild (newCard);
        display.appendChild (newProduct);
      }
    } else {
      alert('Could not connect to the server! Please try again later.');
    } 
  }
};

//PERFORM THE AJAX REQUEST
xmlhttp.open("GET", "http://localhost:3000/api/furniture");
xmlhttp.send();