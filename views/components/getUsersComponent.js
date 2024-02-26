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
                <div id="usuarioIn" boxid="${user.id}" class="bg-white p-6 rounded-lg shadow-md" style="background: var(--box-principal); color: var(--text-color); display: flex; flex-wrap: wrap;">
                <div class="relative mb-4">
                    <div class="absolute inset-0 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg opacity-75" style="background-image: url('/images/bannerd.png'); background-size: cover; background-position: center;"></div>
            
                    <img src="/images/Logo.png" alt="User Image" class="w-16 h-16 rounded-full object-cover relative z-10">
                </div>
                <div style="flex: 2; min-width: 0;">
                    <h2 class="text-xl font-semibold mb-2">${user.name} ${user.lastname}</h2>
                    <p class="mb-4">Tipo de usuario: ${user.usertype}</p>
                    <p class="mb-4">Fecha de entrada: ${formattedAdmissionDate}</p>
                    <p class="mb-4">Correo verificado: ${verificationStatus}</p>
                </div>
                <div style="flex: 1; min-width: 0;">
                    <!-- Puedes agregar contenido adicional aquí si es necesario -->
                </div>
            </div>
            

            `;
            containerUsers.innerHTML += userHTML;
            } else {
                const userHTML = `
            

<div id="usuarioIn" boxid="${user.id}" class="usuarioaja w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700" style="background: var(--box-principal); color: var(--text-color);">
<div class="flex justify-end px-4 pt-4">
    <button id="dropdownButton" data-dropdown-toggle="dropdown" class="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5" type="button" style="display:none;">
        <span class="sr-only">Open dropdown</span>
        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
            <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"/>
        </svg>
    </button>
    <!-- Dropdown menu -->
    <div id="dropdown" class="z-10 hidden text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
        <ul class="py-2" aria-labelledby="dropdownButton">
        <li>
            <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Edit</a>
        </li>
        <li>
            <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Export Data</a>
        </li>
        <li>
            <a href="#" class="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Delete</a>
        </li>
        </ul>
    </div>
</div>
<div class="flex flex-col items-center pb-10">
    <img class="w-24 h-24 mb-3 rounded-full shadow-lg" src="/images/logo.png" alt="Bonnie image"/>
    <h5 class="mb-1 text-xl font-medium">${user.name} ${user.lastname}</h5>
    <span class="text-sm ">${user.usertype}</span>
    <span class="text-sm ">${verificationStatus}</span>
    <div class="flex mt-4 md:mt-6">
        <a id="verusuario" href="#" class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Ver y editar</a>
        <a id="DeleteUserBtn" href="#" class="py-2 px-4 ms-2 text-sm font-medium text-white focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-white focus:z-10 focus:ring-4 focus:ring-gray-100"  style="background: var(--cancel-color);">Eliminar</a>
    </div>
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
            console.log(task);
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
                <a id="taskIn" boxid="${task.id}" href="#" class="card-item border border-transparent p-8 rounded-lg shadow-md hover:border-cyan-600 transition duration-500" style="background: var(--box-principal); color: var(--text-color);">
                <img src="/images/banner.jpeg" alt="Card Image" class="w-full h-48 object-cover rounded-md mb-4">
                <span class="developer text-B22485 inline-block mb-4 px-4 py-2 rounded-full text-xs font-semibold" style="background: var(--primary-color); color: #fff">${task.TaskName}</span>
                <h3 class="text-lg font-semibold max-h-16 overflow-hidden overflow-ellipsis">${task.description}</h3>
                <div class="arrow flex items-center justify-center transform -rotate-35 h-10 w-10 border rounded-full mt-4 transition duration-200f" style="border-color:var(--text-color);">
                    <i class="uil uil-arrow-up-right" style="color: var(--text-color);"></i>
                </div>
            </a>
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