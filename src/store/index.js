import { createStore } from 'vuex'
import axios from "axios";
import home from './modules/home';
import converter from './modules/converter';

export default createStore({
  state: {
    valutes: []
  },
  mutations: {
    setValutes(state, valutes){
      state.valutes = valutes;
    }
  },
  actions: {
    async updateValutes({commit}){
      try{
        const daily = await axios.get('https://www.cbr-xml-daily.ru/daily_json.js');
        const latest = await axios.get('https://www.cbr-xml-daily.ru/latest.js');
        const dailyData = daily.data.Valute;
        const latestData = latest.data.rates;
        for(let code in dailyData){
          dailyData[code].rate = latestData[code];
          dailyData[code].growth = dailyData[code].Value - dailyData[code].Previous > 0;
          dailyData[code].difference = (dailyData[code].Value / dailyData[code].Nominal - dailyData[code].Previous / dailyData[code].Nominal).toFixed(4) * 1;
        }
        commit('setValutes', Object.values(dailyData));
      } catch (error) {
        console.log(error);
        commit('setValutes', null);
      }
    }
  },
  modules: {
    home,
    converter
  }
})
