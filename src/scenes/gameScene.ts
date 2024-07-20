import * as Jume from '@jume-labs/jume-engine';

import { ERoadTile } from '../entities/ERoadTile';
import { ESprite } from '../entities/ESprite';
import { Generator } from '../level/generator';
import { GridHelper } from '../utils/gridHelper';

export class GameScene extends Jume.Scene {
  @Jume.inject
  private assetManager!: Jume.AssetManager;

  constructor() {
    super();
    this.addSystem(Jume.SRender, {});

    const atlas = this.assetManager.getAsset(Jume.Atlas, 'sprites');

    const levelWidth = 5;
    const levelHeight = 5;

    const gen = new Generator(levelWidth, levelHeight);
    const goodLevel = gen.generate({ minRoadPct: 65, maxRoadPct: 80 });

    this.cameras[0].position.set(levelWidth * GridHelper.TILE_SIZE * 0.5, levelHeight * GridHelper.TILE_SIZE * 0.5);

    if (goodLevel) {
      for (let y = 0; y < gen.height; y++) {
        for (let x = 0; x < gen.width; x++) {
          const worldPos = GridHelper.gridToWorld(x, y);
          const e = new ESprite(worldPos.x, worldPos.y, 0, atlas, 'empty');
          this.addEntity(e);
          const connector = gen.connectors[y][x];
          if (connector) {
            this.addEntity(new ERoadTile(connector));
          }
        }
      }
    }
  }
}
