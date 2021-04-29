import Vue from 'vue'
import App from './App.vue'
import apolloClient from './apollo';
import VueApollo    from 'vue-apollo';

Vue.config.productionTip = false

Vue.use(VueApollo);

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
});

window.apollo = apolloClient;

new Vue({
  apolloProvider,
  render: h => h(App),
}).$mount('#app')
