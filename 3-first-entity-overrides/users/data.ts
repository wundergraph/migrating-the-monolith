type User = {
  id: number;
  username: string;
}

export const users = new Map<number, User>([
  [1, { id: 1, username: 'David', }],
  [2, { id: 2, username: 'Jens', }],
  [3, { id: 3, username: 'Dustin', }],
  [4, { id: 4, username: 'Björn', }],
  [5, { id: 5, username: 'Stefan', }],
]);