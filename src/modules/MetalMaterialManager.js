import * as THREE from 'three';

export class MetalMaterialManager {
    constructor() {
        this.metalMaterials = {};
    }

    loadMaterials(part2) {
        const baseMaterial = part2.material.clone();

        this.metalMaterials.whiteMetal = baseMaterial.clone();
        this.metalMaterials.blackMetal = baseMaterial.clone();

        // white
        this.metalMaterials.whiteMetal.color = new THREE.Color(0xffffff);

        // black
        this.metalMaterials.blackMetal.color = new THREE.Color(0x000000);
    }

    changeMaterial(part, materialToApply) {
        if (part) {
            part.material = materialToApply;
            part.material.needsUpdate = true;
        }
    }
}