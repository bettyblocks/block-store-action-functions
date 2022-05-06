import { TorusGeometry, MeshStandardMaterial, Mesh } from "three";

const geometry = new TorusGeometry(10, 3, 16, 100);
const material = new MeshStandardMaterial({color: 0xe63946});

const torus = new Mesh(geometry, material);

export default torus;