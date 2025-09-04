import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteBlock, updateBlockProps, updateBlockPosition } from '../store/builderSlice'

const BlockEditor = () => {
  const dispatch = useDispatch()
  const selectedBlock = useSelector(state => state.builder.selectedBlock)
  const block = useSelector(state =>
    state.builder.blocks.find(b => b.id === selectedBlock)
  )

  if (!block) return null

  const handleChange = (e) => {
    const { name, value } = e.target
    if (['x', 'y'].includes(name)) {
      dispatch(updateBlockPosition({
        id: block.id,
        [name]: Number(value)
      }))
    } else {
      dispatch(updateBlockProps({
        id: block.id,
        props: {
          [name]: ['width', 'height'].includes(name)
            ? Number(value)
            : name === 'opacity'
              ? parseFloat(value)
              : value
        }
      }))
    }
  }

  let typeSpecificFields = null

  if (block.type === 'layer') {
    typeSpecificFields = (<>
      <div style={{ marginBottom: '6px' }}>
        <label>Backgroud Color:</label>
        <input
          type='color'
          name='backgroundColor'
          value={block.props?.backgroundColor ?? 'lightgray'}
          onChange={handleChange}
          style={{ width: '60px', marginRight: '8px' }}
        />
      </div>
    </>)
  }

  return (

    <div className="editor">
      <h4>Редактирование {block.type} #{block.id.slice(0, 4)}</h4>
      <div style={{ marginBottom: '6px' }}>
        <label>X:</label>
        <input
          type="number"
          name="x"
          value={block.x ?? 0}
          onChange={handleChange}
          style={{ width: '60px', marginRight: '8px' }}
        />
        <label>Y:</label>
        <input
          type="number"
          name="y"
          value={block.y ?? 0}
          onChange={handleChange}
          style={{ width: '60px' }}
        />
      </div>

      <div style={{ marginBottom: '6px' }}>
        <label>Width (px):</label>
        <input
          type="number"
          name="width"
          value={block.props?.width ?? 100}
          onChange={handleChange}
          style={{ width: '100%' }}
        />
      </div>

      <div style={{ marginBottom: '6px' }}>
        <label>Height (px):</label>
        <input
          type="number"
          name="height"
          value={block.props?.height ?? 100}
          onChange={handleChange}
          style={{ width: '100%' }}
        />
      </div>

      <div style={{ marginBottom: '6px' }}>
        <label>Opacity:</label>
        <input
          type="number"
          name="opacity"
          step="0.1"
          min="0"
          max="1"
          value={typeof block.props?.opacity === 'number' ? block.props.opacity : 1}
          onChange={handleChange}
          style={{ width: '100%' }}
        />
      </div>
      {typeSpecificFields}
      <button className="btn" onClick={() => dispatch(deleteBlock(block.id))}>
        Удалить блок
      </button>
    </div>
  )
}

export default BlockEditor
