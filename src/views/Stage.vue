<template>
  <container
    :id="sData.id"
    :tag="sData.tag"
    :children="sData.children"
    @change="changeHandler"
    @add="addHandler"
    @clone="cloneHandler"
    @choose="chooseHandler"
  ></container>
</template>

<script>
import container from './Container'
import short from 'shortid'
export default {
  name: 'stage',
   components: {
    container
  },

  data() {
    return {
      sData: this.$store.state.page,
      // items: this.nodes || this.$store.state.page,
      conf: {
        group: {
          name: 'hbird'
        }
      },
      ctrl: null
    }
  },

  beforeCreate() {
    console.log(
      '初始化舞台基础数据'
    )
    
    const initData = {
      id: short.generate(),
      tag: 'el-row',
      children: []
    }
    this.$store.state.page = initData
  },


  mounted() {

    

  },

  methods: {
    endHandler(evt) {
      // console.log(`endHandler ~`)
      // console.log(evt)
      evt
    },
    movedHandler(evt) {
      // console.log(`movedHandler ~`)
      // console.log(evt)
      evt
    },
    

    removeHandler(evt) {
      // console.log(`removeHandler ~`)
      // console.log(evt)
      // console.log(this.items)
      // console.log(evt.to.id)
      
      this.items.forEach(item => {
        if(item.id === evt.to.id) {
          item.nodes.push(this.ctrl)
        }
      })
      console.log(this.items)
      // 此处可以优化，暂时没时间做深入研究
      this.$forceUpdate()
    },

    changeHandler(evt) {
      if (this) return
      // if (evt.removed) {
      //   this.ctrl = evt.removed.element
      // }
      console.log(`change handler ~`)
      // add
      if (evt.added) {
        this.$store.state.selected = {
          id: short.generate(),
          ...evt.added.element,
          pos: evt.added.newIndex
        }
      }
    },

    addHandler(evt) {
      if (this) return
      console.log('目标', evt)
      // 添加到哪
      // 获取到目标对象 
      console.log(evt.to.id)
      // 获取当前目标对象的数据
      let node = this.query(evt.to.id)
      console.log(`找到的对象`, node)

      if (!node) {
        throw new Error('没有找到目标对象容器')
      }
      
      const selected = Object.assign({}, this.$store.state.selected)
      console.log('要添加的对象 ...', selected)
      let ops = {}
      if (selected.element == 'container' && !selected.children) {
        ops = { children: [] }
      }

      node.children.splice(
        selected.pos,
        1,
        Object.assign(ops, selected)
      )

      this.$store.state.page = Object.assign(
        {},
        this.$store.state.page
      )
      // console.log(this.$store.state.page)
      // let page = this.$store.state.page
      // page.forEach(item => {
      //   if(item.id === evt.to.id) {
      //     const { position } = this.ctrl.position
      //     delete this.ctrl.position
      //     item.nodes.splice(position, 1, this.ctrl)
      //   }
      // })
      this.$forceUpdate()
    },

    cloneHandler(evt) {
      console.log(`clone handler ~`)
      console.log(evt)
    },

    chooseHandler(evt) {
      console.log(evt)
      let conf = evt.item.__vue__.$props
      let list = []
      for(let key in conf) {
          list.push({
              name: key,
              value: conf[key]
          })
      }

      // this.$store.state.setting = list

      this.$emit('sync-setting', list)
    },

    query(id = '', page = this.$store.state.page) {
      if(id == '') {
        throw new Error('参数错误')
      }

      if (page.id == id) {
        return page
      }

      if (page.children) {
        return page.children.find(item => {
          return this.query(id, item)
        })
      }

      return null

    }
  }
}
</script>