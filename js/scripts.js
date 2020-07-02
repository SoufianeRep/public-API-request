let gallery = document.getElementById("gallery");

function fetchprofile(url) {
  return fetch(url)
    .then((res) => res.json())
    .catch((err) => console.log("there seems to be a problem", err));
}

fetchprofile("https://randomuser.me/api/?results=12").then((data) => {
  console.log(data.results);
  data.results.forEach((prof) => {
    const card = document.createElement("div");
    card.className = "card";
    gallery.appendChild(card);
    card.innerHTML += `
      <div class="card-img-container">
          <img class="card-img" src=${prof.picture.large} alt="prof picture">
      </div>
      <div class="card-info-container">
          <h3 id="name" class="card-name cap">${prof.name.first} ${prof.name.last}</h3>
          <p class="card-text">${prof.email}</p>
          <p class="card-text cap">${prof.location.city}, ${prof.location.state}</p>
      </div>`;

    card.addEventListener("click", (e) => {
      const modaldiv = document.createElement("div");
      modaldiv.className = "modal-container";
      document.body.insertBefore(modaldiv, gallery.nextElementSibling);
      modaldiv.innerHTML = `
        <div class="modal">
          <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
          <div class="modal-info-container">
              <img class="modal-img" src=${
                prof.picture.large
              } alt="profile picture">
              <h3 id="name" class="modal-name cap">${prof.name.first} ${
        prof.name.last
      }</h3>
              <p class="modal-text">${prof.email}</p>
              <p class="modal-text cap">${prof.location.city}</p>
              <hr>
              <p class="modal-text">${prof.phone}</p>
              <p class="modal-text">${prof.location.street.number} ${
        prof.location.street.name
      }, ${prof.location.state}, OR ${prof.location.postcode}</p>
              <p class="modal-text">Birthday: ${prof.dob.date
                .substr(0, 10)
                .replace(/-/g, "/")}</p>
          </div>
        </div>
      `;
      document
        .getElementById("modal-close-btn")
        .addEventListener("click", () => modaldiv.remove());
    });
  });
});

console.log(gallery.nextElementSibling);
