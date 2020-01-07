import Paczkomaty from './paczkomaty.js';

const staticPackages = [
  '680313636941700015998707',
  '641700846940318019595138',
  '632020717941700118467674',
];

export default class Packages {
  paczkomatyProvider = new Paczkomaty();
  packages = staticPackages;

  constructor() { }

  async fetch() {
    let results = this.packages.map(async item => {
      return this.paczkomatyProvider.fetch(item);
    });
    return await Promise.all(results);
  }
}
