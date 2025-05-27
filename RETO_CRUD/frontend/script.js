document.addEventListener('DOMContentLoaded', () => {
    const vehiculoForm = document.getElementById('vehiculoForm');

    vehiculoForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const marca = document.getElementById('marca').value;
        const modelo = document.getElementById('modelo').value;
        const placa = document.getElementById('placa').value;
        const color = document.getElementById('color').value;
        const anio = document.getElementById('anio').value;

        const nuevoVehiculo = {
            marca: marca,
            modelo: modelo,
            placa: placa,
            color: color,
            anio: parseInt(anio)
        };

        try {
            const response = await fetch('http://localhost:3000/api/vehiculos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(nuevoVehiculo)
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Vehículo guardado:', data);
                alert('Vehículo guardado exitosamente!');
                vehiculoForm.reset();
            } else {
                const error = await response.json();
                console.error('Error al guardar el vehículo:', error);
                alert(`Error al guardar el vehículo: ${error.message || 'Detalles no disponibles'}`);
            }
        } catch (error) {
            console.error('Error de red:', error);
            alert('Error de red al intentar guardar el vehículo.');
        }
    });
});