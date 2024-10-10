// Sample job data (in a real application, this would come from an API)
const jobs = [
    { title: "Frontend Developer", company: "TechCorp", location: "Beccles, UK", sourceWebsite: "TechJobs.com", keyword: "JavaScript" },
    { title: "Database Administrator", company: "DataSystems", location: "Suffolk, UK", sourceWebsite: "ITCareers.co.uk", keyword: "SQL" },
    { title: "IT Support Specialist", company: "TechHelp", location: "Norwich, UK", sourceWebsite: "UKJobs.com", keyword: "IT Support" },
    { title: "Software Engineer", company: "CodeMasters", location: "Ipswich, UK", sourceWebsite: "DevJobs.net", keyword: "Python" }
];

function displayJobs(jobsToDisplay = jobs) {
    const jobList = document.getElementById('job-list');
    jobList.innerHTML = '';

    jobsToDisplay.forEach(job => {
        const jobCard = document.createElement('div');
        jobCard.className = 'job-card';
        jobCard.innerHTML = `
            <div class="job-title">${job.title}</div>
            <div class="job-company">${job.company}</div>
            <div class="job-location">${job.location}</div>
            <div class="job-source">Source: ${job.sourceWebsite}</div>
            <div class="job-keyword">Keyword: ${job.keyword}</div>
        `;
        jobList.appendChild(jobCard);
    });
}

function filterJobs(keywords, location) {
    const activeJobBoards = JSON.parse(localStorage.getItem('jobBoards') || '[]')
        .filter(board => board.active)
        .map(board => board.name);

    return jobs.filter(job => 
        (job.title.toLowerCase().includes(keywords) ||
        job.company.toLowerCase().includes(keywords) ||
        job.keyword.toLowerCase().includes(keywords)) &&
        job.location.toLowerCase().includes(location) &&
        activeJobBoards.includes(job.sourceWebsite)
    );
}

// Parse URL parameters
const urlParams = new URLSearchParams(window.location.search);
const keywordsParam = urlParams.get('keywords');
const locationParam = urlParams.get('location');

// Set input fields with URL parameters
document.getElementById('keywords').value = keywordsParam || '';
document.getElementById('location').value = locationParam || '';

// Initial job display based on URL parameters
if (keywordsParam || locationParam) {
    const filteredJobs = filterJobs(keywordsParam.toLowerCase(), locationParam.toLowerCase());
    displayJobs(filteredJobs);
} else {
    displayJobs();
}

// Search form submission
document.getElementById('search-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const keywords = document.getElementById('keywords').value.toLowerCase();
    const location = document.getElementById('location').value.toLowerCase();
    const filteredJobs = filterJobs(keywords, location);
    displayJobs(filteredJobs);
});