import {computed, watchEffect} from 'vue';
import {useStore} from "vuex";

export function useFilterValutes(valutes) {
    const store = useStore();
    const filterObj = computed(() => store.getters.getFilterObj);
    const filteredValutes = computed(() => store.getters.getFilteredValutes);
    const ListFilteredValutes = computed(() => store.getters.getListFilteredValutes);
    watchEffect(() => {
        store.dispatch('updateFilteredValutes', valutes.value);
    });
    return {
        filterObj,
        filteredValutes,
        ListFilteredValutes
    };
}