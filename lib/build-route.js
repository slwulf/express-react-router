import express from 'express'

export const router = express.Router()

export function server(route) {
  const {path, resources, children} = route

  if (!validRoute(route)) {
    throw new Error('Server routes must have resources or child routes.')
  }

  createRoutes(path, resources)

  ;(children || []).forEach(child => {
    child.path = path + child.path
    if (child.children) server(child)
    else createRoutes(child.path, child.resources)
  })

  return router
}

export function client(route) {
  const {path, render, children} = route
}

function validRoute(route) {
  const {path, resources, render, children} = route
  const methods = ['get', 'post', 'put', 'patch', 'delete']
  const hasChildren = children && children.length > 0
  const hasResources = resources && methods.some(m => resources.hasOwnProperty(m))
  const hasRender = render && typeof render === 'function'
  const hasPath = path && typeof path === 'string'
  return hasPath && (hasChildren || hasResources || hasRender)
}

function createRoutes(path, resources = {}) {
  Object.keys(resources).forEach(method => {
    const handler = router[method]
    if (handler) router[method](path, resources[method])
  })
}
