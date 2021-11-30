const button = document.querySelector(".clickMe");
const displayName = document.querySelector(".displayName");
const displayGender = document.querySelector(".displayGender");
const displayEmail = document.querySelector(".displayEmail");
const displayCell = document.querySelector(".displayCell");
const displayLocation = document.querySelector(".displayLocation");
const displayPicture = document.querySelector(".displayPicture");
const displayDob = document.querySelector(".displayDob");


button.addEventListener("click", getData);

// function test(){
//     console.log('this is working');
// }

function getData() {
  fetch("https://randomuser.me/api/")
    .then(function (response) {
      //The API call was successful.
      if (response.ok) {
        return response.json();
      }
      // There was an error
      return Promise.reject(response);
    })
    .then(function (data) {
      //This is the JSON from our response
      let person= parsePersonData( data )
      console.log(person)
      displayName.innerHTML = `<p class='text-center text-lg text-white'> ${person.name} </p>`;
      displayGender.innerHTML = `<p class='text-center text-lg text-white'> ${person.gender} </p>`;
      displayEmail.innerHTML = `<p class='text-center text-lg text-white'> ${person.email} </p>`;
      displayCell.innerHTML = `<p class='text-center text-lg text-white'> ${person.cell} </p>`;
      displayLocation.innerHTML = `<p class='text-center text-lg text-white'> ${person.location} </p>`;
      displayPicture.innerHTML = `<img src='${person.picture}' alt=''/>`
      displayDob.innerHTML = `<p class='text-center text-lg text-white'> ${person.dob} </p>`
      
     
    })
    .catch(function (err) {
      //There was an error.
      console.warn("Something went wrong.", err);
    });
}


function parsePersonData(data){
    let personInfo = data.results[0];
    let personObject ={};
      const [name, dob, gender, email, cell, location, picture] = [
        personInfo.name,
        personInfo.dob,
        personInfo.gender,
        personInfo.email,
        personInfo.cell,
        personInfo.location,
        personInfo.picture,
      ];
      personObject['name'] = parseName(name)
      personObject['dob'] = parseDob(dob)
      personObject['gender'] = parseGender(gender)
      personObject['email'] = parseEmail(email)
      personObject['cell'] = parseCell(cell)
      personObject['location']= parseLocation(location)
      personObject['picture']= parsePicture(picture)

     
      return personObject;
}

function parseName(data){
    
    return data.title + ' ' + data.first + ' ' + data.last;
}
function parseDob(data){
    let dataString = data.date
    let dateString = dataString.slice(0,10).split('-')
    let correctFormatArray = [];
    correctFormatArray.push(dateString[1])
    correctFormatArray.push(dateString[2])
    correctFormatArray.push(dateString[0])
   
    return correctFormatArray.join('/')
}
function parseGender(data){
    
    return data;
}
function parseEmail(data){
    
    return data;
}
function parseCell(data){
    
    return data;
}
function parseLocation(data){
    let street = data.street.number + ' ' + data.street.name
    let city = data.city
    let country = data.country
    let postcode= data.postcode
   
    return street + ', ' + city + ' ' + country + ', ' + postcode;
}
function parsePicture(data){
    
    return data.large

}


//done