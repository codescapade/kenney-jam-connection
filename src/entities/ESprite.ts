import * as Jume from '@jume-labs/jume-engine';

export class ESprite extends Jume.Entity {
  constructor(x: number, y: number, rotation: number, atlas: Jume.Atlas, frameName: string) {
    super();

    this.addComponent<Jume.CTransform, Jume.CTransformProps>(Jume.CTransform, { x, y, rotation });
    const sprite = this.addComponent<Jume.CSprite, Jume.CSpriteProps>(Jume.CSprite, { atlas, frameName });
    this.addComponent<Jume.CRender, Jume.CRenderProps>(Jume.CRender, { renderComponents: [sprite] });
  }
}
