import '../index.css'
import styles from './Layout.module.css'
import SidebarNavigation from './SidebarNavigation'

function Layout({ children }) {
  return (
    <>
      {/* Skip link for keyboard accessibility */}
      <a href="#main-content" className="skip-link">
        Ga naar inhoud
      </a>
      <SidebarNavigation />
      <div className="floating-shape shape-cloud" aria-hidden="true"></div>
      <div className="floating-shape shape-star" aria-hidden="true"></div>
      <div className="floating-shape shape-circle" aria-hidden="true"></div>
      <header className={styles.stickyHeader} role="banner">
        <div className={styles.skylineBackground}>
          {/* Dutch canal houses with different heights and colors */}

          {/* House 1 - Red with step gable - Sinterklaas on this one (short house) */}
          <div className={`${styles.house} ${styles.houseRed}`} style={{ left: '2%', width: '14%' }}>
            <div className={`${styles.houseWall} ${styles.shortHouse}`}>
              <div className={styles.stepGable}>
                <div className={styles.step}></div>
                <div className={styles.step}></div>
                <div className={styles.step}></div>
              </div>
              <div className={styles.windowRow}>
                <div className={styles.window}></div>
                <div className={styles.window}></div>
                <div className={styles.window}></div>
              </div>
            </div>
            <div className={styles.chimney}>
              <div className={styles.smoke}></div>
              <div className={styles.smoke} style={{ animationDelay: '0.5s' }}></div>
            </div>
            {/* Sinterklaas on horse on this roof */}
            <div className={styles.horseOnRoof}>
              <div className={styles.horseTail}></div>
              <div className={styles.horseBody}></div>
              <div className={styles.horseNeck}></div>
              <div className={styles.horseHead}></div>
              <div className={styles.horseMane}></div>
              <div className={styles.sinterklaas}>
                <div className={styles.sintBody}></div>
                <div className={styles.sintHead}></div>
                <div className={styles.sintMitre}></div>
                <div className={styles.sintBeard}></div>
              </div>
            </div>
          </div>

          {/* House 2 - Cream/Yellow with bell gable */}
          <div className={`${styles.house} ${styles.houseCream}`} style={{ left: '16%', width: '13%' }}>
            <div className={`${styles.houseWall} ${styles.tallHouse}`}>
              <div className={styles.bellGable}></div>
              <div className={styles.windowRow}>
                <div className={styles.window}></div>
                <div className={styles.window}></div>
              </div>
              <div className={styles.windowRow}>
                <div className={styles.window}></div>
                <div className={styles.window}></div>
              </div>
              <div className={styles.windowRow}>
                <div className={styles.window}></div>
                <div className={styles.window}></div>
              </div>
              <div className={styles.door}></div>
            </div>
            <div className={styles.chimney}>
              <div className={styles.smoke}></div>
              <div className={styles.smoke} style={{ animationDelay: '0.8s' }}></div>
            </div>
          </div>

          {/* House 3 - Green with pointed gable */}
          <div className={`${styles.house} ${styles.houseGreen}`} style={{ left: '29%', width: '12%' }}>
            <div className={styles.houseWall}>
              <div className={styles.pointedGable}></div>
              <div className={styles.windowRow}>
                <div className={styles.window}></div>
                <div className={styles.window}></div>
                <div className={styles.window}></div>
              </div>
              <div className={styles.windowRow}>
                <div className={styles.window}></div>
                <div className={styles.window}></div>
                <div className={styles.window}></div>
              </div>
              <div className={styles.door}></div>
            </div>
            <div className={styles.chimney}>
              <div className={styles.smoke}></div>
              <div className={styles.smoke} style={{ animationDelay: '1.2s' }}></div>
            </div>
          </div>

          {/* House 4 - Orange with neck gable */}
          <div className={`${styles.house} ${styles.houseOrange}`} style={{ left: '41%', width: '14%' }}>
            <div className={`${styles.houseWall} ${styles.tallHouse}`}>
              <div className={styles.neckGable}></div>
              <div className={styles.windowRow}>
                <div className={styles.window}></div>
                <div className={styles.window}></div>
                <div className={styles.window}></div>
              </div>
              <div className={styles.windowRow}>
                <div className={styles.window}></div>
                <div className={styles.window}></div>
                <div className={styles.window}></div>
              </div>
              <div className={styles.windowRow}>
                <div className={styles.window}></div>
                <div className={styles.window}></div>
                <div className={styles.window}></div>
              </div>
              <div className={styles.door}></div>
            </div>
            <div className={styles.chimney}>
              <div className={styles.smoke}></div>
              <div className={styles.smoke} style={{ animationDelay: '0.3s' }}></div>
            </div>
          </div>

          {/* House 5 - Blue with step gable */}
          <div className={`${styles.house} ${styles.houseBlue}`} style={{ left: '55%', width: '13%' }}>
            <div className={styles.houseWall}>
              <div className={styles.stepGable}>
                <div className={styles.step}></div>
                <div className={styles.step}></div>
                <div className={styles.step}></div>
              </div>
              <div className={styles.windowRow}>
                <div className={styles.window}></div>
                <div className={styles.window}></div>
                <div className={styles.window}></div>
              </div>
              <div className={styles.windowRow}>
                <div className={styles.window}></div>
                <div className={styles.window}></div>
                <div className={styles.window}></div>
              </div>
              <div className={styles.door}></div>
            </div>
            <div className={styles.chimney}>
              <div className={styles.smoke}></div>
              <div className={styles.smoke} style={{ animationDelay: '0.6s' }}></div>
            </div>
          </div>

          {/* House 6 - Brown with bell gable */}
          <div className={`${styles.house} ${styles.houseBrown}`} style={{ left: '68%', width: '14%' }}>
            <div className={`${styles.houseWall} ${styles.tallHouse}`}>
              <div className={styles.bellGable}></div>
              <div className={styles.windowRow}>
                <div className={styles.window}></div>
                <div className={styles.window}></div>
                <div className={styles.window}></div>
              </div>
              <div className={styles.windowRow}>
                <div className={styles.window}></div>
                <div className={styles.window}></div>
                <div className={styles.window}></div>
              </div>
              <div className={styles.windowRow}>
                <div className={styles.window}></div>
                <div className={styles.window}></div>
                <div className={styles.window}></div>
              </div>
              <div className={styles.door}></div>
            </div>
            <div className={styles.chimney}>
              <div className={styles.smoke}></div>
              <div className={styles.smoke} style={{ animationDelay: '1s' }}></div>
            </div>
          </div>

          {/* House 7 - Red with pointed gable */}
          <div className={`${styles.house} ${styles.houseRed}`} style={{ left: '82%', width: '16%' }}>
            <div className={styles.houseWall}>
              <div className={styles.pointedGable}></div>
              <div className={styles.windowRow}>
                <div className={styles.window}></div>
                <div className={styles.window}></div>
                <div className={styles.window}></div>
              </div>
              <div className={styles.windowRow}>
                <div className={styles.window}></div>
                <div className={styles.window}></div>
                <div className={styles.window}></div>
              </div>
              <div className={styles.door}></div>
            </div>
            <div className={styles.chimney}>
              <div className={styles.smoke}></div>
              <div className={styles.smoke} style={{ animationDelay: '1.4s' }}></div>
            </div>
          </div>
        </div>

        {/* Title with semi-transparent background */}
        <div className={styles.titleContainer}>
          <h1 className={styles.titleText}>Het Mysterie van Sinterklaas</h1>
        </div>
      </header>
      <main id="main-content" role="main" aria-label="Puzzel inhoud">
        {children}
      </main>
      <footer role="contentinfo">
        <p>© 2025 Thijs Erends</p>
      </footer>
    </>
  )
}

export default Layout
