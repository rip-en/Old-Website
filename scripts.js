document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('.section');

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

    window.addEventListener('scroll', revealSection);

    // Initial check in case some sections are already in view
    revealSection();
});
