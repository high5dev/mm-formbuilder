const profileCollectionFields = [
  { name: 'Business Name', type: 'Text' }, 
  { name: 'Business Type', type: 'Text' },
  { name: 'Location Name', type: 'Text' },
  { name: 'Location Address', type: 'Text' },
  { name: 'Phone Label', type: 'Text' },
  { name: 'Phone Number', type: 'Number' },
  { name: 'Email Label', type: 'Text' },
  { name: 'Email', type: 'Text' },
  { name: 'About Us', type: 'Rich text' },
  { name: 'Company Overview', type: 'Rich text' },
  { name: 'Business Services', type: 'Rich text' },
  { name: 'Business Logo', type: 'Image' },
  { name: 'Business Images', type: 'Array' }
];

module.exports = { profileCollectionFields };