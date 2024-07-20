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
        sections.forEach((section) => {
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
    const popupImagesContainer = projectPopup.querySelector('.popup-images');
    const popupTitle = document.getElementById('popup-title');
    const popupSubtitle = document.getElementById('popup-subtitle');
    const projectClose = document.getElementById('project-close');

    const openPopup = (event) => {
        const project = event.currentTarget;
        const images = JSON.parse(project.getAttribute('data-images'));
        const title = project.getAttribute('data-title');
        const subtitle = project.getAttribute('data-subtitle');

        // Clear previous content
        popupImagesContainer.innerHTML = '';
        popupTitle.textContent = title;
        popupSubtitle.textContent = subtitle;

        // Add images to the popup
        images.forEach(imageSrc => {
            const img = document.createElement('img');
            img.src = imageSrc;
            img.alt = title;
            popupImagesContainer.appendChild(img);
        });

        projectPopup.style.display = 'flex';
    };

    const closePopup = () => {
        projectPopup.style.display = 'none';
    };

    projects.forEach(project => {
        project.addEventListener('click', openPopup);
    });

    if (projectClose) {
        projectClose.addEventListener('click', closePopup);
    }
    if (projectPopup) {
        projectPopup.addEventListener('click', (e) => {
            if (e.target === projectPopup) closePopup();
        });
    }

    // Trigger initial scroll check
    onScroll();
});
