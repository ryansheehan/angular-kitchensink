const idGen = (function*() {
  for (let i = 0;; i++) { yield i; }
})();

export type CharacterTemplate = Pick<Character, Exclude<keyof Character, 'id' | 'imgUri'>>;

export class Character {
  readonly id: number;

  get imgUri() {
    // characters found at https://robohash.org/
    return `https://robohash.org/${this.name}.png?size=200x200;bgset=bg0`;
  }
  name: string;

  constructor(template: CharacterTemplate) {
    this.name = template.name;
    this.id = idGen.next().value;
  }
}
