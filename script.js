const apiKey = 'zY06GiIYYAuAAGsuQsYTkQ==yeeY99KdI0H0PzVz';

document.getElementById('search-btn').addEventListener('click', () => {

    const carName = document.getElementById('car-name').value.toLowerCase();

    const apiUrl = `https://api.api-ninjas.com/v1/cars?model=${carName}`;

    fetchCarData(apiUrl);
});

function fetchCarData(apiUrl) {
    fetch(apiUrl, {
        method: 'GET',
        headers: {
            'X-Api-Key': apiKey
        }
    })
        .then(response => handleApiResponse(response))
        .then(data => renderCarInfo(data))
        .catch(error => handleError(error));
}

function handleApiResponse(response) {
    if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    return response.json();
}

function renderCarInfo(data) {
    const carInfoDiv = document.getElementById('car-info');
    if (data.length === 0) {
        carInfoDiv.innerHTML = '<p>No se encontraron datos para este coche.</p>';
    } else {
        const car = data[0];
        carInfoDiv.innerHTML = `
            <h2 style="text-align: center;">Información del coche</h2>
            <p style="margin-left: 20px;"><strong>Modelo:</strong> ${car.model}</p>
            <p style="margin-left: 20px;"><strong>Fabricante:</strong> ${car.make}</p>
            <p style="margin-left: 20px;"><strong>Año:</strong> ${car.year}</p>
            <p style="margin-left: 20px;"><strong>Tipo de motor:</strong> ${car.fuel_type}</p>
            <div id="car-image" style="overflow: hidden;">
                <p>Cargando imagen del modelo...</p>
            </div>
        `;
        fetchCarImage(car.make + ' ' + car.model + ' ' + car.year);
    }
}

function fetchCarImage(model) {
    const accesKey = "KWJ9ohpQgiuehupYVESMJJlp2OBNafJ6cJ65jrYKPJc"
    const imageApiUrl = `https://api.unsplash.com/search/photos?query=${model}&client_id=${accesKey}`;

    fetch(imageApiUrl).then(response => {
            if (!response.ok) {
                throw new Error(`Error al buscar imagen: ${response.status} ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            const imageDiv = document.getElementById('car-image');
            if (data.results.length > 0) {
                const imageUrl = data.results[0].urls.small;
                imageDiv.innerHTML = `<img src="${imageUrl}" alt="Imagen de ${model}" style="max-width:350px;margin:0;padding:0;display:block;">`;
            } else {
                imageDiv.innerHTML = '<p>No se encontró una imagen para este modelo.</p>';
            }
        })
        .catch(error => {
            console.error('Error al buscar imagen:', error);
            document.getElementById('car-image').innerHTML = '<p>Error al cargar la imagen.</p>';
        });
}
