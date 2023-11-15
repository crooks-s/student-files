// Global DOM vars
const gallery = document.querySelector('#gallery');



//===================
// FETCH DATA
//-------------------
function fetchData (url) {
    return fetch(url)
        .then( response => {
            if(!response.ok) {
                throw new Error ('Something went wrong')
            }
            return response.json();
        });
}

fetchData('https://randomuser.me/api/?results=12')
    .then( data => {
        return data.results;
    })
    .then( results => generateGalleryHTML(results) )
    .catch(error => {
        console.error('Error: ', error);
    });



//===================
// GENERATE HTML DATA
//-------------------

// Create and populate user info to gallery
function generateGalleryHTML(results) {
    for (const person of results){
        const html = `
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

        gallery.insertAdjacentHTML('beforeend', html);
    };
}

// Create and populate user info for modal
function generateModalHTML() {
    try {
        const html = `
            <div class="modal-container">
            <div class="modal">
                <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                <div class="modal-info-container">
                    <img class="modal-img" src="https://placehold.it/125x125" alt="profile picture">
                    <h3 id="name" class="modal-name cap">name</h3>
                    <p class="modal-text">email</p>
                    <p class="modal-text cap">city</p>
                    <hr>
                    <p class="modal-text">(555) 555-5555</p>
                    <p class="modal-text">123 Portland Ave., Portland, OR 97204</p>
                    <p class="modal-text">Birthday: 10/21/2015</p>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', html);
    } catch (error) {
        console.log(error.message);
    }
}



//===================
// MODAL HANDLING DATA
//-------------------
/**
 * create modal window when any part of employee item is clicked
 * include: image, name, email, city/location, cell#, detailed address, birthday
 */
gallery.addEventListener('click', (e) => {
    if ( !e.target.className.includes('card') ){
        return;
    } else {
        generateModalHTML();
    };
});

//close modal on close-btn
document.addEventListener('click', (e) => {
    const modalContainer = document.querySelector('.modal-container');
    const closeBtn = document.querySelector('.modal-close-btn');
    if (modalContainer && 
        (e.target === closeBtn || closeBtn.contains(e.target)) 
    ){
        document.body.removeChild(modalContainer);
    }
});

//close modal on Escape key
document.addEventListener('keyup', (e) => {
    const modalContainer = document.querySelector('.modal-container');
    if (modalContainer && e.key === 'Escape') {
        document.body.removeChild(modalContainer);
    }
});