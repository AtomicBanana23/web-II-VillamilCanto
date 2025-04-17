import {Link, useLocation } from 'react-router-dom';
import MyRouter from '../../router/Router';
import styles from '../../style/menu.module.css';

export default function Menu(){
    const location = useLocation();
    const restriction = ["/login"];
    const allowed = restriction.indexOf(location.pathname) === -1;
    
    return(
        <div className={styles.menu}>
            {(allowed &&
                <header className={styles.menu_header}> 
                <nav>
                  <div className={styles.nav_container}>
                    <div className={styles.nav_item}><Link to="/">Home</Link></div>
                    <div className={styles.nav_item}><Link to="/episodes">Episodes</Link></div>
                    <div className={styles.nav_item}><Link to="/characters">Characters</Link></div>
                  </div>
                </nav>
               </header>
             )}
            
             <MyRouter />
            </div>
    )
}