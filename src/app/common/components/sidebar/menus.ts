export interface Menus {
  nombre: string;
  icon: string;
  url: string;
  submenu: Array <{ nombre: string,  icon: string, url: string }>;
}
