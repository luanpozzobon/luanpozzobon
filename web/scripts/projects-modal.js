const path = '/projects-details';

const projects = [
    {
        id: 'SynaXYZ',
        path: `${path}/synaxyz.html`,
    },
    {
        id: 'MoonVs',
        path: `${path}/moonvs.html`,
    },
    {
        id: 'utils.dao',
        path: `${path}/utils-dao.html`,
    },
    {
        id: 'snake-cpp',
        path: `${path}/snake-game.html`,
    },
]

let currentProjectId = projects[0].id;
async function openProject(id) {
    if (!!id) currentProjectId = id;

    const project = projects.find(p => p.id === currentProjectId);
    if (!project) {
        console.error(`Project with id ${currentProjectId} not found.`);
        return;
    }

    const projectPath = project.path;
    const modalBody = document.getElementById('modal-body');
    await fetch(projectPath)
        .then(response => {
            if (!response.ok) {
                console.error('Error loading project:', response.statusText);
                modalBody.innerHTML = `<h3>Error loading project: ${response.message}</h3>`;
            }

            return response.text();
        })
        .then(html => {
            modalBody.innerHTML = html;
        });

    openModal();
}

const modal = document.getElementById('project-modal');

function nextProject() {
    if (!modal.classList.contains('open')) return;

    const currentIndex = projects.findIndex(p => p.id === currentProjectId);
    const nextIndex = (currentIndex + 1) % projects.length;
    openProject(projects[nextIndex].id);
}

function previousProject() {
    if (!modal.classList.contains('open')) return;

    const currentIndex = projects.findIndex(p => p.id === currentProjectId);
    const previousIndex = (currentIndex - 1 + projects.length) % projects.length;
    openProject(projects[previousIndex].id);
}

const main = document.getElementById('projects');
function setup() {

    main.addEventListener('click', (event) => {
        const project = event.target.closest('article');
        if (!project) return;

        event.preventDefault();

        if (!project.dataset.id) return;

        const id = project.dataset.id;
        openProject(id);
    });
}

function toggleModal() {
    if (modal.classList.contains('open')) {
        closeModal();
    } else {
        openProject(currentProjectId);
    }
}

function closeModal() {
    modal.classList.remove('open');

    main.classList.remove('blur');
    document.querySelector('body').classList.remove('modal-open');
}

function openModal() {
    modal.classList.add('open');

    main.classList.add('blur');
    document.querySelector('body').classList.add('modal-open');
}

setup();

document.addEventListener('click', (event) => {
    if (!modal.contains(event.target))
        closeModal()
})