require('babel-register')()

// const Enzyme = require('enzyme')
// const Adapter = require('enzyme-adapter-react-16')
// const {JSDOM} = require('jsdom')
// const exposedProperties = ['window', 'navigator', 'document']

const chai = require('chai')
chai.use(require('sinon-chai'))

// const dom = new JSDOM('')
// global.window = dom.window
// global.document = dom.window.document

// Object.keys(document.defaultView).forEach(property => {
//   if (typeof global[property] === 'undefined') {
//     exposedProperties.push(property)
//     global[property] = document.defaultView[property]
//   }
// })

// global.navigator = {
//   userAgent: 'node.js'
// }

// global.documentRef = document // eslint-disable-line

// Enzyme.configure(({ adapter: new Adapter() }))
