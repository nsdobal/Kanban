import { renderHook, act } from '@testing-library/react';
import { useKanbanBoard } from './useKanbanBoard';

describe('useKanbanBoard', () => {
  it('should initialize with initial dummy data', () => {
    const { result } = renderHook(() => useKanbanBoard());
    expect(result.current.boardData.columnOrder.length).toBe(5);
    expect(result.current.boardData.columns['col-1'].title).toBe('To Do');
  });

  it('should move a card within the same column', () => {
    const { result } = renderHook(() => useKanbanBoard());
    act(() => {
      // Move card-4 before card-3 in col-1
      result.current.moveCard('col-1', 'col-1', 1, 0, 'card-4');
    });
    expect(result.current.boardData.columns['col-1'].cardIds).toEqual(['card-4', 'card-3']);
  });

  it('should move a card between columns', () => {
    const { result } = renderHook(() => useKanbanBoard());
    act(() => {
      // Move card-3 from col-1 to col-2 at index 0
      result.current.moveCard('col-1', 'col-2', 0, 0, 'card-3');
    });
    expect(result.current.boardData.columns['col-1'].cardIds).toEqual(['card-4']);
    expect(result.current.boardData.columns['col-2'].cardIds[0]).toBe('card-3');
  });

  it('should add a new card', () => {
    const { result } = renderHook(() => useKanbanBoard());
    act(() => {
      result.current.addCard('col-3', 'New Card', 'Card details');
    });
    const col3Ids = result.current.boardData.columns['col-3'].cardIds;
    expect(col3Ids.length).toBe(1);
    
    const newCardId = col3Ids[0];
    const newCard = result.current.boardData.cards[newCardId];
    expect(newCard.title).toBe('New Card');
    expect(newCard.details).toBe('Card details');
  });

  it('should delete a card', () => {
    const { result } = renderHook(() => useKanbanBoard());
    act(() => {
      result.current.deleteCard('col-1', 'card-3');
    });
    expect(result.current.boardData.columns['col-1'].cardIds).not.toContain('card-3');
    expect(result.current.boardData.cards['card-3']).toBeUndefined();
  });

  it('should rename a column', () => {
    const { result } = renderHook(() => useKanbanBoard());
    act(() => {
      result.current.renameColumn('col-1', 'Backlog');
    });
    expect(result.current.boardData.columns['col-1'].title).toBe('Backlog');
  });
});
