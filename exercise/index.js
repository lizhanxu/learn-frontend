var app = new Vue({
    el:'#app',
    data:{
        list:[
            {
                id:1,
                name:'iPhone 10',
                price: 5211,
                count:1
            },
            {
                id:2,
                name:'iPad',
                price:2999,
                count:1
            },
            {
                id:3,
                name:'MackBook',
                price:9999,
                count:1
            }
        ]
    },
    computed:{
        totalPrice:function(){
            var total = 0;
            for(var i=0;i<this.list.length;i++){
                var item = this.list[i];
                total += item.price*item.count;
            }
            // 千位分隔符转换
            return total.toString().replace(/\B(?=(\d{3})+$)/g,',');
        }
    },
    methods:{
        handleReduce:function(index){
            if(this.list[index].count===1) return;
            this.list[index].count--;
        },
        handleAdd:function(index){
            this.list[index].count++;
        },
        handleRemove:function(index){
            // splice() 方法向/从数组中添加/删除项目，然后返回被删除的项目。
            // index,修改的位置；1，修改数量
            this.list.splice(index,1);
        }
    }
})