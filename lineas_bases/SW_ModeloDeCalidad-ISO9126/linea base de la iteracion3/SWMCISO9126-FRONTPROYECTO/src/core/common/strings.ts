export const cleanString = (cadena: string): string => {
  // Definimos los caracteres que queremos eliminar
  // Lo queremos devolver limpio en minusculas
  let newCadena = cadena.toLowerCase()
    .trim();
  // Quitamos espacios y los sustituimos por _ porque nos gusta mas asi
  newCadena = newCadena.replace(/ /g, '.');
  // Quitamos acentos y "ñ". Fijate en que va sin comillas el primer parametro
  newCadena = newCadena.replace(/á/gi, 'a');
  newCadena = newCadena.replace(/é/gi, 'e');
  newCadena = newCadena.replace(/í/gi, 'i');
  newCadena = newCadena.replace(/ó/gi, 'o');
  newCadena = newCadena.replace(/ú/gi, 'u');
  newCadena = newCadena.replace(/ñ/gi, 'n');

  return newCadena;
};

export const cleanStringForSearch = (cadena: string): string => {
  // Definimos los caracteres que queremos eliminar
  // Lo queremos devolver limpio en minusculas
  let newCadena = cadena.toLowerCase()
    .trim();
  // Quitamos espacios y los sustituimos por _ porque nos gusta mas asi
  newCadena = newCadena.replace(/ /g, '|');
  // Quitamos acentos y "ñ". Fijate en que va sin comillas el primer parametro
  newCadena = newCadena.replace(/á/gi, 'a');
  newCadena = newCadena.replace(/é/gi, 'e');
  newCadena = newCadena.replace(/í/gi, 'i');
  newCadena = newCadena.replace(/ó/gi, 'o');
  newCadena = newCadena.replace(/ú/gi, 'u');
  newCadena = newCadena.replace(/ñ/gi, 'n');

  return newCadena;
};
