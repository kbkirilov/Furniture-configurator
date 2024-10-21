// SeatMaterialManager.js
import * as THREE from 'three';

export class SeatMaterialManager {
    constructor(textureLoader) {
        this.textureLoader = textureLoader;
        this.seatMaterials = {};
    }

    loadMaterials(part2) {
        const baseMaterial = part2.material.clone();

        this.seatMaterials.autumn = baseMaterial.clone();
        this.seatMaterials.bottle = baseMaterial.clone();
        this.seatMaterials.grass = baseMaterial.clone();
        this.seatMaterials.midgrey = baseMaterial.clone();
        this.seatMaterials.mustard = baseMaterial.clone();
        this.seatMaterials.natural = baseMaterial.clone();
        this.seatMaterials.yellowfa = baseMaterial.clone();

        const genericFabricNormalMap = this.textureLoader.load('assets/textures/buzzi-float-seat-generic-normal.jpg')

        // autumn
        this.seatMaterials.autumn.map = this.loadAlbedo('fa_autumn');
        this.seatMaterials.autumn.normalMap = genericFabricNormalMap;

        // bottle
        this.seatMaterials.bottle.map = this.loadAlbedo('fa_bottle');
        this.seatMaterials.bottle.normalMap = genericFabricNormalMap;

        // grass
        this.seatMaterials.grass.map = this.loadAlbedo('fa_grass');
        this.seatMaterials.grass.normalMap = genericFabricNormalMap;

        // midgrey
        this.seatMaterials.midgrey.map = this.loadAlbedo('fa_midgrey');
        this.seatMaterials.midgrey.normalMap = genericFabricNormalMap;

        // mustard
        this.seatMaterials.mustard.map = this.loadAlbedo('fa_mustard');
        this.seatMaterials.mustard.normalMap = genericFabricNormalMap;

        // natural
        this.seatMaterials.natural.map = this.loadAlbedo('fa_natural');
        this.seatMaterials.natural.normalMap = genericFabricNormalMap;

        // yellow
        this.seatMaterials.yellowfa.map = this.loadAlbedo('fa_yellow');
        this.seatMaterials.yellowfa.normalMap = genericFabricNormalMap;
    }

    loadAlbedo(type) {
        const albedoTexture = this.textureLoader.load(`assets/textures/buzzi-float-seat-${type}-albedo.jpg`);
        albedoTexture.colorSpace = THREE.SRGBColorSpace;
        return albedoTexture;
    }

    changeMaterial(part, materialToApply) {
        if (part) {
            part.material = materialToApply;
            part.material.needsUpdate = true;
        }
    }
}

