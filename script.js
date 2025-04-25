

document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');
    const timerDisplay = document.getElementById('timer-display');
    const startTimerBtn = document.getElementById('start-timer-btn');
    const resetTimerBtn = document.getElementById('reset-timer-btn');
    const timerInput = document.getElementById('timer-input');
    const setTimerBtn = document.getElementById('set-timer-btn');
    let tasks = [];
    let timer;
    let timeLeft = 0; // Time in seconds
    let isTimerRunning = false;

    // Add task to the list
    addTaskBtn.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        if (taskText !== "") {
            tasks.push(taskText);
            renderTasks();
            taskInput.value = "";
        }
    });

    // Render the tasks in the task list
    function renderTasks() {
        taskList.innerHTML = "";
        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.textContent = task;

            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.classList.add('delete-btn');
            deleteBtn.addEventListener('click', () => {
                deleteTask(index);
            });

            li.appendChild(deleteBtn);
            taskList.appendChild(li);
        });
    }

    // Delete task from the list
    function deleteTask(index) {
        tasks.splice(index, 1);
        renderTasks();
    }

    // Set the custom timer duration
    setTimerBtn.addEventListener('click', () => {
        const minutes = parseInt(timerInput.value);
        if (isNaN(minutes) || minutes <= 0) {
            alert('Please enter a valid number of minutes.');
            return;
        }
        timeLeft = minutes * 60; // Convert minutes to seconds
        updateTimerDisplay();
    });

    // Start the Pomodoro timer
    startTimerBtn.addEventListener('click', () => {
        if (!isTimerRunning && timeLeft > 0) {
            startTimer();
        }
    });

    // Start the timer function
    function startTimer() {
        isTimerRunning = true;
        timer = setInterval(() => {
            if (timeLeft > 0) {
                timeLeft--;
                updateTimerDisplay();
            } else {
                clearInterval(timer);
                isTimerRunning = false;
                alert('Time’s up! Take a break.');
                timeLeft = 0; // Reset to 0
                updateTimerDisplay();
            }
        }, 1000);
    }

    // Reset the Pomodoro timer
    resetTimerBtn.addEventListener('click', () => {
        clearInterval(timer);
        timeLeft = 0;
        isTimerRunning = false;
        updateTimerDisplay();
    });

    // Update the timer display
    function updateTimerDisplay() {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
});
