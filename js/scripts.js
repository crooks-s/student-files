
//Fetch 12 random users from API
async function getJSON(url) {
    try {
        const response = await fetch(url);
        return await response.json();
    } catch(err) {
        throw err;
    }
}

async function getPeople(url) {
    const peopleJSON = await getJSON(url);
    console.log(peopleJSON);
}

getPeople('https://randomuser.me/api/?results=12');