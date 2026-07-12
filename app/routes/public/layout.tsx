import { Outlet } from "react-router"
import Footer from "~/components/footer"
import Header from "~/components/header"

export default function PublicLayout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}
