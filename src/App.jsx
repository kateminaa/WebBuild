import React, { useEffect, useState } from "react";
import BlockLibrary from "./components/BlockLibrary";
import Canvas from "./components/Canvas";
import BlockEditor from "./components/BlockEditor";
import { useSelector } from "react-redux";
import "./styles/App.css";
import BlockHierarchy from "./components/BlockHierarchy";

const App = () => {
  const [isLoading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  const selectedBlock = useSelector((state) => state.builder.selectedBlock);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => setLoading(false), 1000);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className={`preloader ${fadeOut ? "fade-out" : ""}`}>
        <div className="bg-icons">
          <svg className="icon" viewBox="0 0 24 24" width="24" height="24" stroke="#6c4bb3" fill="none" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="6" x2="12" y2="12" />
            <line x1="12" y1="12" x2="16" y2="14" />
          </svg>

          <svg className="icon" viewBox="0 0 24 24" width="24" height="24" stroke="#6c4bb3" fill="none" strokeWidth="2">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            <line x1="3" y1="9" x2="21" y2="9" />
          </svg>

          <svg className="icon" viewBox="0 0 24 24" width="24" height="24" stroke="#6c4bb3" fill="none" strokeWidth="2">
            <path d="M3 12h18" />
            <path d="M3 6h18" />
            <path d="M3 18h18" />
          </svg>

          <svg className="icon" viewBox="0 0 24 24" width="24" height="24" stroke="#6c4bb3" fill="none" strokeWidth="2">
            <polygon points="4,4 20,12 4,20" />
          </svg>

          <svg className="icon" viewBox="0 0 24 24" width="24" height="24" stroke="#6c4bb3" fill="none" strokeWidth="2">
            <circle cx="12" cy="12" r="5" />
            <line x1="12" y1="7" x2="12" y2="12" />
          </svg>
        </div>

        <div className="logo bounce">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="70"
            height="70"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#6c4bb3"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="4" width="18" height="12" rx="2" ry="2"></rect>
            <line x1="2" y1="20" x2="22" y2="20"></line>
          </svg>
          <h1 className="site-name">WebBuilder</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="app-grid">
      <div className="header">
        <div className="header-left">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#5c4b91"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ marginRight: '8px' }}
          >
            <rect x="3" y="4" width="18" height="12" rx="2" ry="2"></rect>
            <line x1="2" y1="20" x2="22" y2="20"></line>
          </svg>
          WebBuilder
        </div>
        <div className="header-right">
          <button className="header-btn">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
            </svg>
            Сохранить
          </button>
          <button className="header-btn">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path d="M4 4v16h16" />
              <polyline points="4,20 20,4" />
            </svg>
            Экспорт
          </button>
          <button className="header-btn">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <circle cx="12" cy="12" r="3" />
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l0 0a2 2 0 0 1-2.83 2.83l0 0a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 .96 1.65 1.65 0 0 1-3.28 0 1.65 1.65 0 0 0-1-.96 1.65 1.65 0 0 0-1.82.33l0 0a2 2 0 0 1-2.83-2.83l0 0a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-.96-1 1.65 1.65 0 0 1 0-3.28 1.65 1.65 0 0 0 .96-1 1.65 1.65 0 0 0-.33-1.82l0 0a2 2 0 0 1 2.83-2.83l0 0a1.65 1.65 0 0 0 1.82.33h0a1.65 1.65 0 0 0 1-.96 1.65 1.65 0 0 1 3.28 0 1.65 1.65 0 0 0 1 .96h0a1.65 1.65 0 0 0 1.82-.33l0 0a2 2 0 0 1 2.83 2.83l0 0a1.65 1.65 0 0 0-.33 1.82 1.65 1.65 0 0 0 .96 1 1.65 1.65 0 0 1 0 3.28 1.65 1.65 0 0 0-.96 1z" />
            </svg>
            Настройки
          </button>
        </div>
      </div>

      <div className="leftSidebar">
        <BlockLibrary />
        <BlockHierarchy />
      </div>
      <div className="rightSidebar">  {selectedBlock ? <BlockEditor /> : <h4>Выберите блок для редактирования</h4>}</div>

      <div className="canvas-wrapper">
        <Canvas />
      </div>
    </div>
  )
};

export default App;
