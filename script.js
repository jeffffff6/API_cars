const apiKey = 'zY06GiIYYAuAAGsuQsYTkQ==yeeY99KdI0H0PzVz';

document.getElementById('search-btn').addEventListener('click', () => {
    // Obtener el valor del campo de texto
    const carName = document.getElementById('car-name').value.toLowerCase();

    const apiUrl = `https://api.api-ninjas.com/v1/cars?model=${carName}`;

    // Hacer la solicitud a la API
    fetch(apiUrl, {
        method: 'GET',
        headers: {
            'X-Api-Key': apiKey
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            // Mostrar los datos en el div con ID 'car-info'
            const carInfoDiv = document.getElementById('car-info');
            if (data.length === 0) {
                carInfoDiv.innerHTML = '<p>No se encontraron datos para este coche.</p>';
            } else {
                const car = data[0]; // Tomar el primer resultado
                carInfoDiv.innerHTML = `
                    <h2>Información del coche</h2>
                    <p><strong>Modelo:</strong> ${car.model}</p>
                    <p><strong>Fabricante:</strong> ${car.make}</p>
                    <p><strong>Año:</strong> ${car.year}</p>
                    <p><strong>Tipo de motor:</strong> ${car.fuel_type}</p>
                `;
            }
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('car-info').innerHTML = `<p>Error al buscar información del coche: ${error.message}</p>`;
        });
});
