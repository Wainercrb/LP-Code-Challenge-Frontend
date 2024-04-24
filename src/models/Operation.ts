
export enum OperationType {
  addition = 'addition',
  subtraction = 'subtraction',
  multiplication = 'multiplication',
  division = 'division',
  square_root = 'square_root',
  random_string = 'random_string',
}

export interface Operation {
  id: number;
  type: OperationType;
  cost: number
}