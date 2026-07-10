import { useState, useRef, useEffect } from 'react';
import { Droppable } from '@hello-pangea/dnd';
import { Column as ColumnType, Card as CardType } from '../lib/data';
import { Card } from './Card';
import { Plus, Edit2, Check, X } from 'lucide-react';
import './Column.css';

interface ColumnProps {
  column: ColumnType;
  cards: CardType[];
  onAddCard: (colId: string, title: string, details: string) => void;
  onDeleteCard: (colId: string, cardId: string) => void;
  onRename: (colId: string, newTitle: string) => void;
}

export const Column = ({ column, cards, onAddCard, onDeleteCard, onRename }: ColumnProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(column.title);
  const [isAdding, setIsAdding] = useState(false);
  const [newCardTitle, setNewCardTitle] = useState('');
  const [newCardDetails, setNewCardDetails] = useState('');

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleRenameSubmit = () => {
    if (editTitle.trim()) {
      onRename(column.id, editTitle.trim());
    } else {
      setEditTitle(column.title);
    }
    setIsEditing(false);
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCardTitle.trim()) {
      onAddCard(column.id, newCardTitle.trim(), newCardDetails.trim());
      setNewCardTitle('');
      setNewCardDetails('');
      setIsAdding(false);
    }
  };

  return (
    <div className="column-container">
      <div className="column-header">
        {isEditing ? (
          <div className="rename-input-group">
            <input
              ref={inputRef}
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleRenameSubmit();
                if (e.key === 'Escape') {
                  setEditTitle(column.title);
                  setIsEditing(false);
                }
              }}
              className="rename-input"
            />
            <button className="icon-btn success" onClick={handleRenameSubmit}>
              <Check size={16} />
            </button>
            <button className="icon-btn danger" onClick={() => { setEditTitle(column.title); setIsEditing(false); }}>
              <X size={16} />
            </button>
          </div>
        ) : (
          <div className="title-group" onClick={() => setIsEditing(true)}>
            <h3>{column.title}</h3>
            <span className="card-count">{cards.length}</span>
            <button className="edit-btn" title="Rename Column">
              <Edit2 size={14} />
            </button>
          </div>
        )}
      </div>

      <Droppable droppableId={column.id}>
        {(provided, snapshot) => (
          <div
            className={`column-content ${snapshot.isDraggingOver ? 'is-dragging-over' : ''}`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {cards.map((card, index) => (
              <Card
                key={card.id}
                card={card}
                index={index}
                onDelete={(cardId) => onDeleteCard(column.id, cardId)}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      <div className="column-footer">
        {isAdding ? (
          <form className="add-card-form" onSubmit={handleAddSubmit}>
            <input
              type="text"
              placeholder="Card Title"
              value={newCardTitle}
              onChange={(e) => setNewCardTitle(e.target.value)}
              className="add-card-input"
              autoFocus
              required
            />
            <textarea
              placeholder="Details (optional)"
              value={newCardDetails}
              onChange={(e) => setNewCardDetails(e.target.value)}
              className="add-card-textarea"
              rows={2}
            />
            <div className="add-card-actions">
              <button type="submit" className="btn-primary" disabled={!newCardTitle.trim()}>
                Add Card
              </button>
              <button type="button" className="btn-secondary" onClick={() => setIsAdding(false)}>
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <button className="add-btn" onClick={() => setIsAdding(true)}>
            <Plus size={16} />
            <span>Add a card</span>
          </button>
        )}
      </div>
    </div>
  );
};
