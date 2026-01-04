import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Check, GripVertical, Pencil, Trash2, X } from "lucide-react";

export type EventData = {
  id: number;
  name: string;
  createdAt: Date | null;
  order: number;
  description: string;
  videoUrl: string;
};

export type FormData = {
  name: string;
  description: string;
  videoUrl: string;
};

export default function SortableItem({
  event,
  onEdit,
  onDelete,
}: {
  event: EventData;
  onEdit: (id: number, data: Partial<EventData>) => void;
  onDelete: (id: number) => void;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const { register, handleSubmit, reset } = useForm<FormData>({
    defaultValues: {
      name: event.name,
      description: event.description,
      videoUrl: event.videoUrl,
    },
  });

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: event.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleSave = (data: FormData) => {
    onEdit(event.id, data);
    setIsEditing(false);
  };

  const handleCancel = () => {
    reset();
    setIsEditing(false);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-2 ${isDragging ? "opacity-50 shadow-lg" : ""
        }`}>
      <div className="flex items-start gap-3">
        <button
          type="button"
          className="mt-1 cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600"
          {...attributes}
          {...listeners}>
          <GripVertical size={20} />
        </button>

        {isEditing ? (
          <form onSubmit={handleSubmit(handleSave)} className="flex-1 space-y-3">
            <input
              {...register("name", { required: true })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Event name"
            />
            <textarea
              {...register("description")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Description"
              rows={2}
            />
            <input
              {...register("videoUrl")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Video URL"
            />
            <div className="flex gap-2">
              <button
                type="submit"
                className="flex items-center gap-1 px-3 py-1.5 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
                <Check size={16} />
                Save
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="flex items-center gap-1 px-3 py-1.5 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors">
                <X size={16} />
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-900">{event.name}</h3>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors">
                  <Pencil size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => onDelete(event.id)}
                  className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded transition-colors">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
            {event.description && (
              <p className="text-sm text-gray-600 mt-1">{event.description}</p>
            )}
            {event.videoUrl && (
              <p className="text-xs text-blue-500 mt-1 truncate">{event.videoUrl}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
