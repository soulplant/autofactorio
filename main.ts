import * as zlib from 'zlib';
import { Buffer } from 'buffer';

const bp = '0eNqdlOFuhCAMx9+ln/EiKLr5Kpdl8bS7kSAawGXG8O7DM7ktUSf6iRTKr3/a0hFussdOC2WhGEFUrTJQXEcw4q5KOe3ZoUMoQFhsgIAqm8kyFlFGH71WZYXgCAhV4zcU1L0RQGWFFTiDHsbwrvrmhto7PBGyVffos/T36kgog9r6cwJda/zlVk2hPTBiBAa/pD5GLTRW81nmyALNNtQtmfGFz9Tkwt0KKfklNaWUEUofV4sq6lqJ2xrZGit9svYfmew/kh+TRv9RlgUoo8HC8pOFpfvol/AUxvu01+NtEq+3CY2DMxigi9JTXUdXlbFz1WABMpPD+WMb6TvwNQIakPLgaixofmg95lvxZxwS+EJtZoc0ZTznacZy534A2Yy3Lg==';
const bp2 = '0eNp9kNFqwzAMRf9FzzZkXtqCf2WM4aRqK7DlYLtlIfjfJ3sQBt32JCTrHl3fDSZ/xyURF7Ab0Bw5g33bINOVnW+zsi4IFqhgAAXsQutczhgmT3zVwc03YtQGqgLiM36CfanvCpALFcJvXm/WD76HCZMs7CQfhXFzojtr4oypyLuCJWYRR24OBKhFsEoxtaonmPnf1hNs6KxB7Cacqf/u4tcmSnGKRV9So/1y6HU/9LfTYTcqEfTQ7I+MFTww5b59HEdzOB3GoznV+gU4XYL4';

interface Blueprint {
  icons: {}[];
  entities: Entity[];
  item: 'blueprint';
  version: number;
}

type EntityName =
    | 'inserter'
    | 'long-handed-inserter'
    | 'assembling-machine'
    | 'assembling-machine-2';

interface Entity {
  enitity_number: number;
  name: EntityName;
  position: {x: number, y: number};
}

/** Decodes a blueprint string into a Blueprint. */
function decodeBlueprint(bp: string): Blueprint {
  const buffer = Buffer.from(bp.substring(1), 'base64');
  const buf = zlib.unzipSync(buffer);
  return JSON.parse(buf.toString()).blueprint;
}

/** Encodes a Blueprint into a blueprint string. */
function encodeBlueprint(bp: Blueprint) {
  return '0' + Buffer.from(zlib.deflateSync(JSON.stringify({blueprint: bp}))).toString('base64');
}

console.log(JSON.stringify(decodeBlueprint(bp)));