let jobBoards = JSON.parse(localStorage.getItem('jobBoards')) || [];

function displayJobBoards() {
    const list = document.getElementById('jobBoardsList');
    list.innerHTML = '';
    jobBoards.forEach((board, index) => {
        const div = document.createElement('div');
        div.className = 'job-board-item';
        div.innerHTML = `
            <span>${board.name}</span>
            <span>${board.url}</span>
            <input type="checkbox" ${board.active ? 'checked' : ''} onchange="toggleJobBoard(${index})">
            <button onclick="deleteJobBoard(${index})">Delete</button>
        `;
        list.appendChild(div);
    });
}

function addJobBoard() {
    const name = prompt("Enter the name of the job board:");
    const url = prompt("Enter the URL of the job board:");
    if (name && url) {
        jobBoards.push({ name, url, active: true });
        saveJobBoards();
        displayJobBoards();
    }
}

function toggleJobBoard(index) {
    jobBoards[index].active = !jobBoards[index].active;
    saveJobBoards();
    displayJobBoards();
}

function deleteJobBoard(index) {
    if (confirm("Are you sure you want to delete this job board?")) {
        jobBoards.splice(index, 1);
        saveJobBoards();
        displayJobBoards();
    }
}

function saveJobBoards() {
    localStorage.setItem('jobBoards', JSON.stringify(jobBoards));
}

document.getElementById('newJobBoardBtn').addEventListener('click', addJobBoard);

displayJobBoards();