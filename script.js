document.addEventListener('DOMContentLoaded', function() {
    const navButtons = document.querySelectorAll('.nav-button');
    const sections = document.querySelectorAll('.section-content');

    // Function to show a specific section
    function showSection(targetId) {
        sections.forEach(section => {
            section.classList.remove('active'); // Hide all sections
        });
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.classList.add('active'); // Show the target section
        }
    }

    // Function to set active navigation button
    function setActiveNavButton(activeButton) {
        navButtons.forEach(button => {
            button.classList.remove('active'); // Deactivate all buttons
        });
        activeButton.classList.add('active'); // Activate the clicked button
    }

    // Add click event listeners to navigation buttons
    navButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent default anchor link behavior (jumping)

            const targetSectionId = this.getAttribute('data-section');
            showSection(targetSectionId);
            setActiveNavButton(this);

            // Optional: Update URL hash without causing a page reload
            history.pushState(null, '', `#${targetSectionId}`);
        });
    });

    // Handle initial load based on URL hash (if any)
    const initialHash = window.location.hash.substring(1); // Get hash without '#'
    if (initialHash && document.getElementById(initialHash)) {
        showSection(initialHash);
        const correspondingButton = document.querySelector(`.nav-button[data-section="${initialHash}"]`);
        if (correspondingButton) {
            setActiveNavButton(correspondingButton);
        }
    } else {
        // If no hash or invalid hash, show the default "About Me" section
        showSection('about-me');
        document.querySelector('.nav-button[data-section="about-me"]').classList.add('active');
    }
});
