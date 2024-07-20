import * as Jume from '@jume-labs/jume-engine';

import { Connector } from '../level/connector';
import { GridHelper } from '../utils/gridHelper';

export class ERoadTile extends Jume.Entity {
  readonly connector: Connector;

  readonly transform: Jume.CTransform;

  private readonly sprite: Jume.CSprite;

  @Jume.inject
  private assetManager!: Jume.AssetManager;

  constructor(connector: Connector) {
    super();
    this.connector = connector;

    const atlas = this.assetManager.getAsset(Jume.Atlas, 'sprites');

    const worldPos = GridHelper.gridToWorld(connector.position.x, connector.position.y);
    this.transform = this.addComponent<Jume.CTransform, Jume.CTransformProps>(Jume.CTransform, {
      x: worldPos.x,
      y: worldPos.y,
      rotation: connector.getRotation(),
    });

    this.sprite = this.addComponent<Jume.CSprite, Jume.CSpriteProps>(Jume.CSprite, {
      atlas,
      frameName: connector.getSprite(),
    });

    this.addComponent<Jume.CRender, Jume.CRenderProps>(Jume.CRender, { renderComponents: [this.sprite] });
  }
}
