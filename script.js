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

// Modal functionality
document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('imagePopup');
  const popupImage = document.getElementById('popupImage');
  const closeBtn = document.querySelector('.close-button');
  const galleryItems = Array.from(document.querySelectorAll('.gallery-item')); // Collect all gallery items

  // Debugging: Log the selected elements
  console.log('Modal:', modal); // Should log the modal element
  console.log('Popup Image:', popupImage); // Should log the popup image element
  console.log('Gallery Items:', galleryItems); // Should log an array of all gallery items

  // Function to show the modal with the clicked image
  function showModal(imageSrc) {
    console.log('showModal called with:', imageSrc); // Debugging
    if (modal && popupImage) {
      popupImage.src = imageSrc; // Set the image in the modal
      modal.style.display = 'flex'; // Show the modal
    } else {
      console.error('Modal or popupImage element is missing.');
    }
  }

  // Function to close the modal
  function closeModal() {
    console.log('closeModal called'); // Debugging
    if (modal && popupImage) {
      modal.style.display = 'none'; // Hide the modal
      popupImage.src = ''; // Clear the image
    } else {
      console.error('Modal or popupImage element is missing.');
    }
  }

  // Add event listeners for .hover-photogtitle and .hover-photogsub
  galleryItems.forEach(item => {
    const hoverTitle = item.querySelector('.hover-photogtitle');
    const hoverSub = item.querySelector('.hover-photogsub');
    const originalImage = item.querySelector('img:not(.hover-image)'); // Select the original image

    if (hoverTitle) {
      hoverTitle.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent the event from bubbling to the parent
        console.log('Title clicked:', hoverTitle.textContent); // Debugging
        showModal(originalImage.src); // Show the modal with the original image
      });
    }

    if (hoverSub) {
      hoverSub.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent the event from bubbling to the parent
        console.log('Subtitle clicked:', hoverSub.textContent); // Debugging
        showModal(originalImage.src); // Show the modal with the original image
      });
    }
  });

  // Prevent clicks on .hover-image from triggering the modal
  const hoverImages = document.querySelectorAll('.hover-image');
  hoverImages.forEach(hoverImage => {
    hoverImage.addEventListener('click', (e) => {
      e.stopPropagation(); // Prevent the hover image from triggering the modal
      console.log('Hover image clicked, but modal not triggered.'); // Debugging
    });
  });

  // Add event listener for the close button
  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  } else {
    console.error('Close button not found.');
  }

  // Close modal when clicking outside of it
  if (modal) {
    window.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });
  } else {
    console.error('Modal element not found.');
  }
});