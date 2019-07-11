var firebaseConfig = {
    apiKey: "AIzaSyAuWCzRT6X7IkzTWc9zCRWBvyWeftnHY7c",
    authDomain: "new-proj-97181.firebaseapp.com",
    databaseURL: "https://new-proj-97181.firebaseio.com",
    projectId: "new-proj-97181",
    storageBucket: "",
    messagingSenderId: "524999959395",
    appId: "1:524999959395:web:224d51eb73301b82"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var database = firebase.database()

//variables for train, time, destination, frequency, arrival, minutes away
var train;
var destination;
var time
var frequency
var arrival;
var minutesAway;

//submits and pushes input information to the database 
$('#submit-button').on('click', function () {
    train = $('#train-input').val()
    destination = $('#destination-input').val()
    time = $('#time-input').val()
    frequency = $('#frequency-input').val()
    console.log(train, destination, time, frequency)
    //making algorith to predict time arrived 
    // arrival = time.setMinutes()
    database.ref('trains').push({
        count: 1,
        train,
        destination,
        time,
        frequency,
        arrival: 1
    })

    console.log(time)
    $('.input').val('')
})

//on value function
database.ref('trains').on('value', function (snapshot) {
    var query = firebase.database().ref("trains").orderByKey();
    $('#table-body').empty()
    query.once("value")
        .then(function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                var childData = childSnapshot.val();
                $('#table-body').append(`<tr>
        <th scope="row">${childData.count}</th>
        <td>${childData.train}</td>
        <td>${childData.destination}</td>
        <td>${childData.frequency}</td>
        <td>${childData.nextArrival}</td>
        </tr>`)
            });
        });
})


