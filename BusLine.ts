import { Entity, EntityName } from "./Blueprint";

// Note, the split feature refers to a split going upwards, intruding into the previous line.
type BusLineFeature = 'duck-start' | 'duck-end' | 'reserved' | 'split' | 'turn';

export function featureToEntity(feature: BusLineFeature): Partial<Entity> {
  switch (feature) {
    case 'duck-start': return {name: 'underground-belt', type: 'input'};
    case 'duck-end': return {name: 'underground-belt', type: 'output'};
    case 'reserved': return null;
    case 'split': return {name: 'splitter'};
    case 'turn': return {name: 'transport-belt'};
    default: return {name: 'transport-belt', direction: 2};
  }
}

/** Represents a single line on the main bus. */
export class BusLine {
  // The features that exist on this belt.
  private features: {[offset: number]: BusLineFeature} = {};

  constructor(readonly ingredient: EntityName, readonly start: number) {}

  allocateDuckedSpace(offset: number, amount: number): void {
    // Duck starts one before requested space.
    const duckStart = offset - 1;
    const duckEnd = offset + amount;

    // Can't duck before this line starts.
    if (duckStart < this.start) {
      throw new Error("Couldn't allocate space");
    }
    for (let i = duckStart; i < duckEnd; i++) {
      if (this.hasFeatureAt(i)) {
        throw new Error("Couldn't allocate space");
      }
    }

    this.addFeature(duckStart, 'duck-start');
    for (let i = 0; i < amount; i++) {
      this.addFeature(offset + i, 'reserved');
    }
    this.addFeature(duckEnd, 'duck-end');
  }

  private addFeature(offset: number, type: BusLineFeature): void {
    if (this.hasFeatureAt(offset)) {
      throw new Error(`Can't add feature ${type} at offset ${offset}`);
    }
    this.features[offset] = type;
  }

  splitAt(offset: number): void {
    this.addFeature(offset, 'split');
    this.addFeature(offset + 1, 'turn');
  }

  hasFeatureAt(offset: number): boolean {
    return !!this.features[offset];
  }

  getNextFreeSplit(): number {
    // TODO
    return 0;
  }

  getEarliestFreeSpace() {
    // TODO: Take the amount of space needed here and advertise the space as being free if we can
    // extend an existing duck to accommodate it.
    const features = Object.getOwnPropertyNames(this.features);
    const sortedFeatures = features.map(n => parseInt(n)).sort();
    if (sortedFeatures.length == 0) {
      // No features, so we are free from the start.
      return this.start;
    }
    // One after the last feature.
    return sortedFeatures[sortedFeatures.length - 1] + 1;
  }

  render(length: number): string {
    const result: string[] = [];
    for (let i = 0; i < length; i++) {
      result.push(this.featureToChar(this.features[i]));
    }
    return result.join('');
  }

  toEntities(length: number): Partial<Entity>[] {
    const result: Partial<Entity>[] = [];
    for (let i = 0; i < length; i++) {
      const c = this.features[i];
      const entity = featureToEntity(c);
      result.push(entity);
    }
    return result;
  }

  featureToChar(feature?: BusLineFeature): string {
    if (!feature) {
      return '-';
    }
    switch (feature) {
      case 'duck-start': return '>';
      case 'duck-end': return '<';
      case 'split': return 'S';
      case 'turn': return '^';
      case 'reserved': return ' ';
      default: return '-';
    }
  }
}
