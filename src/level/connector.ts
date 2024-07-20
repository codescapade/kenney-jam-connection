import * as Jume from '@jume-labs/jume-engine';

export type RoadType = 'end' | 'straight' | 'corner' | 'none';

export class Connector {
  position: Jume.Vec2;

  left = false;
  right = false;
  top = false;
  bottom = false;

  constructor(x: number, y: number) {
    this.position = new Jume.Vec2(x, y);
  }

  turn(): void {
    const temp = this.top;
    this.top = this.left;
    this.left = this.bottom;
    this.bottom = this.right;
    this.right = temp;
  }

  getRoadType(): RoadType {
    const total = this.totalConnections();
    switch (total) {
      case 2:
        if ((this.left && this.right) || (this.top && this.bottom)) {
          return 'straight';
        } else {
          return 'corner';
        }

      case 1:
        return 'end';

      default:
        return 'none';
    }
  }

  getRotation(): number {
    const type = this.getRoadType();
    switch (type) {
      case 'straight':
        if (this.left && this.right) {
          return 90;
        } else {
          return 0;
        }

      case 'corner':
        if (this.right && this.bottom) {
          return 0;
        } else if (this.bottom && this.left) {
          return 90;
        } else if (this.left && this.top) {
          return 180;
        } else {
          return 270;
        }

      case 'end':
        if (this.bottom) {
          return 0;
        } else if (this.left) {
          return 90;
        } else if (this.top) {
          return 180;
        } else {
          return 270;
        }

      default:
        return 0;
    }
  }

  getSprite(): string {
    const type = this.getRoadType();

    return type === 'none' ? '' : type;
  }

  totalConnections(): number {
    let total = 0;

    if (this.left) {
      total++;
    }

    if (this.right) {
      total++;
    }

    if (this.top) {
      total++;
    }

    if (this.bottom) {
      total++;
    }

    return total;
  }
}
