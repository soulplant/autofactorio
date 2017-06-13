import * as zlib from 'zlib';

export interface Icon {
  signal: {
    type: "item";
    name: EntityName;
  };
  index: number
}

export const VERSION: number = 64425754627;

export interface Blueprint {
  icons: Icon[];
  entities: Entity[];
  item: 'blueprint';
  version: number;
}

export enum Direction {
  UP = 0,
  RIGHT = 2,
  DOWN = 4,
  LEFT = 6
}

export type EntityName =
    | 'inserter'
    | 'long-handed-inserter'
    | 'assembling-machine'
    | 'assembling-machine-2'
    | 'transport-belt'
    | 'underground-belt'  // "type" field is "input" or "output"
    | 'splitter'
    | 'iron-plate'
    | 'copper-plate'
    | 'iron-gear-wheel'
    | 'electronic-circuit'
    ;

export interface Entity {
  entity_number: number;
  name: EntityName;
  position: {x: number, y: number};

  // TODO: Only define type field when name == 'underground-belt'.
  type?: "input" | "output";

  // Up (default) | Right | Down | Left
  direction?: Direction;
}

/** Decodes a blueprint string into a Blueprint. */
export function decodeBlueprint(bp: string): Blueprint {
  const buffer = Buffer.from(bp.substring(1), 'base64');
  const buf = zlib.unzipSync(buffer);
  return JSON.parse(buf.toString()).blueprint;
}

/** Encodes a Blueprint into a blueprint string. */
export function encodeBlueprint(bp: Blueprint) {
  return '0' + Buffer.from(zlib.deflateSync(JSON.stringify({blueprint: bp}))).toString('base64');
}