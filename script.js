/* ==============================
   MEMORA — STYLE COMPLET
   ============================== */

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

html {
    scroll-behavior: smooth;
}

body {
    font-family: Arial, Helvetica, sans-serif;
    background-color: #fffaf8;
    color: #49363b;
    line-height: 1.6;
}

img {
    max-width: 100%;
    display: block;
}

a {
    color: inherit;
    text-decoration: none;
}

button,
input,
textarea,
select {
    font: inherit;
}

button {
    cursor: pointer;
}

/* HEADER */

header,
.site-header {
    background-color: #ffffff;
    padding: 18px 6%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    box-shadow: 0 2px 12px #00000008;
}

.logo,
.logo a {
    color: #c44569;
    font-size: 27px;
    font-weight: bold;
}

.nav-links {
    display: flex;
    align-items: center;
    gap: 28px;
}

.nav-links a {
    font-size: 15px;
    transition: color 0.2s;
}

.nav-links a:hover {
    color: #c44569;
}

.menu-toggle {
    display: none;
    border: none;
    background: none;
    color: #c44569;
    font-size: 27px;
}

/* TITRES */

h1,
h2,
h3 {
    line-height: 1.3;
}

h1 {
    font-size: clamp(30px, 5vw, 48px);
    color: #783f50;
}

h2 {
    font-size: clamp(25px, 3vw, 34px);
    color: #783f50;
    text-align: center;
    margin-bottom: 25px;
}

h3 {
    font-size: 21px;
    color: #783f50;
}

p {
    margin-bottom: 14px;
}

/* BOUTONS */

.btn,
button[type="submit"] {
    display: inline-block;
    background-color: #c44569;
    color: white;
    padding: 12px 23px;
    border: none;
    border-radius: 25px;
    transition: 0.2s;
}

.btn:hover,
button[type="submit"]:hover {
    background-color: #a83355;
    transform: translateY(-2px);
}

/* ACCUEIL */

.hero {
    min-height: 430px;
    padding: 75px 8%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    background: linear-gradient(135deg, #fce9ed, #fff7f2);
}

.hero h1 {
    max-width: 700px;
    margin-bottom: 18px;
}

.hero p {
    max-width: 600px;
    font-size: 17px;
}

.hero .btn {
    margin-top: 12px;
}

section {
    padding: 60px 7%;
}

.section-description {
    max-width: 700px;
    margin: 0 auto 30px;
    text-align: center;
}

/* CARTES ET COFFRETS */

.products,
.product-grid,
.box-grid,
.coffrets-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 25px;
    align-items: stretch;
}

.product-card,
.box-card,
.coffret-card {
    background: #ffffff;
    border: 1px solid #f2dfe3;
    border-radius: 15px;
    overflow: hidden;
    box-shadow: 0 5px 18px #6633440d;
    transition: transform 0.2s, box-shadow 0.2s;
}

.product-card:hover,
.box-card:hover,
.coffret-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 22px #66334418;
}

/* PHOTOS — PLUS GRANDES */

.product-card img,
.box-card img,
.coffret-card img,
.product-image,
.box-image {
    width: 100%;
    height: 280px;
    object-fit: cover;
    object-position: center;
    display: block;
}

.product-card-content,
.box-card-content,
.coffret-card-content,
.product-info {
    padding: 18px;
}

.product-card h3,
.box-card h3,
.coffret-card h3 {
    margin-bottom: 8px;
}

.price {
    color: #c44569;
    font-weight: bold;
    font-size: 20px;
    margin-top: 10px;
}

/* IMAGES DANS LES AUTRES SECTIONS */

.about-image,
.contact-image {
    width: 100%;
    max-width: 550px;
    height: 350px;
    object-fit: cover;
    border-radius: 15px;
}

/* FORMULAIRES */

form {
    width: 100%;
    max-width: 650px;
    margin: 25px auto;
    padding: 28px;
    background: white;
    border: 1px solid #f2dfe3;
    border-radius: 15px;
    box-shadow: 0 5px 20px #6633440d;
}

form label {
    display: block;
    margin: 12px 0 6px;
    font-weight: bold;
}

form input,
form textarea,
form select {
    display: block;
    width: 100%;
    padding: 12px;
    border: 1px solid #e4cbd2;
    border-radius: 8px;
    background-color: #fffdfd;
    color: #49363b;
    outline: none;
}

form input:focus,
form textarea:focus,
form select:focus {
    border-color: #c44569;
}

form textarea {
    min-height: 120px;
    resize: vertical;
}

form button[type="submit"] {
    margin-top: 18px;
}

#form-message {
    display: none;
    margin-top: 18px;
    color: #c44569;
    font-weight: bold;
}

/* À PROPOS */

.about-content {
    max-width: 900px;
    margin: 0 auto;
    text-align: center;
}

/* FOOTER */

footer {
    background-color: #783f50;
    color: white;
    text-align: center;
    padding: 25px 6%;
    margin-top: 35px;
}

footer p {
    margin: 5px 0;
}

/* TABLETTES */

@media (max-width: 900px) {
    .products,
    .product-grid,
    .box-grid,
    .coffrets-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 18px;
    }

    .product-card img,
    .box-card img,
    .coffret-card img,
    .product-image,
    .box-image {
        height: 250px;
    }

    header,
    .site-header {
        padding: 16px 4%;
    }

    .nav-links {
        gap: 16px;
    }
}

/* TÉLÉPHONES */

@media (max-width: 600px) {
    header,
    .site-header {
        position: relative;
        flex-wrap: wrap;
    }

    .menu-toggle {
        display: block;
    }

    .nav-links {
        display: none;
        flex-direction: column;
        align-items: flex-start;
        gap: 15px;
        width: 100%;
        padding: 15px 0;
    }

    .nav-links.open {
        display: flex;
    }

    .hero {
        min-height: 350px;
        padding: 50px 6%;
    }

    section {
        padding: 40px 5%;
    }

    .products,
    .product-grid,
    .box-grid,
    .coffrets-grid {
        grid-template-columns: 1fr;
    }

    .product-card img,
    .box-card img,
    .coffret-card img,
    .product-image,
    .box-image {
        height: 300px;
    }

    form {
        padding: 20px;
    }

    h2 {
        margin-bottom: 20px;
    }
}
