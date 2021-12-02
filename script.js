//Selectors
const userContainer = document.querySelector(".user_info");
const form = document.querySelector(".form");
const input = document.querySelector(".input");
const searchBtn = document.querySelector(".search");
const toggle = document.querySelector(".nav_toggler");
const root = document.querySelector(":root");

//Functions
const renderUserInfo = function (data) {
  const date = data.created_at.slice(0, 10);

  const markup = `
        <div class="header">
          <img src="${data.avatar_url}" alt="" />
          <span>
            <h2>${data.name === null ? "" : data.name}</h2>
            <p class="username">@${data.login}</p>
            <p>${date}</p>
          </span>
        </div>

        <p class="bio">${
          data.bio === null ? "This profile has no bio" : data.bio
        }</p>

        <div class="account">
          <span>
            <p>Repos</p>
            <p>${data.public_repos}</p>
          </span>

          <span>
            <p>Followers</p>
            <p>${data.followers}</p>
          </span>

          <span>
            <p>Following</p>
            <p>${data.following}</p>
          </span>
        </div>

        <div class="others">
          <span>
            <img src="./images/icon-location.svg" alt="" />
            <p>${data.location === null ? "Not Available" : data.location}</p>
          </span>

          <span>
            <img src="./images/icon-website.svg" alt="" />
            <a href="${data.html_url}">${
    data.html_url === null ? "Not Available" : data.html_url
  }</a>
          </span>

          <span>
            <img src="./images/icon-twitter.svg" alt="" />
            <p>${
              data.twitter_username === null
                ? "Not Available"
                : data.twitter_username
            }</p>
          </span>

          <span>
            <img src="./images/icon-company.svg" alt="" />
            <p>${data.company === null ? "Not Available" : data.company}</</p>
          </span>
        </div>
  `;

  userContainer.innerHTML = "";
  userContainer.insertAdjacentHTML("afterbegin", markup);
};

const getUserInfoData = async function (username) {
  try {
    const res = await fetch(`https://api.github.com/users/${username}`);

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);

    const data = await res.json();

    console.log(data);

    renderUserInfo(data);
  } catch (err) {
    console.error(err);
  }
};

const getUserInfo = function (e) {
  e.preventDefault();

  const username = input.value;

  if (!username) return;

  getUserInfoData(username);

  input.value = "";
};

const changeTheme = function () {
  root.classList.toggle("dark");
  toggle.classList.toggle("dark");
};

//Event listeners
searchBtn.addEventListener("click", getUserInfo);

form.addEventListener("submit", getUserInfo);

toggle.addEventListener("click", changeTheme);
