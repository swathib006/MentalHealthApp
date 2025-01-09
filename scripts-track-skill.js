document.addEventListener("DOMContentLoaded", function() {
    // Elements
    const addSkillButton = document.getElementById("addSkillButton");
    const addSkillModal = document.getElementById("addSkillModal");
    const closeModalButton = document.getElementById("closeModal");
    const addSkillForm = document.getElementById("addSkillForm");
    const skillsList = document.getElementById("skillsList");

    // Fetch user data from localStorage
    const username = localStorage.getItem("username");
    const email = localStorage.getItem("email");

    // Check if the user is logged in
    if (!username || !email) {
        // Redirect to login page if not logged in
        window.location.href = "login.html";
        return;
    }

    // Update the welcome section with user data
    document.getElementById("userName").textContent = username;
    document.getElementById("userEmail").textContent = email;

    // Function to load skills from localStorage
    function loadSkills() {
        // Retrieve skills data from localStorage
        const skills = JSON.parse(localStorage.getItem("skills")) || [];
        skillsList.innerHTML = ""; // Clear the current list

        // Populate the skills list
        skills.forEach(skill => {
            const skillItem = document.createElement("li");
            skillItem.textContent = `${skill.name} (${skill.category}) - Milestones: ${skill.milestones}`;
            skillsList.appendChild(skillItem);
        });
    }

    // Show the add skill modal
    addSkillButton.addEventListener("click", function() {
        addSkillModal.style.display = "block";
    });

    // Close the add skill modal
    closeModalButton.addEventListener("click", function() {
        addSkillModal.style.display = "none";
    });

    // Handle adding a new skill
    addSkillForm.addEventListener("submit", function(event) {
        event.preventDefault();

        // Get form values
        const skillName = document.getElementById("skillName").value;
        const skillCategory = document.getElementById("skillCategory").value;
        const milestones = document.getElementById("milestones").value;

        // Validate the input
        if (!skillName || !milestones) {
            alert("Please fill in all fields.");
            return;
        }

        // Create a new skill object
        const newSkill = {
            name: skillName,
            category: skillCategory,
            milestones: parseInt(milestones, 10)
        };

        // Retrieve existing skills from localStorage, or initialize an empty array
        const skills = JSON.parse(localStorage.getItem("skills")) || [];

        // Add the new skill to the list
        skills.push(newSkill);

        // Save the updated skills list back to localStorage
        localStorage.setItem("skills", JSON.stringify(skills));

        // Reload the skills list on the page
        loadSkills();

        // Clear the form and close the modal
        addSkillForm.reset();
        addSkillModal.style.display = "none";
    });

    // Load existing skills when the page loads
    loadSkills();
});
