function updateProgress() {
    // Get all the checkboxes
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    
    // Count how many checkboxes are checked
    let completed = 0;
    checkboxes.forEach((checkbox) => {
        if (checkbox.checked) {
            completed++;
        }
    });

    // Calculate progress percentage
    const total = checkboxes.length;
    const progressPercentage = (completed / total) * 100;

    // Update progress bar and text
    const progressBar = document.getElementById('progressBar');
    const progressText = document.getElementById('progressText');
    progressBar.value = progressPercentage;
    progressText.textContent = `Progress: ${Math.round(progressPercentage)}%`;
}
