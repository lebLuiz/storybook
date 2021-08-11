<template>
    <div class="container-progress-bar-steps">
        <div class="progress-container">
            <div class="progress" id="progress" />
            <div v-for="index in quantity" :key="index"
                class="circle" :class="{ 'active': index <= currentActive }">{{ index }}</div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ProgressBarSteps',
    
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
        updateMethod() {
            this.circles.forEach((circle, index) => {
                if (index < this.currentActive) circle.classList.add("active");
                else circle.classList.remove("active");
            });

            const actives = document.querySelectorAll(".active");

            this.progress.style.width = ((actives.length - 1) / (this.circles.length - 1)) * 100 + "%";
        },
    },
}
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat&display=swap');

$--line-border-fill: #000000;
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
        width: 100%;

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
            font-weight: 600;
            border-radius: 50%;
            height: 50px;
            width: 50px;
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
}

</style>