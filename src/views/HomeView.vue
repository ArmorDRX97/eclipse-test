<template>
    <div class="home">
        <div class="row align-items-end">
            <div class="col-12 col-md-6">
                <div class="form-group">
                    <label for="search">Поиск по названию или коду</label>
                    <input type="text" id="search" class="form-control" v-model="filterObj.search"
                           @input="filterObj.page = 1">
                </div>
            </div>
            <div class="col-12 col-md-6">
                <button class="btn btn-danger" @click="filterObj.search = ''">очистить</button>
            </div>
        </div>
        <hr class="my-4">
        <template v-if="valutes !== null">
            <template v-if="valutes.length">
                <div class="d-flex align-items-center justify-content-between">
                    <p>Результатов: <b>{{filteredValutes.length}}</b> из <b>{{valutes.length}}</b></p>
                    <nav>
                        <ul class="pagination">
                            <li class="page-item">
                                <button class="page-link" @click="filterObj.page--" :disabled="filterObj.page === 1">⇦
                                </button>
                            </li>
                            <li class="page-item">
                                <button class="page-link" @click="filterObj.page++" :disabled="!filterObj.hasNextPage">⇨
                                </button>
                            </li>
                        </ul>
                    </nav>
                </div>
                <div class="row">
                    <div class="col-12 col-md-3 mb-4" v-for="valute in ListFilteredValutes" :key="valute.ID">
                        <div class="card text-center">
                            <div class="card-header d-flex justify-content-between">
                                {{valute.Name}}
                            </div>
                            <div class="card-body">
                                <div>1 <small>{{valute.CharCode}}</small> = {{(valute.Value /
                                    valute.Nominal).toFixed(4)}} <small>RUB</small></div>
                                <hr>
                                <div>1 <small>RUB</small> = {{(valute.rate).toFixed(4)}}
                                    <small>{{valute.CharCode}}</small></div>
                            </div>
                            <div class="card-footer">
                                <span v-if="valute.growth" class="text-green">{{valute.difference}} ↑</span>
                                <span v-else class="text-danger">{{valute.difference}} ↓</span>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
            <template v-else>
                <h1>Подождите. Идет загрузка...</h1>
            </template>
        </template>
        <template v-else>
            <h1 class="text-danger">Ошибка данных</h1>
        </template>

    </div>
</template>

<script>
    import {useValutes} from '@/composition/useValutes';
    import {useFilterValutes} from '@/composition/useFilterValutes';

    export default {
        name: 'HomeView',
        setup() {
            const {valutes} = useValutes();
            const {filterObj, filteredValutes, ListFilteredValutes} = useFilterValutes(valutes);
            return {
                valutes,
                filterObj,
                filteredValutes,
                ListFilteredValutes,
            };
        },
    }
</script>
