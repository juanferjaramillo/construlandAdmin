const columns = [
  "id",
  "nombre",
  "codigoBarras",
  "embalaje",
  "precioBase",
  "prodUrl",
  "descripcion",
  "tax",
  "stateId",
  "provider",
  "categoryId",
  "category",
  "keto",
  "vegano",
  "vegetariano",
  "diabetico",
  "proteina",
  "gluten",
  "portfolios",
  "ownerId",
  "existencia",
  "rotacion",
  "agotado",
  "limitado",
];

export const validateCSV = (arrProd) => {
  let resultado = "OK";
  //----validate column headers---------
  //verifica que las columnas tienen un header valido y retorna cuales no lo tienen.
  const arrValidColumn = Object.keys(arrProd[0]).map((col) =>
    columns.includes(col)
  );
  let vc = [];
  for (let i = 0; i < arrValidColumn.length; i++) {
    if (!arrValidColumn[i]) {
      vc.push(i + 1);
    }
  }
  if (vc.length === 1) {
    alert(`El nombre de la columna ${vc} no es válido, no se importaron datos`);
    resultado = "error en el nombre de las columnas";
  }
  if (vc.length > 1) {
    alert(
      `El nombre de las columnas ${vc} no son válidos, no se importaron datos`
    );
    resultado = "error en el nombre de las columnas";
  }

  //---------validate tipos de datos segun el modelo de Product-------------------
  const sino = ["SI", "NO", "si", "no", "Si", "No"];
  const iva = [0, 5, 8, 16, 19];

  arrProd.map((p) => {
    if (p.id && isNaN(p.id)) {
      console.log("error1");
      resultado = "error en el id";
    }
    if (p.embalaje && isNaN(p.embalaje)) {
      console.log("error2");
      resultado = "error en el embalaje";
    }
    if (p.precioBase && isNaN(p.precioBase)) {
      console.log("error3");
      resultado = "error en el precio base";
    }
    if (p.tax && isNaN(p.tax)) {
      console.log("error4");
      resultado = "error en el IVA";
    }
    if (p.stateId && isNaN(p.stateId)) {
      console.log("error5");
      resultado = "error en el estado";
    }
    if (p.categoryId && isNaN(p.categoryId)) {
      console.log("error6");
      resultado = "error en la categoryId";
    }

    if (p.portfolios) {
      const prt = p.portfolios.split("|");
      prt.map((q) => (isNaN(q) ? (resultado = false) : null));
    }
    if (p.ownerId && isNaN(p.ownerId)) {
      console.log("error8");
      resultado = "error en los portafolios";
    }
    if (p.keto && !sino.includes(p.keto)) {
      console.log("error9");
      resultado = "error en Keto";
    }
    if (p.vegano && !sino.includes(p.vegano)) {
      console.log("error10");
      resultado = "error en Vegano";
    }
    if (p.vegetariano && !sino.includes(p.vegetariano)) {
      console.log("error11");
      resultado = "error en Vegetariano";
    }
    if (p.diabetico && !sino.includes(p.diabetico)) {
      console.log("error12");
      resultado = "error en Diabético";
    }
    if (p.proteina && !sino.includes(p.proteina)) {
      console.log("error13");
      resultado = "error en Proteina";
    }
    if (p.gluten && !sino.includes(p.gluten)) {
      console.log("error14");
      resultado = "error en Gluten";
    }
    if (p.tax && !iva.includes(Number(p.tax))) {
      console.log("error iva");
      resultado = "error en IVA - no existe este porcentaje";
    }
  });
  // console.log(resultado);
  return resultado;
};
