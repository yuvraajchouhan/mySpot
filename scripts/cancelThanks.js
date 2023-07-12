let url_str = window.location.href;
let url = new URL(url_str);
let search_params = url.searchParams;

// If user is signed in update document in parkingspots collection
// there is no renter and date is outof bounds for find page.
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    let currentParkingSpotID = search_params.get("id");
    db.collection("parkingspots").doc("currentParkingSpotID");
    firebase
      .firestore()
      .collection("parkingspots")
      .doc(currentParkingSpotID)
      .update({
        renterID: null,
      });
    firebase
      .firestore()
      .collection("parkingspots")
      .doc(currentParkingSpotID)
      .update({
        date: 1000000000000000,
      });
    firebase
      .firestore()
      .collection("parkingspots")
      .doc(currentParkingSpotID)
      .update({
        available: false,
      });
  }
});