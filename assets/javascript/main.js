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
var time;
var frequency;
var count; 
var arrival;
var minutesAway;
var arrivalTime; 
var realTime; 
var finalTime; 
var firstMinutesAway;

function millisToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 60000);
    return minutes 
  }
  
//submits and pushes input information to the database 
$('#submit-button').on('click', function () {
    train = $('#train-input').val()
    destination = $('#destination-input').val()
    time = $('#time-input').val().split(':')
    // var numberTime = parseInt($('#time-input').val())
    var m = moment().hours(time[0]).minutes(time[1])
    frequency = $('#frequency-input').val()
    anotherM = moment(m)
    arrival = anotherM.add(frequency, "minutes")
    console.log(arrival)
    arrivalTime = arrival._d.getTime()
    realTime = moment(arrivalTime)
    finalTime = realTime._d.toString().substring(16, 21)
    firstMinutesAway =  moment() - moment(arrivalTime)
    console.log(firstMinutesAway)
    minutesAway = millisToMinutesAndSeconds(firstMinutesAway)
    console.log(minutesAway)
    database.ref('trains').push({
        count: 1,  
        train,
        destination,
        frequency,
        finalTime, 
        minutesAway
    })
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
        <td>${childData.finalTime}</td>
        <td>${childData.minutesAway}</td>
        </tr>`)
            });
        });
})
