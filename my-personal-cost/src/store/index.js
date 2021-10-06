import Vue from 'vue'
import Vuex from 'vuex'
import {allData} from "@/dataFile";

const getAllPage = Object.keys(allData);
let {Page1, Page2, Page3} = allData;

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    categoryList: [],
    pagePaymentsList: [],
    countPages: getAllPage.length,
    currentPage: 'Page1'
  },
  getters: {
    getCategoriesList: state => state.categoryList,
    getFullPaymentAmount: state => {
      let all = Object.values(state.pagePaymentsList);
      return all.reduce((res, cur) => {
        let sum = 0
        for (let i = 0; i < cur.length; i++) {
          sum = sum + cur[i].amount
        }
        return sum + res
      }, 0)
    },
    getPagePaymentsList: state => {
      return state.pagePaymentsList
    },
    getCountPages: state => state.countPages,
    getCurrentPage: state => state.currentPage
  },
  mutations: {
    setCategories (state, payload) {
      if (!Array.isArray(payload)) {
        payload = [payload]
      }
      state.categoryList.push(...payload)
    },
    setPagePaymentsList (state, payload) {
      let currentPage = Object.keys(payload).toString();
      let cashPage = Object.keys(state.pagePaymentsList);
      if (!cashPage.includes(currentPage)) {
        state.pagePaymentsList = Object.assign(payload, state.pagePaymentsList)
      }
    },
    addDataToPaymentsList (state, payload) {
      let pageData = state.pagePaymentsList[state.currentPage];
      payload.id = new Date().getTime()
      pageData = pageData.push(payload)
    },
    setCurrentPage (state, payload) {
      state.currentPage = payload
    },
    deleteCurrentElement (state, payload) {
      let localData = state.pagePaymentsList[state.currentPage]
      let indexElement = localData.findIndex(entry => entry.id === payload);
      state.pagePaymentsList[state.currentPage] = localData.filter((element, index) => index !== indexElement)
    },
    editCurrentElement (state, payload) {
      let localData = state.pagePaymentsList[state.currentPage]
      let indexElement = localData.findIndex(entry => entry.id === payload.id);
      localData[indexElement].id = payload.id;
      localData[indexElement].amount = payload.amount;
      localData[indexElement].category = payload.category;
      localData[indexElement].date = payload.date;
    }
  },
  actions: {
    fetchCategory ({commit}) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve([
            'Food',
            'Transport',
            'Education',
            'Entertainment'
          ])
        }, 1000)
      })
        .then(res => {
          commit('setCategories', res)
        })
    },
    fetchDataPage ({commit}, numberPage) {
      return new Promise((resolve) => {
        switch (numberPage) {
          case 'Page1':
            setTimeout(() => {
              resolve(
                {
                  Page1,
                }
              )
            }, 1000)
            break
          case 'Page2':
            setTimeout(() => {
              resolve(
                {
                  Page2,
                }
              )
            }, 1000)
            break
          case 'Page3':
            setTimeout(() => {
              resolve(
                {
                  Page3,
                }
              )
            }, 1000)
            break
        }
      }).then(res => {
        commit('setPagePaymentsList', res)
      })
    },
  }
})
