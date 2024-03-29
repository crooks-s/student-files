const gallery = document.querySelector('#gallery');

// Fetch the data/users
function fetchData (url) {
    return fetch(url)
        .then( response => {
            if(!response.ok) {
                throw new Error ('Something went wrong')
            }
            return response.json();
        });
};

/**
 * Cache the users because fetching again will result in
 * a set of new, random data/users.
 */
let cachedUsers;
function cacheUsers(url) {
    if (cachedUsers) {
        return Promise.resolve(cachedUsers);
    } else {
        return fetchData(url)
            .then( data => {
                cachedUsers = data.results;
                return cachedUsers;
            });
    };
};

/**
 * Note: request retrieves 'gb' and 'us' 
 * for later added search functionality using English alphabet
 */ 
cacheUsers('https://randomuser.me/api/?results=12&nat=us,gb')
    .then( cachedUsers => generateGalleryHTML(cachedUsers) )
    .catch(error => {
        console.error('Error: ', error);
    });

// Create and populate user info/HTML to #gallery
function generateGalleryHTML(cachedUsers) {
    for (const user of cachedUsers){
        const html = `
        <div class="card">
        <div class="card-img-container">
            <img class="card-img" src="${user.picture.medium}" alt="profile picture">
        </div>
        <div class="card-info-container">
            <h3 id="name" class="card-name cap">${user.name.first} ${user.name.last}</h3>
            <p class="card-text">${user.email}</p>
            <p class="card-text cap">${user.location.city}, ${user.location.state}</p>
        </div>
        `;
        gallery.insertAdjacentHTML('beforeend', html);
    };
};

// Create and populate user data/info to .modal
function generateModalHTML(e) {
    try {
        for (const user of cachedUsers) {
            if ( e.target.className.includes('card') &&
                `${user.name.first} ${user.name.last}` === e.target.closest('.card').querySelector('.card-name').textContent ) {
                const html = `
                    <div class="modal-container">
                    <div class="modal">
                        <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                        <div class="modal-info-container">
                            <img class="modal-img" src="${user.picture.medium}" alt="profile picture">
                            <h3 id="name" class="modal-name cap">${user.name.first} ${user.name.last}</h3>
                            <p class="modal-text">${user.email}</p>
                            <p class="modal-text cap">${user.location.city}</p>
                            <hr>
                            <p class="modal-text">Cell: ${user.cell}</p>
                            <p class="modal-text">${user.location.street.number} ${user.location.street.name}, ${user.location.city}, ${user.location.state} ${user.location.postcode}</p>
                            <p class="modal-text">Birthday: ${user.dob.date.slice(0,10)}</p>
                        </div>
                    </div>
                `;
                document.body.insertAdjacentHTML('beforeend', html);
            } 
        }
    } catch (error) {
        console.log(error.message);
    };
};

// Create/display modal when a user .card is clicked
gallery.addEventListener('click', (e) => {
    if ( !e.target.className.includes('card') ){
        return;
    } else {
        e.stopPropagation();
        generateModalHTML(e);
    };
});

// Close/delete modal on clicking close-btn
document.addEventListener('click', (e) => {
    const modalContainer = document.querySelector('.modal-container');
    const closeBtn = document.querySelector('.modal-close-btn');
    if (modalContainer && closeBtn.contains(e.target)){
        modalContainer.remove();
    };
});

// Close/delete modal on 'Escape' key
document.addEventListener('keyup', (e) => {
    const modalContainer = document.querySelector('.modal-container');
    if (modalContainer && e.key === 'Escape') {
        modalContainer.remove();
    };
});

// Close/delete modal on clicking out of modal
document.addEventListener('click', (e) => {
    const modalContainer = document.querySelector('.modal-container');
    const modalInfoContainer = document.querySelector('.modal-info-container');
    if (modalContainer && !modalInfoContainer.contains(e.target)){
        modalContainer.remove();
    };
});