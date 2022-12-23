import {useStore} from "vuex";
import {computed} from 'vue';

export function useValutes() {
    const store = useStore();
    store.dispatch('updateValutes');
    const valutes = computed(() => store.state.valutes);
    return {
        valutes
    };
}