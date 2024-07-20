document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('.section');
    let currentSectionIndex = 0;

    // Function to scroll to the specified section
    const scrollToSection = (index) => {
        if (index >= 0 && index < sections.length) {
            sections[index].scrollIntoView({ behavior: 'smooth' });
            currentSectionIndex = index;
        }
    };

    // Handle scroll behavior to switch sections
    window.addEventListener('wheel', (event) => {
        if (event.deltaY > 0) {
            // Scrolling down
            scrollToSection(currentSectionIndex + 1);
        } else {
            // Scrolling up
            scrollToSection(currentSectionIndex - 1);
        }
    });

    // Handle scroll event to add/remove visible class
    const onScroll = () => {
        const scrollPosition = window.scrollY + window.innerHeight / 2;
        sections.forEach((section, index) => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition <= sectionBottom) {
                section.classList.add('visible');
            } else {
                section.classList.remove('visible');
            }
        });
    };

    window.addEventListener('scroll', onScroll);

    // Handle click on projects to open popup
    const projects = document.querySelectorAll('.project');
    const projectPopup = document.getElementById('popup');
    const projectPopupImg = document.getElementById('popup-img');
    const projectPopupDesc = document.getElementById('popup-desc');
    const projectClose = document.getElementById('project-close');

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

    // Trigger initial scroll check
    onScroll();
});
