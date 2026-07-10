import { useState } from 'react';
import { Board, initialData } from '../lib/data';

export const useKanbanBoard = () => {
  const [boardData, setBoardData] = useState<Board>(initialData);

  const moveCard = (sourceColId: string, destColId: string, sourceIndex: number, destIndex: number, cardId: string) => {
    setBoardData((prev) => {
      const newBoard = { ...prev };
      
      const sourceCol = newBoard.columns[sourceColId];
      const destCol = newBoard.columns[destColId];
      
      const newSourceCardIds = Array.from(sourceCol.cardIds);
      newSourceCardIds.splice(sourceIndex, 1);
      
      if (sourceColId === destColId) {
        newSourceCardIds.splice(destIndex, 0, cardId);
        newBoard.columns = {
          ...newBoard.columns,
          [sourceColId]: { ...sourceCol, cardIds: newSourceCardIds },
        };
      } else {
        const newDestCardIds = Array.from(destCol.cardIds);
        newDestCardIds.splice(destIndex, 0, cardId);
        
        newBoard.columns = {
          ...newBoard.columns,
          [sourceColId]: { ...sourceCol, cardIds: newSourceCardIds },
          [destColId]: { ...destCol, cardIds: newDestCardIds },
        };
      }
      
      return newBoard;
    });
  };

  const addCard = (colId: string, title: string, details: string) => {
    const newCardId = `card-${Date.now()}`;
    setBoardData((prev) => {
      const newBoard = { ...prev };
      newBoard.cards = {
        ...newBoard.cards,
        [newCardId]: { id: newCardId, title, details },
      };
      
      const column = newBoard.columns[colId];
      newBoard.columns = {
        ...newBoard.columns,
        [colId]: {
          ...column,
          cardIds: [...column.cardIds, newCardId],
        },
      };
      
      return newBoard;
    });
  };

  const deleteCard = (colId: string, cardId: string) => {
    setBoardData((prev) => {
      const newBoard = { ...prev };
      
      const newCards = { ...newBoard.cards };
      delete newCards[cardId];
      newBoard.cards = newCards;
      
      const column = newBoard.columns[colId];
      newBoard.columns = {
        ...newBoard.columns,
        [colId]: {
          ...column,
          cardIds: column.cardIds.filter(id => id !== cardId),
        },
      };
      
      return newBoard;
    });
  };

  const renameColumn = (colId: string, newTitle: string) => {
    setBoardData((prev) => {
      const newBoard = { ...prev };
      const column = newBoard.columns[colId];
      newBoard.columns = {
        ...newBoard.columns,
        [colId]: {
          ...column,
          title: newTitle,
        },
      };
      return newBoard;
    });
  };

  return {
    boardData,
    moveCard,
    addCard,
    deleteCard,
    renameColumn,
  };
};
