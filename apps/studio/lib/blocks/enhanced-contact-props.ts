// Enhanced contact block properties
export const enhancedContactProps = {
  destinationEmail: {
    name: 'destinationEmail',
    type: 'email',
    label: 'Destination Email',
    defaultValue: 'contact@example.com',
    helpText: 'Email address where form submissions will be sent',
    group: 'Form Settings'
  },
  mapAddress: {
    name: 'mapAddress',
    type: 'text',
    label: 'Map Address',
    defaultValue: '123 Main St, City, State 12345',
    helpText: 'Full address for map marker',
    group: 'Map Settings'
  },
  mapLatitude: {
    name: 'mapLatitude',
    type: 'number',
    label: 'Latitude',
    defaultValue: 48.8566,
    helpText: 'Map center latitude',
    group: 'Map Settings'
  },
  mapLongitude: {
    name: 'mapLongitude',
    type: 'number',
    label: 'Longitude',
    defaultValue: 2.3522,
    helpText: 'Map center longitude',
    group: 'Map Settings'
  },
  mapZoom: {
    name: 'mapZoom',
    type: 'number',
    label: 'Zoom Level',
    defaultValue: 15,
    min: 1,
    max: 20,
    helpText: 'Map zoom level (1-20)',
    group: 'Map Settings'
  }
};