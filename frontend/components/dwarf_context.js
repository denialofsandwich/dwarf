import React from 'react';

const DwarfContext = React.createContext(null);
const ThemeContext = React.createContext(null);

function useDwarfData() {
  const ctx = React.useContext(DwarfContext);
  const themeMode = React.useContext(ThemeContext);

  return {...ctx, themeMode};
}

export {ThemeContext, DwarfContext, useDwarfData};