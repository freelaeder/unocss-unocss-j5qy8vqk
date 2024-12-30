// src/components/Loading.tsx
import React from 'react';
import './Loading.css'; // 用于样式

const Loading: React.FC = () => {
  return (
    <div className="loading-container">
      <p className='animate-spin'>..........</p>
    </div>
  );
};

export default Loading;
