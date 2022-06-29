function getDigimonAPI(level = '') {
    let mainURL = 'https://digimon-api.vercel.app/api/digimon/';

    if (level !== '') {
        mainURL += `level/${level}`;
    }

    const requestAPI = new Request(mainURL, {
        method: 'GET',
        headers: {
            accept: 'application/json',
        },
    });

    return fetch(requestAPI).then((response) => response.json());
}

/*
 *MEMBUAT BEBERAPA KOMPONEN
 *KARTU UNTUK PENGISI HALAMAN DIGIMON
 */

function makeCardDigimon(img = '', name = '', level = '') {
    const card = /* html */ `
    <div class="col-md-3 col-6 p-2" data-aos="fade-right">
        <div class="shadow-box text-center p-2 bg-dark border border-light">
            <img class="img-fluid" src="${
                img.includes('maganamon') ? 'https://digimon.shadowsmith.com/img/magnamon.jpg' : img
            }" alt="${name}">
            <p class="fw-bolder m-0 text-light digimon__text">${name}</p>
            <p class="text-light m-0 digimon__text">${level}</p>
        </div>
    </div>
    `;
    return card;
}

function showDisplayDigimonCard(containerEl) {
    window.addEventListener('load', async function () {
        const dataset = await getDigimonAPI(); //Array(209) [{name, img, level}, ...]

        let container = '';
        dataset.forEach((data) => {
            container += makeCardDigimon(data.img, data.name, data.level);
        });

        containerEl.innerHTML = container;
    });
}

function showFilteringDigimonCard(containerEl, button, inputLevel) {
    button.addEventListener('click', async function () {
        const levelDigimon = inputLevel.value;
        const dataset = await getDigimonAPI(levelDigimon);
        let container = '';
        dataset.forEach((data) => {
            container += makeCardDigimon(data.img, data.name, data.level);
        });

        containerEl.innerHTML = container;
    });
}

export { showDisplayDigimonCard, showFilteringDigimonCard };
