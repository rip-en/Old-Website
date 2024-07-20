document.addEventListener("DOMContentLoaded", function() {
    // Get project popup elements
    var projectPopup = document.getElementById("popup");
    var projectClose = document.getElementById("project-close");
    var popupContent = document.querySelector(".popup-content");
    var popupImg = document.getElementById("popup-img");
    var popupDesc = document.getElementById("popup-desc");

    // Function to show project popup
    function showProjectPopup(event) {
        var project = event.currentTarget;
        var images = JSON.parse(project.getAttribute("data-images"));
        var title = project.getAttribute("data-title");
        var subtitle = project.getAttribute("data-subtitle");

        popupImg.src = images[0];
        popupDesc.innerHTML = `<h2>${title}</h2><p>${subtitle}</p>`;
        popupContent.innerHTML = `<div class="popup-images">${images.map(src => `<img src="${src}" alt="${title}">`).join('')}</div>`;
        projectPopup.style.display = "flex";
    }

    // Function to hide project popup
    function hideProjectPopup() {
        projectPopup.style.display = "none";
    }

    // Add event listeners to project elements
    document.querySelectorAll(".project").forEach(function(project) {
        project.addEventListener("click", showProjectPopup);
    });

    projectClose.addEventListener("click", hideProjectPopup);

    // Hide project popup when clicking outside of it
    window.addEventListener("click", function(event) {
        if (event.target === projectPopup) {
            hideProjectPopup();
        }
    });
});
