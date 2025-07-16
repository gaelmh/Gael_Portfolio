document.addEventListener('DOMContentLoaded', function() {
    const navButtons = document.querySelectorAll('.nav-button');
    const sections = document.querySelectorAll('.section-content');

    const projectItems = document.querySelectorAll('.project-item');
    const modal = document.getElementById('project-modal');
    const closeModalButton = document.querySelector('.close-button');
    const modalProjectTitle = document.getElementById('modal-project-title');
    const modalProjectDetails = document.getElementById('modal-project-details');
    const modalButtonsContainer = modal.querySelector('.modal-buttons');


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


    // --- Project Modal Functionality ---

    // Open modal when project item is clicked
    projectItems.forEach(item => {
        item.addEventListener('click', function() {
            const projectId = this.getAttribute('data-project-id');
            const hiddenDetails = document.getElementById(`details-${projectId}`);

            if (hiddenDetails) {
                modalProjectTitle.textContent = this.querySelector('h3').textContent;
                // Clear previous details and buttons
                modalProjectDetails.innerHTML = '';
                modalButtonsContainer.innerHTML = '';

                // Clone content to modal (excluding buttons for now)
                const clonedDetails = hiddenDetails.cloneNode(true);
                // Remove the hidden-details class from the cloned content to make its children visible
                clonedDetails.classList.remove('hidden-details');
                clonedDetails.removeAttribute('id'); // Remove ID to prevent duplicate IDs

                // Extract and append buttons separately
                const projectButtons = clonedDetails.querySelectorAll('.button');
                projectButtons.forEach(button => {
                    modalButtonsContainer.appendChild(button.cloneNode(true));
                    button.remove(); // Remove from clonedDetails after cloning
                });

                modalProjectDetails.appendChild(clonedDetails);

                modal.style.display = 'flex'; // Use flex to center the modal
                document.body.style.overflow = 'hidden'; // Prevent scrolling on body
            }
        });
    });

    // Close modal when close button is clicked
    closeModalButton.addEventListener('click', function() {
        modal.style.display = 'none';
        document.body.style.overflow = ''; // Restore body scrolling
    });

    // Close modal when clicking outside the modal content
    window.addEventListener('click', function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
            document.body.style.overflow = '';
        }
    });
});
