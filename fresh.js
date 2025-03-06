// 1. search icon click to visible he search box

let searchform = document.querySelector('.search-form');
const searchbtn = document.querySelector('#search-btn');

searchbtn.addEventListener('click', () => {
    searchform.classList.toggle('active');

    shoppingcart.classList.remove('active');
    loginform.classList.remove('active');
    navbar.classList.remove('active')
})

// 2. shopping cart click to visible the cartname

let shoppingcart = document.querySelector('.shopping-cart');
const cartbtn = document.querySelector('#cart-btn');

cartbtn.addEventListener('click', () => {
    shoppingcart.classList.toggle('active');

    searchform.classList.remove('active');
    loginform.classList.remove('active');
    navbar.classList.remove('active')
})

// 3. login user button click to visible the mail,password details

let loginform = document.querySelector('.login-form');
const loginbtn = document.querySelector('#login-btn');

loginbtn.addEventListener('click', () => {
    loginform.classList.toggle('active');

    searchform.classList.remove('active');
    shoppingcart.classList.remove('active');
    navbar.classList.remove('active')
})

// 4. menu-toggle button click to visible the navbar list
let navbar = document.querySelector('.navbar')
let menubtn = document.querySelector('#menu-btn')

menubtn.addEventListener('click', () => {
    navbar.classList.toggle('active')

    searchform.classList.remove('active');
    shoppingcart.classList.remove('active');
    loginform.classList.remove('active');
})

// 5.window scroll

window.onscroll = () => {
    // searchform.classList.remove('active');
    // shoppingcart.classList.remove('active');
    loginform.classList.remove('active');
    navbar.classList.remove('active')
}

// clickable for home area clicking time hide purpose
let clickable = document.getElementById('home');

clickable.addEventListener('click', function () {

    shoppingcart.classList.remove('active');
    searchform.classList.remove('active');
    loginform.classList.remove('active');
    navbar.classList.remove('active');
})

// clickable for products area clicking time hide purpose
let clickable_products = document.getElementById('products');

clickable_products.addEventListener('click', function () {
    searchform.classList.remove('active');
})



// 1.starts from here-cart button click time item removing functions

document.addEventListener('DOMContentLoaded', loadfood);

function loadfood() {
    loadcontent();
}

//2. remove food items from cart
function loadcontent() {
    // itemlist = [];

    let btnremove = document.querySelectorAll('.cartRemove');
    // console.log(btnremove);
    btnremove.forEach((btn) => {
        btn.addEventListener('click', removeitem);
    });

    //3. product item change event (<0)
    let qtyElement = document.querySelectorAll('#cart-qty');
    qtyElement.forEach((input) => {
        input.addEventListener('change', changeqty);
    });

    //9. product cart- addtocart-btn click time cartbox simultaniously add

    let addtocartbtn = document.querySelectorAll('#addtocart-btn');
    addtocartbtn.forEach((btn) => {
        btn.addEventListener('click', addcart)

        // console.log(addtocartbtn)
    });

    // 15.1-pricelist function calling
    updatetotal()
}


// 4. trash button click time get a confirmation popup (Remove item)
function removeitem() {
    // console.log('click')

    // 14. filter & var declaration & loadcontent
    if (confirm('are you sure to Remove this item?')) {
        let title = this.parentElement.querySelector('.content h3').innerText;
        // console.log(title)
        itemlist = itemlist.filter(el => el.title != title);
        this.parentElement.remove();
        // loadcontent();
        updateCart();
        updatetotal();
    }
};

// 5. change quantity in cart itemlist
function changeqty() {
    if (isNaN(this.value) || this.value < 1) {
        this.value = 1;
    }
    // console.log('change')
    loadcontent();
    updatetotal();
};

//11. array created (11+12+13+14)

let itemlist = [];

// 10. Add cart- prodcut cart added-
function addcart() {
    let food = this.parentElement;
    // console.log(food);

    let title = food.querySelector('.food-title').innerText;
    let price = food.querySelector('.price').innerText;
    let imgsrc = food.querySelector('.food-img').src;
    // console.log(title, price, imgsrc);

    //13. check product already exist in cart.

    if (itemlist.some(el => el.title == title)) {
        alert("product already added in cart");
        return;
    }

    //12.check with the template literals

    let newProduct = { title, price, imgsrc }
    itemlist.push(newProduct);


    //14. data transfer process function

    let newproductelement = createcartproduct(title, price, imgsrc);
    let element = document.createElement('div');
    element.innerHTML = newproductelement;

    document.querySelector(".cart-content").append(element);
    loadcontent();
    updatetotal()
}

function createcartproduct(title, price, imgsrc) {
    return `<div class="box">
        <i class="fas fa-trash cartRemove"></i>
        <img src="${imgsrc}" alt="">
        <div class="content">
            <h3>${title}</h3>
            <span class="price">${price}</span>
            <span class="cartQty">Qty <input class="cart-qty" type="number" value="1" min="1"
                style="text-align: center; width: 35px;"></span>
        </div>
    </div>`;
}

// Update total in cart for qty incre,decre, changes updated in total prices:

function updatetotal() {
    const cartitems = document.querySelectorAll('.cart-content .box'); // Corrected selector
    const totalvalue = document.querySelector('.total-title');

    let total = 0;

    cartitems.forEach(product => {
        let priceelement = product.querySelector('.price');
        let qtyelement = product.querySelector('.cart-qty');

        let price = parseFloat(priceelement.textContent.replace("Rs.", "").trim());
        let qty = parseInt(qtyelement.value);

        total += (price * qty);
    });

    totalvalue.textContent = 'Total Rs: ' + total.toFixed(2);
}


// last- local storage description
function updateCart() {
    let cartContent = document.querySelector(".cart-content");
    let cartItems = [];

    document.querySelectorAll('.cart-content .box').forEach(product => {
        let title = product.querySelector('.content h3').innerText;
        let price = product.querySelector('.price').innerText;
        let imgsrc = product.querySelector('img').src;
        let qty = product.querySelector('.cart-qty').value;

        cartItems.push({ title, price, imgsrc, qty });
    });

    // Save the updated cart data to localStorage
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

// Load cart from localStorage
function loadCartFromStorage() {
    let storedCart = JSON.parse(localStorage.getItem('cartItems'));
    if (storedCart) {
        itemlist = storedCart;
        itemlist.forEach(item => {
            let newproductelement = createcartproduct(item.title, item.price, item.imgsrc);
            let element = document.createElement('div');
            element.innerHTML = newproductelement;

            document.querySelector(".cart-content").append(element);
        });
    }
}

// Call loadCartFromStorage on page load
loadCartFromStorage();

document.addEventListener('change', function (event) {
    if (event.target.classList.contains('cart-qty')) {
        updatetotal();
        updateCart();
    }
});
// updatetotal for cart qty changes

// document.addEventListener('change', function (event) {
//     if (event.target.classList.contains('cart-qty')) {
//         updatetotal();
//     }
// });



// searchbox for prodcuts filtering

function search() {
    let input = document.getElementById('search-box').value.toLowerCase();
    let products = document.querySelectorAll('.swiper-slide');

    products.forEach(product => {
        let title = product.querySelector('.food-title').innerText.toLowerCase();
        console.log('Checking:', title);

        if (title.includes(input)) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
}



// Alert subscribe- button

function onsubmitform(){
    let email = document.getElementById('emails').value;

    if(email==""){
        alert('Please enter your mail')
        return;
    }
    else{
        alert(`Subscribe successfully with ${email}`)
    }
}

// alert login page button

function loginsubmit(event) {
    event.preventDefault();

    let loginmail = document.getElementById('login-email').value.trim();
    let loginpassword = document.getElementById('login-password').value.trim();
    let errorMessage = document.getElementById("error-message");

    errorMessage.textContent = ""; // Clear previous error messages

    if (loginmail === "") {
        errorMessage.textContent = "Please enter your email.";
        return;
    } else if (!/\S+@\S+\.\S+/.test(loginmail)) { // Simple email format check
        errorMessage.textContent = "Please enter a valid email.";
        return;
    } else if (loginpassword === "") {
        errorMessage.textContent = "Please enter your password.";
        return;
    } else {
        alert("Form has been submitted successfully!");
    }
    console.log(errorMessage);
}


// alert-cart is empty

document.addEventListener("DOMContentLoaded", function () {
    let totalAmountElement = document.getElementById("total-amount");
    let checkoutButton = document.getElementById("cart-amt");

    if (!totalAmountElement || !checkoutButton) return;

    function updateCheckoutButton() {
        let totalAmount = parseFloat(totalAmountElement.innerText.replace("Rs.", "").trim()) || 0;
        
        if (totalAmount === 0) {
            checkoutButton.classList.add("disabled");
            checkoutButton.removeAttribute("href");
        } else {
            checkoutButton.classList.remove("disabled");
            checkoutButton.setAttribute("href", "checkout.html");
        }
    }

    updateCheckoutButton(); // Call on page load

    // Optionally: Watch for changes in the total amount
    let observer = new MutationObserver(updateCheckoutButton);
    observer.observe(totalAmountElement, { childList: true, subtree: true });
});


// execute-review section -animation

var swiper = new Swiper(".product-slider", {
    loop: true,
    spaceBetween: 20,
    autoplay: {
        delay: 15000,
        disableOnInteraction: false,
    },
    centeredSlides: true,
    breakpoints: {
        0: {
            slidesPerView: 1,
        },
        768: {
            slidesPerView: 2,
        },
        1020: {
            slidesPerView: 3,
        },
    },
});


// sccroll button functionality

// Scroll-up button functionality
const scrollUpBtn = document.querySelector('.scroll-up-btn');

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    scrollUpBtn.classList.add('show');
  } else {
    scrollUpBtn.classList.remove('show');
  }
});

scrollUpBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});
