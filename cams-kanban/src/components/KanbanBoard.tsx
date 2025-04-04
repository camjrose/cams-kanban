import { useMemo, useState } from "react";
import PlusIcon from "../icons/PlusIcon";
import { Column, Id } from "../types";
import ColumnContainer from "./ColumnContainer";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
} from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";

function KanbanBoard() {
  const [columns, setColumns] = useState<Column[]>([]);
  const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);

  // lets save the dragStart event in a state
  const [activeColumn, setActiveColumn] = useState<Column | null>(null);

  return (
    /* parent flexbox div */
    <div
      className="
        m-auto
        flex
        min-h-screen
        w-full
        items-center
        overflow-x-auto
        overflow-y-hidden
        p-[40px]
    "
    >
      <DndContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
        <div className="m-auto flex gap-4">
          {/* div that will contain column data */}
          <div
            className="
        flex gap-4"
          >
            <SortableContext items={columnsId}>
              {columns.map((col) => (
                <ColumnContainer
                  key={col.id}
                  column={col}
                  deleteColumn={deleteColumn}
                />
              ))}
            </SortableContext>

            {/*  create new column button */}
            <button
              onClick={() => {
                createNewColumn();
              }}
              className="
        h-[80px]
        w-[350px]
        min-w-[350px]
        cursor-pointer
        rounded-2xl
        bg-mainBackgroundColor
        border-2
        border-columnBackgroundColor
        p-6
        ring-rose-600
        hover:ring-2
        flex
        gap-2
        "
            >
              <PlusIcon />
              Add Column
            </button>
          </div>
          {createPortal(
            <DragOverlay>
              {activeColumn && (
                <ColumnContainer
                  column={activeColumn}
                  deleteColumn={deleteColumn}
                />
              )}
            </DragOverlay>,
            document.body
          )}
        </div>
      </DndContext>
      {/* margin auto to center the button */}
    </div>
  );

  function createNewColumn() {
    const columnToAdd: Column = {
      id: generateID(),
      title: `Column ${columns.length + 1}`,
    };
    setColumns([...columns, columnToAdd]);
  }
  function deleteColumn(id: Id) {
    const filteredColumns = columns.filter((col) => col.id !== id);
    setColumns(filteredColumns);
  }

  function onDragStart(event: DragStartEvent) {
    console.log("DRAG START", event);
    if (event.active.data.current?.type === "Column") {
      setActiveColumn(event.active.data.current.column);
      return;
    }
  }

  function onDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    console.log("DRAG END", event);
    // if not over event, then we havent dragged the col over another valid column
    if (!over) return;

    const activeColumnID = active.id;
    const overColumnID = over.id;

    // verify that we have actually moved the column
    if (activeColumnID === overColumnID) return;

    // then we want to set the columns array to what is returned by the array nmove funciton
    // we use helpers within to grab the index values
    setColumns((columns) => {
      const activeColumnIndex = columns.findIndex(
        (col) => col.id === activeColumnID
      );

      const overColumnIndex = columns.findIndex(
        (col) => col.id === overColumnID
      );

      return arrayMove(columns, activeColumnIndex, overColumnIndex);
    });

    if (event.active.data.current?.type === "Column") {
      setActiveColumn(event.active.data.current.column);
      return;
    }
  }

  function generateID() {
    return Math.floor(Math.random() * 10011);
  }
}

export default KanbanBoard;
