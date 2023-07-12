// Will populate cards from information read from the parkingspots collection,
// in firebase, where renterId matches current user uid
function populateRentedCards() {
  let parkingspotCardTemplate = document.getElementById(
    "parkingspotCardTemplate"
  );
  let parkingspotCardGroup = document.getElementById("parkingspotCardGroup");
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      var userID = user.uid;
      db.collection("parkingspots")
        .where("renterID", "==", userID)
        .get()
        .then((allSpots) => {
          allSpots.forEach((doc) => {
            var parkid = doc.id;
            var spotDescription = doc.data().description;
            var spotGeolocation = doc.data().geolocation;
            let phoneNum = doc.data().phone;
            let testspotCard = parkingspotCardTemplate.content.cloneNode(true);
            testspotCard.querySelector(".card-address").innerHTML =
              spotGeolocation;
            testspotCard.querySelector(".card-description").innerHTML =
              spotDescription;
            testspotCard.querySelector(".card-phone").innerHTML = phoneNum;
            testspotCard
              .querySelector("a")
              .setAttribute("href", "/add.html" + "?" + "id" + "=" + parkid);

            parkingspotCardGroup.appendChild(testspotCard);
          });
        });
    }
  });
}
populateRentedCards();

function setSpotData(id) {
  localStorage.setItem("spotID", id);
}