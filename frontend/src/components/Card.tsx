import { Draggable } from '@hello-pangea/dnd';
import type { DraggableProvided, DraggableStateSnapshot } from '@hello-pangea/dnd';
import { Card as CardType } from '../lib/data';
import { Trash2 } from 'lucide-react';
import './Card.css';

interface CardProps {
  card: CardType;
  index: number;
  onDelete: (cardId: string) => void;
}

export const Card = ({ card, index, onDelete }: CardProps) => {
  return (
     <Draggable draggableId={card.id} index={index}>
       {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
        <div
          className={`card ${snapshot.isDragging ? 'is-dragging' : ''}`}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className="card-header">
            <h4>{card.title}</h4>
            <button className="delete-btn" onClick={() => onDelete(card.id)} title="Delete Card">
              <Trash2 size={16} />
            </button>
          </div>
          {card.details && <p className="card-details">{card.details}</p>}
        </div>
      )}
    </Draggable>
  );
};
