import { Link } from 'react-router-dom'
import styles from './LandingPage.module.css'

function LandingPage() {
  // Generate floating pepernoten with different sizes
  const pepernoten = [
    { id: 1, size: 'small', delay: 0, duration: 15, top: '10%', left: '5%', rotation: -5 },
    { id: 2, size: 'medium', delay: 2, duration: 18, top: '15%', left: '85%', rotation: 8 },
    { id: 3, size: 'large', delay: 4, duration: 20, top: '70%', left: '3%', rotation: -3 },
    { id: 4, size: 'small', delay: 1, duration: 16, top: '80%', left: '88%', rotation: 12 },
    { id: 5, size: 'medium', delay: 3, duration: 17, top: '45%', left: '2%', rotation: -7 },
    { id: 6, size: 'small', delay: 5, duration: 19, top: '30%', left: '90%', rotation: 6 },
    { id: 7, size: 'medium', delay: 1.5, duration: 21, top: '60%', left: '92%', rotation: -9 },
    { id: 8, size: 'small', delay: 2.5, duration: 14, top: '25%', left: '8%', rotation: 4 },
  ]

  // Generate floating stars
  const stars = [
    { id: 1, delay: 0, duration: 20, top: '20%', left: '10%', size: 'small' },
    { id: 2, delay: 3, duration: 25, top: '50%', left: '15%', size: 'medium' },
    { id: 3, delay: 6, duration: 18, top: '75%', left: '12%', size: 'small' },
    { id: 4, delay: 2, duration: 22, top: '35%', left: '88%', size: 'medium' },
    { id: 5, delay: 5, duration: 19, top: '65%', left: '85%', size: 'small' },
  ]

  return (
    <div className={styles.landingContainer}>
      {/* Animated background elements */}
      <div className={styles.backgroundElements}>
        {/* Floating pepernoten */}
        {pepernoten.map((pepernoot) => (
          <div
            key={pepernoot.id}
            className={`${styles.pepernoot} ${styles[pepernoot.size]}`}
            style={{
              top: pepernoot.top,
              left: pepernoot.left,
              animationDelay: `${pepernoot.delay}s`,
              animationDuration: `${pepernoot.duration}s`,
              ['--base-rotation']: `${pepernoot.rotation}deg`,
            }}
          />
        ))}
        
        {/* Floating stars */}
        {stars.map((star) => (
          <div
            key={star.id}
            className={`${styles.star} ${styles[star.size]}`}
            style={{
              top: star.top,
              left: star.left,
              animationDelay: `${star.delay}s`,
              animationDuration: `${star.duration}s`,
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className={styles.content}>
        {/* Sinterklaas Hat */}
        <div className={styles.sinterklaasHat}>
          <div className={styles.hatTop}></div>
          <div className={styles.hatBrim}></div>
          <div className={styles.hatCross}></div>
        </div>

        {/* Welcome message from Glitch */}
        <div className={styles.welcomeMessage}>
          <h1 className={styles.glitchTitle}>Welkom, VERA!</h1>
          <p className={styles.glitchText}>
            Ik ben Glitch, de geest van dit digitale labyrint. Een kostbare 4-Cijferige Code is verborgen binnen deze muren. Bewijs je waarde door mijn 10 puzzels op te lossen, en de geit is van jou.
          </p>
          <p className={styles.glitchQuestion}>
            Ben je klaar om te beginnen?
          </p>
        </div>

        {/* Start button */}
        <Link to="/puzzle-1" className={styles.startButton}>
          Start Uitdaging
        </Link>
      </div>
    </div>
  )
}

export default LandingPage

