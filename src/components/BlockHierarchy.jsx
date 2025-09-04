import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    selectBlock,
    deleteBlock,
    updateBlockOrder,
} from "../store/builderSlice";
import {
    DndContext,
    closestCenter,
    PointerSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import {
    arrayMove,
    SortableContext,
    useSortable,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const SortableItem = ({ block, isActive, onSelect, onDelete }) => {
    const { attributes, listeners, setNodeRef, transform, transition } =
        useSortable({ id: block.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <li
            ref={setNodeRef}
            style={style}
            className={`hierarchy-item ${isActive ? "active" : ""}`}
            onClick={onSelect}
            {...attributes}
            {...listeners}
        >
            <span className="block-label">
                {block.type.toUpperCase()} #{block.id.slice(0, 4)}
            </span>
            <button
                className="delete-btn"
                onClick={(e) => {
                    e.stopPropagation();
                    onDelete(); Ф
                }}
            >
                ✕
            </button>
        </li>
    );
};

const BlockHierarchy = () => {
    const dispatch = useDispatch();
    const blocks = useSelector((state) => state.builder.blocks);
    const selectedBlock = useSelector((state) => state.builder.selectedBlock);

    const sensors = useSensors(useSensor(PointerSensor));

    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (active.id !== over.id) {
            const oldIndex = blocks.findIndex((b) => b.id === active.id);
            const newIndex = blocks.findIndex((b) => b.id === over.id);
            const newBlocks = arrayMove(blocks, oldIndex, newIndex);
            dispatch(updateBlockOrder(newBlocks));
        }
    };

    return (
        <div className="block-hierarchy">
            <h4>Иерархия</h4>
            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
            >
                <SortableContext
                    items={blocks.map((b) => b.id)}
                    strategy={verticalListSortingStrategy}
                >
                    <ul>
                        {blocks
                            .map((block) => (
                                <SortableItem
                                    key={block.id}
                                    block={block}
                                    isActive={selectedBlock === block.id}
                                    onSelect={() => dispatch(selectBlock(block.id))}
                                    onDelete={() => dispatch(deleteBlock(block.id))}
                                />
                            ))
                            .reverse()}
                    </ul>
                </SortableContext>
            </DndContext>
        </div>
    );
};

export default BlockHierarchy;
