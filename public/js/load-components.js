"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function loadComponent(url, element) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(url);
            if (!response.ok) {
                console.error(`Failed to load ${url}: ${response.statusText}`);
                return;
            }
            const text = yield response.text();
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = text.trim();
            const template = tempDiv.querySelector('template');
            if (template) {
                element.innerHTML = '';
                element.appendChild(template.content.cloneNode(true));
                console.log(`Loaded component from ${url}`);
            }
            else {
                console.error(`No template found in ${url}`);
            }
        }
        catch (error) {
            console.error(`Error loading ${url}:`, error);
        }
    });
}
function loadAllComponents() {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c;
        yield loadComponent('header.html', document.querySelector('header'));
        yield loadComponent('principal.html', document.querySelector('main'));
        yield loadComponent('footer.html', document.querySelector('footer'));
        console.log('Components loaded');
        console.log('Header HTML:', (_a = document.querySelector('header')) === null || _a === void 0 ? void 0 : _a.innerHTML);
        console.log('Main HTML:', (_b = document.querySelector('main')) === null || _b === void 0 ? void 0 : _b.innerHTML);
        console.log('Footer HTML:', (_c = document.querySelector('footer')) === null || _c === void 0 ? void 0 : _c.innerHTML);
    });
}
loadAllComponents();
document.addEventListener('click', (event) => {
    const target = event.target;
    if (target.id === 'link-inicio') {
        loadComponent('principal.html', document.querySelector('main'));
        setActiveLink(target.id);
    }
    else if (target.id === 'link-servicios') {
        loadComponent('servicios.html', document.querySelector('main'));
        setActiveLink(target.id);
    }
    else if (target.id === 'link-acerca') {
        loadComponent('acerca.html', document.querySelector('main'));
        setActiveLink(target.id);
    }
    else if (target.id === 'link-contacto') {
        loadComponent('contacto.html', document.querySelector('main')).then(() => {
            setupContactForm();
        });
        setActiveLink(target.id);
    }
});
function setActiveLink(activeId) {
    document.querySelectorAll('nav ul li a').forEach(link => {
        if (link.id === activeId) {
            link.classList.add('active');
        }
        else {
            link.classList.remove('active');
        }
    });
}
function setupContactForm() {
    return __awaiter(this, void 0, void 0, function* () {
        const form = document.getElementById('contact-form');
        if (form) {
            form.addEventListener('submit', (event) => __awaiter(this, void 0, void 0, function* () {
                event.preventDefault();
                const formData = new URLSearchParams(new FormData(form)); // Convert FormData to URLSearchParams
                const formStatus = document.getElementById('form-status');
                if (formStatus) {
                    formStatus.textContent = 'Enviando mensaje...';
                }
                try {
                    const response = yield fetch('/send-email', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                        },
                        body: formData.toString(),
                    });
                    const result = yield response.json();
                    if (result.success) {
                        if (formStatus) {
                            formStatus.textContent = 'Mensaje enviado con éxito!';
                        }
                        form.reset();
                    }
                    else {
                        if (formStatus) {
                            formStatus.textContent = 'Error al enviar el mensaje.';
                        }
                    }
                }
                catch (error) {
                    if (formStatus) {
                        formStatus.textContent = 'Error al enviar el mensaje.';
                    }
                    console.error('Error:', error);
                }
            }));
        }
    });
}
