import * as Jume from '@jume-labs/jume-engine';

export class GridHelper {
  static readonly TILE_SIZE = 64;

  static worldToGrid(x: number, y: number, out?: Jume.Vec2): Jume.Vec2 {
    if (!out) {
      out = Jume.Vec2.get();
    }

    out.set(Math.floor(x / GridHelper.TILE_SIZE), Math.floor(y / GridHelper.TILE_SIZE));

    return out;
  }

  static gridToWorld(x: number, y: number, out?: Jume.Vec2): Jume.Vec2 {
    if (!out) {
      out = Jume.Vec2.get();
    }

    out.set(
      x * GridHelper.TILE_SIZE + GridHelper.TILE_SIZE * 0.5,
      y * GridHelper.TILE_SIZE + GridHelper.TILE_SIZE * 0.5
    );

    return out;
  }
}
