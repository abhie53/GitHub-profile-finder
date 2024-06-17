document.getElementById('searchBtn').addEventListener('click', getUser);
const toggleTheme = document.getElementById('switch');

function getUser() {
    const username = document.getElementById('username').value;

    if (username === '') {
        alert('Please enter a username');
        return;
    }

    fetch(`https://api.github.com/users/${username}`)
        .then(response => {
            if (response.status === 404) {
                showError('User not found');
            } else {
                return response.json();
            }
        })
        .then(data => {
            if (data) {
                showProfile(data);
            }
        })
        .catch(error => {
            showError('Error fetching data');
        });
}

function showProfile(user) {
    const profile = document.getElementById('profile');
    profile.innerHTML = `
        <div class="profile-card">
            <img src="${user.avatar_url}" alt="Avatar" width="100">
            <div>
                <h2>${user.name}</h2>
                <p>${user.bio}</p>
                <p>Followers: ${user.followers} - Following: ${user.following}</p>
                <p>Public Repos: ${user.public_repos}</p>
                <p><a href="${user.html_url}" target="_blank">View Profile on GitHub</a></p>
            </div>
        </div>
    `;
}

function showError(message) {
    const profile = document.getElementById('profile');
    profile.innerHTML = `<p>${message}</p>`;
}

toggleTheme.addEventListener('change', ()=> {
    document.body.classList.toggle('dark-mode');
})
