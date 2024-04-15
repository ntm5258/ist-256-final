'use strict';

const viewContainer = document.querySelector("#view-container");


/**
 *  Retrieves the json data from chairs.json
 */
const retrieveData = async () => {
    const res = await fetch("./js/chairs.json");
    const data = await res.json();
    return data;
};


function getParametersFromUrl() {

    const url = window.location.href.split("?");

    const paramArray = [];

    let parameters = url[url.length - 1].split("&").values();

    for (let param of parameters) {
        param = param.split("=");
        paramArray.push(param[param.length - 1]);
    }

    return paramArray;


}


const getChair = async (chairInfo) => {

    const payload = await retrieveData();
    const keys = Object.keys(payload).values();

    const style = chairInfo[0];
    const id = parseInt(chairInfo[1]);

    console.log(id);

    if (payload[style]) {

        for (let i = 0; i < payload[style].length; i++) {

            if (payload[style][i]["id"] === id) {

                console.log(payload[style][i]);
                const {id, title, price, description, img_path} = payload[style][i];
                document.title = "View - " + title;
                viewContainer.innerHTML = `<div class="container mt-5 display-pad">
                                                <div class="row">
                                                    <div class="col-sm-4 col-lg-4 line">
                                                        <img src="${img_path}" class="img-fluid" alt="Responsive image">
                                                    </div>
                                                    <div class="col-sm-8 col-lg-8 align-self-start">
                                                        <h1>${title}</h1>
                                                        <h4>$ ${price}</h4>
                                                        <p>${description}</p>                                            
                                                        <div class="mt-5">
                                                            <label for="quantity">Amount: </label>
                                                            <input type="number" id="quantity" name="quantity" min="1" max="4">
                                                            <input type="submit" class="btn btn-dark ml-2" value="Checkout">
                                                        </div>
                                            
                                            
                                                    </div>
                                                </div>
                                            </div>
                `;
                break;
            }
        }
    }
    // const values = chairInfo.values();
    // console.log(values);
    //
    // for (const key of values) {
    //     console.log(key);
    //
    //     if (payload[key]) {
    //
    //         let curr = payload[key].map((object) => {
    //
    //             const {id, title, img_path} = object;
    //             return console.log(object);
    //
    //         }).join("");
    //     }
    // }

};

const chairParams = getParametersFromUrl();

getChair(chairParams);



