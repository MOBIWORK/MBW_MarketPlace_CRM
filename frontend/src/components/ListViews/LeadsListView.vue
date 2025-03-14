<template>
  <ListView
    :class="$attrs.class"
    :columns="columns"
    :rows="rows"
    :options="{
      getRowRoute: (row) => ({ name: 'Lead', params: { leadId: row.name } }),
      selectable: options.selectable,
      showTooltip: options.showTooltip,
      resizeColumn: options.resizeColumn
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
        <div v-if="column.key === '_assign'" class="flex items-center" @click="
              (event) => applyFilterByCell(event, idx, column, item )
            ">
          <MultipleAvatar
            :avatars="item"
            size="sm"
          />
        </div>
        <ListRowItem v-else :item="item">
          <template #prefix>
            <div v-if="column.key === 'status'">
              <IndicatorIcon :class="item.color" />
            </div>
            <div v-else-if="column.key === 'lead_name'">
              <Avatar
                v-if="item.label"
                class="flex items-center"
                :image="item.image"
                :label="item.image_label"
                size="sm"
              />
            </div>
            <div v-else-if="column.key === 'organization'" @click="
                  (event) => applyFilterByCell(event, idx, column, item )
                ">
              <Avatar
                v-if="item.label"
                class="flex items-center"
                :image="item.logo"
                :label="item.label"
                size="sm"
              />
            </div>
            <div v-else-if="column.key === 'lead_owner'" @click="
                (event) => applyFilterByCell(event, idx, column, item )
              ">
              <Avatar
                v-if="item.full_name"
                class="flex items-center"
                :image="item.user_image"
                :label="item.full_name"
                size="sm"
              />
            </div>
            <div v-else-if="column.key === 'mobile_no'">
              <PhoneIcon class="h-4 w-4" @click="
                (event) => applyFilterByCell(event, idx, column, item )
              "/>
            </div>
          </template>
          <template #default="{ label }">
            <div
              v-if="
                [
                  'modified',
                  'creation',
                  'first_response_time',
                  'first_responded_on',
                  'response_by',
                ].includes(column.key)
              "
              class="truncate text-base"
              @click="
                (event) => applyFilterByCell(event, idx, column, item )
              "
            >
              <Tooltip :text="item.label">
                <div>{{ item.timeAgo }}</div>
              </Tooltip>
            </div>
            <div
              v-else-if="column.key === 'sla_status'"
              class="truncate text-base"
            >
              <Badge
                v-if="item.value"
                :variant="'subtle'"
                :theme="item.color"
                size="md"
                :label="item.value"
                @click="
                  (event) => applyFilterByCell(event, idx, column, item )
                "
              />
            </div>
            <div v-else-if="column.type === 'Check'">
              <FormControl
                type="checkbox"
                :modelValue="item"
                :disabled="true"
                class="text-gray-900"
              />
            </div>
            <div v-else-if="column.key === 'rating'" class="flex space-x-1" @click="(evt) => {
              evt.stopPropagation()
              evt.preventDefault()
            }">
              <VueStarRating :rating="row.rating*5" :starSize="20" :showRating="false" :clearable="true" @update:rating="(evt) => onUpdateRating(evt, row)"></VueStarRating>
            </div>
            <div v-else-if="['owner', 'modified_by'].includes(column.key)" class="truncate text-base" @click="
                (event) => applyFilterByCell(event, idx, column, item )
              ">
              {{getUser(label).first_name}}
            </div>
            <div
              v-else
              class="truncate text-base"
              @click="
                (event) => applyFilterByCell(event, idx, column, item )
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
    v-if="pageLengthCount"
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
    doctype="CRM Lead"
    :selectedValues="selectedValues"
    @reload="list.fetch()"
  />
</template>

<script setup>
import IndicatorIcon from '@/components/Icons/IndicatorIcon.vue'
import PhoneIcon from '@/components/Icons/PhoneIcon.vue'
import MultipleAvatar from '@/components/MultipleAvatar.vue'
import EditValueModal from '@/components/Modals/EditValueModal.vue'
import {
  Avatar,
  ListView,
  ListHeader,
  ListRows,
  ListRow,
  ListRowItem,
  Dropdown,
  call,
  Tooltip,
} from 'frappe-ui'
import { setupListActions, createToast } from '@/utils'
import { globalStore } from '@/stores/global'
import { onMounted, ref, watch,computed } from 'vue'
import { useRouter } from 'vue-router'
import ListSelectBanner from '@/components/frappe-ui/ListSelectBanner.vue'
import ListFooter from '@/components/frappe-ui/ListFooter.vue'
import VueStarRating from '@/components/Controls/star-rating.vue'
import { usersStore } from '@/stores/users'

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
  'rating',
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

function applyFilterByCell(event, idx, column, item){
  let arrField = ["lead_name","email","mobile_no","first_name","_assign","assign_to"];
  if(arrField.includes(column.key)) return; 
  emit('applyFilter', { event, idx, column, item });
}

function editValues(selections, unselectAll) {
  selectedValues.value = selections
  showEditModal.value = true
  unselectAllAction.value = unselectAll
}

function deleteValues(selections, unselectAll) {
  $dialog({
    title: __('Delete'),
    message: __('Are you sure you want to delete {0} item(s).All related documents will be deleted accordingly?', [
      selections.size,
    ]),
    variant: 'danger',
    actions: [
      {
        label: __('Delete'),
        variant: 'solid',
        theme: 'red',
        onClick: (close) => {
          call('crm.api.doc.delete_items_for_leads_deals', {
            items: JSON.stringify(Array.from(selections)),
            doctype: 'CRM Lead',
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

function onRowSelect(evt){
  let rowSelect = []
  evt.forEach(item => {
    rowSelect.push(item)
  })
  emit('update:selections', rowSelect)
}

function onUpdateRating(evt, data){
  emit('rating', {
    'fieldname': "rating",
    'row': data,
    'newvalue': evt/5
  })
}

const customBulkActions = ref([])
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
  customBulkActions.value.forEach((action) => {
    actions.push({
      label: __(action.label),
      onClick: () =>
        action.onClick({
          list: list.value,
          selections,
          unselectAll,
          call,
          createToast,
          $dialog,
          router,
        }),
    })
  })
  return actions
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
  customBulkActions.value = list.value?.data?.bulkActions || []
  customListActions.value = list.value?.data?.listActions || []
})
defineExpose({
  customListActions,
})
</script>
<style scoped>
</style>
