const FormData = require('form-data');
const fetch = require('node-fetch');
const faker = require('faker');

let globalCounter = 0;

function send() {
    let firstname, lastname, email;
    firstname = faker.fake("{{name.firstName}}");
    lastname = faker.fake("{{name.lastName}}");
	email = faker.fake("{{internet.email}}");

    let formData = new FormData();
    formData.append('input_1.3', firstname);
    formData.append('input_1.6', lastname);
    formData.append('input_13', 'busleidengang 7 0102');
    formData.append('input_15', '3000');
    formData.append('input_16', 'Leuven	');
    formData.append('input_7', 'België');
    formData.append('input_3', email);
    formData.append('input_4', '');
    formData.append('input_17', 'ALHYDRAN');
    formData.append('input_20.1', 'Ik ga akkoord');
    formData.append('is_submit_1', '1');
    formData.append('gform_submit', '1');
    formData.append('state_1', '');
    formData.append('gform_target_page_number_1', '0');
    formData.append('gform_source_page_number_1', '1');

    return fetch('https://www.alhydran.nl/proefmonster/', {
        method: 'POST',
        body: formData,
    })
    .then(response => {
        if (response.ok) {
            console.log("Success");
        } else {
            console.log("Request failed");
        }
    });
}

function startLoop(max) {
    if (globalCounter >= max) return;
    send().then(() => {
        globalCounter++;
        startLoop();
    });
}

startLoop(10);