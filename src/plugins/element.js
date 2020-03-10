import Vue from 'vue'
import { 
    Button,
    Form,
    FormItem,
    Input,
    Menu,
    MenuItem,
    Submenu,
    MenuItemGroup,
    Breadcrumb,
    BreadcrumbItem,
    Divider,
    Card,
    Col,
    Row,
    Tag,
    RadioGroup,
    RadioButton,
    PageHeader,
    Step,
    Steps,
    Message,
    Dialog,
    Carousel,
    CarouselItem
 } from 'element-ui'

import VueVideoPlayer from 'vue-video-player'
Vue.use(VueVideoPlayer)

Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Submenu)
Vue.use(MenuItemGroup)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Divider)
Vue.use(Card)
Vue.use(Col)
Vue.use(Row)
Vue.use(Tag)
Vue.use(RadioGroup)
Vue.use(RadioButton)
Vue.use(PageHeader)
Vue.use(Step)
Vue.use(Steps)
Vue.use(Dialog)
Vue.use(Carousel)
Vue.use(CarouselItem)

Vue.prototype.$message = Message
