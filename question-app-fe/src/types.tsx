
export interface Choice {
  pk?: number,
  text: string,
}

export interface Question {
  pk: number;
  text: string;
  choices: Choice[];
}
