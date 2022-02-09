<script setup lang="ts">
/**
 * @name Paragraph
 * @author darcrand
 * @description 句子（段落）
 */

import { computed, onMounted, reactive, ref } from 'vue'
import * as R from 'ramda'
import {
  apiGetParagraphs,
  apiCreateParagraph,
  apiUpdaeteParagraph,
  apiRemoveParagraph,
  Paragraph,
  ParagraphForm,
  generateParagraph,
} from '@/apis/paragraph'

import { ElForm } from 'element-plus'
import { CameraFilled } from '@element-plus/icons-vue'
import { apiGetResource, Resource } from '@/apis/resource'
import { apiGetTags, Tag } from '@/apis/tag'

const resourceOptions = ref<Resource[]>([])
const tagOptions = ref<Tag[]>([])
onMounted(async () => {
  const res1 = await apiGetResource({ pageSize: 1000 })
  const res2 = await apiGetTags({ pageSize: 1000 })
  resourceOptions.value = res1.list
  tagOptions.value = res2.list
})

const isOpen = ref(false)
const page = ref(1)
const data = reactive<{ list: Paragraph[]; total: number }>({ list: [], total: 0 })

const getList = async () => {
  const res = await apiGetParagraphs({ page: page.value })
  Object.assign(data, res)
}

const formRef = ref<InstanceType<typeof ElForm>>()
const rules = {
  content: [{ required: true, message: '请输入句子' }],
  resource: [{ required: true, message: '请选择出处' }],
}
const form = reactive<ParagraphForm>(generateParagraph())
const isCreate = computed(() => !form._id)

const onEdit = (item?: Paragraph) => {
  if (item) {
    const recordToForm = R.clone(item)
    const { resource, tags, ...rest } = recordToForm
    Object.assign(form, { ...rest, resource: resource._id, tags: tags?.map((v) => v._id) })
  } else {
    Object.assign(form, R.clone(item) ?? generateParagraph())
  }
  isOpen.value = true
}

const handleAvatarSuccess = (param: { url?: string }) => {
  if (param && param.url) {
    form.cover = param.url
  }
}

const onSubmit = (ref: InstanceType<typeof ElForm> | undefined) => {
  if (ref) {
    ref.validate(async (isOk) => {
      if (isOk) {
        if (isCreate.value) {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { _id, ...rest } = form
          await apiCreateParagraph(rest)
        } else {
          await apiUpdaeteParagraph(form)
        }

        Object.assign(form, generateParagraph())
        isOpen.value = false
        await getList()
      }
    })
  }
}

const onRemove = async (id: string) => {
  await apiRemoveParagraph(id)
  await getList()
}

onMounted(getList)
</script>

<template>
  <el-button class="mb-4" type="primary" @click="onEdit()">新增</el-button>

  <el-table :data="data.list" :border="true" row-key="_id" style="width: 100%">
    <el-table-column prop="content" label="句子" />
    <el-table-column label="出处">
      <template #default="scope">{{ scope.row.resource?.name }}</template>
    </el-table-column>
    <el-table-column label="标签">
      <template #default="scope">
        <el-tag v-for="t in scope.row.tags" :key="t._id" class="mr-1">{{ t.name }}</el-tag>
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
      <el-form-item prop="content" label="内容">
        <el-input type="textarea" v-model="form.content" />
      </el-form-item>
      <el-form-item prop="resource" label="出处">
        <el-select v-model="form.resource" placeholder="请选择" class="w-full">
          <el-option v-for="item in resourceOptions" :key="item._id" :label="item.name" :value="item._id" />
        </el-select>
      </el-form-item>
      <el-form-item prop="tags" label="标签">
        <el-checkbox-group v-model="form.tags">
          <el-checkbox v-for="item in tagOptions" :key="item._id" :label="item._id">{{ item.name }}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="描述" prop="description">
        <el-input type="textarea" v-model="form.description" />
      </el-form-item>

      <el-form-item label="封面" prop="cover">
        <el-upload
          class="inline-block mr-4"
          action="/file/upload"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
        >
          <div
            class="flex items-center justify-center w-28 h-28 rounded border-gray-400 border border-dashed hover:border-blue-400"
          >
            <el-icon class="text-3xl text-gray-400"><camera-filled /></el-icon>
          </div>
        </el-upload>

        <el-image
          v-if="form.cover"
          class="w-28 h-28"
          :src="form.cover"
          fit="cover"
          :preview-src-list="[form.cover]"
        ></el-image>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit(formRef)">{{ isCreate ? '新增' : '更新' }}</el-button>
        <el-button @click="isOpen = false">取消</el-button>
      </el-form-item>
    </el-form>
  </el-drawer>
</template>
