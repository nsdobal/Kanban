import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import { Column } from './Column';
import { useKanbanBoard } from '../hooks/useKanbanBoard';
import './Board.css';

export const Board = () => {
  const { boardData, moveCard, addCard, deleteCard, renameColumn } = useKanbanBoard();

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    moveCard(
      source.droppableId,
      destination.droppableId,
      source.index,
      destination.index,
      draggableId
    );
  };

  return (
    <div className="board-container">
      <header className="board-header">
        <h1>Kanban Board MVP</h1>
      </header>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="board-columns-wrapper">
          {boardData.columnOrder.map((columnId) => {
            const column = boardData.columns[columnId];
            const cards = column.cardIds.map((cardId) => boardData.cards[cardId]);

            return (
              <Column
                key={column.id}
                column={column}
                cards={cards}
                onAddCard={addCard}
                onDeleteCard={deleteCard}
                onRename={renameColumn}
              />
            );
          })}
        </div>
      </DragDropContext>
    </div>
  );
};
