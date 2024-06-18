interface IPhoneNote {
  id: number;
  name: string;
  number: string;
}

export type IPhoneBook = Array<IPhoneNote>;
