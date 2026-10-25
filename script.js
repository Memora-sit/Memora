
/* ========================================
   MEMORA - SCRIPT PRINCIPAL
======================================== */

const CART_KEY = "memora_cart";
const DELIVERY_FEE = 7;

/* Couleurs disponibles par produit */
const productColors = {
    "poh1.jpg": ["Bleu", "Violet", "Rose", "Vert", "Blanc"],
    "poh2.jpg": ["Beige", "Blanc", "Marron"],
    "poh3.jpg": ["Blanc", "Rose"],
    "poh4.jpg": ["Blanc", "Rose", "Bleu", "Violet"],
    "poh5.jpg": ["Rouge", "Blanc", "Rose", "Violet"],
    "poh6.jpg": ["Blanc", "Rose", "Violet"],
    "poh7.jpg": ["Noir", "Blanc"],
    "poh8.jpg": ["Rose", "Blanc", "Violet", "Bleu"],
    "poh9.jpg": ["Noir", "Beige", "Marron", "Gris"],
    "poh11.jpg": ["Blanc", "Rose", "Noir"],
    "poh12.jpg": ["Bleu", "Rose", "Rouge"],
    "poh13.jpg": ["Rose", "Rouge"],
    "poh14.jpg": ["Vert", "Gris", "Marron", "Beige"],
    "poh15.jpg": ["Beige", "Marron"],
    "poh16.jpg": ["Beige", "Marron"],
    "poh17.jpg": ["Bleu", "Beige", "Blanc", "Rose"],
    "poh18.jpg": ["Rouge", "Rose"],
    "poh19.jpg": ["Bleu", "Rouge", "Rose"],
    "poh20.jpg": ["Blanc", "Rose", "Rouge", "Bleu"],
    "poh21.jpg": ["Bleu", "Rouge", "Blanc"]
};

const colorHex = {
    "Rose": "#e9a0b0",
    "Rouge": "#c62845",
    "Bleu": "#5b9bd5",
    "Violet": "#9565b7",
    "Vert": "#5d9b68",
    "Blanc": "#ffffff",
    "Noir": "#292929",
    "Beige": "#d9c3a0",
    "Marron": "#80543c",
    "Gris": "#999999"
};

function formatDT(value) {
    return Number(value).toLocaleString("fr-TN", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
    }) + " DT";
}

/* PANIER : lecture et sauvegarde */

function getCart() {
    try {
        const cart = JSON.parse(localStorage.getItem(CART_KEY));
        return Array.isArray(cart) ? cart : [];
    } catch {
        return [];
    }
}

function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    updateCartCount();
}

function updateCartCount() {
    const count = getCart().reduce(
        (total, item) => total + (Number(item.quantity) || 0),
        0
    );

    document.querySelectorAll(".cart-count").forEach(element => {
        element.textContent = count;
    });
}

/* MENU MOBILE */

const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".nav-links");

if (menuButton && navigation) {
    menuButton.addEventListener("click", () => {
        const isOpen = navigation.classList.toggle("open");
        menuButton.setAttribute("aria-expanded", String(isOpen));
    });
}

/* CHOIX DE COULEUR AVEC RONDS COLORÉS */

document.querySelectorAll(".product-card").forEach(card => {
    const image = card.querySelector("img");
    const select = card.querySelector(".color-select");

    if (!image || !select) return;

    const filename = image.getAttribute("src").split("/").pop();
    const colors = productColors[filename];

    if (!colors) return;

    // Ajouter les petits ronds de couleur
    const colorContainer = document.createElement("div");
    colorContainer.className = "color-swatches";

    const colorTitle = document.createElement("p");
    colorTitle.className = "swatch-title";
    colorTitle.textContent = "Choisissez votre couleur :";

    const swatches = document.createElement("div");
    swatches.className = "swatch-list";

    colors.forEach((color, index) => {
        const swatch = document.createElement("button");
        swatch.type = "button";
        swatch.className = "color-swatch";
        swatch.style.setProperty(
            "--swatch-color",
            colorHex[color] || "#cccccc"
        );
        swatch.setAttribute("aria-label", color);
        swatch.setAttribute("title", color);
        swatch.setAttribute("aria-pressed", String(index === 0));

        if (index === 0) swatch.classList.add("selected");

        swatch.addEventListener("click", () => {
            select.value = color;

            swatches.querySelectorAll(".color-swatch").forEach(button => {
                const selected = button === swatch;
                button.classList.toggle("selected", selected);
                button.setAttribute("aria-pressed", String(selected));
            });

            colorTitle.textContent = "Couleur choisie : " + color;
        });

        swatches.appendChild(swatch);
    });

    colorContainer.append(colorTitle, swatches);

    // Garder la liste accessible et fonctionnelle
    select.addEventListener("change", () => {
        swatches.querySelectorAll(".color-swatch").forEach(button => {
            const selected = button.getAttribute("aria-label") === select.value;
            button.classList.toggle("selected", selected);
            button.setAttribute("aria-pressed", String(selected));
        });

        colorTitle.textContent = "Couleur choisie : " + select.value;
    });

    select.insertAdjacentElement("afterend", colorContainer);
});


/* AJOUTER AU PANIER */

function addToCart(button) {
    const card = button.closest(".product-card");
    if (!card) return;

    const image = card.querySelector("img");
    const nameElement = card.querySelector(".product-name, h3");
    const priceElement = card.querySelector(".product-price");
    const select = card.querySelector(".color-select");

    if (!image || !nameElement || !priceElement) {
        alert("Impossible de lire les informations du produit.");
        return;
    }

    const productId = Number(card.dataset.productId);

    if (!Number.isSafeInteger(productId) || productId <= 0) {
        alert("Le produit n'est pas encore chargé. Actualisez la page et réessayez.");
        return;
    }

    const name = nameElement.textContent.trim();
    const price = Number(
        priceElement.textContent
            .replace(/\s/g, "")
            .replace(",", ".")
            .replace(/[^\d.]/g, "")
    );

    if (!Number.isFinite(price) || price <= 0) {
        alert("Le prix du produit est invalide.");
        return;
    }

    const color = select ? select.value : "";
    const imagePath = image.getAttribute("src");
    const id = productId + "|" + color;
    const cart = getCart();
    const existing = cart.find(item => item.id === id);

    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({
            id: id,
            product_id: productId,
            name: name,
            price: price,
            image: imagePath,
            color: color,
            quantity: 1
        });
    }

    saveCart(cart);

    const oldText = button.textContent;
    button.textContent = "Ajouté au panier ✓";
    button.classList.add("added");

    setTimeout(() => {
        button.textContent = oldText;
        button.classList.remove("added");
    }, 1400);
}

document.addEventListener("click", event => {
    const button = event.target.closest(".add-to-cart");
    if (!button) return;

    addToCart(button);
});



/* FILTRES DES CATÉGORIES */

const filterButtons = document.querySelectorAll(".filter-btn");
const productCards = document.querySelectorAll(".product-card");

filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        const category = button.dataset.filter || button.dataset.category;

        filterButtons.forEach(item => item.classList.remove("active"));
        button.classList.add("active");

        productCards.forEach(card => {
            const matches =
                category === "all" || card.dataset.category === category;

            card.hidden = !matches;
        });
    });
});

/* AGRANDIR LES PHOTOS */

const lightbox = document.querySelector(".lightbox");
const lightboxImage = lightbox?.querySelector("img");
const lightboxClose = document.querySelector(".lightbox-close");

function openLightbox(image) {
    if (!lightbox || !lightboxImage) return;

    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt;
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("lightbox-active");

    if (lightboxClose) lightboxClose.focus();
}

function closeLightbox() {
    if (!lightbox) return;

    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.classList.remove("lightbox-active");
}

document.querySelectorAll(".product-image-button").forEach(button => {
    button.addEventListener("click", () => {
        const image = button.querySelector("img");
        if (image) openLightbox(image);
    });
});

if (lightboxClose) {
    lightboxClose.addEventListener("click", closeLightbox);
}

if (lightbox) {
    lightbox.addEventListener("click", event => {
        if (event.target === lightbox) closeLightbox();
    });
}

document.addEventListener("keydown", event => {
    if (event.key === "Escape") closeLightbox();
});

/* AFFICHER LE PANIER */

const cartItemsBox = document.getElementById("cart-items");

function renderCart() {
    if (!cartItemsBox) return;

    const cart = getCart();

    if (cart.length === 0) {
        cartItemsBox.innerHTML = `
            <div class="empty-message">
                <h3>Votre panier est vide ♡</h3>
                <p>Découvrez nos produits et composez votre sélection.</p>
                <a href="prouduits.html" class="btn">Découvrir les produits</a>
            </div>
        `;
    } else {
        cartItemsBox.innerHTML = cart.map((item, index) => `
            <article class="cart-item">
                <img src="${escapeHTML(item.image)}"
                     alt="${escapeHTML(item.name)}">

                <div class="cart-item-info">
                    <h3>${escapeHTML(item.name)}</h3>
                    <p>Couleur : ${escapeHTML(item.color || "Non précisée")}</p>
                    <p>${formatDT(item.price)}</p>

                    <div class="quantity-controls">
                        <button type="button" class="quantity-btn"
                                data-act="minus" data-i="${index}"
                                aria-label="Diminuer la quantité">−</button>

                        <span>${Number(item.quantity) || 1}</span>

                        <button type="button" class="quantity-btn"
                                data-act="plus" data-i="${index}"
                                aria-label="Augmenter la quantité">+</button>

                        <button type="button" class="remove-item"
                                data-act="remove" data-i="${index}">
                            Supprimer
                        </button>
                    </div>
                </div>

                <strong class="cart-item-price">
                    ${formatDT(item.price * item.quantity)}
                </strong>
            </article>
        `).join("");
    }

    const subtotal = cart.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    const delivery = cart.length ? DELIVERY_FEE : 0;

    const subtotalElement = document.getElementById("cart-subtotal");
    const deliveryElement = document.getElementById("cart-delivery");
    const totalElement = document.getElementById("cart-total");

    if (subtotalElement) subtotalElement.textContent = formatDT(subtotal);
    if (deliveryElement) {
        deliveryElement.textContent = delivery ? formatDT(delivery) : "—";
    }
    if (totalElement) {
        totalElement.textContent = formatDT(subtotal + delivery);
    }

    const checkoutButton = document.getElementById("checkout-button");
    if (checkoutButton) checkoutButton.disabled = cart.length === 0;
}

function escapeHTML(value) {
    return String(value ?? "").replace(/[&<>"']/g, character => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[character]);
}

if (cartItemsBox) {
    cartItemsBox.addEventListener("click", event => {
        const button = event.target.closest("button[data-act]");
        if (!button) return;

        const cart = getCart();
        const index = Number(button.dataset.i);

        if (!Number.isInteger(index) || !cart[index]) return;

        if (button.dataset.act === "plus") {
            cart[index].quantity += 1;
        } else if (button.dataset.act === "minus") {
            cart[index].quantity -= 1;
        } else if (button.dataset.act === "remove") {
            cart.splice(index, 1);
        }

        if (cart[index] && cart[index].quantity <= 0) {
            cart.splice(index, 1);
        }

        saveCart(cart);
        renderCart();
    });
}

/* VIDER LE PANIER */

const clearButton = document.getElementById("clear-cart");

if (clearButton) {
    clearButton.addEventListener("click", () => {
        if (!getCart().length) return;

        if (confirm("Voulez-vous vraiment vider votre panier ?")) {
            saveCart([]);
            renderCart();
        }
    });
}


/* FORMULAIRE DE LIVRAISON */

const deliveryForm = document.getElementById("delivery-order-form");

if (deliveryForm) {
    deliveryForm.addEventListener("submit", async event => {
        event.preventDefault();

        const message = document.getElementById("order-message");
        const checkoutButton = document.getElementById("checkout-button");
        const cart = getCart();

        if (message) {
            message.textContent = "";
            message.classList.remove("show");
        }

        if (!cart.length) {
            if (message) {
                message.textContent = "Votre panier est vide. Ajoutez d'abord un produit ♡";
                message.classList.add("show");
            }
            return;
        }

        if (!deliveryForm.reportValidity()) return;

        const items = cart.map(item => ({
            product_id: Number(item.product_id),
            quantity: Number(item.quantity)
        }));

        if (items.some(item =>
            !Number.isSafeInteger(item.product_id) ||
            item.product_id <= 0 ||
            !Number.isSafeInteger(item.quantity) ||
            item.quantity <= 0
        )) {
            if (message) {
                message.textContent =
                    "Un produit est invalide. Retirez-le du panier et ajoutez-le à nouveau.";
                message.classList.add("show");
            }
            return;
        }

        const payload = {
            customer_name: document.getElementById("customer-name").value.trim(),
            customer_email: document.getElementById("customer-email").value.trim(),
            customer_phone: document.getElementById("customer-phone").value.trim(),
            customer_city: document.getElementById("customer-city").value.trim(),
            customer_address: document.getElementById("customer-address").value.trim(),
            customer_note: document.getElementById("customer-note").value.trim(),
            items
        };

        if (checkoutButton) {
            checkoutButton.disabled = true;
            checkoutButton.textContent = "Envoi en cours...";
        }

        try {
            const response = await fetch(
                `${SUPABASE_URL}/functions/v1/memora-order`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "apikey": SUPABASE_PUBLISHABLE_KEY,
                        "Authorization": `Bearer ${SUPABASE_PUBLISHABLE_KEY}`
                    },
                    body: JSON.stringify(payload)
                }
            );

            const result = await response.json();

            if (!response.ok || !result.success) {
                throw new Error(
                    result.error || "Impossible d'enregistrer la commande."
                );
            }

            const totalCommande =
    document.getElementById("cart-total")?.textContent || "";

saveCart([]);
renderCart();
deliveryForm.reset();

if (message) {
    message.textContent =
        `Commande confirmée ♡ Numéro de commande : ${result.order_id}. Total avec livraison : ${totalCommande}`;
    message.classList.add("show");
}

            if (message) {
                message.textContent =
                    `Commande confirmée ♡ Numéro de commande : ${result.order_id}. Total avec livraison : ${document.getElementById("cart-total")?.textContent || ""}`;
                message.classList.add("show");
            }
        } catch (error) {
            console.error("Erreur commande :", error);

            if (message) {
                message.textContent =
                    error.message || "Erreur lors de l'envoi. Réessayez.";
                message.classList.add("show");
            }
        } finally {
            if (checkoutButton) {
                checkoutButton.disabled = getCart().length === 0;
                checkoutButton.textContent = "Confirmer ma demande ♡";
            }
        }
    });
}

/* INITIALISATION */

updateCartCount();
renderCart();
console.log("Memora script chargé !");
console.log(typeof addToCart);