import Vue from 'vue'
import App from './App.vue'

export const eventBus = new Vue();

export const util = {
  getHistoryFromCookie: function(username) {
    var cookiePrefix = 'pianoBot_' + username + '='
    var currentCookie = document.cookie.split(";").filter((x) => {
        return (x.indexOf(cookiePrefix) == 0 || x.indexOf(' '+cookiePrefix) == 0)
    })
    if (currentCookie.length == 0) {
        var currentCookieValue = '{}'
    }
    else {
        var startIndex = currentCookie[0].indexOf(cookiePrefix) + cookiePrefix.length
        var currentCookieValue = currentCookie[0].substring(startIndex)
    }
    var cookieObj = JSON.parse(currentCookieValue)
    return cookieObj
  }
}

new Vue({
  el: '#app',
  render: h => h(App)
})

