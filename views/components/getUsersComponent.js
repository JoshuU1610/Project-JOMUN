export async function  getUsers  () {
    const containerUsers = document.querySelector('#users');
    try {
        const response = await axios.get(`/api/users/users`);
        const users = response.data;

        const dataUser = await axios.get('/api/users/getdata');
        users.forEach(user => {
            const admissionDate = new Date(user.admission);

            // Ajustar la zona horaria a la local del usuario
            admissionDate.setTime(admissionDate.getTime() + admissionDate.getTimezoneOffset() * 60 * 1000);

            // Opciones para obtener el formato "día mes año" en español
            const options = { day: 'numeric', month: 'long', year: 'numeric' };
            const formattedAdmissionDate = admissionDate.toLocaleDateString('es-ES', options);

            const verificationStatus = user.verified ? 'Verificado' : 'No verificado';

            if (dataUser.data.usertype === 'Delegado Senior' || dataUser.data.usertype === 'Delegado Junior') {
                const userHTML = `
            <div id="usuarioIn" boxid="${user.id}" class="bg-white p-6 rounded-lg shadow-md" style="background: var(--box-principal); color: var(--text-color);">
                <div class="mb-4">
                    <img src="/images/Logo.png" alt="User Image" class="w-16 h-16 rounded-full object-cover">
                </div>
                <h2 class="text-xl font-semibold mb-2">${user.name} ${user.lastname}</h2>
                <p class=" mb-4">Tipo de usuario: ${user.usertype}</p>
                <p class=" mb-4">Fecha de entrada: ${formattedAdmissionDate}</p>
                <p class=" mb-4">Correo verificado: ${verificationStatus}</p>
                <div class="flex justify-start items-center">
                </div>
            </div>

            `;
            containerUsers.innerHTML += userHTML;
            } else {
                const userHTML = `
            <div id="usuarioIn" boxid="${user.id}" class="bg-white p-6 rounded-lg shadow-md" style="background: var(--box-principal); color: var(--text-color);">
                <div class="mb-4">
                    <img src="/images/Logo.png" alt="User Image" class="w-16 h-16 rounded-full object-cover">
                </div>
                <h2 class="text-xl font-semibold mb-2">${user.name} ${user.lastname}</h2>
                <p class=" mb-4">Tipo de usuario: ${user.usertype}</p>
                <p class=" mb-4">Fecha de entrada: ${formattedAdmissionDate}</p>
                <p class=" mb-4">Correo verificado: ${verificationStatus}</p>
                <div class="flex justify-start items-center">
                <button class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-2">Editar</button>
                <button id="DeleteUserBtn" class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Borrar</button>
                </div>
            </div>

            `;
            containerUsers.innerHTML += userHTML;
            }
        });
    } catch (error) {
        console.log(error);
    }
}

export async function  getTasks  () {
    const containertasks = document.querySelector('#containerTasks');
    try {
        const response = await axios.get(`/api/task/tasks`);
        const tasks = response.data;
        const dataUser = await axios.get('/api/users/getdata');
        tasks.forEach(task => {
            const admissionDate = new Date(task.meetingDay);
            // Ajustar la zona horaria a la local del usuario
            admissionDate.setTime(admissionDate.getTime() + admissionDate.getTimezoneOffset() * 60 * 1000);

            // Opciones para obtener el formato "día mes año" en español
            const options = { day: 'numeric', month: 'long', year: 'numeric' };
            const formattedAdmissionDate = admissionDate.toLocaleDateString('es-ES', options);
            if (dataUser.data.usertype === 'Delegado Senior' || dataUser.data.usertype === 'Delegado Junior') {
                const taskHTML = `
            <div id="taskIn" boxid="${task.id}" class="bg-white p-6 rounded-lg shadow-md" style="background: var(--box-principal); color: var(--text-color);">
                <h2 class="text-xl font-semibold mb-2" id="taskName1">${task.TaskName}</h2>
                <input type="text" class="hidden" id="editTaskName" value="${task.TaskName}">
    
                <p class="mb-4" id="taskDescription1">${task.description}</p>
                <input type="text" class="hidden" id="editTaskDescription" value="${task.description}">
    
                <p class="mb-4">Fecha: ${formattedAdmissionDate}</p>
            </div>
            `;

            containertasks.innerHTML += taskHTML;
            } else {
                const taskHTML = `
            <div id="taskIn" boxid="${task.id}" class="bg-white p-6 rounded-lg shadow-md" style="background: var(--box-principal); color: var(--text-color);">
                <h2 class="text-xl font-semibold mb-2" id="taskName1">${task.TaskName}</h2>
                <input type="text" class="hidden" id="editTaskName" value="${task.TaskName}">
    
                <p class="mb-4" id="taskDescription1">${task.description}</p>
                <input type="text" class="hidden" id="editTaskDescription" value="${task.description}">
    
                <p class="mb-4">Fecha: ${formattedAdmissionDate}</p>
    
                <button class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Ver/Editar</button>
                <button id="DeleteTaskBtn" class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Borrar</button>
            </div>
            `;

            containertasks.innerHTML += taskHTML;
            }
        });
    } catch (error) {
        console.log(error);
    }
}

export async function  counts  () {
    const seniors = document.querySelector('#Senior');
    const facultys = document.querySelector(' #Facultys');
    const juniors = document.querySelector('#Junior');

    console.log(seniors, facultys, juniors);
    try {
        const response = await axios.get(`/api/users/users/count`);
        const counts = response.data;
        console.log(counts);
            facultys.innerHTML = counts['Faculty'];
            seniors.innerHTML = counts['Senior'];
            juniors.innerHTML = counts['Junior'];
    } catch (error) {
        console.log(error);
    }
}

export async function createadminifnotexists() {
    try {
        await axios.post(`/api/admin/createadminifnotexists`);
    } catch (error) {
        console.log(error);
    }
}