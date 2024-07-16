document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('.section');
    const projects = document.querySelectorAll('.project');
    const projectPopup = document.getElementById('popup');
    const projectPopupImg = document.getElementById('popup-img');
    const projectPopupDesc = document.getElementById('popup-desc');
    const projectClose = document.getElementById('project-close');
    
    const cvButton = document.getElementById('cv-button');
    const cvPopup = document.getElementById('cv-popup');
    const cvIframe = document.getElementById('cv-iframe');
    const cvClose = document.getElementById('cv-close');

    let isScrolling;

    // Scroll snapping functionality
    const snapScroll = () => {
        const scrollPosition = window.pageYOffset;
        const windowHeight = window.innerHeight;
        let sectionIndex = Math.round(scrollPosition / windowHeight);
        
        window.scrollTo({
            top: sectionIndex * windowHeight,
            behavior: 'smooth'
        });
    };

    window.addEventListener('scroll', () => {
        window.clearTimeout(isScrolling);

        isScrolling = setTimeout(() => {
            snapScroll();
        }, 100);
    });

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
    };

    const openPopup = (event) => {
        const project = event.currentTarget;
        const imageSrc = project.getAttribute('data-image');
        const description = project.getAttribute('data-description');

        projectPopupImg.src = imageSrc;
        projectPopupDesc.textContent = description;
        projectPopup.style.display = 'flex';
    };

    const closePopup = (popupElement) => {
        popupElement.style.display = 'none';
    };

    window.addEventListener('scroll', revealSection);

    projects.forEach(project => {
        project.addEventListener('click', openPopup);
    });

    projectClose.addEventListener('click', () => closePopup(projectPopup));
    projectPopup.addEventListener('click', (e) => {
        if (e.target === projectPopup) closePopup(projectPopup);
    });

    // Open CV Popup
    cvButton.addEventListener('click', function() {
        cvIframe.src = '"D:\Projects\Github\rip-en.github.io\CV.pdf"'; // Ensure the correct path to your CV PDF
        cvPopup.style.display = 'flex';
    });

    // Close CV Popup
    cvClose.addEventListener('click', () => closePopup(cvPopup));
    cvPopup.addEventListener('click', (e) => {
        if (e.target === cvPopup) closePopup(cvPopup);
    });

    // Initial check in case some sections are already in view
    revealSection();
});
