import pkg from '../package.json';

const exportedObject = {
  name: pkg.description,
  baseURL: process.env.REACT_APP_BASE_URL || 'https://dat.local/api',
  ttl: {
    transportList: 60,
  },
  defaultTimezone: 'Europe/Berlin',
  contact: {
    name: 'Transport Team Seven Senders',
    phone: '+49 30 233218755',
    email: 'operations@sevensenders.com',
  },
};

export default exportedObject;
