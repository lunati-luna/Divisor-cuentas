export interface Persona {
  id: number;
  nombre: string;
}

export interface Item {
  id: number;
  nombre: string;
  precio: number;
  consumidores: number[]; // ids de las personas que lo consumieron
}