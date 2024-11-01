const data = {
  type: "FeatureCollection",
  name: "buildings",
  crs: {
    type: "name",
    properties: { name: "urn:ogc:def:crs:OGC:1.3:CRS84" },
  },
  features: [
    {
      type: "Feature",
      properties: {
        identificatie: "1696100000003233",
        rdf_seealso:
          "http://bag.basisregistraties.overheid.nl/bag/id/pand/1696100000003233",
        bouwjaar: 1960,
        status: "Pand in gebruik",
        gebruiksdoel: null,
        oppervlakte_min: null,
        oppervlakte_max: null,
        aantal_verblijfsobjecten: 0,
        fuuid: "pand.929e65bb-8a47-4fba-8e65-2b498cf9ec4d",
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [5.064999946641391, 52.203458389568581],
            [5.064961899347736, 52.203468307293527],
            [5.064942688551628, 52.20344046424934],
            [5.064981126630516, 52.203431122823154],
            [5.064999946641391, 52.203458389568581],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: {
        identificatie: "1696100000002476",
        rdf_seealso:
          "http://bag.basisregistraties.overheid.nl/bag/id/pand/1696100000002476",
        bouwjaar: 1970,
        status: "Pand in gebruik",
        gebruiksdoel: null,
        oppervlakte_min: null,
        oppervlakte_max: null,
        aantal_verblijfsobjecten: 0,
        fuuid: "pand.beb59ce0-b977-4c4a-b38f-a00576a7837c",
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [5.065853914612303, 52.20383193488852],
            [5.065738321281166, 52.203864102649149],
            [5.065698496590494, 52.203810093736983],
            [5.0658140898749, 52.203777917027168],
            [5.065853914612303, 52.20383193488852],
          ],
        ],
      },
    },
  ],
};

const asObject = function () {
  return data;
};
const asString = function () {
  return JSON.stringify(data);
};

module.exports = { asObject, asString };
