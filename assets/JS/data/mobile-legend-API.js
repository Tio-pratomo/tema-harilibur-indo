function makeCardML(name = '', heroid = '', key = '') {
    return /* html */ `
    <div class="col-lg-2 col-md-3 px-2 py-3" data-aos="fade-right">
        <div class="card">
            <a href=" #" data-bs-toggle="modal" data-bs-target="#hero">
                <img class="img-fluid w-100 detail-hero" src="${key}" alt="${name}" data-heroid="${heroid}">
            </a>
            <ul class=" list-group list-group-flush">
                <li class="list-group-item">
                    <p>${name}</p>
                </li>
            </ul>
        </div>
    </div>
    `;
}

function getDataML(id = '') {
    let request = '';
    if (id === '') {
        request = new Request('https://mapi.mobilelegends.com/hero/list', {
            method: 'get',
            headers: {
                accept: 'application/json',
            },
        });
    } else {
        request = new Request(`https://mapi.mobilelegends.com/hero/detail?id=${id}`, {
            method: 'get',
            headers: {
                accept: 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
            mode: 'no-cors',
        });
    }

    const fetchDataML = fetch(request);
    return fetchDataML.then((response) => response.json()).catch((err) => err.message);
}

function showCardML(containerEl) {
    window.addEventListener('load', async function () {
        const dataML = await getDataML();
        console.log(dataML);
        let containerCard = '';
        dataML.data.forEach((value) => {
            containerCard += makeCardML(value.name, value.heroid, value.key);
        });

        containerEl.innerHTML = containerCard;
    });
}

function showCardDetail(modalBody) {
    document.addEventListener('click', async function (event) {
        // FILTER IF ELEMENT HAS CLASS = detail-hero
        if (event.target.classList.contains('detail-hero')) {
            // VARIABLE TO GET ID HERO
            const id = event.target.dataset.heroid;

            // DATA FROM API AS OBJECT
            const detailsHero = await getDataML(id);

            let li = '';

            detailsHero.data.skill.skill.forEach((value) => {
                li += `<li class="list-group-item"><img src="${value.icon}" alt="${value.name}"> <p>${value.des}</p></li>`;
            });

            let element = /* html */ `
           

            <div class="card">
            
                <img class="img-fluid w-100 detail-hero" src="${detailsHero.data.cover_picture}" alt="${detailsHero.data.name}" >
            
                <ul class=" list-group list-group-flush">
                    <li class="list-group-item">${detailsHero.data.type}</li>
                    ${li}
                </ul>
            </div>
            `;

            // MODAL BODY CONTAIN SEVERAL ELEMENT FORM VARIABLE elemenP
            modalBody.innerHTML = element;
        }
    });
}

export { showCardML, showCardDetail };
