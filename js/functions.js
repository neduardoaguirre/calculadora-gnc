import {
    datosFijos,
    amortizacion,
    logo,
    form,
    contenido
} from './selectors.js'

const consulta = {
    costo_equipo: '',
    tanque_gnc: '',
    tanque_nafta: '',
    consumo: '',
    precio_gnc: '',
    precio_nafta: '',
    km_anuales: ''
}

export function datosConsulta(e) {
    consulta[e.target.name] = Number(e.target.value);
}

export function calcular(e) {
    e.preventDefault();
    const {
        costo_equipo,
        tanque_gnc,
        tanque_nafta,
        consumo,
        precio_gnc,
        precio_nafta,
        km_anuales
    } = consulta;

    if (costo_equipo === '' || tanque_gnc === '' || tanque_nafta === '' || consumo === '' || precio_gnc === '' || precio_nafta === '' || km_anuales === '') {
        msjError('Todos los campos son obligatorios');
        return;
    }
    if (costo_equipo <= 0 || tanque_gnc <= 0 || tanque_nafta <= 0 || consumo <= 0 || precio_gnc <= 0 || precio_nafta <= 0 || km_anuales <= 0 || isNaN(costo_equipo) || isNaN(tanque_gnc) || isNaN(tanque_nafta) || isNaN(consumo) || isNaN(precio_gnc) || isNaN(precio_nafta) || isNaN(km_anuales)) {
        msjError('Ingrese valores válidos');
        return;
    }

    limpiarHTML();
    armarDatosFijos(consulta);
    armarAmort(consulta);
}

export function armarDatosFijos(consulta) {
    const {
        tanque_gnc,
        tanque_nafta,
        consumo,
        precio_gnc,
        precio_nafta,
        km_anuales
    } = consulta;

    const tanqueLlenoNafta = tanque_nafta * precio_nafta;
    const cargaGas = tanque_gnc / 4.5;
    const tanqueLlenoGas = cargaGas * precio_gnc;
    const autonomiaGas = cargaGas / consumo * 100;
    const autonomiaNafta = tanque_nafta / consumo * 100;
    const autonomiaCombinada = autonomiaNafta + autonomiaGas;
    const kmMensuales = km_anuales / 12;

    const tituloDatos = document.createElement('h2');
    tituloDatos.textContent = 'Datos Fijos';
    tituloDatos.classList.add('text-center', 'mb-5');
    const nuevaConsulta = document.createElement('table');
    nuevaConsulta.classList.add('table');
    nuevaConsulta.innerHTML = `
    <tbody>
        <tr>
            <th>Tanque LLeno Nafta</th>
            <td scope="row">$${tanqueLlenoNafta}</td>
        </tr>
        <tr>
            <th>Tanque lleno Gas</th>
            <td scope="row">$${tanqueLlenoGas.toFixed(2)}</td>
        </tr>
        <tr>
            <th>Carga Gas Tanque lleno</th>
            <td scope="row">${cargaGas.toFixed(2)} m³</td>
        </tr>
        <tr>
            <th>Consumo Gas c/100 Km</th>
            <td scope="row">${consumo} m³</td>
        </tr>
        <tr>
            <th>Autonomía Gas</th>
            <td scope="row">${autonomiaGas.toFixed(2)} km</td>
        </tr>
        <tr>
            <th>Autonomía Nafta</th>
            <td scope="row">${autonomiaNafta.toFixed(2)} km</td>
        </tr>
        <tr>
            <th>Autonomía Combinada</th>
            <td scope="row">${autonomiaCombinada.toFixed(2)} km</td>
        </tr>
        <tr>
            <th>Km. por mes</th>
            <td scope="row">${kmMensuales.toFixed(2)} km</td>
        </tr>
    </tbody>
    `;

    logo.classList.remove('d-flex', 'justified-content-center');
    logo.classList.add('d-none');
    form.classList.remove('col-md-12', 'col-lg-6', 'mx-auto');
    form.classList.add('d-none');

    datosFijos.classList.remove('d-none');
    datosFijos.classList.add('col-md-12', 'col-sm-12', 'col-lg-6');
    datosFijos.appendChild(tituloDatos);
    datosFijos.appendChild(nuevaConsulta);
}

export function armarAmort(consulta) {
    const {
        costo_equipo,
        consumo,
        precio_gnc,
        precio_nafta,
        km_anuales
    } = consulta;

    const kmMensuales = km_anuales / 12;
    const costoNafta100k = (consumo / 100 * precio_nafta) * 100;
    const costoGas100k = (consumo / 100 * precio_gnc) * 100;
    const dif100 = costoNafta100k - costoGas100k;
    const extraNafta = costoNafta100k * 0.05;

    const tituloAmort = document.createElement('h2');
    tituloAmort.textContent = 'Amortización y Ahorro';
    tituloAmort.classList.add('text-center', 'mb-5');
    const datosAmort = document.createElement('table');
    datosAmort.classList.add('table', 'table-responsive-sm');
    datosAmort.innerHTML = `
    <thead>
        <tr>
            <th scope="col">Km</th>
            <th scope="col">100</th>
            <th scope="col">1000</th>
            <th scope="col">10000</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <th scope="row">Gasto Nafta</th>
            <td scope="row">$${costoNafta100k.toFixed(2)}</td>
            <td scope="row">$${(costoNafta100k * 10).toFixed(2)}</td> 
            <td scope="row">$${(costoNafta100k * 100).toFixed(2)}</td>
        </tr>
        <tr>
            <th scope="row">Gasto GNC</th>
            <td scope="row">$${costoGas100k.toFixed(2)}</td>
            <td scope="row">$${(costoGas100k * 10).toFixed(2)}</td> 
            <td scope="row">$${(costoGas100k * 100).toFixed(2)}</td>
        </tr>
        <tr>
            <th scope="row">Diferencia GNC/Nafta</th>
            <td scope="row">$${dif100.toFixed(2)}</td>
            <td scope="row">$${(dif100 * 10).toFixed(2)}</td> 
            <td scope="row">$${(dif100 * 100).toFixed(2)}</td>
        </tr>
        <tr>
            <th scope="row">Extra 5% Nafta</th>
            <td scope="row">$${extraNafta.toFixed(2)}</td>
            <td scope="row">$${(extraNafta * 10).toFixed(2)}</td> 
            <td scope="row">$${(extraNafta * 100).toFixed(2)}</td>
        </tr>
        <tr>
            <th scope="row">Ahorro real</th>
            <td scope="row">$${(dif100 - extraNafta).toFixed(2)}</td>
            <td scope="row">$${(dif100 * 10 - extraNafta *10).toFixed(2)}</td> 
            <td scope="row">$${(dif100 * 100 - extraNafta * 100).toFixed(2)}</td>
        </tr> 
    </tbody>
    `;

    const divTiempo = document.createElement('div');
    divTiempo.classList.add('alerta', 'text-center')
    divTiempo.innerHTML = `Tiempo de amortización
    ${Math.round(costo_equipo / (((dif100) * 10 - extraNafta *10) / 1000 * kmMensuales))} meses.`;

    const divAhorro = document.createElement('div');
    divAhorro.classList.add('alerta', 'text-center');
    divAhorro.innerHTML = `Ahorro mensual
    $${(((dif100) * 10 - extraNafta *10) / 1000 * kmMensuales).toFixed(2)}`;

    amortizacion.classList.remove('d-none');
    amortizacion.classList.add('col-lg-6');
    amortizacion.appendChild(tituloAmort);
    amortizacion.appendChild(datosAmort);
    amortizacion.appendChild(divTiempo);
    amortizacion.appendChild(divAhorro);

    const btnBack = document.createElement('button');
    btnBack.classList.add('btn', 'btn-primary', 'btn-lg', 'mx-auto', 'mt-3');
    btnBack.textContent = 'Nueva Consulta';
    btnBack.onclick = () => {
        btnBack.remove();
        volver();
    }
    contenido.appendChild(btnBack);
}

export function volver() {
    formulario.reset();
    limpiarObjeto();
    datosFijos.classList.add('d-none');
    datosFijos.classList.remove('col-md-12', 'col-sm-12', 'col-lg-6');
    amortizacion.classList.add('d-none');
    amortizacion.classList.remove('col-lg-6');
    logo.classList.add('d-flex', 'justified-content-center');
    logo.classList.remove('d-none');
    form.classList.add('col-md-12', 'col-lg-6', 'mx-auto');
    form.classList.remove('d-none');

}

export function limpiarObjeto() {
    consulta.costo_equipo = '',
        consulta.tanque_gnc = '',
        consulta.tanque_nafta = '',
        consulta.consumo = '',
        consulta.precio_gnc = '',
        consulta.precio_nafta = '',
        consulta.km_anuales = ''
}

export function msjError(msj) {
    const divMsj = document.createElement('div');
    divMsj.classList.add('text-center', 'alert', 'd-block', 'col-12');
    divMsj.classList.add('alert-danger');
    divMsj.textContent = msj;
    formulario.appendChild(divMsj);
    setTimeout(() => {
        divMsj.remove();
    }, 2500);
}

export function limpiarHTML() {
    while (datosFijos.firstChild) {
        datosFijos.removeChild(datosFijos.firstChild);
    }
    while (amortizacion.firstChild) {
        amortizacion.removeChild(amortizacion.firstChild);
    }
}