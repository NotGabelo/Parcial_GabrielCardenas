// Grupos seleccionados
const grupos = {
    "COMBA": {
        nombre: "COMBA I+D",
        objetivos: "Formar y seleccionar talento humano con las competencias laborales y técnicas requeridas para I+D+I de calidad en las líneas de investigación del grupo.",
        director: "Claudia Liliana Zuñiga Cañon",
        actividades: [
            { nombre: "Doctorado en Ciencias Aplicadas", fecha: "2019-12-18", hora: "10:00", resumen: "Doctorado en ciencias aplicadas de tecnología." },
            { nombre: "Especialización en Redes y Comunicaciones", fecha: "2003-07-05", hora: "14:00", resumen: "Especialización en redes y comunicaciones en el área de seguridad." }
        ]
    },
    "GIEIAM": {
        nombre: "GIEIAM",
        objetivos: "Participar activamente en convocatorias internas y externas para la financiación de los proyectos de investigación fomentando el vínculo de cooperación con grupos nacionales e internacionales y la participación en redes científicas.",
        director: "Diana Paola Bernal Suárez",
        actividades: [
            { nombre: "Seminario de Investigación I", fecha: "2018-09-13", hora: "09:00", resumen: "Seminario de investigación en energías verdes." }
        ]
    }
};

// Funciones para manejar localStorage
function obtenerDatos(clave) {
    return JSON.parse(localStorage.getItem(clave)) || [];
}

function guardarDatos(clave, datos) {
    localStorage.setItem(clave, JSON.stringify(datos));
}

document.addEventListener("DOMContentLoaded", function () {
    // Guardar actividad en localStorage
    const actividadForm = document.getElementById("actividadForm");
    if (actividadForm) {
        actividadForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const nombre = document.getElementById("nombre").value;
            const fecha = document.getElementById("fecha").value;
            const hora = document.getElementById("hora").value;
            const resumen = document.getElementById("resumen").value;
            const grupo = document.getElementById("grupo").value;

            const actividades = obtenerDatos("actividades");
            actividades.push({ nombre, fecha, hora, resumen, grupo });
            guardarDatos("actividades", actividades);

            window.location.href = `grupo.html?grupo=${grupo}`;
        });
    }

    // Guardar estudiante en localStorage
    const vincularForm = document.getElementById("vincularForm");
    if (vincularForm) {
        vincularForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const nombre = document.getElementById("nombre").value;
            const codigo = document.getElementById("codigo").value;
            const carrera = document.getElementById("carrera").value;
            const grupo = document.getElementById("semillero").value;

            const estudiantes = obtenerDatos("estudiantes");
            estudiantes.push({ nombre, codigo, carrera, grupo });
            guardarDatos("estudiantes", estudiantes);

            window.location.href = `grupo.html?grupo=${grupo}`;
        });
    }

    // Guardar docente en localStorage
    const docenteForm = document.getElementById("docenteForm");
    if (docenteForm) {
        docenteForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const nombre = document.getElementById("nombre").value;
            const formacion = document.getElementById("formacion").value;
            const horario = document.getElementById("horario").value;
            const grupo = document.getElementById("grupo").value;

            const docentes = obtenerDatos("docentes");
            docentes.push({ nombre, formacion, horario, grupo });
            guardarDatos("docentes", docentes);

            window.location.href = `grupo.html?grupo=${grupo}`;
        });
    }

    // Mostrar datos en grupo.html
    if (window.location.pathname.includes("grupo.html")) {
        const urlParams = new URLSearchParams(window.location.search);
        const grupoKey = urlParams.get("grupo");

        if (grupoKey && grupos[grupoKey]) {
            const grupo = grupos[grupoKey];
            document.getElementById("grupo-name").textContent = grupo.nombre;
            document.getElementById("grupo-objectives").textContent = grupo.objetivos;
            document.getElementById("grupo-director").textContent = grupo.director;

            const activitiesList = document.getElementById("grupo-activities");

            // Mostrar actividades predefinidas
            grupo.actividades.forEach(activity => {
                const listItem = document.createElement("li");
                listItem.className = "list-group-item";
                listItem.innerHTML = `<strong>${activity.nombre}</strong><br>${activity.fecha} - ${activity.hora}<br><em>${activity.resumen}</em>`;
                activitiesList.appendChild(listItem);
            });

            // Mostrar actividades guardadas en localStorage
            const actividadesGuardadas = obtenerDatos("actividades").filter(a => a.grupo === grupoKey);
            actividadesGuardadas.forEach(a => {
                const listItem = document.createElement("li");
                listItem.className = "list-group-item";
                listItem.innerHTML = `<strong>${a.nombre}</strong><br>${a.fecha} - ${a.hora}<br><em>${a.resumen}</em>`;
                activitiesList.appendChild(listItem);
            });

            // Mostrar estudiantes vinculados
            const estudiantes = obtenerDatos("estudiantes").filter(e => e.grupo === grupoKey);
            if (estudiantes.length > 0) {
                let studentsContainer = document.createElement("div");
                studentsContainer.innerHTML = "<h3>Estudiantes Vinculados</h3><ul id='students-list' class='list-group'></ul>";
                document.querySelector(".container").appendChild(studentsContainer);

                const studentsList = studentsContainer.querySelector("#students-list");
                estudiantes.forEach(e => {
                    const studentItem = document.createElement("li");
                    studentItem.className = "list-group-item";
                    studentItem.innerHTML = `<strong>${e.nombre}</strong> (Código: ${e.codigo}, Carrera: ${e.carrera})`;
                    studentsList.appendChild(studentItem);
                });
            }

            // Mostrar docentes registrados
            const docentes = obtenerDatos("docentes").filter(d => d.grupo === grupoKey);
            if (docentes.length > 0) {
                let docentesContainer = document.createElement("div");
                docentesContainer.innerHTML = "<h3>Docentes Investigadores</h3><ul id='docentes-list' class='list-group'></ul>";
                document.querySelector(".container").appendChild(docentesContainer);

                const docentesList = docentesContainer.querySelector("#docentes-list");
                docentes.forEach(d => {
                    const docenteItem = document.createElement("li");
                    docenteItem.className = "list-group-item";
                    docenteItem.innerHTML = `<strong>${d.nombre}</strong> (Formación: ${d.formacion}, Horario: ${d.horario})`;
                    docentesList.appendChild(docenteItem);
                });
            }

            // Agregar botón para volver a la página principal
            const volverBtn = document.createElement("button");
            volverBtn.className = "btn btn-secondary mt-3";
            volverBtn.textContent = "Ir a la Página Principal";
            volverBtn.onclick = () => window.location.href = "index.html";
            document.querySelector(".container").appendChild(volverBtn);
        }
    }
});
