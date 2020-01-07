const staticPackages = [
  '680313636941700015998707',
  '641700846940318019595138',
  '632020717941700118467674',
];

export default class Packages {
  packages = staticPackages;

  constructor() { }

  async fetch() {
    return await Promise.all(this.packages);
  }
}
