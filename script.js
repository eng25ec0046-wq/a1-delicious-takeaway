let cart = [];


// ==========================================
// WHATSAPP NUMBER
// ==========================================

const whatsappNumber = "918884537786";


// ==========================================
// ADD ITEM TO CART
// ==========================================

function addToCart(item, price) {

    let existingItem = cart.find(function(product) {

        return product.name === item;

    });


    if (existingItem) {

        existingItem.quantity++;

    }

    else {

        cart.push({

            name: item,

            price: price,

            quantity: 1

        });

    }


    updateCart();

}



// ==========================================
// INCREASE QUANTITY
// ==========================================

function increaseQuantity(index) {

    cart[index].quantity++;

    updateCart();

}



// ==========================================
// DECREASE QUANTITY
// ==========================================

function decreaseQuantity(index) {

    cart[index].quantity--;


    if (cart[index].quantity <= 0) {

        cart.splice(index, 1);

    }


    updateCart();

}



// ==========================================
// UPDATE CART
// ==========================================

function updateCart() {

    let cartItems =
        document.getElementById("cart-items");


    let cartTotal =
        document.getElementById("cart-total");


    cartItems.innerHTML = "";


    let total = 0;


    if (cart.length === 0) {

        cartItems.innerHTML =
            "<p>Your cart is empty.</p>";

        cartTotal.innerText =
            "Total: ₹0";

        return;

    }


    cart.forEach(function(item, index) {


        let itemTotal =
            item.price * item.quantity;


        total =
            total + itemTotal;


        let itemElement =
            document.createElement("div");


        itemElement.className =
            "cart-item";


        itemElement.innerHTML = `

            <span class="cart-item-name">

                ${item.name}

            </span>


            <div class="quantity-controls">

                <button
                    onclick="decreaseQuantity(${index})">

                    −

                </button>


                <span class="quantity">

                    ${item.quantity}

                </span>


                <button
                    onclick="increaseQuantity(${index})">

                    +

                </button>

            </div>


            <span class="item-price">

                ₹${itemTotal}

            </span>

        `;


        cartItems.appendChild(itemElement);

    });


    cartTotal.innerText =
        "Total: ₹" + total;

}



// ==========================================
// PLACE ORDER
// ==========================================

document
    .getElementById("order-form")
    .addEventListener("submit", function(event) {


        event.preventDefault();


        // ==========================================
        // CHECK CART
        // ==========================================

        if (cart.length === 0) {

            alert(
                "Please add at least one item to your cart."
            );

            return;

        }



        // ==========================================
        // GET CUSTOMER DETAILS
        // ==========================================

        let name =
            document.getElementById(
                "customer-name"
            ).value;


        let phone =
            document.getElementById(
                "customer-phone"
            ).value;


        let address =
            document.getElementById(
                "customer-address"
            ).value;


        let orderType =
            document.querySelector(
                'input[name="order-type"]:checked'
            ).value;



        // ==========================================
        // CALCULATE TOTAL
        // ==========================================

        let total = 0;


        cart.forEach(function(item) {

            total =
                total +
                (item.price * item.quantity);

        });



        // ==========================================
        // WEBSITE ORDER SUMMARY
        // ==========================================

        let summary =
            document.getElementById(
                "order-summary"
            );


        summary.innerHTML = `

            <h3>
                Customer Details
            </h3>


            <p>

                <strong>Name:</strong>
                ${name}

            </p>


            <p>

                <strong>Phone:</strong>
                ${phone}

            </p>


            <p>

                <strong>Address:</strong>
                ${address}

            </p>


            <p>

                <strong>Order Type:</strong>
                ${orderType}

            </p>


            <h3>
                Order Details
            </h3>

        `;



        // ==========================================
        // ADD ITEMS TO SUMMARY
        // ==========================================

        cart.forEach(function(item) {


            let itemTotal =
                item.price * item.quantity;


            summary.innerHTML += `

                <div class="summary-item">

                    <span>

                        ${item.name}
                        × ${item.quantity}

                    </span>


                    <span>

                        ₹${itemTotal}

                    </span>

                </div>

            `;

        });



        // ==========================================
        // ADD TOTAL
        // ==========================================

        summary.innerHTML += `

            <div class="summary-total">

                Total: ₹${total}

            </div>


            <p>

                🎉 Thank you for ordering
                from A1 Delicious Takeaway!

            </p>

        `;



        // ==========================================
        // CREATE WHATSAPP MESSAGE
        // ==========================================

        let whatsappMessage = "";


        whatsappMessage +=
            "🍗 A1 Delicious Takeaway - New Order\n\n";


        whatsappMessage +=
            "👤 Customer Details\n";


        whatsappMessage +=
            "Name: " + name + "\n";


        whatsappMessage +=
            "Phone: " + phone + "\n";


        whatsappMessage +=
            "Order Type: " + orderType + "\n";


        whatsappMessage +=
            "Address: " + address + "\n\n";


        whatsappMessage +=
            "🛒 Order Details\n";


        cart.forEach(function(item) {


            let itemTotal =
                item.price * item.quantity;


            whatsappMessage +=

                item.name +
                " × " +
                item.quantity +
                " = ₹" +
                itemTotal +
                "\n";

        });


        whatsappMessage += "\n";


        whatsappMessage +=
            "💰 Total: ₹" + total;


        whatsappMessage += "\n\n";


        whatsappMessage +=
            "Thank you!";



        // ==========================================
        // CREATE WHATSAPP URL
        // ==========================================

        let encodedMessage =
            encodeURIComponent(
                whatsappMessage
            );


        let whatsappURL =
            "https://wa.me/" +
            whatsappNumber +
            "?text=" +
            encodedMessage;



        // ==========================================
        // SET WHATSAPP BUTTON
        // ==========================================

        let whatsappButton =
            document.getElementById(
                "whatsapp-order-button"
            );


        whatsappButton.href =
            whatsappURL;


        whatsappButton.style.display =
            "inline-block";



        // ==========================================
        // SHOW CONFIRMATION
        // ==========================================

        document.getElementById(
            "confirmation"
        ).style.display =
            "block";



        // ==========================================
        // SCROLL TO CONFIRMATION
        // ==========================================

        document.getElementById(
            "confirmation"
        ).scrollIntoView({

            behavior: "smooth"

        });



        // ==========================================
        // CLEAR CART
        // ==========================================

        cart = [];


        updateCart();



        // ==========================================
        // CLEAR FORM
        // ==========================================

        document.getElementById(
            "order-form"
        ).reset();

    });