var app1 = new Vue({
    el:'#app-1',
    data:{
        text:'123,456'
    },
    computed:{
        reversedText:function(){
            return this.text.split(',').reverse().join(',');
        }
    }
});

var app2 = new Vue({
    el:'#app-2',
    data:{
        package1:[
            {
                name:'iPhone10',
                price: 5211,
                count:2
            },
            {
                name:'iPad',
                price:2999,
                count:1
            },
            {
                name:'MackBook',
                price:9999,
                count:3
            }
        ],
        package2:[
            {
                name:'apple',
                price:3,
                count:5
            },
            {
                name:'banana',
                price:2,
                count:10
            }
        ]
    },
    computed:{
        // 当只有一个方法时，默认是get方法
        prices:function(){
            var prices=0;
            for(var i=0;i<this.package1.length;i++){
                prices+=this.package1[i].price*this.package1[i].count;
            }
            for(var i=0;i<this.package2.length;i++){
                prices+=this.package2[i].price*this.package2[i].count;
            }
            return prices;
        }
    }
});

var app3 = new Vue({
    el:'#app-3',
    data:{
        firstName:'Jack',
        lastName:'Green'
    },
    methods:{
        submit:function(){
            // 通过ref获取input内容
            // 写入触发set方法
            app3.fullName=this.$refs.input.value;
            console.log(this.firstName);
            console.log(this.lastName);
        }
    },
    computed:{
        fullName:{
            // 读取时触发
            get:function(){
                return this.firstName+' '+this.lastName;
            },
            // 写入时触发
            set:function(newValue){
                var names = newValue.split(" ");
                this.firstName = names[0];
                this.lastName = names[names.length-1];
            }
        }
    }
})