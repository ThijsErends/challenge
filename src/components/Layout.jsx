import '../index.css'

function Layout({ children }) {
  return (
    <>
      <div className="floating-shape shape-cloud"></div>
      <div className="floating-shape shape-star"></div>
      <div className="floating-shape shape-circle"></div>
      <header>
        <h1 id="main-heading">Het Mysterie van Sinterklaas</h1>
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

