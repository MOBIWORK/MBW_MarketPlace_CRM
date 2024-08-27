<template>
  <Dialog
    v-model="show"
    :options="{
      size: 'xl',
      actions: [
        {
          label: editMode ? __('Update') : __('Create'),
          variant: 'solid',
          onClick: () => updateTask(),
        },
      ],
    }"
    @after-leave="onAfterLeaveDialogTask()"
  >
    <template #body-title>
      <div class="flex items-center gap-3">
        <h3 class="text-2xl font-semibold leading-6 text-gray-900">
          {{ editMode ? __('Edit Task') : __('Create Task') }}
        </h3>
        <Button
          v-if="task?.reference_docname"
          variant="outline"
          size="sm"
          :label="
            task.reference_doctype == 'CRM Deal' ? __('Open Deal') : __('Open Lead')
          "
          @click="redirect()"
        >
          <template #suffix>
            <ArrowUpRightIcon class="h-4 w-4" />
          </template>
        </Button>
      </div>
    </template>
    <template #body-content>
      <div class="flex flex-col gap-4">
        <div>
          <div class="mb-1.5 text-sm text-gray-600">{{ __('Task name') }}</div>
          <TextInput
            ref="title"
            variant="outline"
            v-model="_task.title"
            :placeholder="__('')"
          />
        </div>
        <div>
          <div class="mb-1.5 text-sm text-gray-600">{{ __('Description') }}</div>
          <TextEditor
            variant="outline"
            ref="description"
            editor-class="!prose-sm overflow-auto min-h-[80px] max-h-80 py-1.5 px-2 rounded border border-gray-300 bg-white hover:border-gray-400 hover:shadow-sm focus:bg-white focus:border-gray-500 focus:shadow-sm focus:ring-0 focus-visible:ring-2 focus-visible:ring-gray-400 text-gray-800 transition-colors"
            :bubbleMenu="true"
            :content="_task.description"
            @change="(val) => (_task.description = val)"
            :placeholder="__('')"
          />
        </div>
        <div class="flex items-center gap-4 grid grid-cols-3">
          <div class="w-full">
            <div class="mb-1.5 text-sm text-gray-600">{{ __('Status') }}</div>
            <Dropdown :options="taskStatusOptions(updateTaskStatus)">
              <Button :label="__(_task.status)" style="width: 165px;justify-content:flex-start;">
                <template #prefix>
                  <TaskStatusIcon :status="_task.status" />
                </template>
              </Button>
            </Dropdown>
          </div>
          <div>
            <div class="mb-1.5 text-sm text-gray-600">{{ __('Assign To') }}</div>
            <Link
              class="form-control truncate"
              :value="getUser(_task.assigned_to).full_name"
              doctype="User"
              @change="(option) => (_task.assigned_to = option)"
              :hideMe="true"
            >
              <template #prefix>
                <UserAvatar class="mr-2 !h-4 !w-4" :user="_task.assigned_to" />
              </template>
              <template #item-prefix="{ option }">
                <UserAvatar class="mr-2" :user="option.value" size="sm" />
              </template>
              <template #item-label="{ option }">
                <Tooltip :text="option.value">
                  <div class="cursor-pointer">
                    {{ getUser(option.value).full_name }}
                  </div>
                </Tooltip>
              </template>
            </Link>
          </div>
          <div class="w-full">
            <div class="mb-1.5 text-sm text-gray-600">{{ __('Priority') }}</div>
            <Dropdown :options="taskPriorityOptions(updateTaskPriority)">
              <Button :label="__(_task.priority)" style="width: 165px;justify-content:flex-start;">
                <template #prefix>
                  <TaskPriorityIcon :priority="_task.priority" />
                </template>
              </Button>
            </Dropdown>
          </div>
        </div>
        <div class="flex items-center gap-4 grid grid-cols-2">
          <div>
            <div class="mb-1.5 text-sm text-gray-600">{{ __('Deadline') }}</div>
            <DatetimePicker
              class="datepicker"
              icon-left="calendar"
              :value="_task.due_date"
              @change="(val) => (_task.due_date = val)"
              :placeholder="__('Select Due Date')"
              input-class="border-none"
            />
          </div>
          <div>
            <div class="mb-1.5 text-sm text-gray-600">{{ __('Remind task') }}</div>
            <DatetimePicker
              class="datepicker"
              icon-left="calendar"
              :value="_task.remind_task"
              @change="(val) => (_task.remind_task = val)"
              :placeholder="__('Select Reminder')"
              input-class="border-none"
              :maxDate="_task.due_date"
            />
          </div>
        </div>
      </div>
    </template>
  </Dialog>
</template>

<script setup>
import TaskStatusIcon from '@/components/Icons/TaskStatusIcon.vue'
import TaskPriorityIcon from '@/components/Icons/TaskPriorityIcon.vue'
import ArrowUpRightIcon from '@/components/Icons/ArrowUpRightIcon.vue'
import UserAvatar from '@/components/UserAvatar.vue'
import Link from '@/components/Controls/Link.vue'
import { taskStatusOptions, taskPriorityOptions } from '@/utils'
import { usersStore } from '@/stores/users'
import DatetimePicker from '@/components/Controls/DatetimePicker.vue'
import { TextEditor, Dropdown, Tooltip, call,Dialog } from 'frappe-ui'
import { ref, watch, nextTick } from 'vue'
import { useRouter } from 'vue-router'  

const props = defineProps({
  task: {
    type: Object,
    default: {},
  },
  doctype: {
    type: String,
    default: 'CRM Lead',
  },
  doc: {
    type: String,
    default: '',
  },
})

const show = defineModel()
const tasks = defineModel('reloadTasks')

const emit = defineEmits(['updateTask'])

const router = useRouter()
const { getUser } = usersStore()

const title = ref(null)
const editMode = ref(false)
const _task = ref({
  title: '',
  description: '',
  assigned_to: '',
  due_date: '',
  remind_task: '',
  status: 'Backlog',
  priority: 'Low',
  reference_doctype: props.doctype,
  reference_docname: null,
})

function updateTaskStatus(status) {
  _task.value.status = status
}

function updateTaskPriority(priority) {
  _task.value.priority = priority
}

function onAfterLeaveDialogTask(){
}

function redirect() {
  if (!props.task?.reference_docname) return
  let name = props.task.reference_doctype == 'CRM Deal' ? 'Deal' : 'Lead'
  let params = { leadId: props.task.reference_docname }
  if (name == 'Deal') {
    params = { dealId: props.task.reference_docname }
  }
  router.push({ name: name, params: params })
}

async function updateTask() {
  if (!_task.value.assigned_to) {
    _task.value.assigned_to = getUser().email
  }
  if (_task.value.name) {
    let d = await call('frappe.client.set_value', {
      doctype: 'CRM Task',
      name: _task.value.name,
      fieldname: _task.value,
    })
    if (d.name) {
      tasks.value.reload()
    }
  } else {
    let d = await call('frappe.client.insert', {
      doc: {
        doctype: 'CRM Task',
        reference_doctype: props.doctype,
        reference_docname: props.doc || null,
        ..._task.value,
      },
    })
    if (d.name) {
      tasks.value.reload()
    }
  }
  show.value = false
}

watch(
  () => show.value,
  (value) => {
    if (!value) return
    editMode.value = false
    nextTick(() => {
      title.value.el.focus()
      _task.value = { ...props.task }
      if (_task.value.title) {
        editMode.value = true
      }
    })
  }
)

</script>

<style scoped>
:deep(.datepicker svg) {
  width: 0.875rem;
  height: 0.875rem;
}
</style>
