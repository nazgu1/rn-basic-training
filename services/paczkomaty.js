const TRACKING_URL = 'https://api-shipx-pl.easypack24.net/v1/tracking/';

export default class Paczkomaty {
  constructor() { }

  async fetch(trackingNumber) {
    const response = await fetch(`${TRACKING_URL}${trackingNumber}`);
    const json = await response.json();
    json['key'] = trackingNumber;
    return json;
  }
}
