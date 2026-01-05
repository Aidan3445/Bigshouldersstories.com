import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Check, GripVertical, Pencil, Trash2, X } from "lucide-react";
import { UploadButton } from "../uploadthing/utils";
import type { EventData } from "@/server/events";

export type FormData = {
  name: string;
  description: string;
  videoUrl: string;
  imageId: string | null;
  collaborators: Array<string>;
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
  const [collaboratorsInput, setCollaboratorsInput] = useState(
    event.collaborators?.join(", ") ?? ""
  );

  const { register, handleSubmit, reset, watch, setValue } = useForm<Omit<FormData, "collaborators">>({
    defaultValues: {
      name: event.name,
      description: event.description,
      videoUrl: event.videoUrl,
      imageId: event.imageId,
    },
  });

  const watchedImageId = watch("imageId");

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

  const handleSave = (data: Omit<FormData, "collaborators">) => {
    const collaborators = collaboratorsInput
      .split(",")
      .map((c) => c.trim())
      .filter((c) => c.length > 0);

    onEdit(event.id, { ...data, collaborators });
    setIsEditing(false);
  };

  const handleCancel = () => {
    reset();
    setCollaboratorsInput(event.collaborators?.join(", ") ?? "");
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
              placeholder="Event name" />
            <textarea
              {...register("description")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Description"
              rows={2} />
            <input
              {...register("videoUrl")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Video URL" />
            <div>
              <input
                value={collaboratorsInput}
                onChange={(e) => setCollaboratorsInput(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Collaborators (comma-separated)" />
              <p className="text-xs text-gray-500 mt-1">Separate names with commas</p>
            </div>
            <div className="flex gap-8">
              {watchedImageId ? (
                <img
                  key={watchedImageId}
                  src={`${import.meta.env.VITE_UPLOADTHING_IMAGE_URL}/${watchedImageId}`}
                  alt={`Current image for ${event.name}`}
                  className="w-32 h-auto object-cover rounded-md border border-gray-300" />
              ) : (
                <div className="w-32 h-20 bg-gray-100 rounded-md border border-gray-300 flex items-center justify-center">
                  <span className="text-gray-500 text-sm">No Image</span>
                </div>
              )}
              <UploadButton endpoint="imageUploader" onClientUploadComplete={(res) => {
                if (res[0]) {
                  const newImageId = res[0].key
                  setValue("imageId", newImageId, { shouldDirty: true });
                }
              }} />
            </div>
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
            {event.collaborators && event.collaborators.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {event.collaborators.map((collaborator, index) => (
                  <span
                    key={index}
                    className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded-full">
                    {collaborator}
                  </span>
                ))}
              </div>
            )}
            {event.imageId && (
              <img
                src={`${import.meta.env.VITE_UPLOADTHING_IMAGE_URL}/${event.imageId}`}
                alt={`Image for ${event.name}`}
                className="w-32 h-auto object-cover rounded-md border border-gray-300 mt-2" />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
