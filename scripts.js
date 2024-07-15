document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('.section');
    const projects = document.querySelectorAll('.project');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    let currentProjectIndex = 0;
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

    const updateProjectDisplay = () => {
        projects.forEach((project, index) => {
            project.style.display = index === currentProjectIndex ? 'block' : 'none';
        });
    };

    prevBtn.addEventListener('click', () => {
        currentProjectIndex = (currentProjectIndex === 0) ? projects.length - 1 : currentProjectIndex - 1;
        updateProjectDisplay();
    });

    nextBtn.addEventListener('click', () => {
        currentProjectIndex = (currentProjectIndex === projects.length - 1) ? 0 : currentProjectIndex + 1;
        updateProjectDisplay();
    });

    updateProjectDisplay(); // Initial display
    });

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
        cvIframe.src = 'CV.pdf'; // Replace with your CV PDF URL
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
