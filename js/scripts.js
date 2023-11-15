
//Fetch 12 users from API 
async function getJSON(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        const resultsArr = data.results;
        return resultsArr;

    } catch(err) {
        throw err;
    }
}

// create HTML for each person retrieved
async function getPeople(url) {
    const peopleJSON = await getJSON(url);

    for (const person of peopleJSON){
        const gallery = document.querySelector('#gallery');
        const div = document.createElement('div');
        gallery.appendChild(div);

        div.innerHTML = `
        <div class="card">
        <div class="card-img-container">
            <img class="card-img" src="${person.picture.medium}" alt="profile picture">
        </div>
        <div class="card-info-container">
            <h3 id="name" class="card-name cap">${person.name.first} ${person.name.last}</h3>
            <p class="card-text">${person.email}</p>
            <p class="card-text cap">${person.location.city}, ${person.location.state}</p>
        </div>
        `;
    }

}

// call the function to get and display 12 users
getPeople('https://randomuser.me/api/?results=12');
