import * as THREE from 'three';

export class MetalMaterialManager {
    constructor() {
        this.metalMaterials = {};
    }

    loadMaterials(part3) {
        const baseMaterial = part3.material.clone();

        this.metalMaterials.whiteMetal = baseMaterial.clone();
        this.metalMaterials.blackMetal = baseMaterial.clone();

        // white
        this.metalMaterials.whiteMetal.color = 'white';

        // black
        this.metalMaterials.blackMetal.color = 'black';
    }

    changeMaterial(part, materialToApply) {
        if (part) {
            part.material = materialToApply;
            part.material.needsUpdate = true;
        }
    }
}