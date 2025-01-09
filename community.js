document.addEventListener('DOMContentLoaded', () => {
    // Retrieve user data from localStorage
    const userName = localStorage.getItem('userName');
    const userId = localStorage.getItem('userId');

    // Display Welcome Message
    displayWelcomeMessage(userName, userId);

    // Load Sidebar Achievements
    loadAchievements();

    // Initialize Forum Section
    initializeForum();

    // Load User Profiles
    loadUserProfiles();

    // Load Skill Challenges
    loadChallenges();

    // Initialize Polls and Surveys
    initializePolls();
});

// Function to display welcome message
function displayWelcomeMessage(name, id) {
    const welcomeMessage = document.getElementById('welcome-message');
    if (name && id) {
        welcomeMessage.innerHTML = `<h2>Hi ${name}! Welcome to the SkillUp Community. Your ID is <b>${id}</b>.</h2>`;
    } else {
        alert("Please log in first.");
        window.location.href = "login.html";
    }
}

// Function to load achievements in the sidebar
function loadAchievements() {
    const achievements = [
        "Completed JavaScript Basics",
        "Participated in Design Challenge",
        "Community Helper Badge",
        "Top Contributor",
        "Feedback Champion",
    ];
    const sidebar = document.querySelector('.sidebar ul');
    sidebar.innerHTML = '';
    achievements.forEach((achievement) => {
        const listItem = document.createElement('li');
        listItem.textContent = achievement;
        sidebar.appendChild(listItem);
    });
}

// Function to initialize forum section
function initializeForum() {
    const forumButton = document.querySelector('.forum button');
    forumButton.addEventListener('click', () => {
        const threadTitle = prompt("Enter a title for your thread:");
        if (threadTitle) {
            addForumThread(threadTitle);
        }
    });
}

// Function to add a new forum thread
function addForumThread(title) {
    const forum = document.querySelector('.forum');
    const thread = document.createElement('div');
    thread.className = 'thread';
    thread.innerHTML = `<h4>${title}</h4><p>Started by ${localStorage.getItem('userName')}</p>`;
    forum.appendChild(thread);
}

// Function to load user profiles
function loadUserProfiles() {
    const users = [
        { name: "Sharan", skills: ["JavaScript", "Python"], badges: 3 },
        { name: "Swathi", skills: ["UI Design", "React"], badges: 5 },
        { name: "Aarav", skills: ["Data Science", "Machine Learning"], badges: 2 },
    ];
    const profilesSection = document.querySelector('.profiles');
    profilesSection.innerHTML += '<ul class="user-list"></ul>';
    const userList = document.querySelector('.profiles .user-list');
    users.forEach((user) => {
        const userItem = document.createElement('li');
        userItem.innerHTML = `<strong>${user.name}</strong> - Skills: ${user.skills.join(
            ", "
        )} - Badges: ${user.badges}`;
        userList.appendChild(userItem);
    });
}

// Function to load challenges
function loadChallenges() {
    const challenges = [
        { title: "JavaScript Quiz", status: "Open" },
        { title: "React Project", status: "Ongoing" },
        { title: "UI Design Challenge", status: "Completed" },
    ];
    const challengesSection = document.querySelector('.challenges');
    challengesSection.innerHTML += '<ul class="challenge-list"></ul>';
    const challengeList = document.querySelector('.challenges .challenge-list');
    challenges.forEach((challenge) => {
        const challengeItem = document.createElement('li');
        challengeItem.innerHTML = `<strong>${challenge.title}</strong> - Status: ${challenge.status}`;
        challengeList.appendChild(challengeItem);
    });
}

// Function to initialize polls and surveys
function initializePolls() {
    const pollButton = document.querySelector('.polls button');
    pollButton.addEventListener('click', () => {
        const response = prompt("What feature would you like to see next on SkillUp?");
        if (response) {
            alert("Thank you for your feedback!");
        }
    });
}
