var datos = {
    pacientes: [],
    medicamentos: []
};

// Función para procesar el archivo JSONP de medicamentos
var misdatos = (info) => {
    datos.medicamentos = info.medicamentos;
    console.log("Medicamentos cargados:", datos.medicamentos);
};

// Función para cargar y procesar el archivo XML de pacientes
var cargarPacientes = () => {
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let xmlDoc = this.responseXML;
            let pacientes = xmlDoc.getElementsByTagName("paciente");
            for (let i = 0; i < pacientes.length; i++) {
                let paciente = {
                    id: pacientes[i].getElementsByTagName("id")[0].textContent,
                    nombre: pacientes[i].getElementsByTagName("nombre")[0].textContent,
                    edad: pacientes[i].getElementsByTagName("edad")[0].textContent,
                    diagnostico: pacientes[i].getElementsByTagName("diagnostico")[0].textContent,
                    contacto_emergencias: pacientes[i].getElementsByTagName("contacto_emergencias")[0].textContent,
                    familiar_cargo: pacientes[i].getElementsByTagName("nombre_familiar_cargo")[0].textContent
                };
                datos.pacientes.push(paciente);
            }
            console.log("Pacientes cargados:", datos.pacientes);
        }
    };
    xmlhttp.open("GET", "pacientes.xml", true);
    xmlhttp.send();
};

// Función para mostrar pacientes en una tabla
var mostrarPacientes = () => {
    let html = "<h2>Pacientes</h2>";
    html += "<table border='1'>";
    html += "<tr><th>ID Paciente</th><th>Nombre</th><th>Diagnóstico</th><th>Edad</th><th>Familiar a Cargo</th></tr>";
    datos.pacientes.map(paciente => {
        html += "<tr>";
        html += "<td>" + paciente.id + "</td>";
        html += "<td>" + paciente.nombre + "</td>";
        html += "<td>" + paciente.diagnostico + "</td>";
        html += "<td>" + paciente.edad + "</td>";
        html += "<td>" + paciente.familiar_cargo + "</td>";
        html += "</tr>";
    });
    html += "</table>";
    document.getElementById("resultados").innerHTML = html;
};

// Función para mostrar medicamentos en una tabla
var mostrarMedicamentos = () => {
    let html = "<h2>Medicamentos</h2>";
    html += "<table border='1'>";
    html += "<tr><th>Código</th><th>ID Medicamento</th><th>Nombre</th><th>Contenido Neto</th><th>Vía de Administración</th><th>Forma</th></tr>";
    datos.medicamentos.map(medicamento => {
        html += "<tr>";
        html += "<td>" + medicamento.codigo_medicamento + "</td>";
        html += "<td>" + medicamento.ID + "</td>";
        html += "<td>" + medicamento.nombre + "</td>";
        html += "<td>" + medicamento.contenido_neto + "</td>";
        html += "<td>" + medicamento.via_administracion + "</td>";
        html += "<td>" + medicamento.forma + "</td>";
        html += "</tr>";
    });
    html += "</table>";
    document.getElementById("resultados").innerHTML = html;
};

// Función para buscar por ID (tanto pacientes como medicamentos)
var buscarPorID = (id) => {
    let paciente = datos.pacientes.find(p => p.id == id);
    let medicamento = datos.medicamentos.find(m => m.ID == id);

    let html = "<h2>Resultado de Búsqueda</h2>";

    if (paciente) {
        html += "<h3>Paciente</h3>";
        html += "<p>ID: " + paciente.id + "</p>";
        html += "<p>Nombre: " + paciente.nombre + "</p>";
        html += "<p>Edad: " + paciente.edad + "</p>";
        html += "<p>Diagnóstico: " + paciente.diagnostico + "</p>";
        html += "<p>Familiar a Cargo: " + paciente.familiar_cargo + "</p>";
    }

    if (medicamento) {
        html += "<h3>Medicamento</h3>";
        html += "<p>Código: " + medicamento.codigo_medicamento + "</p>";
        html += "<p>ID: " + medicamento.ID + "</p>";
        html += "<p>Nombre: " + medicamento.nombre + "</p>";
        html += "<p>Contenido Neto: " + medicamento.contenido_neto + "</p>";
        html += "<p>Vía de Administración: " + medicamento.via_administracion + "</p>";
        html += "<p>Forma: " + medicamento.forma + "</p>";
    }

    if (!paciente && !medicamento) {
        html += "<p>No se encontró ningún paciente o medicamento con el ID proporcionado.</p>";
    }

    document.getElementById("resultados").innerHTML = html;
};
