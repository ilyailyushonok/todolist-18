import { selectIsLoggedIn } from "@/app/app-slice.ts"
import { Main } from "@/app/Main"
import { PageNotFound, ProtectedRoute } from "@/common/components"
import { useAppSelector } from "@/common/hooks"
import { Login } from "@/features/auth/ui/Login/Login"
import { useGetTodosQuery } from "@/features/todolists/api/todolistsApi.ts"
import { Route, Routes } from "react-router"

export const Path = {
  Main: "/",
  Login: "/login",
  Faq: "/faq",
  NotFound: "*",
} as const

export const Routing = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn)

  return (
    <Routes>
      <Route element={<ProtectedRoute isAllowed={isLoggedIn} redirectPath={Path.Login} />}>
        <Route path={Path.Main} element={<Main />} />
      </Route>
      <Route element={<ProtectedRoute isAllowed={!isLoggedIn} />}>
        <Route path={Path.Login} element={<Login />} />
      </Route>
      <Route path={Path.Faq} element={<Faq />} />
      <Route path={Path.NotFound} element={<PageNotFound />} />
    </Routes>
  )
}

const Faq = () => {
  const { data } = useGetTodosQuery()

  return (
    <div>
      <h1>Faq</h1>
      {JSON.stringify(data)}
      <div>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda, dolorum, ducimus esse incidunt ipsum
        laboriosam minima molestias odit officia quisquam quos recusandae repudiandae sunt unde ut veniam vitae
        voluptate voluptatem!
      </div>
    </div>
  )
}
