document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('.section');

    const projects = document.querySelectorAll('.project');
    const projectPopup = document.getElementById('popup');
    const projectPopupImg = document.getElementById('popup-img');
    const projectPopupDesc = document.getElementById('popup-desc');
    const projectClose = document.getElementById('project-close');

    const cvButton = document.getElementById('cv-button');

    let currentSectionIndex = 0;

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

    const scrollToNextSection = (direction) => {
        if (direction === 'down' && currentSectionIndex < sections.length - 1) {
            currentSectionIndex++;
        } else if (direction === 'up' && currentSectionIndex > 0) {
            currentSectionIndex--;
        }
        sections[currentSectionIndex].scrollIntoView({ behavior: 'smooth' });
    }

    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        revealSection();

        let currentScrollY = window.scrollY;
        if (currentScrollY > lastScrollY) {
            scrollToNextSection('down');
        } else if (currentScrollY < lastScrollY) {
            scrollToNextSection('up');
        }
        lastScrollY = currentScrollY;
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
        cvButton.addEventListener('click', () => {
            window.location.href = 'cv.html'; 
        });
    }
    revealSection();
});
