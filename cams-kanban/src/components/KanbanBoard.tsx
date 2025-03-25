import { useState } from "react";
import PlusIcon from "../icons/PlusIcon";
import { Column, Id } from "../types";
import ColumnContainer from "./ColumnContainer";

function KanbanBoard() {
  const [columns, setColumns] = useState<Column[]>([]);
  console.log(columns);
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
      {/* margin auto to center the button */}
      <div className="m-auto">
        {/* div that will contain column data */}
        <div
          className="
        flex gap-4"
        >
          {columns.map((col) => (
            <ColumnContainer
              key={col.id}
              column={col}
              deleteColumn={deleteColumn}
            />
          ))}
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
      </div>
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

  function generateID() {
    return Math.floor(Math.random() * 10011);
  }
}

export default KanbanBoard;
