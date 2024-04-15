
'use strict';

// product display area
const productDisplayDiv = document.querySelector("#productDisplayDiv");

// checkboxes
const modernCheckBox = document.querySelector("#modern-checked");
const rusticCheckBox = document.querySelector("#rustic-checked");
const industrialCheckBox = document.querySelector("#industrial-checked");


// search update button
const updateButton = document.querySelector("#update-search");

/**
 *
 * @chairType title - title of card / name of chair
 * @chairType img - link to image file
 * @returns {string} - returns boostrap card outline
 */
function createProductCard(title, price, img, style, id) {

    return `
        <div class="col-sm-12 col-lg-4 mt-2">
            <div class="card explode-small">
                <div class="h-75">
                    <img class="card-img-top h-100" src=${img} alt="Card image cap">
                </div>
                <div class="card-body">
                    <h5 class="card-title">${title}</h5>
                    <p class="card-text">$ ${price}</p>
                    <a href="view.html?style=${style}&id=${id}" class="stretched-link"></a>
                </div>
            </div>
        </div>
    `;


}

/**
 *  Retrieves the json data from chairs.json
 */
const retrieveData = async () => {
    const res = await fetch("./js/chairs.json");
    const data = await res.json();
    return data;
};


/**
 * Creates a boostrap card based on json data
 * @chairType chairType - Used to choose specific type/types of chairs
*/
const makeListing = async (chairType) => {

    const payload = await retrieveData();
    const keys = Object.keys(payload).values();

    /*
        Checks if "chairType" has been set and is an array.
        If so, display the specified chair types to the productDisplayDiv
    */
    if (Array.isArray(chairType)) {
        
        const values = chairType.values();
        for (const key of values) {

            if (payload[key]) {

                let curr = payload[key].map((object) => {

                    const {id, title, price, img_path} = object;
                    return createProductCard(title, price, img_path, key, id);

                }).join("");
                productDisplayDiv.innerHTML += curr;
            }
        }
    }
    /*
        If "chairType" was not set, this else statement displays ever chair that exists in chairs.json
     */
    else {

        for (const key of keys) {


            let curr = payload[key].map((object) => {

                const { id, title, price, img_path } = object;
                return createProductCard(title, price, img_path, key, id);

            }).join("");
            productDisplayDiv.innerHTML += curr;
        }
    }
};

// by default show all items
makeListing();


updateButton.addEventListener("click", () => {

    const chair_type_array = [];

    productDisplayDiv.innerHTML = null;

    if (modernCheckBox.checked) {
        chair_type_array.push("modern");
    }
    if (rusticCheckBox.checked) {
        chair_type_array.push("rustic");
    }
    if (industrialCheckBox.checked) {
        chair_type_array.push("industrial");
    }

    makeListing(chair_type_array);


});











