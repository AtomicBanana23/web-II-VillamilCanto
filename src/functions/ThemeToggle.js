import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

export default function ThemeToggle() {
  const { toggleTheme } = useContext(ThemeContext);

  return <button onClick={toggleTheme}>Cambiar Tema</button>;
}