<template>
    <div class="container-progress-bar-steps">
        <div class="progress-container">
            <div class="progress" id="progress" />
            <div v-for="index in quantity" :key="index"
                class="circle" :class="{ 'active': index <= currentActive }">{{ index }}</div>
        </div>
        <!-- <button class="btn" id="prev" disabled @click="prevMethod">Prev</button>
        <button class="btn" id="next" @click="nextMethod">Next</button> -->
    </div>
</template>

<script>
export default {
    name: 'ProgressBarSteps',

    // data() {
    //     return {
    //         currentActive: 1,
    //     }
    // },

    props: {
        currentActive: {
            type: Number,
            default: 1,
        },
        quantity: { type: Number },
    },

    watch: {
        currentActive(newV, oldV) {
            if (newV != oldV) this.updateMethod();
        },
    },

    computed: {
        progress() {
            return document.getElementById("progress");
        },
        prev() {
            return document.getElementById("prev");
        },
        next() {
            return document.getElementById("next");
        },
        circles() {
            return document.querySelectorAll(".circle");
        },
    },

    methods: {
        // prevMethod() {
        //     console.log('Back: ', this.currentActive);
        //     this.currentActive--;
        //     if (this.currentActive < 1) this.currentActive = 1;

        //     this.updateMethod();
        // },
        // nextMethod() {
        //     console.log('Next: ', this.currentActive);
        //     this.currentActive++;

        //     if (this.currentActive > this.circles.length) this.currentActive = this.circles.length;

        //     this.updateMethod();
        // },
        
        updateMethod() {
            this.circles.forEach((circle, index) => {
                if (index < this.currentActive) circle.classList.add("active");
                else circle.classList.remove("active");
            });

            const actives = document.querySelectorAll(".active");

            this.progress.style.width = ((actives.length - 1) / (this.circles.length - 1)) * 100 + "%";

            // if (this.currentActive === 1) this.prev.disabled = true;
            // else if (this.currentActive === this.circles.length) this.next.disabled = true;
            // else {
            //     this.prev.disabled = false;
            //     this.next.disabled = false;
            // }
        },
    },
}
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat&display=swap');

$--line-border-fill: #FBBE2F;;
$--line-border-empty: #e0e0e0;

.container-progress-bar-steps {
    text-align: center;
    font-family: 'Montserrat';
    align-items: center;

    .progress-container {
        display: flex;
        justify-content: space-between;
        position: relative;
        margin-bottom: 30px;
        max-width: 100%;
        width: 350px;

        &::before {
            content: ""; /* Mandatory with ::before */
            background-color: $--line-border-empty;
            position: absolute;
            top: 50%;
            left: 0;
            transform: translateY(-50%);
            height: 4px;
            width: 100%;
            z-index: -1;
        }

        .progress {
            background-color: $--line-border-fill;
            position: absolute;
            top: 50%;
            left: 0;
            transform: translateY(-50%);
            height: 5px;
            width: 0%;
            transition: 0.4s ease;
        }

        .circle {
            background-color: #fff;
            color: #999;
            border-radius: 50%;
            height: 30px;
            width: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 3px solid $--line-border-empty;
            transition: 0.4s ease;
            z-index: 1;
            
            &.active {
                border-color: $--line-border-fill;
            }
        }
    }

    .btn {
        background-color: $--line-border-fill;
        color: #fff;
        border: 0;
        border-radius: 6px;
        cursor: pointer;
        font-family: inherit;
        padding: 8px 30px;
        margin: 5px;
        font-size: 14px;

        &:active {
            transform: scale(0.98);
        }

        &:focus {
            outline: 0;
        }

        &:disabled {
            background-color: $--line-border-empty;
            cursor: not-allowed;
        }
    }
}

</style>