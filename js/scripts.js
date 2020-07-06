let gallery = document.getElementById("gallery");
const searchContainer = document.getElementsByClassName("search-container")[0];

function fetchprofile(url) {
  return fetch(url)
    .then((res) => res.json())
    .then((data) => data.results)
    .catch((err) => console.log("there seems to be a problem", err));
}

function modalHTML(profile) {
  return `<div class="modal">
  <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
  <div class="modal-info-container">
    <img class="modal-img" src=${profile.picture.large} alt="profile picture">
    <h3 id="name" class="modal-name cap">${profile.name.first} ${
    profile.name.last
  }</h3>
    <p class="modal-text">${profile.email}</p>
    <p class="modal-text cap">${profile.location.city}</p>
    <hr>
    <p class="modal-text">${profile.phone}</p>
    <p class="modal-text">
        ${profile.location.street.number} ${profile.location.street.name}, ${
    profile.location.state
  }, ${profile.nat} ${profile.location.postcode}</p>
    <p class="modal-text">Birthday: ${profile.dob.date
      .substr(0, 10)
      .replace(/-/g, "/")}</p>
  </div>
  <div class="modal-btn-container">
    <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
    <button type="button" id="modal-next" class="modal-next btn">Next</button>
  </div>
</div>`;
}
//create modal window + buttons functionlities
function createModal(profile, data) {
  const modalDiv = document.createElement("div");
  modalDiv.setAttribute("class", "modal-container");
  modalDiv.setAttribute("id", "modal-container");
  document.body.insertBefore(modalDiv, gallery.nextElementSibling);
  modalDiv.innerHTML = modalHTML(profile);
  //close button event
  document
    .getElementById("modal-close-btn")
    .addEventListener("click", () => modalDiv.remove());
  //next button
  document.getElementById("modal-next").addEventListener("click", () => {
    let index = data.indexOf(profile);
    console.log(index, data.length);
    if (index < data.length) {
      console.log("next");
      modalDiv.innerHTML = modalHTML(data[index + 1]);
    }
  });
  //previous button
  document.getElementById("modal-prev").addEventListener("click", () => {
    let index = data.indexOf(profile);
    if (index > 0) {
      console.log("prev");
      modalDiv.innerHTML = modalHTML(data[index - 1]);
    }
  });
}

function createProfileCard(profile, data) {
  let card = document.createElement("div");
  card.setAttribute("class", "card");
  gallery.appendChild(card);
  card.innerHTML = `
  <div class="card-img-container">
    <img class="card-img" src=${profile.picture.large} alt="profile picture">
  </div>
  <div class="card-info-container">
    <h3 id="name" class="card-name cap">${profile.name.first} ${profile.name.last}</h3>
    <p class="card-text">${profile.email}</p>
    <p class="card-text cap">${profile.location.city}, ${profile.location.state}</p>
  </div>`;

  card.addEventListener("click", () => {
    createModal(profile, data);
  });
}

function createSearchForm() {
  searchContainer.innerHTML = `
  <form action="#" method="get">
    <input type="search" id="search-input" class="search-input" placeholder="Search...">
    <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
  </form>`;
}

//main app
fetchprofile("https://randomuser.me/api/?results=12").then((data) => {
  console.log(data);
  data.map((profile) => {
    createProfileCard(profile, data);
  });

  //search functionality
  createSearchForm();
  let search = document.getElementById("search-input");
  let submit = document.getElementById("search-submit");
  submit.addEventListener("click", () => {
    if (search.value !== "") {
      let filteredData = data.filter(
        (x) =>
          x.name.first.toLowerCase().includes(search.value.toLowerCase()) ||
          x.name.last.toLowerCase().includes(search.value.toLowerCase())
      );
      gallery.innerHTML = "";
      filteredData.map((profile) => createProfileCard(profile, filteredData));
    } else {
      gallery.innerHTML = "";
      data.map((profile) => createProfileCard(profile, data));
    }
  });
});
