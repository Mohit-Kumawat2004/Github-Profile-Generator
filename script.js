let searchbtn = document.querySelector("#searchbtn");
let usernameinp = document.querySelector("#usernameinp");
let card = document.querySelector("#profile-card");

function getProfileData(username) {
  return fetch(`https://api.github.com/users/${username}`).then((raw) => {
    if (!raw.ok) throw new Error("User not found. Please try again.");
    return raw.json();
  });
}

function getRepos(username) {
  return fetch(
    `https://api.github.com/users/${username}/repos?sort=updated`
  ).then((raw) => {
    if (!raw.ok) throw new Error("failed to fetch repos...");
    return raw.json();
  });
}

function decorateProfileData(details) {
  card.style.display = "flex";
  let data = `<div class="profile-card">
      <div class="left">
        <img src="${details.avatar_url}" alt="GitHub Profile" class="avatar"/>
      </div>
      <div class="right">
        <h2 class="username">${details.login}</h2>

        <div class="row">
          <p><strong>Name:</strong> ${details.name}</p>
          <p><strong>Repos:</strong> ${details.public_repos}</p>
        </div>

        <div class="row">
          <p><strong>Followers:</strong> ${details.followers}</p>
          <p><strong>Following:</strong> ${details.following}</p>
        </div>

        <div class="row">
          <p><strong>Location:</strong>${details.location}</p>
          <p><strong>Company:</strong>${
            details.company ? details.company : "N/A"
          }</p>
        </div>

        <div class="row">
          <p><strong>Blog:</strong> <a href=# target="_blank">${
            details.blog
          }</a></p>
        </div>

        <div class="row">
          <p><strong>Bio:</strong> ${details.bio ? details.bio : ""}</p>
        </div>
      </div>`;
  card.innerHTML = data;
}

searchbtn.addEventListener("click", function () {
  let username = usernameinp.value.trim();
  if (username.length > 0) {
    getProfileData(username)
      .then((data) => {
        decorateProfileData(data);
      })
      .catch((err) => {
        card.innerHTML = "USER NOT FOUND";
        card.style.display = "flex";
      });
  } else {
    card.innerHTML = "USERNAME CANNOT BE EMPTY";
    card.style.display = "flex";
  }
});
