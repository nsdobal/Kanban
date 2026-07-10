export type Card = {
  id: string;
  title: string;
  details: string;
};

export type Column = {
  id: string;
  title: string;
  cardIds: string[];
};

export type Board = {
  columns: Record<string, Column>;
  cards: Record<string, Card>;
  columnOrder: string[];
};

export const initialData: Board = {
  cards: {
    'card-1': { id: 'card-1', title: 'Setup Next.js Project', details: 'Install dependencies and configure Next.js' },
    'card-2': { id: 'card-2', title: 'Design Global CSS', details: 'Setup vanilla CSS variables for the color scheme' },
    'card-3': { id: 'card-3', title: 'Create Board Component', details: 'Implement drag and drop context' },
    'card-4': { id: 'card-4', title: 'Write Integration Tests', details: 'Use Playwright for E2E testing' },
  },
  columns: {
    'col-1': {
      id: 'col-1',
      title: 'To Do',
      cardIds: ['card-3', 'card-4'],
    },
    'col-2': {
      id: 'col-2',
      title: 'In Progress',
      cardIds: ['card-1', 'card-2'],
    },
    'col-3': {
      id: 'col-3',
      title: 'Review',
      cardIds: [],
    },
    'col-4': {
      id: 'col-4',
      title: 'Testing',
      cardIds: [],
    },
    'col-5': {
      id: 'col-5',
      title: 'Done',
      cardIds: [],
    },
  },
  columnOrder: ['col-1', 'col-2', 'col-3', 'col-4', 'col-5'],
};
