let progress = 0;

// Show the selected pathway
function showPathway(category) {
    document.getElementById('pathway').classList.remove('hidden');
    document.getElementById('pathway-title').innerText = category.charAt(0).toUpperCase() + category.slice(1);
    resetProgress(); // Reset progress when a new pathway is selected
}

// Reset the progress bar
function resetProgress() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.checked = false; // Uncheck all checkboxes
    });
    updateProgress(); // Update progress to 0%
}

// Update the progress percentage
function updateProgress() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    const total = checkboxes.length;
    const completed = Array.from(checkboxes).filter(checkbox => checkbox.checked).length;
    progress = (completed / total) * 100;
    document.getElementById('progress-percentage').innerText = Math.round(progress);
    document.querySelector('.progress-bar-fill').style.width = `${progress}%`; // Update the progress bar width
}
