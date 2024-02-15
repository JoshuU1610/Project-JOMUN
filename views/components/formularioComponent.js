import { crearNotificacion } from "../components/notification.js";
import { getUsers, getTasks } from "../components/getUsersComponent.js";

export function inicializarFormulario() {
    const form = document.querySelector('#Registro');
    const nameInput = document.querySelector('#name');
    const lastnameInput = document.querySelector('#lastname');
    const emailInput = document.querySelector('#email');
    const cedulaInput = document.querySelector('#cedula');
    const phoneInput = document.querySelector('#phone');
    const userTypeSelect = document.querySelector('#userType');
    const birthdayInput = document.querySelector('#birthday');
    const admissionInput = document.querySelector('#admission');
    const passwordInput = document.querySelector('#password');

    const registrarButton = form.querySelector('#submit');

    function aplicarClaseValidacion(elemento, esValido) {
        if (esValido) {
            elemento.classList.remove('input-invalid');
            elemento.classList.add('input-valid');
        } else {
            elemento.classList.remove('input-valid');
            elemento.classList.add('input-invalid');
        }
    }

    function validarFormulario() {
        const nombreValido = /^[A-Za-z\s]+$/.test(nameInput.value);
        const apellidoValido = /^[A-Za-z\s]+$/.test(lastnameInput.value);
        const cedulaValida = /^\d{8,9}$/.test(cedulaInput.value);
        const telefonoValido = /^(0414|0412|0424|0416)\d{7}$/.test(phoneInput.value);
        const userTypeValido = userTypeSelect.selectedIndex !== 0;
        const birthdayValido = new Date(birthdayInput.value) <= new Date();
        const admissionValido = new Date(admissionInput.value) <= new Date();
        const emailValido = /\S+@\S+\.\S+/.test(emailInput.value);

        aplicarClaseValidacion(nameInput, nombreValido);
        aplicarClaseValidacion(lastnameInput, apellidoValido);
        aplicarClaseValidacion(cedulaInput, cedulaValida);
        aplicarClaseValidacion(phoneInput, telefonoValido);
        aplicarClaseValidacion(userTypeSelect, userTypeValido);
        aplicarClaseValidacion(birthdayInput, birthdayValido);
        aplicarClaseValidacion(admissionInput, admissionValido);
        aplicarClaseValidacion(emailInput, emailValido);

        registrarButton.disabled = !(nombreValido && apellidoValido && cedulaValida && telefonoValido && userTypeValido && birthdayValido && admissionValido && emailValido);
    }

    nameInput.addEventListener('input', validarFormulario);
    lastnameInput.addEventListener('input', validarFormulario);
    cedulaInput.addEventListener('input', validarFormulario);
    phoneInput.addEventListener('input', validarFormulario);
    userTypeSelect.addEventListener('change', validarFormulario);
    birthdayInput.addEventListener('input', validarFormulario);
    admissionInput.addEventListener('input', validarFormulario);
    emailInput.addEventListener('input', validarFormulario);
}

export function resetearFormulario(event, form) {
    console.log('entro a resetear');
    // Obtener el formulario a partir del argumento
    if (form) {
        console.log('consegui el form');
        // Resetear los valores de los campos a blanco
        form.reset();

        // Eliminar clases de estilos de validación
        const formElements = form.querySelectorAll('input, select');
        formElements.forEach(element => removerClasesValidacion(element));

        // Deshabilitar el botón de registro
        const registrarButton = form.querySelector('#submit');
        if (registrarButton) {
            console.log('desabilito el boton');
            registrarButton.disabled = true;
        } else {
            console.error('Botón de registro no encontrado');
        }
    } else {
        console.error('Formulario no encontrado');
    }
}

function removerClasesValidacion(elemento) {
    elemento.classList.remove('input-valid', 'input-invalid');
}

function resetearObjetoNewUser() {
    let newUser = {
        name: '',
        lastname: '',
        email: '',
        cedula: '',
        password: '',
        phone: '',
        usertype: '',
        birthday: '',
        admission: ''
    };
}

export function manejarEnvioFormulario() {
    const form = document.querySelector('#Registro');
    const nameInput = document.querySelector('#name');
    const lastnameInput = document.querySelector('#lastname');
    const emailInput = document.querySelector('#email');
    const cedulaInput = document.querySelector('#cedula');
    const phoneInput = document.querySelector('#phone');
    const userTypeSelect = document.querySelector('#userType');
    const birthdayInput = document.querySelector('#birthday');
    const admissionInput = document.querySelector('#admission');
    const passwordInput = document.querySelector('#password');

    const containerUsers = document.querySelector('#users');
    async function onSubmitHandler(e) {
        e.preventDefault();
        console.log('Hago el registro');

        let newUser = {
            name: nameInput.value,
            lastname: lastnameInput.value,
            email: emailInput.value,
            cedula: cedulaInput.value,
            password: passwordInput.value,
            phone: phoneInput.value,
            usertype: userTypeSelect.value,
            birthday: birthdayInput.value,
            admission: admissionInput.value
        };
    
        try {
            const response = await axios.post('/api/users', newUser);

            if (response.status === 200) {
                // Registro exitoso
                crearNotificacion(false, 'El usuario ha sido creado correctamente');
                containerUsers.innerHTML= ``;
                getUsers();
                console.log('registre bien');
            } else {
                // Registro fallido, mostrar el mensaje de error específico si está disponible
                const errorMessage = response.data && response.data.message
                    ? response.data.message
                    : 'Hubo un problema al crear el usuario';
        
                // Mostrar notificación de error
                console.log('registre mal');
                crearNotificacion(true, errorMessage);
            }
        } catch (error) {
            console.log(error);
            // Si hay un error en la respuesta del servidor, mostrar el mensaje específico si está disponible
            if (error.response && error.response.data && error.response.data.error) {
                crearNotificacion(true, error.response.data.message);
            } else if (error.message) {
                // Si hay un mensaje de error general, mostrarlo
                crearNotificacion(true, error.response.data.message);
            } else {
                // En caso de cualquier otro error, mostrar un mensaje genérico
                console.log(error);
                crearNotificacion(true, 'Hubo un problema al crear el usuario');
            }

            console.log('registre mal');
        } finally {
            console.log('entro en el finally');
            // Eliminar manualmente todos los event listeners antes de agregar uno nuevo
            // Resetear el formulario independientemente del resultado de la solicitud
            resetearObjetoNewUser();
            resetearFormulario(null, form);
            form.removeEventListener('submit', onSubmitHandler);
        }
    }

    // Agregar el nuevo manejador de eventos
    form.addEventListener('submit', onSubmitHandler);
}

export function resetearFormularioTasks(event, form) {
    console.log('entro a resetear');
    // Obtener el formulario a partir del argumento
    if (form) {
        console.log('consegui el form');
        // Resetear los valores de los campos a blanco
        form.reset();

        // Eliminar clases de estilos de validación
        const formElements = form.querySelectorAll('input, select');
        formElements.forEach(element => removerClasesValidacion(element));

        // Deshabilitar el botón de registro
        const registrarButton = form.querySelector('#submit-task');
        if (registrarButton) {
            console.log('desabilito el boton');
            registrarButton.disabled = true;
        } else {
            console.error('Botón de registro no encontrado');
        }
    } else {
        console.error('Formulario no encontrado');
    }
}


export function inicializarFormularioTask() {
    const form = document.querySelector('#task');
    const taskInput = document.querySelector('#taskName');
    const descriptionInput = document.querySelector('#description');
    const reunionSelect = document.querySelector('#reunionType');
    const meetingInput = document.querySelector('#meetingDay');

    const registrarButton = form.querySelector('#submit-task');

    function aplicarClaseValidacion(elemento, esValido) {
        if (esValido) {
            elemento.classList.remove('input-invalid');
            elemento.classList.add('input-valid');
        } else {
            elemento.classList.remove('input-valid');
            elemento.classList.add('input-invalid');
        }
    }

    function validarFormulario() {
        const nombreValido = /^[A-Za-z\s]+$/.test(taskInput.value);
        const descriptionValido = /^[A-Za-z\s]+$/.test(descriptionInput.value);
        const userTypeValido = reunionSelect.selectedIndex !== 0;

        // Validación para asegurarse de que la fecha no sea hoy ni antes de hoy
        const today = new Date();
        const selectedDate = new Date(meetingInput.value);
        const birthdayValido = selectedDate > today;

        aplicarClaseValidacion(taskInput, nombreValido);
        aplicarClaseValidacion(descriptionInput, descriptionValido);
        aplicarClaseValidacion(reunionSelect, userTypeValido);
        aplicarClaseValidacion(meetingInput, birthdayValido);

        registrarButton.disabled = !(nombreValido && userTypeValido && birthdayValido && descriptionValido);
    }

    taskInput.addEventListener('input', validarFormulario);
    reunionSelect.addEventListener('change', validarFormulario);
    meetingInput.addEventListener('input', validarFormulario);
}


export function manejarEnvioFormularioTask() {
    const form = document.querySelector('#task');
    const taskInput = document.querySelector('#taskName');
    const descriptionInput = document.querySelector('#description');
    const reunionSelect = document.querySelector('#reunionType');
    const meetingInput = document.querySelector('#meetingDay');
    const containertasks = document.querySelector('#containerTasks');
    console.log(taskInput);

    let tiposDeUsuarios = [];

    if (reunionSelect.value === 'Faculty y Profesores') {
        tiposDeUsuarios = ['Super Admin', 'Faculty', 'Profesor Adjunto'];
    } else if (reunionSelect.value === 'Delegados General') {
        tiposDeUsuarios = ['Super Admin', 'Faculty', 'Profesor Adjunto', 'Secretario', 'Delegado Senior', 'Delegado Junior'];
    } else if (reunionSelect.value === 'Delegado Senior') {
    tiposDeUsuarios = ['Super Admin', 'Faculty', 'Profesor Adjunto', 'Secretario', 'Delegado Senior'];
    } else if (reunionSelect.value === 'Delegado Junior') {
        tiposDeUsuarios = ['Super Admin', 'Faculty', 'Profesor Adjunto', 'Secretario', 'Delegado Junior'];
    }

    async function onSubmitHandler(e) {
        e.preventDefault();
        console.log('Hago el registro');

        let newTask = {
            TaskName: taskInput.value,
            description: descriptionInput.value,
            meetingDay: meetingInput.value,
            UserTypes: tiposDeUsuarios,
        };

        console.log(newTask);
    
        try {
            const response = await axios.post('/api/task', newTask);

            if (response.status === 200) {
                // Registro exitoso
                crearNotificacion(false, 'La reunion ha sido creada correctamente');
                containertasks.innerHTML = ``;
                getTasks();
                console.log('registre bien');
            } else {
                // Registro fallido, mostrar el mensaje de error específico si está disponible
                const errorMessage = response.data && response.data.message
                    ? response.data.message
                    : 'Hubo un problema al crear la reunion';
        
                // Mostrar notificación de error
                console.log('registre mal');
                crearNotificacion(true, errorMessage);
            }
        } catch (error) {
            console.log(error);
            // Si hay un error en la respuesta del servidor, mostrar el mensaje específico si está disponible
            if (error.response && error.response.data && error.response.data.error) {
                crearNotificacion(true, error.response.data.message);
            } else if (error.message) {
                // Si hay un mensaje de error general, mostrarlo
                crearNotificacion(true, error.response.data.message);
            } else {
                // En caso de cualquier otro error, mostrar un mensaje genérico
                console.log(error);
                crearNotificacion(true, 'Hubo un problema al crear el usuario');
            }

            console.log('registre mal');
        } finally {
            console.log('entro en el finally');
            // Resetear el formulario independientemente del resultado de la solicitud
            resetearFormularioTasks(null, form);
            form.removeEventListener('submit', onSubmitHandler);
        }
    }

    // Agregar el nuevo manejador de eventos
    form.addEventListener('submit', onSubmitHandler);
}