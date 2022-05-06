import { PlaneGeometry, MeshBasicMaterial, Mesh , FrontSide} from "three";

const geometry = new PlaneGeometry(100, 100);
const material = new MeshBasicMaterial({ color: 0xFFFFF, side: FrontSide })

const plane = new Mesh(geometry, material);

export default plane