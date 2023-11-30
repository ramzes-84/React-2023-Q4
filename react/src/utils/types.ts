export type FormElements = {
  age: HTMLInputElement;
  country: HTMLInputElement;
  email: HTMLInputElement;
  file: HTMLInputElement;
  gender: HTMLInputElement;
  name: HTMLInputElement;
  password: HTMLInputElement;
  confirm: HTMLInputElement;
  terms: HTMLInputElement;
};

export type UsualFormData = {
  age: string;
  country: string;
  email: string;
  file: string;
  gender: Gender;
  name: string;
  password: string;
  confirm: string;
  terms: boolean;
};

export type HandeledFormData = {
  age: number;
  country: string;
  email: string;
  file: string;
  gender: Gender;
  name: string;
  password: string;
  confirm: string;
  terms: boolean;
};

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}
