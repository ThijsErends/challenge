import '../index.css'
import styles from './Layout.module.css'
import SidebarNavigation from './SidebarNavigation'

function Layout({ children }) {
  return (
    <>
      <SidebarNavigation />
      <div className="floating-shape shape-cloud"></div>
      <div className="floating-shape shape-star"></div>
      <div className="floating-shape shape-circle"></div>
      <header className={styles.stickyHeader}>
        <div className={styles.skylineBackground}>
          {/* Dutch houses with roofs and chimneys */}
          <div className={styles.house} style={{ left: '5%', width: '12%', height: '40px' }}>
            <div className={styles.rooftop}></div>
            <div className={styles.roof}></div>
            <div className={styles.chimney}>
              <div className={styles.smoke}></div>
              <div className={styles.smoke} style={{ animationDelay: '0.5s' }}></div>
              <div className={styles.smoke} style={{ animationDelay: '1s' }}></div>
            </div>
            {/* Horse on leftmost roof */}
            <div className={styles.horseOnRoof}>
              <div className={styles.horseBody}></div>
              <div className={styles.horseHead}></div>
              <div className={styles.horseMane}></div>
              <div className={styles.horseTail}></div>
            </div>
          </div>
          
          <div className={styles.house} style={{ left: '18%', width: '15%', height: '50px' }}>
            <div className={styles.rooftop}></div>
            <div className={styles.roof}></div>
            <div className={styles.chimney}>
              <div className={styles.smoke}></div>
              <div className={styles.smoke} style={{ animationDelay: '0.7s' }}></div>
              <div className={styles.smoke} style={{ animationDelay: '1.4s' }}></div>
            </div>
          </div>
          
          <div className={styles.house} style={{ left: '34%', width: '18%', height: '45px' }}>
            <div className={styles.rooftop}></div>
            <div className={styles.roof}></div>
            <div className={styles.chimney}>
              <div className={styles.smoke}></div>
              <div className={styles.smoke} style={{ animationDelay: '0.3s' }}></div>
              <div className={styles.smoke} style={{ animationDelay: '0.9s' }}></div>
            </div>
          </div>
          
          <div className={styles.house} style={{ left: '53%', width: '14%', height: '55px' }}>
            <div className={styles.rooftop}></div>
            <div className={styles.roof}></div>
            <div className={styles.chimney}>
              <div className={styles.smoke}></div>
              <div className={styles.smoke} style={{ animationDelay: '0.6s' }}></div>
              <div className={styles.smoke} style={{ animationDelay: '1.2s' }}></div>
            </div>
          </div>
          
          <div className={styles.house} style={{ left: '68%', width: '16%', height: '42px' }}>
            <div className={styles.rooftop}></div>
            <div className={styles.roof}></div>
            <div className={styles.chimney}>
              <div className={styles.smoke}></div>
              <div className={styles.smoke} style={{ animationDelay: '0.4s' }}></div>
              <div className={styles.smoke} style={{ animationDelay: '1.1s' }}></div>
            </div>
          </div>
          
          <div className={styles.house} style={{ left: '85%', width: '12%', height: '48px' }}>
            <div className={styles.rooftop}></div>
            <div className={styles.roof}></div>
            <div className={styles.chimney}>
              <div className={styles.smoke}></div>
              <div className={styles.smoke} style={{ animationDelay: '0.8s' }}></div>
              <div className={styles.smoke} style={{ animationDelay: '1.5s' }}></div>
            </div>
          </div>
        </div>
        <h1 className={styles.titleText}>Het Mysterie van Sinterklaas</h1>
      </header>
      <main>
        {children}
      </main>
      <footer>
        <p>© 2025 Thijs Erends</p>
      </footer>
    </>
  )
}

export default Layout

