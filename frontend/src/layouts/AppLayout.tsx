import { Outlet } from "react-router"
import Logo from "../components/Logo"
import NavMenu from "../components/NavMenu"

const AppLayout = () => {
  return (
    <>
      <header className="bg-gray-800 py-5">
        <div className="max-w-300 mx-auto flex flex-col lg:flex-row justify-between items-center">
          <div className="w-64">
            <Logo />
          </div>

          <NavMenu />
        </div>
      </header>

      <section className="max-w-300 mx-auto mt-10 p-5">
        <Outlet />
      </section>

      <footer className="py-5">
        <p className="text-center">
          Todos los derechos reservados {new Date().getFullYear()}
        </p>
      </footer>
    </>
  )
}

export default AppLayout