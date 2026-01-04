import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Plus, X } from "lucide-react";
import SortableItem from "./sortable";
import type { EventData, FormData } from "./sortable";
import type {
  DragEndEvent
} from "@dnd-kit/core";
import { createEvent, deleteEvent, editEvent } from "@/routes/productions/events.server-funcs";
import { Route } from "@/routes/productions";

export default function Edit() {
  const initialEventsData = Route.useLoaderData();
  const [events, setEvents] = useState<Array<EventData>>(initialEventsData);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const { register, handleSubmit, reset } = useForm<FormData>({
    defaultValues: {
      name: "",
      description: "",
      videoUrl: "",
    },
  });

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const createMutation = useMutation({
    mutationFn: createEvent,
  });

  const editMutation = useMutation({
    mutationFn: editEvent,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteEvent,
    onSuccess: (_, variables) => {
      setEvents((prev) => prev.filter((e) => e.id !== variables.data.id));
    },
  });

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setEvents((items) => {
        const oldIndex = items.findIndex((i) => i.id === active.id);
        const newIndex = items.findIndex((i) => i.id === over.id);
        const newItems = arrayMove(items, oldIndex, newIndex);

        newItems.forEach((item, index) => {
          if (item.order !== index) {
            editMutation.mutate({ data: { id: item.id, order: index } });
          }
        });

        return newItems.map((item, index) => ({ ...item, order: index }));
      });
    }
  };

  const handleCreate = (data: FormData) => {
    createMutation.mutate({
      data: {
        ...data,
        order: events.length,
      },
    });
    reset();
    setIsFormOpen(false);
  };

  const handleEdit = (id: number, data: Partial<EventData>) => {
    editMutation.mutate({ data: { id, ...data } });
    setEvents((prev) =>
      prev.map((e) => (e.id === id ? { ...e, ...data } : e))
    );
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this event?")) {
      deleteMutation.mutate({ data: { id } });
    }
  };

  return (
    <section className="p-8 bg-gray-100 h-min">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Edit Productions</h2>
          <button
            type="button"
            onClick={() => setIsFormOpen(!isFormOpen)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${isFormOpen
              ? "bg-gray-200 text-gray-700 hover:bg-gray-300"
              : "bg-blue-600 text-white hover:bg-blue-700"
              }`}>
            {isFormOpen ? (
              <>
                <X size={18} />
                Cancel
              </>
            ) : (
              <>
                <Plus size={18} />
                Add Event
              </>
            )}
          </button>
        </div>
        {isFormOpen && (
          <form
            onSubmit={handleSubmit(handleCreate)}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              New Event
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  {...register("name", { required: true })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter event name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  {...register("description")}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter description"
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Video URL
                </label>
                <input
                  {...register("videoUrl")}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://..."
                />
              </div>
              <button
                type="submit"
                disabled={createMutation.isPending}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                {createMutation.isPending ? "Creating..." : "Create Event"}
              </button>
            </div>
          </form>
        )}
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}>
          <SortableContext
            items={events.map((e) => e.id)}
            strategy={verticalListSortingStrategy}>
            {events.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                No events yet. Click "Add Event" to create one.
              </div>
            ) : (
              events.map((event) => (
                <SortableItem
                  key={event.id}
                  event={event}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))
            )}
          </SortableContext>
        </DndContext>
      </div>
    </section>
  );
}
