// 20 Image Data
const images = [
    { src: "images/n1.avif", title: "Beautiful Forest", category: "nature" },
    { src: "images/n2.avif", title: "Sunset Lake", category: "nature" },
    { src: "images/n3.avif", title: "Mountain View", category: "nature" },
    { src: "images/n4.avif", title: "Waterfall", category: "nature" },

    { src: "images/c1.avif", title: "Red Supercar", category: "cars" },
    { src: "images/c2.avif", title: "Vintage Car", category: "cars" },
    { src: "images/c3.avif", title: "Luxury Blue Car", category: "cars" },
    { src: "images/c4.avif", title: "Sports Car", category: "cars" },

    { src: "images/a1.avif", title: "Cute Dog", category: "animals" },
    { src: "images/a2.avif", title: "Lion King", category: "animals" },
    { src: "images/a3.avif", title: "Elephant Family", category: "animals" },
    { src: "images/a4.avif", title: "Colorful Bird", category: "animals" },

    { src: "images/t1.avif", title: "Laptop Setup", category: "tech" },
    { src: "images/t2.avif", title: "Gaming PC", category: "tech" },
    { src: "images/t3.avif", title: "Headphones", category: "tech" },
    { src: "images/t4.avif", title: "Futuristic Tech", category: "tech" },

    { src: "images/f1.avif", title: "Pasta Plate", category: "food" },
    { src: "images/f2.avif", title: "Burger Meal", category: "food" },
    { src: "images/f3.avif", title: "Fruit Bowl", category: "food" },
    { src: "images/f4.avif", title: "Chocolate Cake", category: "food" },
];

let currentCategory = "all";
let currentPage = 1;
const imagesPerPage = 8;

function displayImages() {
    let gallery = document.getElementById("gallery");
    gallery.innerHTML = "";

    let filtered = images.filter(img =>
        currentCategory === "all" || img.category === currentCategory
    );

    let start = (currentPage - 1) * imagesPerPage;
    let end = start + imagesPerPage;

    let pageImages = filtered.slice(start, end);

    pageImages.forEach((img, i) => {
        gallery.innerHTML += `
      <div class="card" data-aos="zoom-in">
        <img src="${img.src}" onclick="openLightbox('${img.src}', '${img.title}')">
        <p class="card-title">${img.title}</p>
      </div>`;
    });

    buildPagination(filtered.length);
}

function buildPagination(total) {
    let pages = Math.ceil(total / imagesPerPage);
    let pagination = document.getElementById("pagination");

    pagination.innerHTML = "";

    for (let i = 1; i <= pages; i++) {
        pagination.innerHTML += `
      <button class="${i === currentPage ? 'active' : ''}" 
        onclick="goToPage(${i})">${i}</button>`;
    }
}

function goToPage(page) {
    currentPage = page;
    displayImages();
}

function filterImages(cat) {
    currentCategory = cat;
    currentPage = 1;
    displayImages();
}

function searchImages() {
    let text = document.getElementById("searchBox").value.toLowerCase();
    currentCategory = "all";

    let gallery = document.getElementById("gallery");
    gallery.innerHTML = "";

    images
        .filter(img => img.title.toLowerCase().includes(text))
        .forEach(img => {
            gallery.innerHTML += `
      <div class="card" data-aos="zoom-in">
        <img src="${img.src}" onclick="openLightbox('${img.src}', '${img.title}')">
        <p class="card-title">${img.title}</p>
      </div>`;
        });
}

function openLightbox(src, title) {
    document.getElementById("lightbox-img").src = src;
    document.getElementById("lightbox-title").innerText = title;
    document.getElementById("lightbox").style.display = "flex";
}

function closeLightbox() {
    document.getElementById("lightbox").style.display = "none";
}

displayImages();
