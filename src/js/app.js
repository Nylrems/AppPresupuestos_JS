const ingresos = [
  new Ingreso("Salario", 2100),
  new Ingreso("Venta coche", 1500),
];
const egresos = [
  new Egreso("Compra de tarjeta", 700),
  new Egreso("Ropa de paca", 60),
];

let cargarApp = () => {
  cargarCabecero();
  cargarIngresos();
  cargarEgresos();
};

const totalIngresos = () => {
  let totalIngreso = 0;
  for (let ingreso of ingresos) {
    totalIngreso += ingreso.valor;
  }
  return totalIngreso;
};

const totalEgresos = () => {
  let totalEgreso = 0;
  for (let egreso of egresos) {
    totalEgreso += egreso.valor;
  }
  return totalEgreso;
};

const formatoMoneda = (valor) => {
  return valor.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });
};

const formatoPorcentaje = (valor) => {
  return valor.toLocaleString("en-US", {
    style: "percent",
    minimumFractionDigits: 2,
  });
};

let cargarCabecero = () => {
  let presupuesto = totalIngresos() - totalEgresos();
  let procentajeEgreso = totalEgresos() / totalIngresos();

  document.getElementById("presupuesto").innerHTML = formatoMoneda(presupuesto);
  document.getElementById("porcentaje").innerHTML =
    formatoPorcentaje(procentajeEgreso);
  document.getElementById("ingresos").innerHTML = formatoMoneda(
    totalIngresos()
  );
  document.getElementById("egresos").innerHTML = formatoMoneda(totalEgresos());
};

const eliminarIngreso = (id) => {
  let indiceEliminar = ingresos.findIndex((ingreso) => ingreso.id === id);
  ingresos.splice(indiceEliminar, 1); //Eliminado el valor de los arreglos
  cargarCabecero();
  cargarIngresos();
};

const cargarIngresos = () => {
  let ingresosHTML = "";
  for (let ingreso of ingresos) {
    ingresosHTML += crearIngresoHTML(ingreso);
  }
  document.getElementById("lista-ingresos").innerHTML = ingresosHTML;
};

const crearIngresoHTML = (ingreso) => {
  let ingresoHTML = `<div class="elemento limpiarEstilos">
<div class="elemento_descripcion">${ingreso.descripcion}</div>
<div class="derecha limpiarEstilos">
  <div class="elemento_valor">${formatoMoneda(ingreso.valor)}</div>
  <div class="elemento_eliminar">
    <button class="elemento_eliminar--btn">
      <ion-icon name="trash"
      onclick='eliminarIngreso(${ingreso.id})'></ion-icon>
    </button>
  </div>
</div>
</div>`;

  return ingresoHTML;
};

const eliminarEgreso = (id) => {
  let indiceEliminar = egresos.findIndex((egreso) => egreso.id === id);
  egresos.splice(indiceEliminar, 1); //Eliminado el valor de los arreglos
  cargarCabecero();
  cargarEgresos();
};

const cargarEgresos = () => {
  let egresosHTML = "";
  for (let egreso of egresos) {
    egresosHTML += crearEgresoHTML(egreso);
  }
  document.getElementById("lista-egresos").innerHTML = egresosHTML;
};

const crearEgresoHTML = (egreso) => {
  let egresoHTML = `<div class="elemento limpiarEstilos">
<div class="elemento_descripcion">${egreso.descripcion}</div>
<div class="derecha limpiarEstilos">
  <div class="elemento_valor">${formatoMoneda(egreso.valor)}</div>
  <div class="elemento_porcentaje">${formatoPorcentaje(
    egreso.valor / totalEgresos()
  )}</div>
  <div class="elemento_eliminar">
    <button class="elemento_eliminar--btn">
      <ion-icon name="trash"
      onclick='eliminarEgreso(${egreso.id})'></ion-icon>
    </button>
  </div>
</div>
</div>`;

  return egresoHTML;
};

const agregarDato = () => {
  let forma = document.forms["forma"];
  let tipo = forma["tipo"];
  let descripcion = forma["descripcion"];
  let valor = forma["valor"];
  if (descripcion.value !== "" && valor.value !== "") {
    if (tipo.value === "ingreso") {
      ingresos.push(new Ingreso(descripcion.value, Number(valor.value)));
      cargarCabecero();
      cargarIngresos();
    }
    else if (tipo.value === "egreso") {
      egresos.push(new Egreso(descripcion.value, Number(valor.value)));
      cargarCabecero();
      cargarEgresos();
    }
  }
};
