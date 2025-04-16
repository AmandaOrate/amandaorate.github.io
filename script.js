fetch('header.html')
  .then(res => res.text())
  .then(data => {
    document.getElementById('header-placeholder').innerHTML = data;
  })
  .catch(err => console.error('Error loading header:', err));

fetch('footer.html')
  .then(res => res.text())
  .then(data => {
    document.getElementById('footer-placeholder').innerHTML = data;
  })
  .catch(err => console.error('Error loading footer:', err));

// Active tab


// React.Fragment tags removed
document.querySelectorAll('.image-input').forEach(input => {
    input.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = function (event) {
         input.parentElement.style.backgroundImage = `url('${event.target.result}')`;
      };
      reader.readAsDataURL(file);
    });
 });

const modal = document.getElementById('imagePopup');
const popupImage = document.getElementById('popupImage');
const closeBtn = document.querySelector('.close-button');

// Loop through every gallery item
document.querySelectorAll('.gallery-image').forEach(gallery => {
 const fileInput = gallery.querySelector('.image-input');
 const hoverTitle = gallery.querySelector('.hover-photogtitle');
 let imageUrl = 'placeholder.jpg'; // Default fallback image

 // If user uploads an image, update the preview
 fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function (event) {
      imageUrl = event.target.result;
      gallery.style.backgroundImage = `url('${imageUrl}')`;
    };
    reader.readAsDataURL(file);
 });

 // Show popup always, with uploaded image or default
 hoverTitle.addEventListener('click', () => {
    popupImage.src = imageUrl;
    modal.style.display = 'flex';
 });
});

// Close popup
closeBtn.addEventListener('click', () => {
 modal.style.display = 'none';
 popupImage.src = '';
});

// Close when clicking outside
window.addEventListener('click', (e) => {
 if (e.target === modal) {
    modal.style.display = 'none';
    popupImage.src = '';
 }
});
let activeGallery = null; // Track last clicked gallery block
const popupUpload = document.getElementById('popupUpload');

document.querySelectorAll('.gallery-image').forEach(gallery => {
const fileInput = gallery.querySelector('.image-input');
const hoverTitle = gallery.querySelector('.hover-photogtitle');
let imageUrl = 'placeholder.jpg';

fileInput.addEventListener('change', (e) => {
 const file = e.target.files[0];
 if (!file) return;
 const reader = new FileReader();
 reader.onload = function (event) {
    imageUrl = event.target.result;
    gallery.style.backgroundImage = `url('${imageUrl}')`;
    gallery.dataset.imageUrl = imageUrl;
 };
 reader.readAsDataURL(file);
});

hoverTitle.addEventListener('click', () => {
 activeGallery = gallery;
 const storedImage = gallery.dataset.imageUrl || imageUrl;
 document.getElementById('popupImage').src = storedImage;
 document.getElementById('imagePopup').style.display = 'flex';
});
});

popupUpload.addEventListener('change', (e) => {
const file = e.target.files[0];
if (!file || !activeGallery) return;
const reader = new FileReader();
reader.onload = function (event) {
 const uploadedImage = event.target.result;
 document.getElementById('popupImage').src = uploadedImage;
 activeGallery.style.backgroundImage = `url('${uploadedImage}')`;
 activeGallery.dataset.imageUrl = uploadedImage;
};
reader.readAsDataURL(file);
});


document.addEventListener("DOMContentLoaded", function () {
    const currentPage = window.location.pathname.split("/").pop(); // Get the current page name
    const navLinks = document.querySelectorAll("nav > ul > li > a"); // Select top-level navigation links only
  
    navLinks.forEach(link => {
      if (link.getAttribute("href") === currentPage) {
        link.classList.add("active"); // Add 'active' class to the current page link
      } else {
        link.classList.remove("active"); // Remove 'active' class from other links
      }
    });
  });