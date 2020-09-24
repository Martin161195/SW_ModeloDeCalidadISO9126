/**
 * Convierte un string con el formato yyyy-MM-dd a un objeto Date
 * @param value String que sera convertido
 * @param separator String que separa el string
 * @returns el Objeto Date si se puede convertir
 */
export const GetDateFromYYYYMMDDString = (value: string, separator: string): Date => {
  const values = value.split(separator)
    .map((v: string) => parseInt(v, 10));
  if (values.length === 3) {
    return new Date(values[0], values[1] - 1, values[2]);
  }

  return new Date();
};

/**
 * Convierte un string con el formato yyyy-MM-dd a un objeto Date
 * @param value String que sera convertido
 * @param separator String que separa el string
 * @returns el Objeto Date si se puede convertir
 */
export const GetDateFromhhmmssString = (value: string, separator: string): Date => {
  const values = value.split(separator)
    .map((v: string) => parseInt(v, 10));
  if (values.length === 3) {
    return new Date(0, 0, 0, values[0], values[1], values[2]);
  }

  return new Date();
};

export const GetDateFromYYYYMMDDhhmmssString = (date: string, hour: string): Date => {
  const values = date.split('-')
    .map((v: string) => parseInt(v, 10));
  if (values.length === 3) {
    const values1 = hour.split(':')
      .map((v: string) => parseInt(v, 10));
    if (values1.length === 3) {
      return new Date(values[0], values[1] - 1, values[2], values1[0], values1[1], values1[2]);
    }
  }

  return new Date();
};

/**
 * Total de minutos de una fecha
 * @param date Fecha
 * @returns number
 */
export const MinutesOfDay = (date: Date): number => {
  return date.getHours() * 60 + date.getMinutes();
};

/**
 * Verificación de dos fechas para identificar si son iguales
 * @param date Fecha que se va a comparar
 * @param dateCompare Fecha que se utilizara como comparación
 * @returns TRUE si las fechas son iguales, de lo contrario FALSE
 */
export const IsSameDate = (date: Date, dateCompare: Date): boolean => {
  return date &&
    date.getFullYear() === dateCompare.getFullYear() &&
    date.getMonth() === dateCompare.getMonth() &&
    date.getDate() === dateCompare.getDate();
};

/**
 * Verificación de dos fechas para identificar si son iguales
 * @param date Fecha que se va a comparar
 * @param dateCompare Fecha que se utilizara como comparación
 * @returns TRUE si las fechas son iguales, de lo contrario FALSE
 */
export const IsSameHour = (date: Date, dateCompare: Date): boolean => {
  return date && dateCompare &&
    date.getHours() === dateCompare.getHours() &&
    date.getMinutes() === dateCompare.getMinutes();
};

/**
 * Adición de días a una fecha
 * @param date Fecha a la que se aumentara los días
 * @param daysAdd Cantidad de días que se agregaran a la fecha
 * @return Nueva fecha
 */
export const AddDays = (date: Date, daysAdd: number): Date => {
  const dateNew = new Date(+date);
  dateNew.setDate(dateNew.getDate() + daysAdd);

  return dateNew;
};

/**
 * Adición de meses a una fecha
 * @param date Fecha a la que se aumentara los meses
 * @param monthsAdd Cantidad de meses que se agregaran a la fecha
 * @returns Nueva fecha
 */
export const AddMonths = (date: Date, monthsAdd: number): Date => {
  const dateNew = new Date(+date);
  dateNew.setMonth(dateNew.getMonth() + monthsAdd);

  return dateNew;
};

/**
 * Adición de años a una fecha
 * @param date Fecha a la que se aumentara los años
 * @param yearsAdd Cantidad de años que se agregaran a la fecha
 * @returns Nueva fecha
 */
export const AddYears = (date: Date, yearsAdd: number): Date => {
  const dateNew = new Date(+date);
  dateNew.setFullYear(dateNew.getFullYear() + yearsAdd);

  return dateNew;
};

export const IsToday = (date: Date): boolean => {
  const today = new Date();

  return IsSameDate(date, today);
};

export const CloneDate = (date: Date): Date => {
  return new Date(+date);
};

export const IsAnotherMonth = (date: Date, dateCompate: Date): boolean => {
  return date && date.getMonth() !== dateCompate.getMonth();
};

export const IsWeekend = (date: Date): boolean => {
  return date.getDay() === 0 || date.getDay() === 6;
};

export const GetStringDate = (date: Date): String => {
  // Nombre de meses en español
  const monthNames =
    ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Setiembre', 'Octubre', 'Noviembre', 'Deciembre'];
  // Month names in English
  // let monthNames =
  // ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const today = new Date();
  if (date.getMonth() === today.getMonth() && date.getDay() === today.getDay()) {
    return 'Hoy';
  } else if (date.getMonth() === today.getMonth() && date.getDay() === today.getDay() + 1) {
    return 'Mañana';
  } else if (date.getMonth() === today.getMonth() && date.getDay() === today.getDay() - 1) {
    return 'Ayer';
  }

  return `${date.getDay()} de ${monthNames[date.getMonth()]} de ${date.getFullYear()}`;
};

/**
 * Retornar nombre del Mes de la fecha dada
 * @param date Fecha de quien se quiere saber el mes
 * @return Nueva fecha
 */
export const GetNameMonth = (date: Date): string => {
  // tslint:disable-next-line:max-line-length
  const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Setiembre', 'Octubre', 'Noviembre', 'Deciembre'];

  return monthNames[date.getMonth()];
};

/**
 * Retornar nombre del Mes y Año de la fecha dada
 * @param date Fecha de quien se quiere saber el mes
 * @return Nueva fecha
 */
export const GetNameMonthYear = (date: Date): string => {
  // tslint:disable-next-line:max-line-length
  const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Setiembre', 'Octubre', 'Noviembre', 'Deciembre'];

  return `${monthNames[date.getMonth()]} ${date.getFullYear()}`;
};

/**
 * Retornar nombre del inicio al final de los dias con el mes
 * @param dateStart Fecha de donde se incia
 * @param dateEnd Fecha de Fin
 * @return string
 */
export const GetNameBetween = (dateStart: Date, dateEnd: Date): string => {
  // tslint:disable-next-line:max-line-length
  const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Setiembre', 'Octubre', 'Noviembre', 'Deciembre'];

  const dateEndNew = new Date(+dateEnd);
  dateEndNew.setDate(dateEndNew.getDate() - 1);

  const initDay = (dateStart.getDate() < 10) ? `0${dateStart.getDate()}` : dateStart.getDate();
  const endDay = (dateEndNew.getDate() < 10) ? `0${dateEndNew.getDate()}` : dateEndNew.getDate();

  return `Del ${initDay} al ${endDay} de ${monthNames[dateEndNew.getMonth()]}`;
};

export const GetDaySort = (date: Date): string => {
  const dayNames = ['DOM', 'LUN', 'MAR', 'MIÉ', 'JUE', 'VIE', 'SÁB'];

  return `${dayNames[date.getDay()]}`;
};
