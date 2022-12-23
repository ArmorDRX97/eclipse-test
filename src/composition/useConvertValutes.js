import {computed, watchEffect} from 'vue';
import {useStore} from "vuex";

export function useConvertValutes() {
    const store = useStore();
    const amount = computed({
        get: () => store.getters.getAmount,
        set: (val) => {
            store.commit('setAmount', val);
        }
    });
    const baseValute = computed({
        get: () => store.getters.getBaseValute,
        set: (val) => {
            store.commit('setBaseValute', val);
        }
    });
    const calcValute = computed({
        get: () => store.getters.getCalcValute,
        set: (val) => {
            store.commit('setCalcValute', val);
        }
    });
    const calcResult = computed(() => store.getters.getCalcResult);
    watchEffect(() => {
        store.dispatch('updateCalcResult');
    });

    const reverse = () =>{
            let left = store.getters.getBaseValute;
            let right = store.getters.getCalcValute;
            store.commit('setBaseValute', right);
            store.commit('setCalcValute', left);
    }

    return {
        amount,
        baseValute,
        calcValute,
        calcResult,
        reverse
    }
}