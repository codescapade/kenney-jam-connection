import * as Jume from '@jume-labs/jume-engine';

import { GameScene } from './gameScene';

export class LoadScene extends Jume.Scene {
  @Jume.inject
  assetManager!: Jume.AssetManager;

  @Jume.inject
  sceneManager!: Jume.SceneManager;

  constructor() {
    super();
    this.loadAssets().catch(() => {});
  }

  async loadAssets(): Promise<void> {
    try {
      await this.assetManager.loadAsset(Jume.Atlas, 'sprites', 'sprites');
    } catch (e) {
      console.log(e);
    }

    this.sceneManager.changeScene({ sceneType: GameScene, type: 'push', removeCurrent: true });
  }
}
