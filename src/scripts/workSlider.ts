import Vue from 'vue';
import axios from 'axios';

export default function workSlider() {
    const btns = {
        template: '#slider-btn',
        props: {
            currentIndex: Number,
            worksLength: Number
        }
    };

    const previews = {
        template: '#slider-previews',
        props: {
            works: Array,
            currentWork: Object,
            currentIndex: Number
        }
    };

    const display = {
        template: '#slider-display',
        components: {
            previews,
            btns
        },
        methods: {
            handleSlide(direction: any) {
                this.$emit('slide', direction);
            }
        },
        props: {
            works: Array,
            currentWork: Object,
            currentIndex: Number
        }
    };

    const tags = {
        template: '#slider-tags',
        props: {
            tags: Array
        }
    };

    const description = {
        template: '#slider-desc',
        components: {
            tags
        },
        props: {
            currentWork: Object
        },
        computed: {
            tagsArray() {
                return this.currentWork.techs.split(' ');
            }
        }
    };

    new Vue({
        el: '#slider-container',
        template: '#slider-template',
        components: {
            display,
            description
        },
        data() {
            return {
                works: [],
                currentIndex: 0
            };
        },
        computed: {
            currentWork() {
                return this.works[this.currentIndex];
            }
        },
        watch: {
            currentIndex(value) {
                this.updateCurrentIndex(value);
            }
        },
        methods: {
            makeArrWithAbsoluteImages(data: any) {
                return data.map((item: any) => {
                    item.photo = `https://webdev-api.loftschool.com/${item.photo}`;

                    return item;
                });
            },

            updateCurrentIndex(value: any) {
                if (value >= this.works.length - 1) {
                    this.currentIndex = this.works.length - 1;
                } else if (value <= 0) this.currentIndex = 0;
            },

            handleSlide(direction: any) {
                switch (direction) {
                    case 'next':
                        this.currentIndex++;
                        break;
                    case 'prev':
                        this.currentIndex--;
                        break;
                    default:
                        this.currentIndex = direction;
                        break;
                }
            }
        },
        created() {
            axios
                .get('https://webdev-api.loftschool.com/works/156')
                .then(response => {
                    const data = response.data.reverse();
                    this.works = this.makeArrWithAbsoluteImages(data);
                })
                .catch(error => console.error(error.message));
        }
    });
}
