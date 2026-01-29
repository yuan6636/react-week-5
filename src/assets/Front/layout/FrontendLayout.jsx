import { Outlet, Link } from "react-router";

const FrontendLayout = () => {
  return (
    <>
      <header>
        <nav className="navbar navbar-expand-lg bg-info-subtle">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">
              Soft Night
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0 text-dark">
                <li className="nav-item">
                  <Link className="nav-link" to="/">
                    首頁
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/products">
                    產品列表
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/cart">
                    購物車
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <p className="py-3 bg-body-secondary">
          &copy; 2026 Soft Night. All rights reserved.
        </p>
      </footer>
    </>
  );
}

export default FrontendLayout