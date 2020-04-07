<template>
  <div v-if="!item.hidden">
    <!-- 情形1：只有一级菜单，没有子菜单，直接显示 menu-item -->
    <router-link v-if="(!item.children || item.children.length === 0)"
                 :to="item.path">
      <el-menu-item :index="item.path">
        <i :class="item.meta.icon"></i>
        <span slot="title">{{item.meta.title}}</span>
      </el-menu-item>
    </router-link>

    <!-- 情形2：有子菜单，先显示 submenu， 再显示 menu-item -->
    <el-submenu v-else :index="item.path">
      <template slot="title">
        <i :class="item.meta.icon"></i>
        <span>{{ item.meta.title }}</span>
      </template>
      <router-link v-for="(child, index) in item.children" :key="index" :to="item.path + '/' + child.path">
        <template v-if="!child.hidden">
          <el-menu-item :index="item.path + '/' + child.path">
            <i :class="child.meta.icon || 'ds-user'"></i>
            <span slot="title">{{child.meta.title}}</span>
          </el-menu-item>
        </template>
      </router-link>
    </el-submenu>
  </div>
</template>

<script>
export default {
  name: 'layout-sidebar-item',
  props: {
    item: {
      type: Object
    }
  },
  created () {
    console.log(this.item)
  }
}
</script>

<style scoped>

</style>
