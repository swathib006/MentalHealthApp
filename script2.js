// Login function
function login() {
    const username = document.getElementById('username').value;
    if (username) {
        // Save username to localStorage
        localStorage.setItem('user', username);

        // Redirect to goal-setting page
        window.location.href = 'set-goals.html';
    } else {
        alert('Please enter your name to log in.');
    }
}

// Display user's name after login (on set-goals.html)
window.onload = function() {
    const username = localStorage.getItem('user');
    if (username) {
        // Display username on the goals page
        document.getElementById('userNameDisplay').textContent = username;

        // Load goals from localStorage
        displayGoals();
    } else {
        // If the user is not logged in, redirect to the login page
        window.location.href = 'index.html';
    }
};

// Save goal function
function saveGoal() {
    const goalTitle = document.getElementById('goalTitle').value;
    if (goalTitle) {
        let goals = JSON.parse(localStorage.getItem('goals')) || [];
        goals.push({ title: goalTitle, completed: false });
        localStorage.setItem('goals', JSON.stringify(goals));

        // Display the updated goals list
        displayGoals();
    }
}

// Display goals in the goal list
function displayGoals() {
    const goals = JSON.parse(localStorage.getItem('goals')) || [];
    const goalList = document.getElementById('goalList');
    goalList.innerHTML = '';  // Clear the existing list
    goals.forEach((goal, index) => {
        const goalItem = document.createElement('li');
        goalItem.textContent = goal.title;
        
        const completeButton = document.createElement('button');
        completeButton.textContent = goal.completed ? 'Completed' : 'Mark Complete';
        completeButton.onclick = () => completeGoal(index);
        
        goalItem.appendChild(completeButton);
        goalList.appendChild(goalItem);
    });

    updateProgress();
}

// Mark goal as complete
function completeGoal(index) {
    let goals = JSON.parse(localStorage.getItem('goals')) || [];
    goals[index].completed = true;
    localStorage.setItem('goals', JSON.stringify(goals));

    // Display the updated goals list
    displayGoals();
}

// Update the progress bar
function updateProgress() {
    const goals = JSON.parse(localStorage.getItem('goals')) || [];
    const completedGoals = goals.filter(goal => goal.completed).length;
    const progress = (completedGoals / goals.length) * 100 || 0;
    document.getElementById('progressBar').value = progress;
}

// Logout function
function logout() {
    // Remove the user's data from localStorage and redirect to the login page
    localStorage.removeItem('user');
    window.location.href = 'index.html';
}
