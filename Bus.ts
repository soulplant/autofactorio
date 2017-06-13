
import { BusLine } from "./BusLine";
import { EntityName, Direction, Entity } from "./Blueprint";

export class Bus {
  lines: BusLine[] = [];

  addLine(ingredient: EntityName) {
    this.lines.push(new BusLine(ingredient, 0));
  }

  split(ingredients: EntityName[]): void {
    ingredients.forEach((ingredient) => this.ensureHasIngredient(ingredient));
    const lineI = ingredients.map((ingredient) => this.getLineIndex(ingredient));
    const lines = lineI.map((i) => this.lines[i]);

    const offset = lines.map((line) => line.getNextFreeSplit()).reduce((x, acc) => Math.max(x, acc));
    for (let i of lineI) {
      const line = this.lines[i];
      const prevLines = this.lines.slice(0, i);
      if (prevLines.length == 0) {
        line.splitAt(line.getEarliestFreeSpace());
        continue;
      }
      const earliestFreePrev = prevLines
          .map((prevLine) => prevLine.getEarliestFreeSpace())
          .reduce((x, acc) => Math.max(x, acc));

      // Previous lines are not truly free for another space because they need a space to duck.
      const duckedStart = Math.max(earliestFreePrev + 1, line.getEarliestFreeSpace());

      // Duck each previous line.
      prevLines.forEach((prevLine) => {
        // This function takes the start of the ducked space, not the point where the duck happens.
        prevLine.allocateDuckedSpace(duckedStart, 2);
      });

      line.splitAt(duckedStart);
    }
  }

  getLineIndex(ingredient: EntityName): number {
    for (let i = 0; i < this.lines.length; i++) {
      if (this.lines[i].ingredient == ingredient) {
        return i;
      }
    }
    return -1;
  }

  getLineByIngredient(ingredient: EntityName): BusLine {
    const i = this.getLineIndex(ingredient);
    if (i == -1) {
      return null;
    }
    return this.lines[i];
  }

  ensureHasIngredient(ingredient: EntityName): void {
    if (!this.getLineByIngredient(ingredient)) {
      throw new Error(`Ingredient ${ingredient} doesn't exist on bus`);
    }
  }

  render(): string {
    const length =
        this.lines.map((line) => line.getEarliestFreeSpace()).reduce((x, acc) => Math.max(x, acc));
    return this.lines.map((line) => line.render(length)).join('\n');
  }

  toEntities(): Partial<Entity>[] {
    const length =
        this.lines.map((line) => line.getEarliestFreeSpace()).reduce((x, acc) => Math.max(x, acc));
    const result: Partial<Entity>[] = [];
    const entityPartials = this.lines.map((line, y) => {
      const entities = line.toEntities(length);
      entities.forEach((e, x) => {
        if (e == null) {
          return;
        }
        e.position = {x, y};
        // Splitters need to be bumped.
        if (e.name == 'splitter') {
          e.position.y -= 0.5;
        }
        e.direction = Direction.RIGHT;
        result.push(e);
      });
    });
    return result;
  }
}