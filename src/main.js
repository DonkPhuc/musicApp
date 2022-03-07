import Vue from 'nativescript-vue'
import App from './components/LoginPage'
import store from './store'
import RadListView from 'nativescript-ui-listview/vue';


Vue.use(RadListView);
// Vue.registerElement('RadioGroup', () => require('@webileapps/nativescript-radiobutton').RadioGroup)
// Vue.registerElement('RadioButton', () => require('@webileapps/nativescript-radiobutton').RadioButton)

// Prints Vue logs when --env.production is *NOT* set while building
Vue.config.silent = (TNS_ENV === 'production')

new Vue({
  store,
  render: h => h('frame', [h(App)])
}).$start()