let url_str = window.location.href;
let url = new URL(url_str);
let search_params = url.searchParams;
let value = search_params.get("id");

// Reads from firebase and populates card with information, where userID matches current user.
function populateCardsDynamically() {
  let parkingspotCardTemplate = document.getElementById(
    "parkingspotCardTemplate"
  );
  let parkingspotCardGroup = document.getElementById("parkingspotCardGroup");
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      var userID = user.uid;
      db.collection("parkingspots")
        .where("userID", "==", userID)
        .get()
        .then((allSpots) => {
          allSpots.forEach((doc) => {
            var parkid = doc.id;
            var spotDescription = doc.data().description;
            var spotGeolocation = doc.data().geolocation;
            var spotAvailable = doc.data().available;
            let testspotCard = parkingspotCardTemplate.content.cloneNode(true);
            testspotCard.querySelector(".location").innerHTML =
              spotGeolocation;
            testspotCard.querySelector(".card-description").innerHTML =
              spotDescription;
            testspotCard.querySelector(".card-status").innerHTML =
              spotAvailable;
            testspotCard
              .querySelector("#cancel")
              .setAttribute(
                "href",
                "/cancelThanks.html" + "?" + "id" + "=" + parkid
              );
            testspotCard
              .querySelector("#uncancel")
              .setAttribute(
                "href",
                "/uncancelThanks.html" + "?" + "id" + "=" + parkid
              );

            parkingspotCardGroup.appendChild(testspotCard);
          });
        });
    }
  });
}
populateCardsDynamically();

function setSpotData(id) {
  localStorage.setItem("spotID", id);
}