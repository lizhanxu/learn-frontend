var app1 = new Vue({
    el:'#app-1',
    data:{
        show:true
    },
    methods:{
        init:function(text){
            console.log(text);
        },
        handleClose:function(){
            this.close();//像访问data一样，可以通过这种方式来访问方法
        },
        close:function(){
            this.show=false;
        }
    },
    mounted:function(){
        this.init('在初始化时调用');
    }
});

var app2 = new Vue({
    el:'#app-2',
    methods:{
        handleClick:function(message,event){
            // 该方法通知浏览器取消动作
            event.preventDefault();
            window.alert(message);
        }
    }
})

var app3 = new Vue({
    el: '#app-3',
    data: {
        link: '<a href="officialTest.html">v-html插入链接</a>'
    }
});

var app4 = new Vue({
    el:'#app-4',
    data:{
        url:'first.html'
    }
});

var app5 = new Vue({
    el:'#app-5',
    data:{
        books:[
            {name:'Tom'},
            {name:'Jhon'},
            {name:'Lee'}
        ]
    },
    methods:{
      showBook(book,index){
        console.log(book.name+'---'+index)
      }
    }
});