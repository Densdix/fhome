import React from 'react';
import './Loader.scss';

interface LoaderProps {
  size?: 'small' | 'medium' | 'large';
  color?: string;
}

export const Loader: React.FC<LoaderProps> = ({ 
  size = 'medium',
  color = '#000000'
}) => {
  return (
    <div className={`loader loader--${size}`}>
      <div className="loader__spinner" style={{ borderColor: color }} />
    </div>
  );
}; 