<template>

    <div id="dropdown" :class="{ '--select-max-width-normal': selectMaxWidthNormal }" @click.capture="onClickMethod">
        <div class="dropdown-select">
            <span id="select-label" class="select" @click.prevent.capture="onClickMethod">{{ (item.value && item.label) ? item.label : 'Selecione' }}</span>
            <svg id="svg-icon" width="17" height="8" viewBox="0 0 17 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.58839 4.51715e-07L0.621093 0.870535L8.51744 8L16.4138 0.870535L15.4465 9.17941e-08L8.51744 6.28571L1.58839 4.51715e-07Z" fill="#FBBE2F"/>
            </svg>
        </div>

        <div id="dropdown-list">
            <div v-for="(itemMoment, index) in items" :key="index"
                class="dropdown-list__item"
                :class="{ '--selected': itemMoment == item ,'--first': index == 0, '--last': index == items.length - 1 }"
                @click="selecionouMethod(itemMoment, $event)">{{ itemMoment.label }}</div>
        </div>
    </div>

</template>

<script>

export default {
    name: 'Select',

    props: {
        selectMaxWidthNormal: { type: Boolean },

        // [ { value: [Any], label: [String], disabled: [Boolean] } ]
        items: {
            type: Array,
            required: true,
        },

        item: {
            type: Object,
            required: true,
        },
    },

    data() {
        return {
            open: false,
        }
    },

    computed: {
        select() {
            return document.getElementById('dropdown-list');
        },
    },

    methods: {
        selecionouMethod(value, event) {
            this.closeOptionsMethod(event.target.parentElement);
            this.open = false;

            this.$emit('selectedValue', value);
        },

        onClickMethod($e) {
            
            this.open = !this.open;

            if (this.open) {

                if ($e.target.id === "select-label") {
                    this.openOptionsMethod($e.target.parentElement.nextSibling);
                }

                if ($e.target.id === "dropdown") {
                    this.openOptionsMethod($e.target.lastChild);
                }

                if ($e.target.className === "dropdown-select") {
                    this.openOptionsMethod($e.target.nextSibling);
                }


            } else {
                if ($e.target.id === "select-label") {
                    this.closeOptionsMethod($e.target.parentElement.nextSibling);
                }

                if ($e.target.id === "dropdown") {
                    this.closeOptionsMethod($e.target.lastChild);
                }

                if ($e.target.className === "dropdown-select") {
                    this.closeOptionsMethod($e.target.nextSibling);
                }
            }
            
        },

        openOptionsMethod(element) {
            // if (element.classList != null)
             element.classList.add("is-active");
        },
        closeOptionsMethod(element) {
            if (element.classList != null) element.classList.remove("is-active");
        },
    },
}

</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat&display=swap');

$colorWhite: #FFFFFF;

#dropdown {
    width: 100%;
    max-width: 425px;
    height: 43px;
    padding: 0 31.5px;
    position: relative;

    outline: none;
    cursor: pointer;
    border-radius: 24px;
    border: 1px solid #000000;

    //Font:
    font-family: 'Montserrat';
    font-size: 14px;

    &.--select-max-width-normal {
        max-width: none;
    }

    .dropdown-select {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;

        svg {
            position: absolute;
            right: 31.5px;
        }
    }

    #dropdown-list {
        position: absolute;
        right: 0px;
        width: 0px;
        background: $colorWhite;
        transition: width 0.3s ease;
        z-index: 1;

        border-top: 30px solid $colorWhite;
        border-bottom: 30px solid $colorWhite;
        border-radius: 40px;
        box-shadow: 0px 1px 24px rgb(35 34 39 / 10%);
        background-color: $colorWhite;
        
        grid-row: auto;
        top: 102%;

        display: none;
        align-items: center;

        // transition: opacity 0.2s ease, visibility 0.2s ease;
        
        &.is-active {
            width: 100%;
            display: flex;
            flex-direction: column;
            transition: width 0.3s ease;

            .dropdown-list__item {
                transition: transform 0.3s ease;
            }
        }

        .dropdown-list__item {
            padding: 9px 43px;
            display: flex;
            width: 100%;
            align-items: center;
            justify-content: center;
            border-bottom: 1px solid black;

            &.--selected {
                background: #FBBE2F;
            }

            &.--first {
                border-top: 1px solid black;
                border-top-right-radius: 1.8px;
                border-top-left-radius: 1.8px;
            }
            &.--last {
                border-bottom-right-radius: 1.8px;
                border-bottom-left-radius: 1.8px;
            }

            &:hover {
                background: #fbbe2f21;
            }
        }
    }
    
}

</style>