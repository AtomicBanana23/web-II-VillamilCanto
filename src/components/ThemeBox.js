import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

export default function ThemedBox() {
  const { theme } = useContext(ThemeContext);

  const styles = {
    padding: '2rem',
    marginTop: '1rem',
    borderRadius: '10px',
    backgroundColor: theme === 'light' ? '#f0f0f0' : '#333',
    color: theme === 'light' ? '#000' : '#fff',
  };

  return <div style={styles}>El tema actual es: {theme}</div>;
}