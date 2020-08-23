// 全局注册组件，全局注册后任何Vue实例都可以使用
Vue.component('my-component-1',{
    template:'<div>这里是组件的内容</div>'
});
var app1 = new Vue({
    el:'#app-1'
})

//局部注册组件，通过Vue实例的components
var Child = {
    template:'<div>局部注册组件的内容</div>'
};
var app2 = new Vue({
    el:'#app-2',
    components:{
        'my-component-2':Child
    }
});

// 元素限制
Vue.component('my-component-3',{
    template:'<div>这里是组件的内容</div>'
});
var app3 = new Vue({
    el:'#app-3'
});


// 共享对象
var value={
    counter:0
};
Vue.component('my-button-1',{
    template:'<button @click="counter++">{{counter}}</button>',
    data:function(){
        return value;
    }
});
var app4 = new Vue({
    el:'#app-4'
});

// 给每个组件返回一个独立的对象
Vue.component('my-button-2',{
    template:'<button @click="counter++">{{counter}}</button>',
    data:function(){
        return {
            counter:0
        };
    }
});
var app5 = new Vue({
    el:'#app-5'
});

// 组件通信
Vue.component('my-component-4',{
    props:['packet'],
    template:'<div>{{packet}}</div>'
});
var app6 = new Vue({
    el:'#app-6'
});

// 动态绑定props的值
Vue.component('my-component-5',{
    props:['message'],
    template:'<div>{{message}}</div>'
});
var app7 = new Vue({
    el:'#app-7',
    data:{
        parentMessage:'app7'
    }
});

// 父组件传递初始值，子组件将它保存下来，在自己的作用域内随便修改
// 在子组件的data中声明一个数据，引用父组件的prop
// initcount不能用init-count,加上'-'不认识
Vue.component('my-component-6',{
    props:['initcount'],
    template:'<div>{{count}}</div>',
    data:function(){
        return {
            count:this.initcount
        };
    }
});
var app8 = new Vue({
    el:'#app-8'
});

// 数据验证
Vue.component('my-component',{
    props:{
        // 必须是Number类型
        propA: Number,
        // 必须是String或Number类型
        propB: [String,Number],
        // 必须是布尔值，默认为true
        propC: {
            type:Boolean,
            default:true
        },
        // 数字类型，必传
        propD: {
            type:Number,
            required:true
        },
        propE:{
            type:Array,
            default:function(){
                return [];
            }
        },
        // 自定义一个验证函数
        propF:{
            validator:function(value){
                return value>10;
            }
        }
    }
});

Vue.component('my-component-7',{
    template:'\
    <div>\
        <button @click="handleIncrease">+1</button>\
        <button @click="handleReduce">-1</button>\
    </div>',
    data:function(){ 
        return { 
            counter : 0 
        }
    },
    methods:{ 
        handleIncrease: function () { 
            this.counter++; 
            this.$emit ('increase', this.counter); 
        } , 
        handleReduce: function () { 
            this.counter--; 
            this.$emit ('reduce', this.counter) ;
        }
    }
});
var app9 = new Vue({
    el:'#app-9',
    data:{
        total:0
    },
    methods:{
        handleGetTotal:function(total){
            this.total=total;
        }
    }
});

Vue.component('my-component-8',{
    template:'<button @click="handleClick">+1</button>',
    data:function(){
        return{
            counter:0
        }
    },
    methods:{
        handleClick:function(){
            this.counter++;
            // 在使用v-model绑定时，事件名用input
            this.$emit('input',this.counter);
        }
    }
});
var app10 = new Vue({
    el:'#app-10',
    data:{
        total:0
    }
});


// bus
var bus = new Vue();

Vue.component('my-component-9',{
    template:'<button @click="handleEvent">传递事件</button>',
    methods:{
        handleEvent:function(){
            // 触发事件
            bus.$emit('on-message','来自组件my-component-9的内容');
        }
    }
});

var app11 = new Vue({
    el:'#app-11',
    data:{
        message:''
    },
    mounted:function(){
        var _this = this;
        // 注册事件
        bus.$on('on-message',function(msg){
            _this.message=msg;
        })
    }
})