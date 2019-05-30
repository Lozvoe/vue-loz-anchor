import './style/index.scss'
function getOffsetTop(element, container) {
    if (!element) {
        return 0;
    }

    if (!element.getClientRects().length) {
        return 0;
    }
    var rect = element.getBoundingClientRect();

    if (rect.width || rect.height) {
        if (container === window) {
            container = element.ownerDocument.documentElement;
            return rect.top - container.clientTop;
        }
        return rect.top - container.getBoundingClientRect().top;
    }

    return rect.top;
}
Math.easeInOutQuad = function (t, b, c, d) {
    t /= d / 2
    if (t < 1) {
        return c / 2 * t * t + b
    }
    t--
    return -c / 2 * (t * (t - 2) - 1) + b
}
var requestAnimFrame = (function () {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (callback) { window.setTimeout(callback, 1000 / 60) }
})()
function scroll(val, targer) {
    targer.scrollTop = val
}
function scrollTo(start, to, targer, duration, callback) {
    const increment = 20
    const change = to - start
    let currentTime = 0
    duration = (typeof (duration) === 'undefined') ? 500 : duration
    var animateScroll = function () {
        currentTime += increment
        var val = Math.easeInOutQuad(currentTime, start, change, duration)
        scroll(val, targer)
        if (currentTime < duration) {
            requestAnimFrame(animateScroll)
        } else {
            if (callback && typeof (callback) === 'function') {
                callback()
            }
        }
    }
    animateScroll()
}
var checkChange = []
export default {
    name: 'LovAnchor',
    props: {
        targetid: {
            type: String,
            default: ''
        },
    },
    provide() {
        var _this = this
        return {
            anchor: {
                handlerClickLink(link) {
                    _this.activeLink = true
                    _this.activeLinkId = link
                    _this.setCurrentDot(link)
                    _this.setContainerScrollTop(link)
                },
                registLink(link) {
                    if (!_this.links.includes(link)) {
                        _this.links.push(link)
                    }
                },
                unregisterLink: function unregisterLink(link) {
                    var index = _this.links.indexOf(link);
                    if (index !== -1) {
                        _this.links.splice(index, 1);
                    }
                },
                $data: this.$data,
                horizontal:this.horizontal
            },
            activeLinkId: this.activeLinkId,
            anchorContext: this
        }
    },
    data() {
        return {
            container: null,
            links: [],
            activeSection: {},
            activeLink: false,
            activeLinkId: ''
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.targetid ? this.container = document.getElementById(this.targetid) : this.container = window
            if (this.container == window) {
                window.addEventListener('scroll', this.containerScroll)
            } else if (this.container) {
                this.container ? this.container.addEventListener('scroll', this.containerScroll) : null
            }
           
            console.log(this.$attrs, this.containerScroll)
        })
    },
    beforeDestroy() {
        if (this.container == window) {
            window.removeEventListener('scroll', this.containerScroll)
        } else {
            this.container.removeEventListener('scroll', this.containerScroll)
        }
    },
    computed: {
        button() {
            return Object.keys(this.$attrs).find(e => e == 'button') ? true : false
        },
        horizontal() {
            return Object.keys(this.$attrs).find(e => e == 'horizontal') ? true : false
        }
    },
    methods: {
        containerScroll() {
            if (this.isclick) return
            let activeLink = this.getCurrentAnchor()
            if (activeLink == checkChange[0]) return
            checkChange.unshift(activeLink)
            if (checkChange.length > 1)
                checkChange.splice(1, 1)
            if (activeLink) {
                this.setCurrentLink(activeLink)
                this.setCurrentDot(activeLink)
            } else {
                this.setCurrentLink("")
            }
        },
        getCurrentAnchor() {
            var _this = this,
                linkSections = [];
            this.links.forEach(e => {
                var targer = document.getElementById(e.replace(/#/, ''))
                if (targer) {
                    var top = getOffsetTop(targer, _this.container)
                    if (top < 5) {
                        linkSections.push({
                            link: e,
                            top: top
                        })
                        _this.activeLink = true
                    }
                }
            })
            if (linkSections.length) {
                let maxSection = linkSections.reduce(function (prev, curr) {
                    return curr.top > prev.top ? curr : prev;
                });
                if (maxSection.link) {
                    let laseEl = document.getElementById(maxSection.link.replace(/#/, ""))
                    if (laseEl.offsetHeight + maxSection.top <= 0) {
                        _this.activeLink = false
                        return ""
                    }
                    return maxSection.link
                }
            } else {
                _this.activeLink = false
                return ""
            }
            return ""
        },
        setCurrentDot(link) {
            let linkEl = this.$el.querySelector(`*[href='${link}']>.anchor-link_content`),
                linkNode = this.$el.querySelector('#anchor-dot')
            if (linkEl) {
                if (this.horizontal) {
                    if (this.button) {
                        this.$refs.linkNode.style.left = linkEl.offsetLeft + 'px'
                        this.$refs.linkNode.style.height = linkEl.offsetHeight + 'px'
                        this.$refs.linkNode.style.width = linkEl.offsetWidth + 'px'
                    } else {
                        this.$refs.linkNode.style.width = linkEl.offsetWidth + 'px'
                        this.$refs.linkNode.style.left = linkEl.offsetLeft + 'px'
                    }
                } else {
                    if (this.button) {
                        this.$refs.linkNode.style.top = linkEl.offsetTop + 'px'
                        this.$refs.linkNode.style.height = linkEl.offsetHeight + 'px'
                        this.$refs.linkNode.style.width = linkEl.offsetWidth + 'px'
                        this.$refs.linkNode.style.left = linkEl.offsetLeft + 'px'
                    } else {
                        this.$refs.linkNode.style.top = linkEl.offsetHeight / 2 + linkEl.offsetTop - linkNode.offsetHeight / 2 + 'px'
                    }
                }

            }
        },
        setCurrentLink(link) {
            this.activeLinkId = link
        },
        setContainerScrollTop(link) {
            this.isclick = true
            var _this = this,
                targerEl = document.getElementById(link.replace('#', ""))
            if (!targerEl) return
            let start = this.container.scrollTop,
                to = targerEl.offsetTop - this.container.offsetTop
            scrollTo(start, to, this.container, 500, (function () {
                _this.isclick = false
            }))
        }
    },
    render: function (h) {
        return h('div', {
            class: {
                'lov-anchor': true,
                'button-anchor': this.button,
                'horizontal': this.horizontal
            }
        }, [h(
            'div',
            {
                class: 'lov-anchor_ink',
            },
            [
                h(
                    'i',
                    { class: { 'move-dot': true, visible: this.activeLink },ref:'linkNode', attrs: { id: 'anchor-dot' } }
                )
            ]
        ), this.$slots.default])
    }
}