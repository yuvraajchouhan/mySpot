//change funtion name
function addvehicle() {
  //change ID name with is same with addvehicle that I mentioned
  let Licenseplate = document.getElementById("licenseplate").value;
  let Vehicletype = document.getElementById("vehicletype").value;
  let Description = document.getElementById("description").value;

  //Checks to see if user is signed in and then creates creates a new document
  // in the vehicle collection
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      var currentUser = db.collection("users").doc(user.uid);
      var userID = user.uid;
      //get the document for current user.
      currentUser.get().then(() => {
        db.collection("vehicle")
          .add({
            userID: userID,
            licenseplate: Licenseplate,
            vehicletype: Vehicletype,
            description: Description,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          })
          .then(() => {
            //change location into account
            window.location.href = "account.html"; //new line added
          });
      });
    } else {
      // No user is signed in.
    }
  });
}
