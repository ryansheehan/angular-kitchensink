export class ICharacter {
  id: number;
  name: string;
}

export type CharacterTemplate = Exclude<ICharacter, 'id'>;
