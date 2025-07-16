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
            // Scroll content area to top when section changes
            document.querySelector('.content-area').scrollTop = 0;
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
            const hiddenDetailsSpan = document.getElementById(`details-${projectId}`);

            if (hiddenDetailsSpan) {
                modalProjectTitle.textContent = this.querySelector('h3').textContent;

                // Clear previous details and buttons
                modalProjectDetails.innerHTML = '';
                modalButtonsContainer.innerHTML = '';

                // Clone content to modal
                // We clone children nodes to get only the p tags
                Array.from(hiddenDetailsSpan.children).forEach(child => {
                    // Check if the child is an element node and not a script or style tag (though unlikely here)
                    if (child.nodeType === Node.ELEMENT_NODE) {
                        modalProjectDetails.appendChild(child.cloneNode(true));
                    }
                });

                // Create GitHub button
                const githubUrl = hiddenDetailsSpan.getAttribute('data-github-url');
                if (githubUrl) {
                    const githubButton = document.createElement('a');
                    githubButton.href = githubUrl;
                    githubButton.target = '_blank';
                    githubButton.classList.add('button'); // Apply button style
                    githubButton.innerHTML = '<i class="fab fa-github"></i> <span>View on GitHub</span>';
                    modalButtonsContainer.appendChild(githubButton);
                }

                // Create LinkedIn button
                const linkedinUrl = hiddenDetailsSpan.getAttribute('data-linkedin-url');
                if (linkedinUrl) {
                    const linkedinButton = document.createElement('a');
                    linkedinButton.href = linkedinUrl;
                    linkedinButton.target = '_blank';
                    linkedinButton.classList.add('button'); // Apply button style
                    linkedinButton.innerHTML = '<i class="fab fa-linkedin-in"></i> <span>LinkedIn Write-up</span>';
                    modalButtonsContainer.appendChild(linkedinButton);
                }

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
