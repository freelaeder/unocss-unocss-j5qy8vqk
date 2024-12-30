// src/components/Loading.tsx
import React from 'react';
import './Loading.css'; // 用于样式

const Loading: React.FC = () => {
  return (
    <div className="loading-container">
      <div className="loader"></div>
    </div>
  );
};

export default Loading;
