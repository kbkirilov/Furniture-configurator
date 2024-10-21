// BodyMaterialManager.js
import * as THREE from 'three';

export class BodyMaterialManager {
    constructor(textureLoader) {
        this.textureLoader = textureLoader;
        this.bodyMaterials = {};
    }

    loadMaterials(part1) {
        // Duplicating the material and changing its properties
        const baseMaterial = part1.material.clone();

        this.bodyMaterials.antwerpOak = baseMaterial.clone();
        this.bodyMaterials.ashBlackStained = baseMaterial.clone();
        this.bodyMaterials.ashNatural = baseMaterial.clone();
        this.bodyMaterials.whiteAsh = baseMaterial.clone();

        const genericWoodNormalMap = this.textureLoader.load('assets/textures/buzzi-float-body-generic_wood-normal.jpeg');

        // ANTWERP OAK
        const antwerpOakAlbedo = this.loadAlbedo('antwerp_oak');
        this.bodyMaterials.antwerpOak.map = antwerpOakAlbedo;
        this.bodyMaterials.antwerpOak.normalMap = this.textureLoader.load('assets/textures/buzzi-float-body-antwerp_oak-normal.jpg');

        // ASH BLACK STAINED
        const ashBlackStainedAlbedo = this.loadAlbedo('ash_black_stained');
        this.bodyMaterials.ashBlackStained.map = ashBlackStainedAlbedo;
        this.bodyMaterials.ashBlackStained.normalMap = genericWoodNormalMap;

        // ASH NATURAL
        const ashNaturalAlbedo = this.loadAlbedo('ash_natural');
        this.bodyMaterials.ashNatural.map = ashNaturalAlbedo;
        this.bodyMaterials.ashNatural.normalMap = genericWoodNormalMap;

        // WHITE ASH
        const whiteAshAlbedo = this.loadAlbedo('white_ash');
        this.bodyMaterials.whiteAsh.map = whiteAshAlbedo;
        this.bodyMaterials.whiteAsh.normalMap = this.textureLoader.load('assets/textures/buzzi-float-body-white_ash-normal.jpg');
    }

    loadAlbedo(type) {
        const albedoTexture = this.textureLoader.load(`assets/textures/buzzi-float-body-${type}-albedo.jpg`);
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
