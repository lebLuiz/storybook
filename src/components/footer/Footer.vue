<template>
    <footer v-if="!activeHamburguerOptions" >
        <div class="container">
            <div class="footer-content">
                <LinkText v-if="withLink" :title="titleLink" :href="hrefLink" target="_blank" class="link-footer" />

                <div class="imgs" v-if="images != null && images.length > 0">
                    <img v-for="(img, i) in images" :key="i"
                        class="img"
                        :src="img">
                </div>
                <div v-else class="img-footer">
                    <img src="@/assets/pay_location.svg" >
                </div>
            </div>
        </div>
    </footer>
</template>

<script>
import { mapState } from 'vuex'

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

    computed: {
        ...mapState(["activeHamburguerOptions"]),
    },
}

</script>

<style lang="scss" scoped>

$maxWidthMobile: 425px;
$colorWhite: #FFFFFF;

.container {
    width: 100%;
    max-width: 1280px;
    margin: 0 auto;
    padding: 0px 20px;
}

footer {
    box-shadow: -1px -1px 1px 0px #f2f2f2;
    position: relative;
    
    .footer-content {
        bottom: 0;
        width: 100%;
        max-height: 87px;
        margin: 0;

        background: $colorWhite;

        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        // height: 87px;

        // position: relative;

        .link-footer {
            // position: relative;
            font-weight: 700;
            font-size: 14px;
            // top: 0;
            // left: 16px;
            // transform: translateY(100%);
        }
        .img-footer {
            // position: relative;
            // bottom: 0;
            // right: 16px;

            /* Usei esse translate pq a img em si tá com uma margen em cima */
            // transform: translateY(10%);
            max-height: 73px;
        }

        .imgs {
            // position: relative;
            // top: 0;
            // right: 16px;
            // transform: translateY(50%);

            .img {
                max-width: 110px;
                max-height: 25px;
            }
        }
    }
}

@media only screen and (max-width: 550px) {
    footer {
        box-shadow: -1px -1px 1px 0px #f2f2f2;
        .footer-content {
            height: 48px;
            
            .link-footer {
                font-weight: 400;
                font-size: 12px;
            }

            .img-footer {
                img {
                    max-width: 109px;
                    max-height: 24px;
                }
            }
        }
    }
}

</style>