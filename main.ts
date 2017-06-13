import { Buffer } from 'buffer';
import { Bus } from "./Bus";
import { decodeBlueprint, encodeBlueprint, VERSION, Entity } from "./Blueprint";

const bp = '0eNqdlOFuhCAMx9+ln/EiKLr5Kpdl8bS7kSAawGXG8O7DM7ktUSf6iRTKr3/a0hFussdOC2WhGEFUrTJQXEcw4q5KOe3ZoUMoQFhsgIAqm8kyFlFGH71WZYXgCAhV4zcU1L0RQGWFFTiDHsbwrvrmhto7PBGyVffos/T36kgog9r6cwJda/zlVk2hPTBiBAa/pD5GLTRW81nmyALNNtQtmfGFz9Tkwt0KKfklNaWUEUofV4sq6lqJ2xrZGit9svYfmew/kh+TRv9RlgUoo8HC8pOFpfvol/AUxvu01+NtEq+3CY2DMxigi9JTXUdXlbFz1WABMpPD+WMb6TvwNQIakPLgaixofmg95lvxZxwS+EJtZoc0ZTznacZy534A2Yy3Lg==';
const bp2 = '0eNp9kNFqwzAMRf9FzzZkXtqCf2WM4aRqK7DlYLtlIfjfJ3sQBt32JCTrHl3fDSZ/xyURF7Ab0Bw5g33bINOVnW+zsi4IFqhgAAXsQutczhgmT3zVwc03YtQGqgLiM36CfanvCpALFcJvXm/WD76HCZMs7CQfhXFzojtr4oypyLuCJWYRR24OBKhFsEoxtaonmPnf1hNs6KxB7Cacqf/u4tcmSnGKRV9So/1y6HU/9LfTYTcqEfTQ7I+MFTww5b59HEdzOB3GoznV+gU4XYL4';

const bus = new Bus();
bus.addLine('iron-plate');
bus.addLine('copper-plate');
bus.addLine('iron-gear-wheel');
bus.addLine('electronic-circuit');

const offsets = bus.split(['iron-plate', 'iron-gear-wheel', 'electronic-circuit']);
// const offsets = bus.split(['iron-plate', 'electronic-circuit', 'copper-plate']);
// const offsets = bus.split(['iron-plate', 'electronic-circuit']);

// console.log(bus.render());
// console.log(JSON.stringify(bus.toEntities()));

let number = 0;
console.log(bus.render());
const entities = bus.toEntities();
entities.forEach(e => e.entity_number = number++);
// console.log(entities);

const bpe = encodeBlueprint({
  icons: [{signal: {type: "item", name: "transport-belt"}, index: 1}],
  entities: entities as Entity[],
  item: 'blueprint',
  version: VERSION,
});

console.log(bpe);

const ducked = '0eNqV09uKwyAQBuB3mWsLjTXJ4qssy5K0QxGSUXRcNgTffTWFUmhT3Cvx9P0q4wrjFNF5Qwx6BXO2FEB/rhDMlYapjPHiEDQYxhkE0DCXHvuBgrOeDyNODEmAoQv+gm7SlwAkNmzwJm2d5ZviPKLPC/YMAc6GvM1SSc3UoRWwgD5m/GI8nm9TMoknU97NmE/hr97mdk9VL1Vxvye5WC70FHL6T0jzPsRG3klR1c/T1L5OW00ea8mumjzVkn01KWvJj2rydU2UUt7KXj/8EgE/6MO2oFNKtn2rOtmn9AdLthoo';
const allDirections = '0eNqN0UsKgzAQBuC7/OsImkaFXKWU4mMoAR0liaUiuXuNdlGoBZfzyDdhZkHdTTRawx56gWkGdtDXBc48uOpizs8jQcN46iHAVR8jbyt242B9UlPnEQQMt/SCzsJNgNgbb2iXtmC+89TXZNeGf4bAOLj12cBx6kolUmCGTkMQP4o8raQfRKA1lpq9og7Iy/mPZUemPDDVafOQLOIyt8XrrzsJPMm6vUEpmZe5KmQZwhvrQpoa';
const two = '0eNqVkeFqwzAMhN/lfrvQemkLfpUxRtKKYEhkY8tjIfjda6dQStt07JeRxH2nk2d0QyIfLAvMDHtyHGE+Z0TbczvUnkyeYGCFRihwO9Yq8ZlCH1x5Nx0NgqxgS+8XZpfVn3IJLUfvgjyKdf5SIBYrlq6LLMX0zWnsKBT6GkPBu1hkjqtrQW20wgSzLfCzDXS6jnTd7oGp12M9U3cvqeqWk32qgZ5MPv5hot97uCSLSTnVclZz94kKPxTiIjg0jd4f981BH3O+AAuXo+o=';
const split = '0eNqFkM0KwjAQhN9lzqm0oVXIq4hIWxdZaLchWcVS8u6m9SKKeNyf+WZ2F3TDjXxgUbgF3E8S4Y4LIl+lHdaezp7gwEojDKQd1yr6gVUpIBmwXOgBVyXzV6ahleinoEVHg76JbToZkCgr0yvAVsxnuY1dtnHVt7WBn2IWTLL6ZUhpMMMV5a7J4AsH6l9Duyb74Nlfmb6oRbVhy09mDrwd595eaHCnELeFfV3b5tDUe3tI6QlhFXdd';
const split2 = '0eNqVkdFugzAMRf/lPocKMmil/Mo0TdBakyUwUeJWQyj/vgAvVdHE9ujE9/jEmdH1d/KBReFm8HWUCPc+I/KXtP1yppMnOLDSAANph6XS0Er0Y9Cio16RDFhu9A1XJXMYjr5nVQpPMZs+DEiUlWkTWIvpU+5Dlztd9dtoAz/GHBtlmZdRpcEEV2QR3DjQdbuyi9cL0+6NdrRqo5Wn5pj39mfHYsOWx8z6n+/eIfNe1+27p582eFCIa8O5rm1zaeqzvaT0A7bmrzs=';


// console.log(JSON.stringify(decodeBlueprint(split2)));