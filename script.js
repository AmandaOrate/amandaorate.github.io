// Load header and footer
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

  document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('imagePopup');
    const popupImage = document.getElementById('popupImage');
    const closeBtn = document.querySelector('.close-button');
    const modalTitle = document.querySelector('.modal-title');
    const modalMeta = document.querySelector('.modal-meta');
    const modalMeta2 = document.querySelector('.modal-meta2');
    const modalDesc = document.querySelector('.modal-desc');
    const galleryItems = document.querySelectorAll('.gallery-item'); // Select all gallery items
  
    // Function to show the modal with the clicked image and update modal-info
    function showModal(imageSrc, title, meta, meta2, desc) {
      if (modal && popupImage) {
        popupImage.src = imageSrc; // Set the image in the modal
        modalTitle.textContent = title; // Update the modal title
        modalMeta.textContent = meta; // Update the modal meta
        modalMeta2.textContent = meta2; // Update the modal meta2
        modalDesc.textContent = desc; // Update the modal description
        modal.style.display = 'flex'; // Show the modal
      } else {
        console.error('Modal or popupImage element is missing.');
      }
    }
  
    // Add event listeners for .hover-photogtitle and .hover-photogsub
    galleryItems.forEach(item => {
      const originalImage = item.querySelector('img:not(.hover-image)'); // Select the original image
      const title = item.querySelector('.hover-photogtitle')?.textContent; // Get the title from .hover-photogtitle
      const meta = item.querySelector('.hover-photogsub')?.textContent; // Get the meta from .hover-photogsub
      const meta2 = item.dataset.meta2; // Get the meta2 from data-meta2
      const desc = item.dataset.desc; // Get the description from data-desc
  
      // Add click event listener for .hover-photogtitle
      const hoverTitle = item.querySelector('.hover-photogtitle');
      if (hoverTitle) {
        hoverTitle.addEventListener('click', (e) => {
          e.stopPropagation(); // Prevent the event from bubbling to the parent
          showModal(originalImage.src, title, meta, meta2, desc); // Show the modal
        });
      }
  
      // Add click event listener for .hover-photogsub
      const hoverSub = item.querySelector('.hover-photogsub');
      if (hoverSub) {
        hoverSub.addEventListener('click', (e) => {
          e.stopPropagation(); // Prevent the event from bubbling to the parent
          showModal(originalImage.src, title, meta, meta2, desc); // Show the modal
        });
      }
    });
  
    // Add event listener for the close button
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        modal.style.display = 'none'; // Hide the modal
        popupImage.src = ''; // Clear the image
      });
    }
  
    // Close modal when clicking outside of it
    if (modal) {
      window.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.style.display = 'none'; // Hide the modal
          popupImage.src = ''; // Clear the image
        }
      });
    }
  });