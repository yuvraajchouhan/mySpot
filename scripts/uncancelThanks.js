// Will parse uid of parkingspots document and make it inbounds for find.html
let url_str = window.location.href;
let url = new URL(url_str);
let search_params = url.searchParams;
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    let currentParkingSpotID = search_params.get("id");
    console.log("currentParkingSpotID", currentParkingSpotID);
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
        date: 1,
      });
    firebase
      .firestore()
      .collection("parkingspots")
      .doc(currentParkingSpotID)
      .update({
        available: true,
      });
  }
});
