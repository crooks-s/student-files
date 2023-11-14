
//Fetch 12 users from API
async function getJSON(url) {
    try {
        const response = await fetch(url);
        return await response.json();
    } catch(err) {
        throw err;
    }
}

// returns an array of people objects
async function getPeople(url) {
    const peopleJSON = await getJSON(url);
    console.log(peopleJSON);

    // you have your array of objects,
    // now iterate thru them and display: 
    /**
     * image -->             picture OBJECT
     * first & last name --> name OBJECT
     * email -->             email
     * location -->          location OBJECT
     */

    // const profiles = peopleJSON();

}

// call the function to get and display 12 users
getPeople('https://randomuser.me/api/?results=12');