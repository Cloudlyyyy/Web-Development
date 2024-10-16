(function() {
    "use strict";

    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    let fullDiv = qs('#full');
    let emptyDiv = qs('#empty');

    function addToCart(item) {
        if (cart.some(cartItem => cartItem.name === item.name)) {
            alert(`${item.name} is already in your cart.`);
        } else {
            cart.push(item);
            localStorage.setItem('cart', JSON.stringify(cart));
            alert(`${item.name} has been added to your cart!`);
        }
        renderCartItems(); 
    }

    function renderCartItems() {
        const section = fullDiv.querySelector('section');
        section.innerHTML = ''; 

        if (cart.length === 0) {
            fullDiv.classList.add('hidden');
            emptyDiv.classList.remove('hidden');
        } else {
            fullDiv.classList.remove('hidden');
            emptyDiv.classList.add('hidden');
        }

        cart.forEach((item, index) => {
            const article = gen('article');
            //article.id = `cart-item`;
            article.innerHTML = 
                `<figure>
                    <img src="${item.image}" alt="${item.name}">
                    <figcaption>${item.name}</figcaption>
                </figure>
                Price: $${item.price}
                <button class="remove-btn" data-index="${index}">Remove Item</button>`;
            section.appendChild(article);
        });
    }

    function setupItemClickListeners() {
        const items = qsa('.item');

        items.forEach(item => {
            item.addEventListener('click', () => {
                const itemObj = {
                    name: item.querySelector('h3').innerText,
                    price: parseFloat(item.querySelector('p').innerText.replace('$', '')),
                    image: item.querySelector('img').src,
                    quantity: 1
                };
                addToCart(itemObj);
            });
        });
    }

    function removeFromCart(index) {
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCartItems(); 
    }

    document.addEventListener('click', (event) => {
        if (event.target.classList.contains('remove-btn')) {
            const idx = event.target.getAttribute('data-index');
            removeFromCart(idx);
        }
    });

    document.addEventListener('DOMContentLoaded', setupItemClickListeners);
    document.addEventListener('DOMContentLoaded', renderCartItems);

})();