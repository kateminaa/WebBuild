import React, { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BlockRenderer from "./BlockRenderer";
import { DndContext, useDraggable, useSensor, useSensors, PointerSensor } from '@dnd-kit/core'
import { updateBlockPosition, selectBlock } from "../store/builderSlice";


function DraggableBlock({ block }) {
  const dispatch = useDispatch()
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id: block.id })

  const style = {
    position: 'absolute',
    top: block.y,
    left: block.x,
    width: block.width || 'fit-content',
    height: block.height || 'auto',
    cursor: 'grab',
    transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : undefined,
    userSelect: 'none',
  }

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      onClick={() => dispatch(selectBlock(block.id))}
      onDoubleClick={() => dispatch(selectBlock(block.id))}
    >
      <BlockRenderer block={block} />
    </div>
  )
}

const Canvas = () => {
  const dispatch = useDispatch()
  const blocks = useSelector((state) => state.builder.blocks);
  const [scale, setScale] = useState(1);
  const lastDistance = useRef(null);
  const canvasRef = useRef(null);
  const sensors = useSensors(useSensor(PointerSensor))

  const handleDragEnd = ({ active, delta }) => {
    const block = blocks.find(b => b.id === active.id)
    if (!block) return
    const newX = block.x + delta.x
    const newY = block.y + delta.y
    dispatch(updateBlockPosition({ id: block.id, x: newX, y: newY }))
  }

  const handleWheel = (e) => {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      setScale((prev) => Math.min(Math.max(prev - e.deltaY * 0.01, 0.5), 3));
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      canvas.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <div
        ref={canvasRef}
        onTouchMove={(e) => {
          if (e.touches.length === 2) {
            e.preventDefault();
            const [a, b] = e.touches;
            const dx = a.pageX - b.pageX;
            const dy = a.pageY - b.pageY;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (lastDistance.current != null) {
              const delta = distance - lastDistance.current;
              setScale((prev) => Math.min(Math.max(prev + delta * 0.005, 0.5), 3));
            }
            lastDistance.current = distance;
          }
        }}
        onTouchEnd={() => {
          lastDistance.current = null;
        }}
        className="canvas"
      >
        <div style={{
          width: "100%",
          height: "100%",
          transform: `scale(${scale})`,
          transformOrigin: "0 0",
          position: "relative"
        }}>
          {blocks.map((block) => (
            <DraggableBlock key={block.id} block={block} />
          ))}
        </div>
      </div>
    </DndContext>
  );
};

export default Canvas;
