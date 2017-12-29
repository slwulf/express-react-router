// server-side routing

// /routes/root.js
import controllers from '../server/controllers'
import routes from '../routes'

const routes = {
  path: '/',
  children: [
    routes.home,
    {
      path: '/api/v1',
      auth: true,
      children: [
        routes.users,
        routes.someModel
      ]
    }
  ]
}

// /routes/users.js
const users = {
  path: '/users',
  resources: controllers.users, // allows http-named methods (can be like get or GET probz)
  render: () => <UsersIndex />, // must be a fn=>React
  children: [
    {
      path: '/logout',
      resources: {
        get: controllers.users.logout
      }
    }
  ]
}

// sandbox.js
const route =
{
  path: '/api/v1',
  auth: true, // need to be more complex? could be a fn=>bool that authenticates the current user
  children: [
    routes.users
  ]
}

// from magellan:
//
// [
//   {
//     path: '/api',
//     name: 'API',
//     auth: true,
//     roles: ['admin', 'partner'],
//     children: [
//       {
//         path: '/dashboards',
//         name: 'Dashboards',
//         roles: ['partner']
//       }
//     ]
//   }
// ]



// client-side routing

// https://codepen.io/atwulf/pen/a7e7ab94034a90bcf24d799ea545b331?editors=0010

// routes.js
import render from '../render'
import layout from '../layout'

const routes = {
  path: '/',
  layout: layout.home,
  render: render.home,
  children: [
    {
      path: '/dashboard',
      render: render.dashboard
    },
    {
      path: '/users',
      layout: layout.users,
      children: [
        {
          path: '/:userId',
          render: render.users.show
        }
      ]
    }
  ]
}

function renderRoutes({path, layout, render, children = []}) {
  if (layout && !render) {
    return (
      <Route path={path} render={() => layout(
        <Switch>
          {children.map(renderRoutes)}
        </Switch>
      )} />
    )
  } else if (render && !layout) {
    return <Route exact path={path} render={render} />
  } else {
    return (
      <Route path={path} render={() => layout(
        <Switch>
          <Route exact path={path} render={render} />
          {children.map(renderRoutes)}
        </Switch>
      )} />
    )
  }
}

// layout.js
const home = children => {
  <div>
    <header>header time bitches</header>
    {children}
    <footer>footer as fuck</footer>
  </div>
}

const users = children => {
  <div>
    <h1>users!</h1>
    {children}
  </div>
}

// render.js
const home = () => <HomeContainer />
const dashboard = () => <DashboardContainer />
const users = {
  index: () => <UsersList />,
  show: () => <User />
}

// would have to produce...
(
  <Route path="/" render={() => layout.home(
    <Switch>
      <Route exact path="/" render={render.home} />
      <Route exact path="/dashboard" render={render.dashboard} />
      <Route path="/users" render={() => layout.users(
        <Switch>
          <Route exact path="/:userId" render={render.users.show} />
        </Switch>
      )} />
    </Switch>
  )} />
)
