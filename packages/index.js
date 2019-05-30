import Anchor from './Anchor/anchor'
import AnchorLink from './Anchor/anchorLink'
export {Anchor,AnchorLink}
const components = [
   Anchor,
   AnchorLink
]
const install = function (Vue, opts = {}) {
    components.map(component => {
      Vue.component(component.name, component);
    })
  }
  if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
  }
  export default {
    install,
    Anchor,
    AnchorLink
  }