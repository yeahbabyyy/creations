const products = [
    {
        id: 0,
        image: 'image/oil.jpg',
        title: 'Luxury face serum',
        description: "Soothing and deeply moisturizing serum for sensitive skin.",
        price: 70,
    },
    {
        id: 1,
        image: 'image/card.jpg',
        title: 'Colorful Birthday card',
        description: "Custom cards for every occasion.",
        price: 10,
    },
    {
        id: 2,
        image: 'image/colorfulChairs.jpg',
        title: 'Renovated vibrant Chairs',
        description: "Stylish and durable vintage chairs.",
        price: 230,
    },
    {
        id: 3,
        image: 'image/cream.jpg',
        title: 'Face cream for sebum control',
        description: "Cream with 98% of natural ingredients.",
        price: 100,
    },
    {
        id: 4,
        image: 'image/blanket.jpg',
        title: 'Handmade Blanket made with thick yarn',
        description: "This stylish blanket will make your house feel like a home.",
        price: 180,
    },
    {
        id: 5,
        image: 'image/face.jpg',
        title: 'Natural Face Massage Set',
        description: "Feel the change the daily massage will bring to your skin.",
        price: 75,
    },
    {
        id: 6,
        image: 'image/mug.jpg',
        title: 'Hand-painted mug',
        description: "Hand-painted ceramin mug with skull.",
        price: 29,
    },
    {
        id: 7,
        image: 'image/fragrance.jpg',
        title: '"Summer Breeze" Fragrance',
        description: "Fall in love with fully natural scents.",
        price: 100,
    },
];


//dodawanie do koszyka
function addToCart(productId) {
    event.stopPropagation();
    const product = products.find(p => p.id === productId);

    if (product) {
        var cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));
        alert(product.title + ' has been added to your cart!');
    }
}
//usuwanie z koszyka
function removeFromCart(productId) {
    var cart = JSON.parse(localStorage.getItem('cart')) || [];
    var index = cart.findIndex(product => product.id === productId);
    if (index !== -1) {
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        alert('Product has been removed from your cart!');
        displayCart();
    }
}
//wyświetlnaie koszyka
function displayCart() {
    var cart = JSON.parse(localStorage.getItem('cart')) || [];
    var cartTableBody = document.querySelector("#cart tbody");

    cartTableBody.innerHTML = "";

    cart.forEach(product => {
        var row = document.createElement("tr");

        row.innerHTML = `
            <td><button class="normal" onclick="removeFromCart(${product.id})">Remove</button></td>
            <td><img src="${product.image}" alt="${product.title}" width="50"></td>
            <td>${product.title}</td>
            <td>$${product.price}</td>
            <td>1</td>
            <td>$${product.price}</td>
        `;

        cartTableBody.appendChild(row);
    });

    updateCartTotal();
}
//podliczanie cen
function updateCartTotal() {
    var cart = JSON.parse(localStorage.getItem('cart')) || [];
    var subtotal = cart.reduce((acc, product) => acc + product.price, 0);

    document.querySelector("#subtotal table tr:nth-child(1) td:nth-child(2)").textContent = `$${subtotal.toFixed(2)}`;
    document.querySelector("#subtotal table tr:nth-child(3) td:nth-child(2)").textContent = `$${subtotal.toFixed(2)}`;
}

document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector("#cart")) {
        displayCart();
    }
//wyszukiwanie, sortowanie i filtrowanie produktów
    const root = document.getElementById('root');
    const searchInput = document.getElementById('search');
    const sortSelect = document.getElementById('sort');
    const minPriceInput = document.getElementById('min-price');
    const maxPriceInput = document.getElementById('max-price');
    const filterPriceButton = document.getElementById('filter-price');

    //wyświetlanie produktów
    const displayProducts = (products) => {
        root.innerHTML = products.map((item) => {
            return `
            <div class='box' onclick='viewProduct(${item.id})'>
                    <div class='img-box'>
                        <img class='images' src=${item.image} alt="${item.title}">
                    </div>
                    <div class='bottom'>
                        <p>${item.title}</p>
                        <h2>$${item.price}</h2>
                        <button id="addtoacart" onclick='addToCart(${item.id})'>Add to cart</button>
                    </div>
                </div>
            `;
        }).join('');
    };

    const filterProducts = (searchTerm) => {
        const filteredProducts = products.filter(product => 
            product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
        displayProducts(filteredProducts);
    };
//cena rosnąco/ malejąco
    const sortProducts = (products, sortOrder) => {
        if (sortOrder === 'asc') {
            return products.sort((a, b) => a.price - b.price);
        } else if (sortOrder === 'desc') {
            return products.sort((a, b) => b.price - a.price);
        } else {
            return products;
        }
    };
//zakres cenowy
    const filterByPrice = (products, minPrice, maxPrice) => {
        return products.filter(product => {
            return (!minPrice || product.price >= minPrice) && (!maxPrice || product.price <= maxPrice);
        });
    };

    const updateProductsDisplay = () => {
        const searchTerm = searchInput.value.toLowerCase();
        const sortOrder = sortSelect.value;
        const minPrice = parseFloat(minPriceInput.value) || 0;
        const maxPrice = parseFloat(maxPriceInput.value) || Infinity;

        let filteredProducts = products.filter(product => 
            product.title.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm)
        );

        filteredProducts = filterByPrice(filteredProducts, minPrice, maxPrice);
        filteredProducts = sortProducts(filteredProducts, sortOrder);

        displayProducts(filteredProducts);
    };

    searchInput.addEventListener('input', updateProductsDisplay);
    sortSelect.addEventListener('change', updateProductsDisplay);
    filterPriceButton.addEventListener('click', updateProductsDisplay);

    displayProducts(products);
});



//strona osobnego produktu


function viewProduct(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        const productDetailHTML = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>${product.title}</title>
                <head><!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Creations</title>
                    <script src="https://kit.fontawesome.com/4929c5a6a8.js"></script>
                    <link rel="stylesheet" href="style.css">
                    <meta charset="UTF-8" name="description" content="Creations" name= "keywords"content="diy, handmade, crafts" name="vievport content" width= device-width , initial-scale = 1.0 >
                    <link rel="icon" type="image/x-icon" href="/public/favicon.png">

                </head>
                <body>
                    <script src="index.js"></script>
                
                <section id="header" class="sproductlogo">
                    <img src="UnionlogoThis.png"  alt="logo">
                    
                
                    <div id="navsingle">
                        <ul id="navbar">
                            
            <li><a href="test.html">Home</a></li>
            <li><a class="active" href="shop.html">Shop</a></li>
            <li><a href="about.html">About</a></li>
            <li><a href="contact.html">Contact</a></li>

            <li id="lg-bag"><a href="#" i class="fa-regular fa-user" class="user-pic" onclick="toggleMenu()"></i></a></li>
            <a href="#" id="close"><i class="far fa-times" ></i></a>
            <li id="lg-bag"><a href="myshop.html"><i class="fa-solid fa-shop"></i></a></li>
            <a href="#" id="close"><i class="far fa-times"></i></a>

            <li id="lg-bag"><a href="favourites.html"><i class="fa-solid fa-heart"></i></a></li>
            <a href="#" id="close"><i class="far fa-times"></i></a>

            <li id="lg-bag"><a href="cart.html"><i class="fa-solid fa-bag-shopping"></i></a></li>
            <a href="#" id="close"><i class="far fa-times"></i></a> </ul> </div>
     
<div>
                <script>
                    function addToCart(productId) {
                        const product = ${JSON.stringify(products)}.find(p => p.id === productId);

                        if (product) {
                            var cart = JSON.parse(localStorage.getItem('cart')) || [];
                            cart.push(product);
                            localStorage.setItem('cart', JSON.stringify(cart));
                            alert(product.title + ' has been added to your cart!');
                        }
                    }
                </script>
   </div> 
             <section id="header">
                <div class='product-detail'>
                    <img src="${product.image}" alt="${product.title}">
                    <h2>${product.title}</h2>
                    <p>${product.description}</p>
                    <h3>$${product.price}</h3>
                    <button onclick='addToCart(${product.id})'>Add to cart</button>
              </section>  
            </body>
            </html>
        `;

        const newWindow = window.open("", "_blank");
        newWindow.document.write(productDetailHTML);
        newWindow.document.close();
    }
}






/* sklep Caroline - wyświetlanie, sortowani i wyszukiwanie produktów*/

const products2 = [
 {   id: 0,
    image: 'image/oil.jpg',
    title: 'Luxury face serum',
    description: "Soothing and deeply moisturizing serum for sensitive skin.",
    price: 70,
},
{
    id: 1,
    image: 'image/card.jpg',
    title: 'Colorful Birthday card',
    description: "Custom cards for every occasion.",
    price: 10,
},
];

function addToCart(productId) {
    event.stopPropagation();
    const product = products2.find(p => p.id === productId);

    if (product) {
        var cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));
        alert(product.title + ' has been added to your cart!');
    }
}

function removeFromCart(productId) {
    var cart = JSON.parse(localStorage.getItem('cart')) || [];
    var index = cart.findIndex(product => product.id === productId);
    if (index !== -1) {
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        alert('Product has been removed from your cart!');
        displayCart();
    }
}

function displayCart() {
    var cart = JSON.parse(localStorage.getItem('cart')) || [];
    var cartTableBody = document.querySelector("#cart tbody");

    cartTableBody.innerHTML = "";

    cart.forEach(product => {
        var row = document.createElement("tr");

        row.innerHTML = `
            <td><button class="normal" onclick="removeFromCart(${product.id})">Remove</button></td>
            <td><img src="${product.image}" alt="${product.title}" width="50"></td>
            <td>${product.title}</td>
            <td>$${product.price}</td>
            <td>1</td>
            <td>$${product.price}</td>
        `;

        cartTableBody.appendChild(row);
    });

    updateCartTotal();
}

function updateCartTotal() {
    var cart = JSON.parse(localStorage.getItem('cart')) || [];
    var subtotal = cart.reduce((acc, product) => acc + product.price, 0);

    document.querySelector("#subtotal table tr:nth-child(1) td:nth-child(2)").textContent = `$${subtotal.toFixed(2)}`;
    document.querySelector("#subtotal table tr:nth-child(3) td:nth-child(2)").textContent = `$${subtotal.toFixed(2)}`;
}

document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector("#cart")) {
        displayCart();
    }

    const root2 = document.getElementById('root2');
    const searchInput = document.getElementById('search');
    const sortSelect = document.getElementById('sort');
    const minPriceInput = document.getElementById('min-price');
    const maxPriceInput = document.getElementById('max-price');
    const filterPriceButton = document.getElementById('filter-price');

    const displayProducts = (products2) => {
        root2.innerHTML = products2.map((item) => {
            return `
            <div class='box' onclick='viewProduct(${item.id})'>
                    <div class='img-box'>
                        <img class='images' src=${item.image} alt="${item.title}">
                    </div>
                    <div class='bottom'>
                        <p>${item.title}</p>
                        <h2>$${item.price}</h2>
                        <button id="addtoacart" onclick='addToCart(${item.id})'>Add to cart</button>
                    </div>
                </div>
            `;
        }).join('');
    };

    const filterProducts = (searchTerm) => {
        const filteredProducts = products2.filter(product => 
            product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
        displayProducts(filteredProducts);
    };

    const sortProducts = (products2, sortOrder) => {
        if (sortOrder === 'asc') {
            return products2.sort((a, b) => a.price - b.price);
        } else if (sortOrder === 'desc') {
            return products2.sort((a, b) => b.price - a.price);
        } else {
            return products2;
        }
    };

    const filterByPrice = (products2, minPrice, maxPrice) => {
        return products2.filter(product => {
            return (!minPrice || product.price >= minPrice) && (!maxPrice || product.price <= maxPrice);
        });
    };

    const updateProductsDisplay = () => {
        const searchTerm = searchInput.value.toLowerCase();
        const sortOrder = sortSelect.value;
        const minPrice = parseFloat(minPriceInput.value) || 0;
        const maxPrice = parseFloat(maxPriceInput.value) || Infinity;

        let filteredProducts = products2.filter(product => 
            product.title.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm)
        );

        filteredProducts = filterByPrice(filteredProducts, minPrice, maxPrice);
        filteredProducts = sortProducts(filteredProducts, sortOrder);

        displayProducts(filteredProducts);
    };

    searchInput.addEventListener('input', updateProductsDisplay);
    sortSelect.addEventListener('change', updateProductsDisplay);
    filterPriceButton.addEventListener('click', updateProductsDisplay);

    displayProducts(products2);
});





//strona osobnego produktu


function viewProduct(productId) {
    const product = products2.find(p => p.id === productId);
    if (product) {
        const productDetailHTML = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>${product.title}</title>
                <head><!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Creations</title>
                    <script src="https://kit.fontawesome.com/4929c5a6a8.js"></script>
                    <link rel="stylesheet" href="style.css">
                    <meta charset="UTF-8" name="description" content="Creations" name= "keywords"content="diy, handmade, crafts" name="vievport content" width= device-width , initial-scale = 1.0 >
                    <link rel="icon" type="image/x-icon" href="/public/favicon.png">

                </head>
                <body>
                    <script src="index.js"></script>
                
                <section id="header" class="sproductlogo">
                    <img src="UnionlogoThis.png"  alt="logo">
                    
                
                    <div id="navsingle">
                        <ul id="navbar">
                            
            <li><a href="test.html">Home</a></li>
            <li><a class="active" href="shop.html">Shop</a></li>
            <li><a href="about.html">About</a></li>
            <li><a href="contact.html">Contact</a></li>

            <li id="lg-bag"><a href="#" i class="fa-regular fa-user" class="user-pic" onclick="toggleMenu()"></i></a></li>
            <a href="#" id="close"><i class="far fa-times" ></i></a>
            <li id="lg-bag"><a href="myshop.html"><i class="fa-solid fa-shop"></i></a></li>
            <a href="#" id="close"><i class="far fa-times"></i></a>

            <li id="lg-bag"><a href="favourites.html"><i class="fa-solid fa-heart"></i></a></li>
            <a href="#" id="close"><i class="far fa-times"></i></a>

            <li id="lg-bag"><a href="cart.html"><i class="fa-solid fa-bag-shopping"></i></a></li>
            <a href="#" id="close"><i class="far fa-times"></i></a> </ul> </div>
     
<div>
                <script>
                    function addToCart(productId) {
                        const product = ${JSON.stringify(products2)}.find(p => p.id === productId);

                        if (product) {
                            var cart = JSON.parse(localStorage.getItem('cart')) || [];
                            cart.push(product);
                            localStorage.setItem('cart', JSON.stringify(cart));
                            alert(product.title + ' has been added to your cart!');
                        }
                    }
                </script>
   </div> 
             <section id="header">
                <div class='product-detail'>
                    <img src="${product.image}" alt="${product.title}">
                    <h2>${product.title}</h2>
                    <p>${product.description}</p>
                    <h3>$${product.price}</h3>
                    <button onclick='addToCart(${product.id})'>Add to cart</button>
              </section>  
            </body>
            </html>
        `;

        const newWindow = window.open("", "_blank");
        newWindow.document.write(productDetailHTML);
        newWindow.document.close();
    }
}













//newsletter

function isValidEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

function signupNewsletter() {
    const emailInput = document.getElementById('email');
    const messageDiv = document.getElementById('message');
    const email = emailInput.value;

    if (isValidEmail(email)) {
        messageDiv.textContent = 'Thank you for signing up for our newsletter!';
        messageDiv.style.color = 'green';
      
    } else {
        messageDiv.textContent = 'Please enter a valid email address.';
        messageDiv.style.color = 'red';
    }
}


// formularz kontaktowy

document.getElementById('contactForm').addEventListener('submit0', function(event) {
    event.preventDefault();

    const name = document.getElementById('name0').value;
    const email = document.getElementById('email0').value;
    const subject = document.getElementById('subject0').value;
    const message = document.getElementById('message0').value;
    const formMessage = document.getElementById('formMessage');

    if (name && email && subject && message) {
        formMessage.textContent = 'Thank you for your message!';
        formMessage.style.color = 'green';
        document.getElementById('contactForm').reset();
    } else {
        formMessage.textContent = 'Please fill out all fields.';
        formMessage.style.color = 'red';
    }
});



//cookies
const username= document.querySelector("#email");
const password= document.querySelector("#password");
const loginBtn= document.querySelector("#loginbtn");

submitBtn.addEventListener("click", () => {
    setCookie("email", username.value, 365);
    setCookie("password", password.value, 365);
});

cookiebtn.addEventListener("click", () =>{
    username.value = getCookie("email");
    password.value = getCookie("password");

});

function setCookie(email,value,daysToLive){
const date=new Date();
date.setTime(date.getTime()+ daysToLive * 24 * 60 * 60 *1000);
let expires= "expires" + date.toUTCString();

document.cookie=`{email=${value}; $expires}; path=/`
}



//podświtlanie się zielonego koloru i podreślenia strony
// na której jesteśmy
const bar=document.getElementById('bar');
const nav=document.getElementById('navbar');
const close=document.getElementById('close');

if (bar){
    bar.getEventListener('click', () => {
        navigator.classList.add('active');
    })
}

 if (close){
        close.getEventListener('click', () => {
            navigator.classList.remove('active');
        })
}



//zmiana hasła na widoczne i niewidoczne


   function show(){
    var password= document.getElementById("password");
    var icon= document.querySelector(".fas");

    if(password.type == "password"){
        password.type="text";
    }
    else{
        password.type = "password";
    }
};



window.onload = () => {
    if (!sessionStorage.name) {
        location.href = '/login';
    } else {
        location.href = '/index';
    }
}

const logOut= document.querySelector('.logout');

logOut.onclick= () => {
    sessionStorage.clear();
location.reload();
}


// zmiana hasła

document.addEventListener('DOMContentLoaded', () => {
    const accountSettingsForm = document.getElementById('account-settings-form');

    accountSettingsForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const username = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const currentPassword = document.getElementById('current-password').value;
        const newPassword = document.getElementById('new-password').value;


        if (currentPassword !== "userCurrentPassword") {
            alert("Current password is incorrect.");
            return;
        }

        localStorage.setItem('name', username);
        localStorage.setItem('email', email);
        localStorage.setItem('password', newPassword);

        alert('Password changed successfully!');
    });


    const savedUsername = localStorage.getItem('name');
    const savedEmail = localStorage.getItem('email');

    if (savedUsername) document.getElementById('name').value = savedUsername;
    if (savedEmail) document.getElementById('email').value = SavedEmail;

});






//edycja profilu sklepu


function applyChanges() {
    const textColor = document.getElementById('text-color-picker').value;
    const bgColor = document.getElementById('bg-color-picker').value;
    const shopNameHeading = document.getElementById('shop-name-heading');
    shopNameHeading.style.color = textColor;
    shopNameHeading.style.backgroundColor = bgColor;
}

function changeBackgroundPicture(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function(e) {
        document.getElementById('background-img').src = e.target.result;
    };
    reader.readAsDataURL(file);
}

function changeProfilePicture(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function(e) {
        document.getElementById('profile-img').src = e.target.result;
    };
    reader.readAsDataURL(file);
}

function applyChanges() {
    const shopName = document.getElementById('shop-name-input').value;
    const textColor = document.getElementById('text-color-picker').value;
    const bgColor = document.getElementById('bg-color-picker').value;
    const shopNameHeading = document.getElementById('shop-name-heading');

    if (shopName.trim()) {
        shopNameHeading.textContent = shopName;
    }
    shopNameHeading.style.color = textColor;
    shopNameHeading.style.backgroundColor = bgColor;
}





//dodawanie produktów 


document.addEventListener('DOMContentLoaded', () => {
    const root3 = document.getElementById('root3');

    
    const displayProducts = (products3) => {
        root3.innerHTML = products.map((item, index) => {
            return `
                <div class='box'>
                    <div class='img-box'>
                        <img class='images' src=${item.image} alt="${item.title}">
                    </div>
                    <div class='bottom'>
                        <p>${item.title}</p>
                        <h2>$ ${item.price}</h2>
                        <button id="editproduct">Edit</button>
                    </div>
                </div>
            `;
        }).join('');
    };

    displayProducts(products3); });






// zamówienia-pobieranie z localStorage i wyświetlanie

document.addEventListener('DOMContentLoaded', () => {
    displayOrders();
});

function displayOrders() {
    let orders = JSON.parse(localStorage.getItem('orders')) || [];
    const ordersContainer = document.getElementById('orders-container');

    if (orders.length === 0) {
        ordersContainer.innerHTML = "<p>You have no orders.</p>";
        return;
    }

    ordersContainer.innerHTML = orders.map(order => {
        return `
            <div class="order">
                <h2>Order #${order.id}</h2>
                <p>Date: ${order.date}</p>
                <table>
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Price</th>
                            <th>Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${order.products.map(product => `
                            <tr>
                                <td>${product.title}</td>
                                <td>$${product.price}</td>
                                <td>1</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;
    }).join('');
}



