<template>
  <LayoutHeader>
    <template #left-header>
      <Breadcrumbs :items="breadcrumbs" />
    </template>
    <template #right-header>
      <CustomActions
        v-if="tasksListView?.customListActions"
        :actions="tasksListView.customListActions"
      />
      <Button variant="solid" :label="__('Create')" @click="createTask">
        <template #prefix><FeatherIcon name="plus" class="h-4" /></template>
      </Button>
    </template>
  </LayoutHeader>
  <ViewControls
    ref="viewControls"
    v-model="tasks"
    v-model:loadMore="loadMore"
    v-model:resizeColumn="triggerResize"
    v-model:updatedPageCount="updatedPageCount"
    doctype="CRM Task"
    :showElement=true
    :showFuncImport=false
    :showFuncConvertTaskCustomer="showConvertTaskCustomer"
    :placeholderText="__('Search')"
    @afterConvertTaskCustomer="onAfterConvertTaskCustomer()"
    :docSelect="taskSelect"
  />
  <TasksListView
    ref="tasksListView"
    v-if="tasks.data && rows.length"
    v-model="tasks.data.page_length_count"
    v-model:list="tasks"
    :rows="rows"
    :columns="tasks.data.columns"
    :options="{
      showTooltip: false,
      resizeColumn: true,
      rowCount: tasks.data.row_count,
      totalCount: tasks.data.total_count,
    }"
    @loadMore="() => loadMore++"
    @columnWidthUpdated="() => triggerResize++"
    @updatePageCount="(count) => (updatedPageCount = count)"
    @showTask="showTask"
    @applyFilter="(data) => viewControls.applyFilter(data)"
    @update:selections="(selections) => onUpdateSelection(selections)"
  />
  <div v-else-if="tasks.data" class="flex h-full items-center justify-center">
    <div
      class="flex flex-col items-center gap-3 text-xl font-medium text-gray-500"
    >
      <EmailIcon class="h-10 w-10" />
      <span>{{ __('No {0} Found', [__('tasks')]) }}</span>
      <Button :label="__('Create')" @click="showTaskModal = true">
        <template #prefix><FeatherIcon name="plus" class="h-4" /></template>
      </Button>
    </div>
  </div>
  <TaskModal v-model="showTaskModal" v-model:reloadTasks="tasks" :task="task" />
</template>

<script setup>
import CustomActions from '@/components/CustomActions.vue'
import EmailIcon from '@/components/Icons/EmailIcon.vue'
import LayoutHeader from '@/components/LayoutHeader.vue'
import ViewControls from '@/components/ViewControls.vue'
import TasksListView from '@/components/ListViews/TasksListView.vue'
import TaskModal from '@/components/Modals/TaskModal.vue'
import { usersStore } from '@/stores/users'
import { dateFormat, dateTooltipFormat, timeAgo } from '@/utils'
import { Breadcrumbs } from 'frappe-ui'
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { sessionStore } from '@/stores/session'
import emitter from '../eventBus';

const breadcrumbs = [{ label: __('Tasks'), route: { name: 'Tasks' } }]

const { getUser } = usersStore()
const { roles } = sessionStore()

const tasksListView = ref(null)
const showConvertTaskCustomer = ref(false)
const taskSelect = ref([])

const onCustomEvent = (payload) => {
  let idTaskView = payload.message
  if(idTaskView != null && idTaskView != ""){
    let taskFilter = tasks.value?.data?.data.filter(x => x.name == idTaskView)
    if(taskFilter.length > 0){
      showTask(taskFilter[0].name)
    }
  }
}

onMounted(()=>{
  let arrRole = roles.data;
  for(let i = 0; i < arrRole.length; i++){
    if(arrRole[i] == "System Manager"){
      showConvertTaskCustomer.value = true;
      break;
    }
  }
  setTimeout(()=>{
    let idTaskView = window.location.hash.substring(1)
    if(idTaskView != null && idTaskView != ""){
      let taskFilter = tasks.value?.data?.data.filter(x => x.name == idTaskView)
      if(taskFilter.length > 0){
        showTask(taskFilter[0].name)
      }
    }
  }, 400)
  emitter.on('custom-event', onCustomEvent);
})

onUnmounted(() => {
  emitter.off('custom-event', onCustomEvent);
})

// tasks data is loaded in the ViewControls component
const tasks = ref({})
const loadMore = ref(1)
const triggerResize = ref(1)
const updatedPageCount = ref(20)
const viewControls = ref(null)

const rows = computed(() => {
  if (!tasks.value?.data?.data) return []
  return tasks.value?.data.data.map((task) => {
    let _rows = {}
    tasks.value?.data.rows.forEach((row) => {
      _rows[row] = task[row]

      if (['modified', 'creation'].includes(row)) {
        _rows[row] = {
          label: dateFormat(task[row], dateTooltipFormat),
          timeAgo: __(timeAgo(task[row])),
        }
      } else if (row == 'assigned_to') {
        _rows[row] = {
          label: task.assigned_to && getUser(task.assigned_to).full_name,
          ...(task.assigned_to && getUser(task.assigned_to)),
        }
      }
    })
    return _rows
  })
})

const showTaskModal = ref(false)

const task = ref({
  name: '',
  title: '',
  description: '',
  assigned_to: '',
  due_date: '',
  remind_task: '',
  status: 'Backlog',
  priority: 'Low',
  reference_doctype: 'CRM Lead',
  reference_docname: ''
})

function showTask(name) {
  let t = rows.value?.find((row) => row.name === name)
  task.value = {
    name: t.name,
    title: t.title,
    description: t.description,
    assigned_to: t.assigned_to?.email || '',
    due_date: t.due_date,
    remind_task: t.remind_task,
    status: t.status,
    priority: t.priority,
    reference_doctype: t.reference_doctype,
    reference_docname: t.reference_docname,
  }
  showTaskModal.value = true
}

function createTask() {
  task.value = {
    name: '',
    title: '',
    description: '',
    assigned_to: '',
    due_date: '',
    remind_task: '',
    status: 'Backlog',
    priority: 'Low',
    reference_doctype: 'CRM Lead',
    reference_docname: '',
  }
  showTaskModal.value = true
}

function onAfterConvertTaskCustomer(){
  tasks.value.reload();
}

function onUpdateSelection(selections){
  taskSelect.value = selections
}
</script>
