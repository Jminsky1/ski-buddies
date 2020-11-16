import React from 'react'
import { BrowserRouter, Route, Switch } from "react-router-dom"

import MountainsIndexPage from "./MountainsIndexPage"
import MountainsFormContainer from "./MountainsFormContainer"
import MountainShowContainer from "./MountainShowContainer"
import Favorites from "./Favorites"

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={MountainsIndexPage} />
        <Route exact path="/mountains" component={MountainsIndexPage} />
        <Route exact path="/mountains/new" component={MountainsFormContainer} />
        <Route exact path="/mountains/:id" component={MountainShowContainer} />
        <Route exact path="/favorites" component={Favorites} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
