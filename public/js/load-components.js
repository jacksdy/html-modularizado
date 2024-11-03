async function loadComponent(url, element) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            console.error(`Failed to load ${url}: ${response.statusText}`);
            return;
        }
        const text = await response.text();
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = text.trim();
        const template = tempDiv.querySelector('template');
        if (template) {
            element.innerHTML = '';
            element.appendChild(template.content.cloneNode(true));
            console.log(`Loaded component from ${url}`);
        } else {
            console.error(`No template found in ${url}`);
        }
    } catch (error) {
        console.error(`Error loading ${url}:`, error);
    }
}

async function loadAllComponents() {
    await loadComponent('header.html', document.querySelector('header'));
    await loadComponent('principal.html', document.querySelector('main'));
    await loadComponent('footer.html', document.querySelector('footer'));
    console.log('Components loaded');

    // Verificar si los componentes están realmente en el DOM
    console.log('Header HTML:', document.querySelector('header').innerHTML);
    console.log('Main HTML:', document.querySelector('main').innerHTML);
    console.log('Footer HTML:', document.querySelector('footer').innerHTML);
}

loadAllComponents();

document.addEventListener('click', (event) => {
    if (event.target.id === 'link-inicio') {
        loadComponent('principal.html', document.querySelector('main'));
        setActiveLink(event.target.id);
    } else if (event.target.id === 'link-servicios') {
        loadComponent('servicios.html', document.querySelector('main'));
        setActiveLink(event.target.id);
    } else if (event.target.id === 'link-acerca') {
        loadComponent('acerca.html', document.querySelector('main'));
        setActiveLink(event.target.id);
    } else if (event.target.id === 'link-contacto') {
        loadComponent('contacto.html', document.querySelector('main')).then(() => {
            setupContactForm();
        });
        setActiveLink(event.target.id);
    }
});

function setActiveLink(activeId) {
    document.querySelectorAll('nav ul li a').forEach(link => {
        if (link.id === activeId) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

async function setupContactForm() {
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', async (event) => {
            event.preventDefault();
            const formData = new URLSearchParams(new FormData(form)); // URLSearchParams para enviar datos como JSON
            const formStatus = document.getElementById('form-status');

            if (formStatus) {
                formStatus.textContent = 'Enviando mensaje...';
            }

            try {
                const response = await fetch('/send-email', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: formData.toString(),
                });
                const result = await response.json();
                if (result.success) {
                    if (formStatus) {
                        formStatus.textContent = 'Mensaje enviado con éxito!';
                    }
                    form.reset();
                } else {
                    if (formStatus) {
                        formStatus.textContent = 'Error al enviar el mensaje.';
                    }
                }
            } catch (error) {
                if (formStatus) {
                    formStatus.textContent = 'Error al enviar el mensaje.';
                }
                console.error('Error:', error);
            }
        });
    }
}
