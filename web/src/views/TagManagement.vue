<script setup lang="ts">
/**
 * @name TagManagement
 * @author darcrand
 * @description 标签管理
 */

import { computed, onMounted, reactive, ref } from 'vue'
import * as R from 'ramda'
import { apiGetTagGroups, TagGroup } from '@/apis/tag-group'
import { apiGetTags, apiCreateTag, apiUpdaeteTag, apiRemoveTag, Tag } from '@/apis/tag'
import { ElForm } from 'element-plus'

const isOpen = ref(false)
const page = ref(1)
const data = reactive<{ list: { _id: string; name: string; group: { name: string } }[]; total: number }>({
  list: [],
  total: 0,
})
const groupOptions = ref<TagGroup[]>([])

const getList = async () => {
  const res = await apiGetTags({ page: page.value })
  Object.assign(data, res)
}

const formRef = ref<InstanceType<typeof ElForm>>()
const rules = { name: [{ required: true, message: '请输入名称' }] }
const form = reactive<Tag>({ _id: '', name: '', group: '' })
const isCreate = computed(() => !form._id)

const onEdit = (item?: Tag) => {
  Object.assign(form, R.clone(item) ?? { _id: '', name: '', description: '' })
  isOpen.value = true
}

const onSubmit = (ref: InstanceType<typeof ElForm> | undefined) => {
  if (ref) {
    ref.validate(async (isOk) => {
      if (isOk) {
        if (isCreate.value) {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { _id, ...rest } = form
          await apiCreateTag(rest)
        } else {
          await apiUpdaeteTag(form)
        }

        Object.assign(form, { _id: '', name: '', description: '' })
        isOpen.value = false
        await getList()
      }
    })
  }
}

const onRemove = async (id: string) => {
  await apiRemoveTag(id)
  await getList()
}

onMounted(() => {
  apiGetTagGroups({ page: 1, pageSize: 1000 }).then((res) => {
    groupOptions.value = res.list
  })
  getList()
})
</script>

<template>
  <el-button class="mb-4" type="primary" @click="onEdit()">新增</el-button>

  <el-table :data="data.list" :border="true" row-key="_id" style="width: 100%">
    <el-table-column prop="name" label="名称" width="200px" />
    <el-table-column label="分组名称">
      <template #default="scope">
        {{ scope.row.group?.name }}
      </template>
    </el-table-column>
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

  <el-drawer v-model="isOpen" title="标签编辑" size="60%">
    <el-form ref="formRef" :model="form" :rules="rules" label-width="120px">
      <el-form-item label="标签名称" prop="name">
        <el-input v-model="form.name" clearable />
      </el-form-item>
      <el-form-item label="标签分组" prop="group">
        <el-select v-model="form.group" placeholder="请选择所属分组" class="w-full">
          <el-option v-for="item in groupOptions" :key="item._id" :label="item.name" :value="item._id" />
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit(formRef)">{{ isCreate ? '新增' : '更新' }}</el-button>
        <el-button @click="isOpen = false">取消</el-button>
      </el-form-item>
    </el-form>
  </el-drawer>
</template>
