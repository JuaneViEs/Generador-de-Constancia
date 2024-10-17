document.addEventListener('DOMContentLoaded', function() {
    // Agrega un evento de clic al botón "Entrar"
    document.getElementById('entrarBtn').addEventListener('click', login);
    
    // Escucha la tecla 'Enter' en el campo de contraseña
    document.getElementById('password').addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            login();
        }
    });

    // Agrega un evento de clic al botón "Buscar"
    document.getElementById('buscarBtn').addEventListener('click', buscarPersona);
    
    // Escucha la tecla 'Enter' en el campo de ID/Cédula
    document.getElementById('personaId').addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            buscarPersona();
        }
    });

    // Agrega un evento de clic al botón "Regresar"
    document.getElementById('regresarBtn').addEventListener('click', function() {
        document.getElementById('formContainer').classList.add('hidden');
        document.getElementById('loginContainer').classList.remove('hidden');
        document.getElementById('resultado').classList.add('hidden');
        document.getElementById('descargaContainer').classList.add('hidden');
        document.getElementById('personaId').value = '';
    });

    // Manejar el cambio en el select de formación
    document.getElementById('formacionSelect').addEventListener('change', function() {
        const selectedValue = this.value;
        const descargaBtn = document.getElementById('descargarBtn');

        // Mostrar el botón de descarga solo si se selecciona una formación
        if (selectedValue) {
            descargaBtn.classList.remove('hidden');
        } else {
            descargaBtn.classList.add('hidden');
        }
    });

    // Agrega un evento de clic al botón "Descargar"
    document.getElementById('descargarBtn').addEventListener('click', function() {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF('p', 'mm', 'a4');

        // Obtener la formación seleccionada
        const formacion = document.getElementById('formacionSelect').value;

        // Configurar márgenes
        const margin = 20;

        // Rellenar datos de la constancia
        const nombre = 'Juan David Evies Cayama';
        const cedula = '28.744.014';
        const duracion = '90 horas';
        const fechaInicio = '4/10/2024';
        const fechaFin = '24/10/2024';

        // Cargar la imagen para el encabezado y pie de página
        const headerImageUrl = 'images/imagen1.jpeg';
        const footerImageUrl = 'images/imagen2.jpeg';

        doc.addImage(headerImageUrl, 'JPEG', margin, margin - 15, doc.internal.pageSize.getWidth() - (margin * 2), 20);
        doc.addImage(footerImageUrl, 'JPEG', margin, doc.internal.pageSize.getHeight() - margin + 5, doc.internal.pageSize.getWidth() - (margin * 2), 20);

        doc.setFont("Times", "normal");
        doc.setFontSize(12);

        // Agregar contenido al PDF
        doc.setFontSize(16);
        doc.setFont("bold");

        const titleYPosition = margin + 15;
        doc.text('CONSTANCIA', doc.internal.pageSize.getWidth() / 2, titleYPosition, { align: 'center' });

        const titleWidth = doc.getTextWidth('CONSTANCIA');
        const titleXPosition = (doc.internal.pageSize.getWidth() / 2) - (titleWidth / 2);
        doc.line(titleXPosition, titleYPosition + 3, titleXPosition + titleWidth, titleYPosition + 3);

        doc.setFontSize(12);
        doc.setFont("normal");

        const textLines = [
            `La Coordinación del Centro de Formación Socialista Carora, INCES Región-Lara hace constar, por medio de la presente, que el (a) ciudadano (a): ${nombre}, Portador(a) de la Cédula de Identidad V- ${cedula}, participó en la formación de la Unidad Curricular: ${formacion}, con una duración de ${duracion}, con fecha de inicio el: ${fechaInicio} y fecha de término el: ${fechaFin}.`,
            '',
            'Constancia que se expide a petición de parte interesada en el Municipio Torres, Parroquia Trinidad Samuel, Estado Lara a los 22 días del mes de mayo 2024.'
        ];

        const fullText = textLines.join('\n');
        const splitText = doc.splitTextToSize(fullText, doc.internal.pageSize.getWidth() - (margin * 2));

        let yOffset = titleYPosition + 10;
        splitText.forEach(line => {
            doc.text(line, margin, yOffset);
            yOffset += 10;
        });

        doc.setFont("bold");
        doc.text('Atentamente,', doc.internal.pageSize.getWidth() / 2, yOffset + 10, { align: 'center' });
        doc.text('Jesus Campos', doc.internal.pageSize.getWidth() / 2, yOffset + 20, { align: 'center' });
        doc.text('Jefe de Centro', doc.internal.pageSize.getWidth() / 2, yOffset + 30, { align: 'center' });
        doc.text('Según el orden administrativo N OA-2024-02-29 de fecha 15-02-2024', doc.internal.pageSize.getWidth() / 2, yOffset + 40, { align: 'center' });

        doc.save('constancia.pdf');
    });

    // Agrega un evento de clic al botón "Regresar" en la constancia
    document.getElementById('regresarConstanciaBtn').addEventListener('click', function() {
        document.getElementById('constanciaContainer').classList.add('hidden');
        document.getElementById('formContainer').classList.remove('hidden');
    });
});

// Función que valida la contraseña ingresada
function login() {
    const passwordInput = document.getElementById('password').value;
    if (passwordInput === 'Incess2024') {
        document.getElementById('formContainer').classList.remove('hidden');
        document.getElementById('loginContainer').classList.add('hidden');
        document.getElementById('regresarBtn').classList.remove('hidden');
        document.getElementById('passwordError').classList.add('hidden');
    } else {
        document.getElementById('passwordError').classList.remove('hidden');
    }
}

// Función para buscar una persona por ID/Cédula
function buscarPersona() {
    const idInput = document.getElementById('personaId').value;
    const resultado = document.getElementById('resultado');
    const descargaContainer = document.getElementById('descargaContainer');

    // Validar ID/Cédula
    if (idInput.length >= 7 && idInput.length <= 8 && !isNaN(idInput)) {
        resultado.textContent = `Buscando persona con ID/Cédula: ${idInput}`;
        resultado.classList.remove('hidden');
        descargaContainer.classList.remove('hidden');
        document.getElementById('formacionSelect').value = ""; // Reiniciar la selección
        document.getElementById('descargarBtn').classList.add('hidden'); // Ocultar botón de descarga
    } else {
        resultado.textContent = 'DOCUMENTO DE IDENTIDAD INVALIDADO';
        resultado.classList.remove('hidden');
        descargaContainer.classList.add('hidden');
    }
}
