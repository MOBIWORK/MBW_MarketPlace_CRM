<template>
  <ListView
    :class="$attrs.class"
    :columns="columns"
    :rows="rows"
    :options="{
      getRowRoute: (row) => ({ name: 'Lead', params: { leadId: row.name } }),
      selectable: options.selectable,
      showTooltip: options.showTooltip,
      resizeColumn: options.resizeColumn,
    }"
    row-key="name"
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
              handleStarClick(evt,evt.target.title,row)
              evt.stopPropagation()
              evt.preventDefault()
            }">
              <div id="rating">
                <input
                  type="radio"
                  :id="row.name + 'star5'"
                  :name="row.name + 'star5'"
                  value="5"
                />
                <label
                  class="full"
                  :for="row.name + 'star5'"
                  title="5"
                ></label>
                <input
                  type="radio"
                  :id="row.name + 'star4'"
                  :name="row.name + 'star4'"
                  value="4"
                  
                />
                <label
                  class="full"
                  :for="row.name + 'star4'"
                  title="4"
                ></label>
                <input
                  type="radio"
                  :id="row.name + 'star3'"
                  :name="row.name + 'star3'"
                  value="3"
                  
                />
                <label
                  class="full"
                  :for="row.name + 'star3'"
                  title="3"
                ></label>
                <input
                  type="radio"
                  :id="row.name + 'star2'"
                  :name="row.name + 'star2'"
                  value="2"
                  
                />
                <label
                  class="full"
                  :for="row.name + 'star2'"
                  title="2"
                ></label>

                <input
                  type="radio"
                  :id="row.name + 'star1'"
                  :name="row.name + 'star1'"
                  value="1"
                  
                />
                <label
                  class="full"
                  :for="row.name + 'star1'"
                  title="1"
                ></label>
              </div>
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
    @reload="list.reload()"
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
  ListSelectBanner,
  ListRowItem,
  ListFooter,
  Dropdown,
  call,
  Tooltip,
} from 'frappe-ui'
import { setupListActions, createToast } from '@/utils'
import { globalStore } from '@/stores/global'
import { onMounted, ref, watch,computed } from 'vue'
import { useRouter } from 'vue-router'

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
// watch(props, (newProps) => {
//   for (let i = 0; i < newProps.rows.length; i++) {
//         calcRate(newProps.rows[i]);
//       }
//   // Perform necessary actions when props change
// });
const emit = defineEmits([
  'loadMore',
  'updatePageCount',
  'columnWidthUpdated',
  'applyFilter',
  'rating'
])

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
  let arrField = ["lead_name","email","mobile_no","first_name"];
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
const calcRate = (row , value) => {
  if (value) {
  row.rating = value;
 }
 
 const r = row.rating * 5;
      const f = Math.floor(r);
      const id = row.name + 'star' + `${r}`;
      // Lấy tất cả các nút radio liên quan đến row.name
      const radioButtons = document.querySelectorAll(`input[id^='${row.name}star']`);
      
      // Đặt tất cả các nút radio về trạng thái không được chọn
      radioButtons.forEach(radio => {
        radio.checked = false;
      });

      // Đánh dấu nút radio đúng
      if (id) {
        const radioButton = document.getElementById(id);
        if (radioButton) {
          radioButton.checked = true;
        }
      }
};
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
  props.rows.forEach((row) => calcRate(row))
 
  // for (let i = 0; i < props.rows.length; i++) {
  //       calcRate(props.rows[i]);
  //     }
   // Cập nhật giá trị mặc định cho mỗi dòng
})
const handleStarClick = (evt,value , row  ) => {
  evt.stopPropagation()
  evt.preventDefault()
  let fieldname = 'rating'
  const newvalue = parseFloat(value)/5
  calcRate(row,newvalue)
  emit('rating', {fieldname,newvalue,row} )

}
defineExpose({
  customListActions,
})
</script>
<style scoped>
@import url(//netdna.bootstrapcdn.com/font-awesome/3.2.1/css/font-awesome.css);
#rating {
  border: none;
  float: left;
  cursor: pointer;
}
#rating > input {
  display: none;
} /*ẩn input radio - vì chúng ta đã có label là GUI*/
#rating > label:before {
  margin: 5px;
  font-size: 1.25em;
  font-family: FontAwesome;
  display: inline-block;
  content: '\f005';
} /*1 ngôi sao*/
#rating > label {
  color: #ddd;
  float: right;
} /*float:right để lật ngược các ngôi sao lại đúng theo thứ tự trong thực tế*/
/*thêm màu cho sao đã chọn và các ngôi sao phía trước*/
#rating > input:checked ~ label,
#rating:not(:checked) > label:hover,
#rating:not(:checked) > label:hover ~ label {
  color: #ffd700;
}
/* Hover vào các sao phía trước ngôi sao đã chọn*/
#rating > input:checked + label:hover,
#rating > input:checked ~ label:hover,
#rating > label:hover ~ input:checked ~ label,
#rating > input:checked ~ label:hover ~ label {
  color: #ffed85;
}
</style>
