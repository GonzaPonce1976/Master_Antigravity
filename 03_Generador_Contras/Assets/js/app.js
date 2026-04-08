document.addEventListener('DOMContentLoaded', () => {
    // Definimos DOM Elements
    const themeToggle = document.getElementById('theme-toggle');
    const lengthSlider = document.getElementById('length-slider');
    const lengthValue = document.getElementById('length-value');
    
    const chkUppercase = document.getElementById('chk-uppercase');
    const chkLowercase = document.getElementById('chk-lowercase');
    const chkNumbers = document.getElementById('chk-numbers');
    const chkSymbols = document.getElementById('chk-symbols');
    
    const passwordOutput = document.getElementById('password-output');
    const generateBtn = document.getElementById('generate-btn');
    const copyBtn = document.getElementById('copy-btn');
    const toggleVisibilityBtn = document.getElementById('toggle-visibility-btn');
    
    const iconEye = document.getElementById('icon-eye');
    const iconEyeOff = document.getElementById('icon-eye-off');
    
    const strengthText = document.getElementById('strength-text');
    const bars = [
        document.getElementById('bar-1'),
        document.getElementById('bar-2'),
        document.getElementById('bar-3'),
        document.getElementById('bar-4')
    ];
    
    const copyFeedback = document.getElementById('copy-feedback');
    const generateFeedback = document.getElementById('generate-feedback');

    // Mapeo de caracteres
    const CHAR_SETS = {
        uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        lowercase: 'abcdefghijklmnopqrstuvwxyz',
        numbers: '0123456789',
        symbols: '!@#$%^&*()_+-=[]{}|;:\'",./<>?'
    };

    // Almacenar timeout de feedback visual para poder cancelarlo si el usuario hace varios clics rápidos
    let copyTimeout = null;
    let generateTimeout = null;

    // Actualizar valor de longitud al deslizar
    lengthSlider.addEventListener('input', (e) => {
        lengthValue.textContent = e.target.value;
    });

    // Evento generar contraseña
    generateBtn.addEventListener('click', (e) => {
        e.preventDefault();
        limpiarFeedback(generateFeedback);
        
        const length = parseInt(lengthSlider.value, 10);
        const includeUppercase = chkUppercase.checked;
        const includeLowercase = chkLowercase.checked;
        const includeNumbers = chkNumbers.checked;
        const includeSymbols = chkSymbols.checked;

        if (!includeUppercase && !includeLowercase && !includeNumbers && !includeSymbols) {
            mostrarError('Debes seleccionar al menos una opción.');
            passwordOutput.value = '';
            actualizarFortalezaUI('', 0);
            return;
        }

        let charPool = '';
        if (includeUppercase) charPool += CHAR_SETS.uppercase;
        if (includeLowercase) charPool += CHAR_SETS.lowercase;
        if (includeNumbers) charPool += CHAR_SETS.numbers;
        if (includeSymbols) charPool += CHAR_SETS.symbols;

        let password = '';
        
        // Uso de web crypto API para mayor seguridad (si está disponible)
        if (window.crypto && window.crypto.getRandomValues) {
            const randomValues = new Uint32Array(length);
            window.crypto.getRandomValues(randomValues);
            for (let i = 0; i < length; i++) {
                password += charPool[randomValues[i] % charPool.length];
            }
        } else {
            // Fallback poco común
            for (let i = 0; i < length; i++) {
                const randomIndex = Math.floor(Math.random() * charPool.length);
                password += charPool[randomIndex];
            }
        }

        passwordOutput.value = password;
        
        // Evaluar y mostrar la fortaleza
        const fortaleza = calcularFortaleza(password, includeUppercase, includeLowercase, includeNumbers, includeSymbols);
        actualizarFortalezaUI(fortaleza.texto, fortaleza.nivel);
    });

    // Copiar al portapapeles
    copyBtn.addEventListener('click', async (e) => {
        e.preventDefault();
        limpiarFeedback(copyFeedback);
        
        const text = passwordOutput.value;
        if (!text) return;

        try {
            await navigator.clipboard.writeText(text);
            mostrarMensajeCopiado();
        } catch (err) {
            // Fallback de retrocompatibilidad
            passwordOutput.select();
            document.execCommand('copy');
            mostrarMensajeCopiado();
        }
    });

    // Mostrar/Ocultar contraseña toggle
    toggleVisibilityBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (passwordOutput.type === 'password') {
            passwordOutput.type = 'text';
            iconEye.classList.remove('hidden');
            iconEyeOff.classList.add('hidden');
        } else {
            passwordOutput.type = 'password';
            iconEye.classList.add('hidden');
            iconEyeOff.classList.remove('hidden');
        }
    });

    // Lógica para detectar la fortaleza según requerimientos e implementaciones habituales
    function calcularFortaleza(password, u, l, n, s) {
        let optionsCount = 0;
        if (u) optionsCount++;
        if (l) optionsCount++;
        if (n) optionsCount++;
        if (s) optionsCount++;

        let nivel = 0; // 0 hasta 4
        let texto = 'Pobre';

        // Lógica sencilla de pesos 
        if (password.length >= 8 && optionsCount >= 1) nivel = 1;
        if (password.length >= 10 && optionsCount >= 2) nivel = 2;
        if (password.length >= 12 && optionsCount >= 3) nivel = 3;
        if (password.length >= 16 && optionsCount === 4) nivel = 4;

        // Sobrescribir niveles para forzar nombres claros
        if(password.length < 8) {
            nivel = 1;
        }

        switch(nivel) {
            case 1: texto = 'Útil'; break;
            case 2: texto = 'Media'; break;
            case 3: texto = 'Fuerte'; break;
            case 4: texto = 'Segura'; break;
            default: texto = 'Pobre'; nivel = 1; break;
        }

        if (password.length < 8) {
            texto = 'Pobre';
        }

        return { texto, nivel };
    }

    // Pinta las barras según el nivel 
    function actualizarFortalezaUI(texto, nivel) {
        strengthText.textContent = texto;

        bars.forEach(bar => {
            bar.style.backgroundColor = 'transparent';
            bar.style.borderColor = 'var(--border)';
        });

        if (nivel === 0) return;

        let color = '';
        if (nivel === 1) color = 'var(--strength-poor)';
        else if (nivel === 2) color = 'var(--strength-weak)';
        else if (nivel === 3) color = 'var(--strength-medium)';
        else if (nivel === 4) color = 'var(--strength-strong)';

        for (let i = 0; i < nivel; i++) {
            bars[i].style.backgroundColor = color;
            bars[i].style.borderColor = color;
        }
    }

    // Funciones Helper para manipular el DOM sin alert(...) ni innerHTML
    function mostrarMensajeCopiado() {
        if (copyTimeout) clearTimeout(copyTimeout);
        
        limpiarFeedback(copyFeedback);
        
        const span = document.createElement('span');
        span.textContent = '¡Copiado al portapapeles!';
        copyFeedback.appendChild(span);
        
        copyTimeout = setTimeout(() => {
            limpiarFeedback(copyFeedback);
        }, 3000);
    }

    function mostrarError(mensaje) {
        if (generateTimeout) clearTimeout(generateTimeout);
        
        limpiarFeedback(generateFeedback);
        
        const span = document.createElement('span');
        span.textContent = mensaje;
        generateFeedback.appendChild(span);
        
        generateTimeout = setTimeout(() => {
             limpiarFeedback(generateFeedback);
        }, 4000);
    }

    function limpiarFeedback(contenedor) {
        while(contenedor.firstChild) {
            contenedor.removeChild(contenedor.firstChild);
        }
    }

    // Setup base
    actualizarFortalezaUI('', 0);
    strengthText.textContent = '';

    // Theme Switch Logic
    const initTheme = () => {
        const isLightMode = localStorage.getItem('theme') === 'light';
        if (isLightMode) {
            document.body.classList.add('light-mode');
            themeToggle.checked = true;
        }
    };
    initTheme();

    themeToggle.addEventListener('change', (e) => {
        if(e.target.checked) {
            document.body.classList.add('light-mode');
            localStorage.setItem('theme', 'light');
        } else {
            document.body.classList.remove('light-mode');
            localStorage.setItem('theme', 'dark');
        }
    });

});
