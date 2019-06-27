const idGen = (function*() {
  for (let i = 0;; i++) { yield i; }
})();

export type CharacterTemplate = Pick<Character, 'name'> & Partial<Pick<Character, 'background' | 'image'>>;

export enum CharacterBackground {
  NONE = 'bgset=bg0',
  LOCATION = 'bgset=bg1',
  GENERIC = 'bgset=bg2',
}

export enum CharacterImage {
  ROBOT = 'set=set1',
  MONSTER = 'set=set2',
  ROBOTHEAD = 'set=set3',
  CAT = 'set=set4',
}

export class Character {
  readonly id: number;

  image = CharacterImage.CAT;
  background = CharacterBackground.NONE;

  get imgUri() {
    // characters found at https://robohash.org/
    return `https://robohash.org/${this.name}.png?size=200x200;${this.background};${this.image}`;
  }
  name: string;

  constructor(template: CharacterTemplate) {
    this.name = template.name;
    this.id = idGen.next().value;
  }
}
