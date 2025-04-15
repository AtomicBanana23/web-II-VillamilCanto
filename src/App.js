import './App.css';
import MyFirstComponent from './components/MyFirstComponent';
import Form from './components/Form/Form';
import Profile from './components/Profile';
import { UserContextProvider } from './context/user-context';
import { Link } from 'react-router-dom';
import MyRouters from './router/Router'
import Menu from './page/base/Menu';

export default function App() {
  return (
    <div>
      <Menu />
    </div>
  );
}

// export default App;