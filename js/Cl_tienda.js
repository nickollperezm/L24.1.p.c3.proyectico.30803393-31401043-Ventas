import Cl_venta from "./Cl_venta.js";
export default class Cl_tienda {
    constructor(montoCaja, porcIncremento) {
        this.montoCaja = montoCaja;
        this.porcIncremento = porcIncremento;
        this.ventas = [];
    }
    set montoCaja(montoCaja) {
        this._montoCaja = +montoCaja;
    }
    get montoCaja() {
        return this._montoCaja;
    }
    set porcIncremento(porcIncremento) {
        this._porcIncremento = +porcIncremento;
    }
    get porcIncremento() {
        return this._porcIncremento;
    }
    agregarVenta(cliente, factura, costo, cnArticulos) {
        let venta = new Cl_venta(cliente, factura, costo, cnArticulos, this.porcIncremento);
        this.ventas.push(venta);
    }
    modificarVenta(factura, agregarVenta) {
        let indexVenta = -1;
        for(let i=0; i < this.ventas.length; i++) {
            if(this.ventas[i].factura == factura) {
                indexVenta = i;
            }
        }
        if(indexVenta !== -1) {
            this.ventas.splice(indexVenta, 1, agregarVenta);
        }
        return indexVenta !== -1;
    }
    eliminarVenta(factura) {
        let indexVenta = -1;
        for(let i=0; i < this.ventas.length; i++) {
            if(this.ventas[i].factura == factura) {
                indexVenta = i;
            }
        }
        if(indexVenta !== -1) {
            this.ventas.splice(indexVenta, 1);
        }
        return indexVenta !== -1;
    }
    montoFinalCaja() {
        let montoFinalCaja = this.montoCaja;
        this.ventas.forEach((venta) => {montoFinalCaja += venta.costoVenta()});
        return montoFinalCaja;
    }
    mayorMonto() {
        let mayorMonto = this.ventas[0].costoVenta();
        for(let i=0; i < this.ventas.length; i++) {
            if(this.ventas[i].costoVenta() > mayorMonto) {
                mayorMonto = this.ventas[i].costoVenta();
            }
        }
        return mayorMonto;
    }
    clientesMontoMayor() {
        let clientesMayorMonto = this.mayorMonto();
        return this.ventas.filter((venta) => venta.costoVenta() == clientesMayorMonto);
    }
    clientesSoloUnArt() {
        let clientesUnArt = this.ventas.filter((venta) => venta.cnArticulos == 1);
        return clientesUnArt;
    }
}