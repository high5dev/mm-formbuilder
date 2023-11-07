export const customSectors = [
  {
    id: 'custom-sector',
    name: 'Custom sector',
    open: true,
    properties: [],
  }
];

export const customProperties = [
  {
    sector: 'custom-sector',
    type: 'number',
    label: 'Column gap',
    property: 'column-gap',
    units: ['px', 'em', 'rem'],
    default: '10px',
    min: 0,
  },
  {
    sector: 'custom-sector',
    type: 'number',
    label: 'Row gap',
    property: 'row-gap',
    units: ['px', 'em', 'rem'],
    default: '10px',
    min: 0,
  }
];