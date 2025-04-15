import { ThemeProvider } from '../context/ThemeContext';
import ThemeToggle from '../functions/ThemeToggle';
import ThemedBox from '../components/ThemeBox';

export default function Contact() {
  return (
    <ThemeProvider>
      <div style={{ padding: '2rem' }}>
        <h1>Mini app con useContext</h1>
        <ThemeToggle />
        <ThemedBox />
      </div>
    </ThemeProvider>
  );
}