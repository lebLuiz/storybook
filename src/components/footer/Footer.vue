<template>
    <div class="footer">
        <LinkText v-if="withLink" :title="titleLink" :href="hrefLink" target="_blank" class="link-footer" />

        <div class="imgs" v-if="images != null && images.length > 0">
            <img v-for="(img, i) in images" :key="i"
                class="img"
                :src="img">
        </div>
        <img v-else src="@/assets/options_pay_location.svg" class="img-footer" >
    </div>
</template>

<script>
import LinkText from '../link_text/LinkText'

export default {
    name: 'Footer',
    components: {
        LinkText,
    },

    props: {
        withLink: {
            type: Boolean,
            default: false,
        },
        titleLink: {
            type: String,
            required: false,
        },
        hrefLink: {
            type: String,
            required: false,
        },
        
        images: {
            type: Array,
            required: false,
        },
    },
}

</script>

<style lang="scss" scoped>
$maxWidthMobile: 425px;
$colorWhite: #FFFFFF;

.footer {
    width: 100%;
    max-width: $maxWidthMobile;
    min-height: 48px;
    max-height: 120px;

    background: $colorWhite;

    display: flex;
    position: relative;
    align-items: center;

    .link-footer {
        position: absolute;
        top: 0;
        left: 16px;
        transform: translateY(100%);
    }
    .img-footer {
        position: absolute;
        bottom: 0;
        right: 16px;
        transform: translateY(-50%);
    }

    .imgs {
        position: absolute;
        top: 0;
        right: 16px;
        transform: translateY(50%);

        .img {
            max-width: 110px;
            max-height: 25px;
        }
    }
}

</style>