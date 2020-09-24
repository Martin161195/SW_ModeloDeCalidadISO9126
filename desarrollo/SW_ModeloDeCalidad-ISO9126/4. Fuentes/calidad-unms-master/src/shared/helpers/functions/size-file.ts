export interface IUnity {
  size: number;
  unity: string;
}

export const Variables = {
  MEGABYTE: Math.pow(2, 20),
  KILOBYTE: Math.pow(2, 10)
};

/**
 * Conversion del tamaño que nos da un File hacia el tamaño con unidad de medida
 * @param size Fecha que se va a comparar
 * @returns un objeto con la unidad y el tamaño
 */
export const convert = (size: number): IUnity => {
  const unidad: any = {};
  if (size > Variables.MEGABYTE) {
    unidad.unity = 'Mb';
    unidad.size = parseFloat((size / Variables.MEGABYTE).toFixed(2));
  } else if (size > Variables.KILOBYTE) {
    unidad.unity = 'Kb';
    unidad.size = parseFloat((size / Variables.KILOBYTE).toFixed(2));
  }

  return unidad;
};
