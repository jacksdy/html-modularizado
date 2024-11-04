async function loadComponent(url: string, element: HTMLElement): Promise<void> {
    try {
        const response: Response = await fetch(url);
        if (!response.ok) {
            console.error(`Failed to load ${url}: ${response.statusText}`);
            return;
        }
        const text: string = await response.text();
        const tempDiv: HTMLDivElement = document.createElement('div');
        tempDiv.innerHTML = text.trim();
        const template: HTMLTemplateElement | null = tempDiv.querySelector('template');
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

async function loadAllComponents(): Promise<void> {
    await loadComponent('header.html', document.querySelector('header') as HTMLElement);
    await loadComponent('principal.html', document.querySelector('main') as HTMLElement);
    await loadComponent('footer.html', document.querySelector('footer') as HTMLElement);
    console.log('Components loaded');

    console.log('Header HTML:', document.querySelector('header')?.innerHTML);
    console.log('Main HTML:', document.querySelector('main')?.innerHTML);
    console.log('Footer HTML:', document.querySelector('footer')?.innerHTML);
}

loadAllComponents();

document.addEventListener('click', (event: Event) => {
    const target = event.target as HTMLElement;
    if (target.id === 'link-inicio') {
        loadComponent('principal.html', document.querySelector('main') as HTMLElement);
        setActiveLink(target.id);
    } else if (target.id === 'link-servicios') {
        loadComponent('servicios.html', document.querySelector('main') as HTMLElement);
        setActiveLink(target.id);
    } else if (target.id === 'link-acerca') {
        loadComponent('acerca.html', document.querySelector('main') as HTMLElement);
        setActiveLink(target.id);
    } else if (target.id === 'link-contacto') {
        loadComponent('contacto.html', document.querySelector('main') as HTMLElement).then(() => {
            setupContactForm();
        });
        setActiveLink(target.id);
    }
});

function setActiveLink(activeId: string): void {
    document.querySelectorAll('nav ul li a').forEach(link => {
        if (link.id === activeId) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

async function setupContactForm(): Promise<void> {
    const form = document.getElementById('contact-form') as HTMLFormElement;
    if (form) {
        form.addEventListener('submit', async (event: Event) => {
            event.preventDefault();
            const formData = new URLSearchParams(new FormData(form) as any); // Convert FormData to URLSearchParams
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
