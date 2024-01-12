const profileCollectionFields = [
  { name: 'Business Name', type: 'Text', default: true }, 
  { name: 'Business Type', type: 'Text', default: true },
  { name: 'Location Name', type: 'Text', default: true },
  { name: 'Location Address', type: 'Text', default: true },
  { name: 'Phone Label', type: 'Text', default: true },
  { name: 'Phone Number', type: 'Number', default: true },
  { name: 'Email Label', type: 'Text', default: true },
  { name: 'Email', type: 'Text', default: true },
  { name: 'About Us', type: 'Rich text', default: true },
  { name: 'Company Overview', type: 'Rich text', default: true },
  { name: 'Business Services', type: 'Rich text', default: true },
  { name: 'Business Logo', type: 'Image', default: true },
  { name: 'Business Images', type: 'Array', default: true }
];

module.exports = { profileCollectionFields };