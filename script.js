document.getElementById('search-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const keywords = document.getElementById('keywords').value;
    const location = document.getElementById('location').value;
    window.location.href = `job-results.html?keywords=${encodeURIComponent(keywords)}&location=${encodeURIComponent(location)}`;
});