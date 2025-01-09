function updateProgress(milestoneId, progressPercentage) {
  const progressBar = document.getElementById(`progress${milestoneId}`);
  const progressText = document.getElementById(`progressText${milestoneId}`);
  
  progressBar.style.width = `${progressPercentage}%`;
  progressText.textContent = `${progressPercentage}% Complete`;

  if (progressPercentage === 100) {
    document.querySelector(`#milestone${milestoneId} .badge`).textContent = "Completed";
    document.querySelector(`#milestone${milestoneId} .badge`).style.backgroundColor = "#2ecc71";  // Green
  }
}

function completeMilestone(milestoneId, progressId) {
  updateProgress(progressId, 100);
  document.querySelector(`#milestone${milestoneId} button`).style.display = 'none';
}

function startMilestone(milestoneId, progressId) {
  updateProgress(progressId, 50); // Start with 50% progress
  document.querySelector(`#milestone${milestoneId} .badge`).textContent = "In Progress";
  document.querySelector(`#milestone${milestoneId} .badge`).style.backgroundColor = "#f39c12";  // Yellow
  document.querySelector(`#milestone${milestoneId} button`).textContent = "Mark as Complete";
  document.querySelector(`#milestone${milestoneId} button`).setAttribute("onclick", `completeMilestone('${milestoneId}', ${progressId})`);
}

// Example motivational quote change (could be dynamic as well)
const quotes = [
  '"The journey of a thousand miles begins with one step."',
  '"Success is the sum of small efforts, repeated day in and day out."',
  '"Believe you can and you’re halfway there."'
];

let currentQuote = 0;
setInterval(() => {
  document.getElementById("quote").textContent = quotes[currentQuote];
  currentQuote = (currentQuote + 1) % quotes.length;
}, 5000);  // Change quote every 5 seconds
