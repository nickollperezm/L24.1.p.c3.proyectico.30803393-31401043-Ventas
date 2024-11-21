import Cl_tienda from "./Cl_tienda.js";
import Dt_tienda from "./Dt_tienda.js";
import Cl_venta from "./Cl_venta.js";
import Dt_ventas from "./Dt_ventas.js";

let tienda = new Cl_tienda(Dt_tienda.montoCaja, Dt_tienda.porcIncremento);

Dt_ventas.forEach((venta) => tienda.agregarVenta(venta.cliente, venta.factura, venta.costo, venta.cnArticulos));

let agregarVenta = (tienda, salida) => {
    let cliente = prompt("Ingrese el nombre del cliente");
    let factura = prompt("Ingrese el nro de factura");
    let costo = prompt("Ingrese el costo");
    let cnArticulos = prompt("Ingrese la cantidad de articulos");
    tienda.agregarVenta(cliente, factura, costo, cnArticulos);
    salida.innerHTML = `<br>Venta agregada`;
}
let modificarVenta = (tienda, salida) => {
    let factura = prompt("Ingrese el nro de la factura a modificar");
    let resultado = tienda.ventas.filter((venta) => venta.factura == factura);
    if (resultado.length == 0) {
        salida.innerHTML = `<br>No existe ninguna venta con ese nro de factura`;
    } else if (resultado.length > 0) {
        let cliente = prompt("Ingrese el nuevo nombre del cliente");
        let costo = prompt("Ingrese el nuevo costo de la venta");
        let cnArticulos = prompt("Ingrese la nueva cantidad de articulos");
        let porcIncremento = Dt_tienda.porcIncremento;
        tienda.modificarVenta(factura, new Cl_venta(cliente, factura, costo, cnArticulos, porcIncremento));
        salida.innerHTML = `<br>Venta con factura nro ${factura} modificada`;
    }
}
let eliminarVenta = (tienda, salida) => {
    let factura = prompt("Ingrese el nro de la factura a eliminar");
    if(tienda.eliminarVenta(factura))
        salida.innerHTML = `<br>Venta con factura nro ${factura} eliminada`;
    else 
        salida.innerHTML = `<br>No existe ninguna venta con ese nro de factura`;
}
let clientesMontoMayor = (tienda, salida) => {
    let ventas = tienda.clientesMontoMayor();
    salida.innerHTML = `<br>Clientes que pagaron el monto mayor:`;
    ventas.forEach((venta) => {
        salida.innerHTML += `<br>${venta.cliente}`
    });
}
let clientesSoloUnArt = (tienda, salida) => {
    let ventas = tienda.clientesSoloUnArt();
    if(ventas.length == 0) {
        salida.innerHTML = `<br>No hay clientes que solo llevaron 1 articulo`;
        return;
    }
    salida.innerHTML = `<br>Clientes que solo llevaron 1 articulo:`;
    ventas.forEach((venta) => {
        salida.innerHTML += `<br>${venta.cliente}`
    });
}
let listarVentas = () => {
    let ventas = tienda.ventas;
    let salidaTmp = `
    <br><table>
    <tr>
    <th>Cliente</th>
    <th>Factura</th>
    <th>Costo</th>
    <th>Cnt de articulos</th>
    </tr>
    `;
    ventas.forEach((venta) => {
        salidaTmp += `<tr>
        <td>${venta.cliente}</td>
        <td>${venta.factura}</td>
        <td>${venta.costo}</td>
        <td>${venta.cnArticulos}</td>
        </tr>`;
    });
    salidaTmp += `</table>`;
    salida2.innerHTML = salidaTmp;
};

let salida1 = document.getElementById("salida1");
let salida2 = document.getElementById("salida2");
let opciones = document.getElementById("opciones");
salida1.innerHTML = `
Seleccione una de las siguientes opciones:
<br>
<br>1. Agregar una venta.
<br>2. Modificar una venta.
<br>3. Eliminar una venta.
<br>4. Monto final en caja.
<br>5. Clientes que pagaron el monto mayor.
<br>6. Clientes que solo llevaron 1 articulo.
<br>7. Listar ventas.
`;
opciones.onclick = () => {
    let opcion = +prompt("Seleccione su opcion:")
    switch(opcion) {
        case 1:
            agregarVenta(tienda, salida2);
            break;
        case 2:
            modificarVenta(tienda, salida2);
            break;
        case 3:
            eliminarVenta(tienda, salida2);
            break;
        case 4:
            salida2.innerHTML = `<br>Monto final en caja: $${tienda.montoFinalCaja()}`;
            break;
        case 5:
            clientesMontoMayor(tienda, salida2);
            break;
        case 6:
            clientesSoloUnArt(tienda, salida2);
            break;
        case 7:
            listarVentas();
            break;
    }
};