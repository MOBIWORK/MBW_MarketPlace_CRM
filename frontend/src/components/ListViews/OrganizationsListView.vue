<template>
  <ListView
    :columns="columns"
    :rows="rows"
    :options="{
      getRowRoute: (row) => ({
        name: 'Organization',
        params: { organizationId: row.name },
      }),
      selectable: options.selectable,
      showTooltip: options.showTooltip,
      resizeColumn: options.resizeColumn,
    }"
    row-key="name"
    @update:selections="(evt) => onRowSelect(evt)"
  >
    <ListHeader class="mx-5" @columnWidthUpdated="emit('columnWidthUpdated')" />
    <ListRows id="list-rows">
      <ListRow
        class="mx-5"
        v-for="row in rows"
        :key="row.name"
        v-slot="{ idx, column, item }"
        :row="row"
      >
        <ListRowItem :item="item">
          <template #prefix>
            <div v-if="column.key === 'organization_name'">
              <Avatar
                v-if="item.label"
                class="flex items-center"
                :image="item.logo"
                :label="item.label"
                size="sm"
              />
            </div>
          </template>
          <template #default="{ label }">
            <div
              v-if="['modified', 'creation'].includes(column.key)"
              class="truncate text-base"
              @click="
                (event) => emit('applyFilter', { event, idx, column, item })
              "
            >
              <Tooltip :text="item.label">
                <div>{{ item.timeAgo }}</div>
              </Tooltip>
            </div>
            <div v-else-if="column.type === 'Check'">
              <FormControl
                type="checkbox"
                :modelValue="item"
                :disabled="true"
                class="text-gray-900"
              />
            </div>
            <div v-else-if="['modified_by', 'owner'].includes(column.key)">
              <div>{{getUser(item).first_name}}</div>
            </div>
            <div
              v-else
              class="truncate text-base"
              @click="
                (event) => emit('applyFilter', { event, idx, column, item })
              "
            >
            {{ __(label) }}
            </div>
          </template>
        </ListRowItem>
      </ListRow>
    </ListRows>
    <ListSelectBanner>
      <template #actions="{ selections, unselectAll }">
        <Dropdown :options="bulkActions(selections, unselectAll)">
          <Button icon="more-horizontal" variant="ghost" />
        </Dropdown>
      </template>
    </ListSelectBanner>
  </ListView>
  <ListFooter
    class="border-t px-5 py-2"
    v-model="pageLengthCount"
    :options="{
      rowCount: options.rowCount,
      totalCount: options.totalCount,
    }"
    @loadMore="emit('loadMore')"
  />
  <EditValueModal
    v-model="showEditModal"
    v-model:unselectAll="unselectAllAction"
    doctype="CRM Organization"
    :selectedValues="selectedValues"
    @reload="list.reload()"
  />
</template>
<script setup>
import EditValueModal from '@/components/Modals/EditValueModal.vue'
import { globalStore } from '@/stores/global'
import { setupListActions, createToast } from '@/utils'
import {
  Avatar,
  ListView,
  ListHeader,
  ListRows,
  ListRow,
  ListRowItem,
  Tooltip,
  Dropdown,
  call,
} from 'frappe-ui'
import { ref, watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { usersStore } from '@/stores/users'
import ListFooter from '@/components/frappe-ui/ListFooter.vue'
import ListSelectBanner from '@/components/frappe-ui/ListSelectBanner.vue'

const props = defineProps({
  rows: {
    type: Array,
    required: true,
  },
  columns: {
    type: Array,
    required: true,
  },
  options: {
    type: Object,
    default: () => ({
      selectable: true,
      showTooltip: true,
      resizeColumn: false,
      totalCount: 0,
      rowCount: 0,
    }),
  },
})

const emit = defineEmits([
  'loadMore',
  'updatePageCount',
  'columnWidthUpdated',
  'applyFilter',
  'update:selections'
])
const { getUser } = usersStore()
const pageLengthCount = defineModel()
const list = defineModel('list')

const router = useRouter()

const { $dialog } = globalStore()

watch(pageLengthCount, (val, old_value) => {
  if (val === old_value) return
  emit('updatePageCount', val)
})

const showEditModal = ref(false)
const selectedValues = ref([])
const unselectAllAction = ref(() => {})

function editValues(selections, unselectAll) {
  selectedValues.value = selections
  showEditModal.value = true
  unselectAllAction.value = unselectAll
}

function deleteValues(selections, unselectAll) {
  $dialog({
    title: __('Delete'),
    message: __('Are you sure you want to delete {0} item(s)?', [
      selections.size,
    ]),
    variant: 'danger',
    actions: [
      {
        label: __('Delete'),
        variant: 'solid',
        theme: 'red',
        onClick: (close) => {
          call('frappe.desk.reportview.delete_items', {
            items: JSON.stringify(Array.from(selections)),
            doctype: 'CRM Organization',
          }).then(() => {
            createToast({
              title: __('Deleted successfully'),
              icon: 'check',
              iconClasses: 'text-green-600',
            })
            unselectAll()
            list.value.reload()
            close()
          })
        },
      },
    ],
  })
}

const customListActions = ref([])

function bulkActions(selections, unselectAll) {
  let actions = [
    {
      label: __('Edit'),
      onClick: () => editValues(selections, unselectAll),
    },
    {
      label: __('Delete'),
      onClick: () => deleteValues(selections, unselectAll),
    },
  ]
  return actions
}

function onRowSelect(evt){
  let rowSelect = []
  evt.forEach(item => {
    rowSelect.push(item)
  })
  emit('update:selections', rowSelect)
}

onMounted(() => {
  if (!list.value?.data) return
  setupListActions(list.value.data, {
    list: list.value,
    call,
    createToast,
    $dialog,
    router,
  })
  // customBulkActions.value = list.value?.data?.bulkActions || []
  customListActions.value = list.value?.data?.listActions || []
})

defineExpose({
  customListActions,
})
</script>
