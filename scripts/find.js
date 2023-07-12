function insertName() {
  // to check if the user is logged in:
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      console.log(user.uid); // let me to know who is the user that logged in to get the UID
      currentUser = db.collection("users").doc(user.uid); // will to to the firestore and go to the document of the user
      currentUser.get().then((userDoc) => {
        //get the user name
        var user_Name = userDoc.data().name;
        console.log(user_Name);
        $("#name-goes-here").text(user_Name); //jquery

      });
    }
  });
}
insertName();

// Reads from firebase card where date is in bounds
//Then populates information into cards.
function populateAvailableCards() {
  let parkingspotCardTemplate = document.getElementById(
    "parkingspotCardTemplate"
  );
  let parkingspotCardGroup = document.getElementById("parkingspotCardGroup");
  let currentDate = Date.now();
  db.collection("parkingspots")
    .where("date", "<", currentDate)
    .get()
    .then((allSpots) => {
      allSpots.forEach((doc) => {
        console.log("date");
        console.log("doc.data() is", doc.data());
        let parkid = doc.id;
        var spotDescription = doc.data().description;
        var spotGeolocation = doc.data().geolocation;
        let testspotCard = parkingspotCardTemplate.content.cloneNode(true);
        testspotCard.querySelector(".card-address").innerHTML = spotGeolocation;
        testspotCard.querySelector(".card-description").innerHTML = spotDescription;
        testspotCard
          .querySelector("a")
          .setAttribute("href", "/book.html" + "?" + "id" + "=" + parkid);
        parkingspotCardGroup.appendChild(testspotCard);
      });
    });
}
populateAvailableCards();

function setSpotData(id) {
  localStorage.setItem("spotID", id);
}