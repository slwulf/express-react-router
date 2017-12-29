import {expect} from 'chai'
import sinon from 'sinon'
import {Router} from 'express'

import {server, router} from 'build-route'

describe('build-route', () => {
  describe('server', () => {
    it('throws an error if the object does not have resources or children', () => {
      const shouldThrow = () => server({ path: '/' })
      expect(shouldThrow).to.throw()
    })

    it('throws an error if children or resources is empty', () => {
      const noChildren = { path: '/', children: [] }
      const noResources = { path: '/', resources: {} }
      expect(() => server(noChildren)).to.throw()
      expect(() => server(noResources)).to.throw()
    })

    it('returns an express router', () => {
      const routerSpy = sinon.stub(router, 'get')
      const get = sinon.stub()
      const instance = server({ path: '/', resources: {get} })
      routerSpy.restore()

      expect(instance).to.be.a('function')
      expect(instance.get).to.be.a('function')
      expect(instance.post).to.be.a('function')
      expect(instance.put).to.be.a('function')
      expect(instance.patch).to.be.a('function')
      expect(instance.delete).to.be.a('function')
    })

    it('passes `resources.get` into the express router.get method', () => {
      const routerSpy = sinon.stub(router, 'get')
      const get = sinon.stub()
      const route = { path: '/', resources: {get} }

      server(route)
      routerSpy.restore()

      expect(routerSpy).to.have.been.calledWith(route.path, route.resources.get)
    })

    it('passes `resources.post` into the express router.post method', () => {
      const routerSpy = sinon.stub(router, 'post')
      const post = sinon.stub()
      const route = { path: '/', resources: {post} }

      server(route)
      routerSpy.restore()

      expect(routerSpy).to.have.been.calledWith(route.path, route.resources.post)
    })

    it('passes `resources.put` into the express router.put method', () => {
      const routerSpy = sinon.stub(router, 'put')
      const put = sinon.stub()
      const route = { path: '/', resources: {put} }

      server(route)
      routerSpy.restore()

      expect(routerSpy).to.have.been.calledWith(route.path, route.resources.put)
    })

    it('passes `resources.patch` into the express router.patch method', () => {
      const routerSpy = sinon.stub(router, 'patch')
      const patch = sinon.stub()
      const route = { path: '/', resources: {patch} }

      server(route)
      routerSpy.restore()

      expect(routerSpy).to.have.been.calledWith(route.path, route.resources.patch)
    })

    it('passes `resources.delete` into the express router.delete method', () => {
      const routerSpy = sinon.stub(router, 'delete')
      const del = sinon.stub()
      const route = { path: '/', resources: {delete: del} }

      server(route)
      routerSpy.restore()

      expect(routerSpy).to.have.been.calledWith(route.path, route.resources.delete)
    })

    it('creates routes for its children', () => {
      const getSpy = sinon.stub(router, 'get')
      const postSpy = sinon.stub(router, 'post')
      const get = sinon.stub()
      const post = sinon.stub()
      const children = [
        { path: '/get', resources: {get} },
        { path: '/post', resources: {post} }
      ]
      const route = { path: '/api', children }

      server(route)
      getSpy.restore()
      postSpy.restore()

      expect(getSpy).to.have.been.calledWith('/api/get', get)
      expect(postSpy).to.have.been.calledWith('/api/post', post)
    })

    it('creates routes for nested children', () => {
      const getSpy = sinon.stub(router, 'get')
      const postSpy = sinon.stub(router, 'post')
      const get = sinon.stub()
      const post = sinon.stub()
      const children = [
        { path: '/get', resources: {get} },
        { path: '/post', resources: {post} }
      ]
      const route = { path: '/api', children: [
        { path: '/v1', children }
      ] }

      server(route)
      getSpy.restore()
      postSpy.restore()

      expect(getSpy).to.have.been.calledWith('/api/v1/get', get)
      expect(postSpy).to.have.been.calledWith('/api/v1/post', post)
    })

    it('creates routes for deeply nested children', () => {
      const getSpy = sinon.stub(router, 'get')
      const postSpy = sinon.stub(router, 'post')
      const get = sinon.stub()
      const post = sinon.stub()
      const children = [
        { path: '/get', resources: {get} },
        { path: '/post', resources: {post} }
      ]
      const route = { path: '/api', children: [
        { path: '/v1', children: [
          { path: '/users', children }
        ] }
      ] }

      server(route)
      getSpy.restore()
      postSpy.restore()

      expect(getSpy).to.have.been.calledWith('/api/v1/users/get', get)
      expect(postSpy).to.have.been.calledWith('/api/v1/users/post', post)
    })
  })

  // describe.skip('client')
})
