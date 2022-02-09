<script setup lang="ts">
/**
 * @name Home
 * @author darcrand
 * @description 首页
 */

import { Lollipop, MagicStick, Soccer, KnifeFork, MoonNight, ColdDrink } from '@element-plus/icons-vue'
</script>

<template>
  <el-container class="h-screen">
    <el-header class="flex items-center border-b border-gray-200">
      <img src="@/assets/words-logo.png" alt="words" class="rounded-full w-10 h-10" />
    </el-header>

    <el-container class="overflow-auto">
      <el-aside width="200px">
        <el-menu :router="true" class="h-full">
          <el-menu-item index="/tag-group-management">
            <el-icon :size="14">
              <lollipop />
            </el-icon>
            <span>标签组管理</span>
          </el-menu-item>
          <el-menu-item index="/tag-management">
            <el-icon :size="14">
              <magic-stick />
            </el-icon>
            <span>标签管理</span>
          </el-menu-item>
          <el-menu-item index="/category-management">
            <el-icon :size="14">
              <soccer />
            </el-icon>
            <span>分类管理</span>
          </el-menu-item>

          <el-menu-item index="/author-management">
            <el-icon :size="14">
              <knife-fork />
            </el-icon>
            <span>作者管理</span>
          </el-menu-item>

          <el-menu-item index="/resource-management">
            <el-icon :size="14">
              <moon-night />
            </el-icon>
            <span>作品（出处）管理</span>
          </el-menu-item>
          <el-menu-item index="/paragraph">
            <el-icon :size="14">
              <cold-drink />
            </el-icon>
            <span>句子（段落）</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>
