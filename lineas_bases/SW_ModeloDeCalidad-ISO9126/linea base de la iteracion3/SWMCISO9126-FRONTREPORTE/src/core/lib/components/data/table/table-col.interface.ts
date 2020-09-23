export interface ITableCol {
  data: {
    key: string; // nombre de la propiedad del objeto que sirve para traer el valor del objeto
    name: string; // nombre que aparecera en la tabla
    isDate?: boolean; // si el campo sera una fecha
    isPrice?: {
      currency: string;
    }; // si tendra el formato de precio
    isChip?(value: string): string; // si el campo tendra un formato de chip
  };
  width: number; // ancho de la tabla
  sort?: {
    key: string; // key que se envia para el orden del request
    order?: 'ASC' | 'DESC' | any; // tipo de orden
  };
}
