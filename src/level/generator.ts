import * as Jume from '@jume-labs/jume-engine';

import { Connector } from './connector';

type ConnectorType = Connector | null;

export interface GenerateOptions {
  minRoadPct: number;
  maxRoadPct: number;
}

export class Generator {
  connectors: ConnectorType[][];

  get width(): number {
    return this.connectors[0].length;
  }

  get height(): number {
    return this.connectors.length;
  }
  private readonly DIRECTIONS = [Jume.Vec2.LEFT, Jume.Vec2.RIGHT, Jume.Vec2.DOWN, Jume.Vec2.UP];

  @Jume.inject
  private random!: Jume.Random;

  constructor(width: number, height: number) {
    this.connectors = [];
    for (let y = 0; y < height; y++) {
      const row: (Connector | null)[] = [];
      for (let x = 0; x < width; x++) {
        row.push(null);
      }
      this.connectors.push(row);
    }
  }

  generate({ minRoadPct, maxRoadPct }: GenerateOptions): boolean {
    const totalTiles = this.width * this.height;
    const minTiles = Math.floor(totalTiles * (minRoadPct / 100));
    const maxTiles = Math.floor(totalTiles * (maxRoadPct / 100));

    let pathLength = 0;
    let timesTried = 0;
    const maxTries = 1000;
    while (pathLength < minTiles && timesTried < maxTries) {
      this.reset();
      pathLength = this.buildPath(minTiles, maxTiles);
      timesTried++;
    }

    console.log(`generator attempts: ${timesTried}`);
    return pathLength >= minTiles;
  }

  private reset(): void {
    for (let y = 0; y < this.connectors.length; y++) {
      for (let x = 0; x < this.connectors[0].length; x++) {
        this.connectors[y][x] = null;
      }
    }
  }

  private buildPath(minTiles: number, maxTiles: number): number {
    let currentPos = new Jume.Vec2(0, 0);
    let connector = new Connector(currentPos.x, currentPos.y);
    const road: Connector[] = [connector];
    this.connectors[currentPos.y][currentPos.x] = connector;

    while (road.length < minTiles && road.length !== maxTiles) {
      const newPos = this.getNewPos(currentPos);
      if (newPos) {
        const newConnector = new Connector(newPos.x, newPos.y);
        this.connectors[newPos.y][newPos.x] = newConnector;
        this.connect(connector, newConnector);
        road.push(newConnector);
        currentPos = newPos;
        connector = newConnector;
      } else {
        break;
      }
    }

    return road.length;
  }

  private getNewPos(currentPos: Jume.Vec2): Jume.Vec2 | null {
    const newPos = new Jume.Vec2();
    const possibleDirections = [0, 1, 2, 3];
    while (possibleDirections.length > 0) {
      const option = this.random.int(0, possibleDirections.length - 1);
      const dir = this.DIRECTIONS[possibleDirections[option]];
      newPos.set(currentPos.x + dir.x, currentPos.y + dir.y);
      if (
        newPos.x >= 0 &&
        newPos.x < this.width &&
        newPos.y >= 0 &&
        newPos.y < this.height &&
        !this.connectors[newPos.y][newPos.x]
      ) {
        return newPos;
      }
      possibleDirections.splice(option, 1);
    }

    return null;
  }

  private connect(connectorA: Connector, connectorB: Connector): void {
    if (connectorA.position.x < connectorB.position.x) {
      connectorA.right = true;
      connectorB.left = true;
    } else if (connectorA.position.x > connectorB.position.x) {
      connectorA.left = true;
      connectorB.right = true;
    } else if (connectorA.position.y < connectorB.position.y) {
      connectorA.bottom = true;
      connectorB.top = true;
    } else if (connectorA.position.y > connectorB.position.y) {
      connectorA.top = true;
      connectorB.bottom = true;
    } else {
      throw new Error(
        `Connectors a: ${connectorA.position.toString()} and b: ${connectorB.position.toString()} are not next to each other`
      );
    }
  }
}
