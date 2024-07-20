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

    let isScrolling = false;

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

    const scrollToNextSection = () => {
        if (isScrolling) return;
        isScrolling = true;

        const currentSection = document.elementFromPoint(window.innerWidth / 2, window.innerHeight / 2).closest('.section');
        if (currentSection) {
            const nextSection = currentSection.nextElementSibling;
            if (nextSection) {
                nextSection.scrollIntoView({ behavior: 'smooth' });
            }
        }

        setTimeout(() => {
            isScrolling = false;
        }, 1000); // Adjust the delay to match the scroll animation duration
    };

    window.addEventListener('scroll', revealSection);
    window.addEventListener('wheel', (event) => {
        if (event.deltaY > 0) {
            scrollToNextSection();
        }
    });

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

    projects.forEach(project => {
        project.addEventListener('click', openPopup);
    });

    if (projectClose) {
        projectClose.addEventListener('click', () => closePopup(projectPopup));
    }
    if (projectPopup) {
        projectPopup.addEventListener('click', (e) => {
            if (e.target === projectPopup) closePopup(projectPopup);
        });
    }

    if (cvButton) {
        cvButton.addEventListener('click', function() {
            cvIframe.src = 'https://raw.githubusercontent.com/rip-en/rip-en.github.io/main/CV.pdf'; // Ensure the correct path to your CV PDF
            cvPopup.style.display = 'flex';
        });
    }
    
    if (cvClose) {
        cvClose.addEventListener('click', () => closePopup(cvPopup));
    }
    if (cvPopup) {
        cvPopup.addEventListener('click', (e) => {
            if (e.target === cvPopup) closePopup(cvPopup);
        });
    }

    // Initial check in case some sections are already in view
    revealSection();
});
