import {
    costoEquipo,
    tanqueGnc,
    tanqueNafta,
    consumo,
    precioGnc,
    precioNafta,
    kmAnuales,
    formulario
} from '../selectors.js';

import {
    datosConsulta,
    calcular
} from '../functions.js';

class App {
    constructor() {
        this.initApp();
    }

    initApp() {
        costoEquipo.addEventListener('input', datosConsulta);
        tanqueGnc.addEventListener('input', datosConsulta);
        tanqueNafta.addEventListener('input', datosConsulta);
        consumo.addEventListener('input', datosConsulta);
        precioGnc.addEventListener('input', datosConsulta);
        precioNafta.addEventListener('input', datosConsulta);
        kmAnuales.addEventListener('input', datosConsulta);
        formulario.addEventListener('submit', calcular);
    }
}

export default App;