import React from "react"
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom"

import { WildCard } from "./features/card/components/WildCard/WildCard"
import CardsPage from "./features/card/pages/CardsPage"
import CollectionsPage from "./features/collections/pages/CollectionsPage"
import WelcomePage from "./features/home/pages/WelcomePage"
import SearchPage from "./features/search/pages/SearchPage"
import UserManagement from "./features/user-management/components/UserManagement"
import DefaultLayout from "./theme/DefaultLayout"

export const router: ReturnType<typeof createBrowserRouter> =
  createBrowserRouter(
    createRoutesFromElements(
      <Route element={<DefaultLayout />} path="/">
        <Route element={<WelcomePage />} index></Route>
        <Route element={<CollectionsPage />} path="collections"></Route>
        /* /users */
        <Route path="users">
          <Route element={<UserManagement />} index></Route>
        </Route>
        /* /cards */
        <Route path="cards">
          <Route element={<CardsPage />} index></Route>
          /* /cards/:cardId */
          <Route path=":cardId">
            <Route element={<WildCard />} index></Route>
          </Route>
        </Route>
        <Route path="search">
          <Route element={<SearchPage />} index></Route>
        </Route>
      </Route>,
    ),
    {
      future: {
        // v7_relativeSplatPath: true,
        // v7_fetcherPersist: true,
        // v7_normalizeFormMethod: true,
        // v7_partialHydration: true,
        // v7_skipActionErrorRevalidation: true,
      },
    },
  )
