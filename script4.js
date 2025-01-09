let currentUser = 'user1'; // Default to User 1
let sleepData = [];
let workoutData = [];
let focusData = [];
let sleepDates = [];
let workoutDates = [];
let focusDates = [];

// Initialize Mixpanel (replace 'YOUR_PROJECT_TOKEN' with your actual Mixpanel token)
mixpanel.init("1820291e5f9ea8ce4bcf229c9deb6876");

// Load the user data based on the selected user
function loadUserData() {
  const userData = JSON.parse(localStorage.getItem(currentUser)) || { sleep: [], workout: [], focus: [] };
  sleepData = userData.sleep;
  workoutData = userData.workout;
  focusData = userData.focus;

  // Track event: User data loaded
  mixpanel.track("User Data Loaded", {
    user: currentUser,
    sleepDataCount: sleepData.length,
    workoutDataCount: workoutData.length,
    focusDataCount: focusData.length
  });

  updateCharts();
}

// Switch user and load their data
function switchUser() {
  currentUser = document.getElementById('userSelect').value;  // Update currentUser without redeclaring
  loadUserData();

  // Track event: User switched
  mixpanel.track("User Switched", {
    previousUser: currentUser,
    newUser: document.getElementById('userSelect').value
  });
}

// Save data to localStorage for the current user
function saveUserData() {
  const userData = {
    sleep: sleepData,
    workout: workoutData,
    focus: focusData
  };
  localStorage.setItem(currentUser, JSON.stringify(userData));
}

// Update the sleep chart
function updateSleep() {
  const sleepInput = document.getElementById('sleepInput').value;
  if (sleepInput && !isNaN(sleepInput)) {
    const currentDate = new Date().toLocaleDateString();
    sleepData.push(sleepInput);
    sleepDates.push(`Day ${sleepData.length} - ${currentDate}`);
    saveUserData();
    updateCharts();

    // Track event: Sleep data updated
    mixpanel.track("Sleep Updated", {
      user: currentUser,
      hours: sleepInput,
      date: currentDate
    });

    document.getElementById('sleepInput').value = '';
  }
}

// Update the workout chart
function updateWorkout() {
  const workoutInput = document.getElementById('workoutInput').value;
  if (workoutInput && !isNaN(workoutInput)) {
    const currentDate = new Date().toLocaleDateString();
    workoutData.push(workoutInput);
    workoutDates.push(`Day ${workoutData.length} - ${currentDate}`);
    saveUserData();
    updateCharts();

    // Track event: Workout data updated
    mixpanel.track("Workout Updated", {
      user: currentUser,
      duration: workoutInput,
      date: currentDate
    });

    document.getElementById('workoutInput').value = '';
  }
}

// Update the focus chart
function updateFocus() {
  const focusInput = document.getElementById('focusInput').value;
  if (focusInput && !isNaN(focusInput)) {
    const currentDate = new Date().toLocaleDateString();
    focusData.push(focusInput);
    focusDates.push(`Day ${focusData.length} - ${currentDate}`);
    saveUserData();
    updateCharts();

    // Track event: Focus session updated
    mixpanel.track("Focus Updated", {
      user: currentUser,
      duration: focusInput,
      date: currentDate
    });

    document.getElementById('focusInput').value = '';
  }
}

// Update all charts
function updateCharts() {
  sleepChart.data.labels = sleepDates;
  sleepChart.data.datasets[0].data = sleepData;

  workoutChart.data.labels = workoutDates;
  workoutChart.data.datasets[0].data = workoutData;

  focusChart.data.labels = focusDates;
  focusChart.data.datasets[0].data = focusData;

  sleepChart.update();
  workoutChart.update();
  focusChart.update();

  // Track event: Charts updated
  mixpanel.track("Charts Updated", {
    user: currentUser,
    sleepDataCount: sleepData.length,
    workoutDataCount: workoutData.length,
    focusDataCount: focusData.length
  });
}

// Initialize charts
const sleepGraph = document.getElementById('sleepGraph').getContext('2d');
const workoutGraph = document.getElementById('workoutGraph').getContext('2d');
const focusGraph = document.getElementById('focusGraph').getContext('2d');

const sleepChart = new Chart(sleepGraph, {
  type: 'line',
  data: {
    labels: sleepDates,
    datasets: [{
      label: 'Hours of Sleep',
      data: sleepData,
      borderColor: 'blue',
      fill: false
    }]
  }
});

const workoutChart = new Chart(workoutGraph, {
  type: 'bar',
  data: {
    labels: workoutDates,
    datasets: [{
      label: 'Workout Hours',
      data: workoutData,
      backgroundColor: 'orange'
    }]
  }
});

const focusChart = new Chart(focusGraph, {
  type: 'doughnut',
  data: {
    labels: focusDates,
    datasets: [{
      label: 'Focus Sessions',
      data: focusData,
      backgroundColor: ['green', 'lightgray'],
    }]
  }
});

// Load the data for the default user on page load
window.onload = function() {
  loadUserData();
};
