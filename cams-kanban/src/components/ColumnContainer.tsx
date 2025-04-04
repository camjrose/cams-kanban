import { useSortable } from "@dnd-kit/sortable";
import DeleteIcon from "../icons/DeleteIcon";
import { Column, Id } from "../types";
import { CSS } from "@dnd-kit/utilities";

//define interface Props to hold column data
interface Props {
  column: Column;
  deleteColumn: (id: Id) => void;
}
function ColumnContainer(props: Props) {
  const { column, deleteColumn } = props;

  // we added this block to help drag with the help of dnd
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: {
      type: "Column",
      column,
    },
  });

  // we added this style block as well
  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="
    bg-columnBackgroundColor
    opacity-60
    border-2
    border-rose-400
    w-[350px]
    h-[500px]
    max-h-[500px]
    rounded-md
    flex
    flex-col
    "
      ></div>
    );
  }

  return (
    // we set our Node ref and style here
    <div
      ref={setNodeRef}
      style={style}
      className="
  bg-columnBackgroundColor 
  w-[350px]
  h-[500px]
  max-h-[500px]
  rounded-md
  flex
  flex-col
  "
    >
      {/* Column title */}
      <div
        // we spread attributes and listeners here
        {...attributes}
        {...listeners}
        className="
        bg-mainBackgroundColor
        h-[60px]
        cursor-grab
        rounded-md
        rounded-b-none
        p-3
        font-bold
        border-columnBackgroundColor
        border-4
        flex
        items-center
        justify-between
      "
      >
        <div className="flex gap-2">
          <div
            className="
        flex
        items-center
        justify-center
        bg-columnBackgroundColor
        px-2
        py-1
        text-sm
        rounded-full
        "
          >
            0
          </div>
          {column.title}
        </div>
        <button
          onClick={() => {
            deleteColumn(column.id);
          }}
          className="
        stroke-gray-500
        hover:stroke-white
        hover:bg-columnBackgroundColor
        rounded
        px-1
        py-2
        "
        >
          <DeleteIcon />
        </button>
      </div>

      {/* Column task container */}
      <div
        className="
      flex
      flex-grow
      "
      ></div>
      {/* Column footer */}
      <div>Footer</div>
    </div>
  );
}

export default ColumnContainer;
