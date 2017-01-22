import React from 'react'
import Page from 'react-page-object';
import { browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import Root from '../src/containers/Root'
import configureStore from '../src/store/configureStore'

export default function createRootPage(initialPath = "/") {
  const store = configureStore()
  const history = syncHistoryWithStore(browserHistory, store)

  const page = new Page(<Root store={store} history={history} />, { initialPath })
  return page
}
