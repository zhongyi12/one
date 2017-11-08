var store = {
  save: function(key,value){
    localStorage.setItem(key,JSON.stringify(value));
  },
  fetch: function(key){
    return JSON.parse(localStorage.getItem(key)) || [];
  }
}
var list =store.fetch('new-mission');
// var list = [
//   {
//     title: 'task1',
//     isChecked:false
//   },
//   {
//     title:'task2',
//     isChecked:true
//   }
// ]
var vm = new Vue({
  el:'.main',
  data:{
    list:list,
    todo:'',
    editingTodo:'',
    beforeTitle:'',
    visibility:'all',
    tab:{
      1:true,
      2:true,
      3:false
    }
  },
  watch:{
    list:{
      handler:function(){
        store.save('new-mission',this.list);
      },
      deep:true
    }
  },
  computed:{
    noCheckedLength: function(){
      return this.list.filter(function(item){
                return !item.isChecked;
            }).length;
    },
    filterList: function(){
      var filter = {
        all: function(list){
          return list;
        },
        finished: function(list){
          return list.filter(function(item){
            return item.isChecked;
          })
        },
        unfinished: function(list){
          return list.filter(function(item){
            return !item.isChecked;
          })
        }
      }
     return filter[this.visibility]?filter[this.visibility](list):list;
   }
  },
  methods:{
    addTodo() {
      this.list.push({
        title:this.todo,
        isChecked:false
      });
      this.todo = '';
    },
    deleteTodo(item) {
      var index = this.list.indexOf(item);
      this.list.splice(index,1);
    },
    editTodo(item) {
      this.beforeTitle = item.title;
      this.editingTodo = item;
    },
    editDone(item){
      this.editingTodo = '';
    },
    cancleTodo(item){
      item.title = this.beforeTitle;
      this.beforeTitle = '';
      this.editingTodo = '';
    }
  },
  directives:{
    "focus":{
      update(el,binding){
        if(binding.value){
          el.focus();
        }
      }
    }
  }
});
function watchHashChange(){
  var hash = location.hash.slice(1);
  console.log(hash);
  vm.visibility = hash;
}
watchHashChange();
window.addEventListener("hashchange",watchHashChange);
