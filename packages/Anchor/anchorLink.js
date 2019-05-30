export default {
    name: 'LovAnchorLink',
    props: {
        title: {
            type: String,
            default: () => ''
        },
        href: {
            type: String,
            default: () => '#'
        }
    },
    inject: {
        anchor: {
            default: () => { }
        },
        anchorContext: {
            default: () => { }
        },
    },
    mounted() {
        this.anchor.registLink(this.href)
    },
    watch: {
        href: function href(val, oldVal) {
            this.anchor.unregisterLink(oldVal);
            this.anchor.registerLink(val);
        },
    },
    methods: {
        handlerClickLink: function handlerClickLink(event) {
            event.stopPropagation()
            var _$props = this.$props,
                href = _$props.href,
                title = _$props.title;
            this.anchor.handlerClickLink(this.href)
            if (this.anchorContext.$emit) {
                this.anchorContext.$emit('click',{ title: title, href: href },event);
              }
        }
    },
    render: function (h) {
        var active = this.anchor.$data.activeLinkId == this.href
        return h('div', {
            class: {
                'lov-anchor_link': true,
                'has-chlid': !this.anchor.horizontal&&this.$slots.default ? true : false
            },
            attrs: {
                href: this.href
            },
            on: {
                'click': this.handlerClickLink
            }
        }, [h(
            'div', { class: { 'anchor-link_content': true, 'active': active } }, this.$slots.slot ? this.$slots.slot : this.title
        ), !this.anchor.horizontal?this.$slots.default:false])
    }
}