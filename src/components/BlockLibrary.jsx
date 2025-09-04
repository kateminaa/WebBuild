import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addBlock } from '../store/builderSlice';

const BlockLibrary = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const [showAll, setShowAll] = useState(false);
  const [visibleCount, setVisibleCount] = useState(5);

  const blocksData = [
    { type: 'layer', label: 'Слой', icon: <svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" stroke="currentColor" fill="none" strokeWidth="2" /></svg> },
    { type: 'text', label: 'Текст', icon: <svg viewBox="0 0 24 24"><text x="4" y="16" fontSize="14" fill="currentColor">T</text></svg>, props: { text: 'hi' } },
    { type: 'img', label: 'Фото', icon: <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="6" stroke="currentColor" fill="none" strokeWidth="2" /></svg>, props: { src: 'https://i.pinimg.com/736x/6c/bc/ff/6cbcff49dd33135a19f8970a48a0b6f4.jpg' } },
    { type: 'button', label: 'Кнопка', icon: <svg viewBox="0 0 24 24"><rect x="3" y="9" width="18" height="6" fill="currentColor" /></svg> },
    { type: 'video', label: 'Видео', icon: <svg viewBox="0 0 24 24"><polygon points="4,4 20,12 4,20" fill="currentColor" /></svg> },
    { type: 'form', label: 'Форма', icon: <svg viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" stroke="currentColor" fill="none" strokeWidth="2" /></svg> },
    { type: 'heading', label: 'Заголовок', icon: <svg viewBox="0 0 24 24"><text x="4" y="16" fontSize="14" fill="currentColor">H</text></svg> },
    { type: 'input', label: 'Поле ввода', icon: <svg viewBox="0 0 24 24"><rect x="3" y="9" width="18" height="6" stroke="currentColor" fill="none" strokeWidth="2" /></svg> },
    { type: 'quote', label: 'Цитата', icon: <svg viewBox="0 0 24 24"><path d="M6 8h4v8H6V8zm8 0h4v8h-4V8z" fill="currentColor" /></svg> },
    { type: 'list', label: 'Список', icon: <svg viewBox="0 0 24 24"><line x1="4" y1="6" x2="20" y2="6" stroke="currentColor" strokeWidth="2" /><line x1="4" y1="12" x2="20" y2="12" stroke="currentColor" strokeWidth="2" /><line x1="4" y1="18" x2="20" y2="18" stroke="currentColor" strokeWidth="2" /></svg> },
  ];

  const filteredBlocks = blocksData.filter(block =>
    block.label.toLowerCase().includes(search.toLowerCase())
  );

  const visibleBlocks = filteredBlocks.slice(0, visibleCount);

  useEffect(() => {
    if (showAll) {
      let index = visibleCount;
      const interval = setInterval(() => {
        index++;
        if (index > filteredBlocks.length) {
          clearInterval(interval);
        } else {
          setVisibleCount(index);
        }
      }, 100);
      return () => clearInterval(interval);
    }
  }, [showAll, filteredBlocks.length]);

  return (
    <div className="block-library">
      <h4>Библиотека блоков</h4>

      <div className="blocks-container">
        <input
          type="text"
          placeholder="Поиск блоков..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="block-search"
        />

        {visibleBlocks.map((block, index) => (
          <button
            key={index}
            className="btn fade-slide"
            onClick={() => dispatch(addBlock(block.type, block.props))}
          >
            {block.icon}
            {block.label}
          </button>
        ))}

        <button
          className="btn show-more"
          onClick={() => {
            if (showAll) {
              setVisibleCount(5);
              setShowAll(false);
            } else {
              setShowAll(true);
            }
          }}
          style={{ color: '#5c4b91', flex: '0 0 40px', minHeight: '40px', maxHeight: '40px' }}
        >
          {!showAll ? `Показать больше` : `Скрыть`}
        </button>

      </div>
    </div>
  );
};

export default BlockLibrary;
