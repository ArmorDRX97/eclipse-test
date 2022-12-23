export default {
    state: {
        baseValute: '',
        calcValute: '',
        amount: 1,
        calcResult: null
    },
    getters: {
        getBaseValute(state) {
            return state.baseValute;
        },
        getCalcValute(state) {
            return state.calcValute;
        },
        getAmount(state) {
            return state.amount;
        },
        getCalcResult(state) {
            return state.calcResult;
        }
    },
    mutations: {
        setBaseValute(state, valute) {
            state.baseValute = valute;
        },
        setCalcValute(state, valute) {
            state.calcValute = valute;
        },
        setAmount(state, number) {
            state.amount = number;
        },
        setCalcResult(state, result) {
            state.calcResult = result;
        },

    },
    actions: {
        updateCalcResult({commit, state}) {
            const baseValute = state.baseValute;
            const calcValute = state.calcValute;
            const amount = state.amount;
            const result = calcValute && baseValute
                ? ((baseValute.Value / baseValute.Nominal) * calcValute.rate * amount).toFixed(4)
                : null;
            commit('setCalcResult', result);
        }
    },
}