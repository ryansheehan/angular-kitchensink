const idGen = (function*() {
  for (let i = 0;; i++) { yield i; }
})();

export interface ICharacter {
  id: number;
  image: CharacterImage;
  background: CharacterBackground;
  imgUri: string;
  name: string;
}

export type CharacterTemplate = Pick<ICharacter, 'name'> & Partial<Exclude<ICharacter, 'imgUri'>>;

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

export class Character implements ICharacter {
  readonly id: number;

  image: CharacterImage;
  background: CharacterBackground;

  get imgUri() {
    // characters found at https://robohash.org/
    return `https://robohash.org/${this.name}.png?size=200x200;${this.background};${this.image}`;
  }
  name: string;

  constructor(template: CharacterTemplate) {
    const {id, name, image, background} = template;
    this.name = name;
    this.id = id === undefined ? idGen.next().value : id;
    this.image = image || CharacterImage.ROBOT;
    this.background = background || CharacterBackground.NONE;
  }
}
