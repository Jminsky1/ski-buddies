import React from 'react'
import { BrowserRouter, Route, Switch } from "react-router-dom"

import MountainsIndexPage from "./MountainsIndexPage"
import MountainsFormContainer from "./MountainsFormContainer"

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={MountainsIndexPage} />
        <Route exact path="/mountains" component={MountainsIndexPage} />
        <Route exact path="/mountains/new" component={MountainsFormContainer} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
