import { RouterProvider } from "react-router"
import { router } from "./router"
import FrontendLayout from "./Front/layout/FrontendLayout"

function App() {
  return (
    <RouterProvider router={router}>
      <FrontendLayout />
    </RouterProvider>
  )
}

export default App
