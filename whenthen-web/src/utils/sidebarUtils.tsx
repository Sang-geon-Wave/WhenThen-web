import React from 'react';

export const isActive = (path: string): boolean => {
  return window.location.pathname.startsWith(path);
};

export const isCurrent = (to: string): boolean => {
  return window.location.pathname.startsWith(to);
};
