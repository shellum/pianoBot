import Vue from 'vue'
import App from './App.vue'

export const eventBus = new Vue();

export const util = {
  getHistoryFromCookie: function(username) {
    var cookiePrefix = 'pianoBot_' + username + '='
    console.log('cookies: '+document.cookie)
    var currentCookie = document.cookie.split(";").filter((x) => {
        return (x.indexOf(cookiePrefix) == 0 || x.indexOf(' '+cookiePrefix) == 0)
    })
    if (currentCookie.length == 0)
        currentCookie = cookiePrefix + '{}'
    else {
        console.log(currentCookie[0])
        var startIndex = currentCookie[0].indexOf(cookiePrefix) + cookiePrefix.length
        console.log(startIndex)
        currentCookie = currentCookie[0].substring(startIndex)
    }
    console.log('new current: '+currentCookie)
    var cookieObj = JSON.parse(currentCookie)
    return cookieObj
  }
}

new Vue({
  el: '#app',
  render: h => h(App)
})

