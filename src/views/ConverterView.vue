<template>
    <div class="about">
        <div class="row">
            <div class="col-12 col-md-5">
                <div class="card">
                    <div class="card-body">
                        <div class="form-group mb-3">
                            <label for="base">Базовая валюта</label>
                            <select class="form-control" id="base" v-model="baseValute">
                                <template v-for="valute in valutes" :key="valute.ID">
                                    <option :value="valute">{{valute.CharCode}} - {{valute.Name}}</option>
                                </template>
                            </select>
                            <small class="form-text text-danger" v-if="!baseValute">Выберите базовую валюту</small>
                        </div>
                        <div class="form-group" v-if="baseValute">
                            <label for="calc-number">{{baseValute.CharCode}}</label>
                            <input type="number" id="calc-number" class="form-control" v-model="amount">
                            <small class="form-text text-muted">{{amount}} {{baseValute.Name}} - {{(amount * baseValute.Value / baseValute.Nominal).toFixed(4)}} ₽</small>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-12 col-md-2">
                <div class="special-block">
                    <button @click="reverse" class="btn btn-warning" :disabled="!baseValute || !calcValute">
                        <img src="https://cdn-icons-png.flaticon.com/512/46/46246.png" alt="">
                    </button>
                </div>
            </div>
            <div class="col-12 col-md-5">
                <div class="card">
                    <div class="card-body">
                        <div class="form-group mb-3">
                            <label for="calc">Валюта рассчета</label>
                            <select class="form-control" id="calc" v-model="calcValute">
                                <template v-for="valute in valutes" :key="valute.ID">
                                    <option :value="valute">{{valute.CharCode}} - {{valute.Name}}</option>
                                </template>
                            </select>
                            <small class="form-text text-danger" v-if="!calcValute">Выберите валюту расчета</small>
                        </div>
                        <div class="form-group" v-if="calcValute && baseValute">
                            <label for="res-number">{{calcValute.CharCode}}</label>
                            <input type="text" id="res-number" class="form-control" v-model="calcResult" disabled>
                            <small class="form-text text-muted">{{calcValute.Name}}</small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
    import {useValutes} from '@/composition/useValutes';
    import {useConvertValutes} from '@/composition/useConvertValutes';

    export default {
        name: 'AboutView',
        setup(){
            const {valutes} = useValutes();
            const {amount, baseValute, calcValute, calcResult, reverse} = useConvertValutes();

            return {
                valutes,
                amount,
                baseValute,
                calcValute,
                calcResult,
                reverse
            };
        },
    }
</script>
