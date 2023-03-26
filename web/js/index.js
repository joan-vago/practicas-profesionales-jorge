Date.prototype.getWeek = function() {
  const date = new Date(this.getTime());
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
  const firstWeek = new Date(date.getFullYear(), 0, 4);
  return 1 + Math.round(((date.getTime() - firstWeek.getTime()) / 86400000 - 3 + (firstWeek.getDay() + 6) % 7) / 7);
};

// Crear una instancia de la fecha de hoy
const hoy = new Date();

// Obtener el número de la semana correspondiente a la fecha actual
const numSemana = hoy.getWeek();

// Obtener el año correspondiente a la fecha actual
const anio = hoy.getFullYear();

// Imprimir el número de la semana y el año actual
console.log(`Estamos en la semana número ${numSemana} del año ${anio}.`);



