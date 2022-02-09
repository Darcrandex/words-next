<script setup lang="ts">
/**
 * @name Resource
 * @author darcrand
 * @description 作品（句子出处）
 */

import { computed, onMounted, reactive, ref } from 'vue'
import { apiGetAuthors, Author } from '@/apis/author'
import { apiGetCategories, Category } from '@/apis/category'
import {
  apiGetResource,
  apiCreateResource,
  apiUpdaeteResource,
  apiRemoveResource,
  Resource,
  ResourceForm,
  generateResource,
} from '@/apis/resource'
import { ElForm } from 'element-plus'

const authroOptions = ref<Author[]>([])
const categoryOptions = ref<Category[]>([])

const isOpen = ref(false)
const page = ref(1)
const data = reactive<{ list: Resource[]; total: number }>({ list: [], total: 0 })

const getList = async () => {
  const res = await apiGetResource({ page: page.value })
  Object.assign(data, res)
}

const formRef = ref<InstanceType<typeof ElForm>>()
const rules = {
  name: [{ required: true, message: '请输入名称' }],
  author: [{ required: true, message: '请选择作者' }],
  category: [{ required: true, message: '请选择分类' }],
}
const form = reactive<ResourceForm>(generateResource())
const isCreate = computed(() => !form._id)

const onEdit = (item?: Resource) => {
  if (item) {
    Object.assign(form, item, { author: item.author._id })
  } else {
    Object.assign(form, generateResource())
  }
  isOpen.value = true
}

const onSubmit = (ref: InstanceType<typeof ElForm> | undefined) => {
  if (ref) {
    ref.validate(async (isOk) => {
      if (isOk) {
        if (isCreate.value) {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { _id, ...rest } = form
          await apiCreateResource(rest)
        } else {
          await apiUpdaeteResource(form)
        }

        Object.assign(form, { _id: '', name: '', category: '', author: '', description: '' })
        isOpen.value = false
        await getList()
      }
    })
  }
}

const onRemove = async (id: string) => {
  await apiRemoveResource(id)
  await getList()
}

onMounted(async () => {
  const res1 = await apiGetAuthors({ pageSize: 1000 })
  const res2 = await apiGetCategories({ pageSize: 1000 })
  authroOptions.value = res1.list
  categoryOptions.value = res2.list
  getList()
})
</script>

<template>
  <el-button class="mb-4" type="primary" @click="onEdit()">新增</el-button>

  <el-table :data="data.list" :border="true" row-key="_id" style="width: 100%">
    <el-table-column prop="name" label="名称" />
    <el-table-column label="作者">
      <template #default="scope">
        {{ scope.row.author?.name }}
      </template>
    </el-table-column>
    <el-table-column label="分类">
      <template #default="scope">
        {{ scope.row.category?.name }}
      </template>
    </el-table-column>
    <el-table-column prop="description" label="描述" />
    <el-table-column width="200" label="操作">
      <template #default="scope">
        <!-- 注意：scope.row === record -->
        <el-button @click="onEdit(scope.row)">编辑</el-button>
        <el-popconfirm title="真的要删除吗?" @confirm="onRemove(scope.row._id)">
          <template #reference>
            <el-button>删除</el-button>
          </template>
        </el-popconfirm>
      </template>
    </el-table-column>
  </el-table>

  <el-pagination
    layout="prev, pager, next"
    :total="data.total"
    v-model:currentPage="page"
    :hide-on-single-page="true"
    @current-change="getList"
  />

  <el-drawer v-model="isOpen" title="作品信息编辑" size="60%">
    <el-form ref="formRef" :model="form" :rules="rules" label-width="120px">
      <el-form-item label="名称" prop="name">
        <el-input v-model="form.name" clearable />
      </el-form-item>
      <el-form-item label="作者" prop="author">
        <el-select v-model="form.author" placeholder="请选择" class="w-full">
          <el-option v-for="item in authroOptions" :key="item._id" :label="item.name" :value="item._id" />
        </el-select>
      </el-form-item>
      <el-form-item label="分类" prop="category">
        <el-select v-model="form.category" placeholder="请选择" class="w-full">
          <el-option v-for="item in categoryOptions" :key="item._id" :label="item.name" :value="item._id" />
        </el-select>
      </el-form-item>
      <el-form-item label="描述" prop="description">
        <el-input type="textarea" v-model="form.description" />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit(formRef)">{{ isCreate ? '新增' : '更新' }}</el-button>
        <el-button @click="isOpen = false">取消</el-button>
      </el-form-item>
    </el-form>
  </el-drawer>
</template>
