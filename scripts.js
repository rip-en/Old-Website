document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('.section');
    const projects = document.querySelectorAll('.project');
    const popup = document.getElementById('popup');
    const popupImg = document.getElementById('popup-img');
    const popupDesc = document.getElementById('popup-desc');
    const cvButton = document.getElementById('cv-button');
    const cvPopup = document.getElementById('cv-popup');
    const cvIframe = document.getElementById('cv-iframe');
    const close = document.querySelector('.close');

    const revealSection = () => {
        const triggerBottom = window.innerHeight / 1.2;

        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;

            if (sectionTop < triggerBottom) {
                section.classList.add('visible');
            } else {
                section.classList.remove('visible');
            }
        });
    }

    const openPopup = (event) => {
        const project = event.currentTarget;
        const imageSrc = project.getAttribute('data-image');
        const description = project.getAttribute('data-description');

        popupImg.src = imageSrc;
        popupDesc.textContent = description;
        popup.style.display = 'flex';
    }

    const closePopup = () => {
        popup.style.display = 'none';
    }

    window.addEventListener('scroll', revealSection);
    close.addEventListener('click', closePopup);
    popup.addEventListener('click', (e) => {
        if (e.target === popup) closePopup();
    });

    projects.forEach(project => {
        project.addEventListener('click', openPopup);
    });

     // Open CV Popup
     cvButton.addEventListener('click', function() {
        cvIframe.src = 'CV.pdf';
        cvPopup.style.display = 'flex';
    });

    // Close Popup
    close.addEventListener('click', function() {
        cvPopup.style.display = 'none';
        cvIframe.src = ''; // Clear the iframe source to stop the PDF
    });

    // Close Popup when clicking outside the iframe
    cvPopup.addEventListener('click', function(e) {
        if (e.target === cvPopup) {
            cvPopup.style.display = 'none';
            cvIframe.src = '';
        }
    });

    // Initial check in case some sections are already in view
    revealSection();
});
