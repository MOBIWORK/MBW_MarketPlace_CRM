<template>
  <Dialog
    v-model="show"
    :options="{
      title: __('Assign To'),
      size: 'xl',
      actions: [
        {
          label: __('Cancel'),
          variant: 'subtle',
          onClick: () => {
            assignees = oldAssignees
            show = false
          },
        },
        {
          label: __('Update'),
          variant: 'solid',
          onClick: () => updateAssignees(),
          loading: loadingBtn
        },
      ],
    }"
  >
    <template #body-content>
      <Link
        class="form-control"
        value=""
        doctype="User"
        @change="(option) => addValue(option) && ($refs.input.value = '')"
        :hideMe="true"
      >
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
      <div class="mt-3 flex flex-wrap items-center gap-2">
        <Tooltip
          :text="assignee.name"
          v-for="assignee in assignees"
          :key="assignee.name"
        >
          <Button
            :label="getUser(assignee.name).full_name"
            theme="gray"
            variant="outline"
          >
            <template #prefix>
              <UserAvatar :user="assignee.name" size="sm" />
            </template>
            <template #suffix>
              <FeatherIcon
                v-if="assignee.name !== owner"
                class="h-3.5"
                name="x"
                @click.stop="removeValue(assignee.name)"
              />
            </template>
          </Button>
        </Tooltip>
      </div>
      <ErrorMessage class="mt-2" v-if="error" :message="__(error)" />
    </template>
  </Dialog>
</template>

<script setup>
import UserAvatar from '@/components/UserAvatar.vue'
import Link from '@/components/Controls/Link.vue'
import { usersStore } from '@/stores/users'
import { Tooltip, call } from 'frappe-ui'
import { ref, computed } from 'vue'
import { watchOnce } from '@vueuse/core'

const props = defineProps({
  doc: {
    type: Object,
    default: null,
  },
})

const emit = defineEmits(['update'])

const show = defineModel()
const assignees = defineModel('assignees')
const oldAssignees = ref([])
const loadingBtn = ref(false)

const error = ref('')

const { getUser } = usersStore()

const removeValue = (value) => {
  assignees.value = assignees.value.filter(
    (assignee) => assignee.name !== value
  )
}

const owner = computed(() => {
  if (!props.doc) return ''
  if (props.doc.doctype == 'CRM Lead') return props.doc.lead_owner
  return props.doc.deal_owner
})

const addValue = (value) => {
  error.value = ''
  let obj = {
    name: value,
    image: getUser(value).user_image,
    label: getUser(value).full_name,
  }
  if (!assignees.value.find((assignee) => assignee.name === value)) {
    assignees.value.push(obj);
  }
}

async function updateAssignees() {
  if (assignees.value.length === 0) {
    error.value = __('Please select at least one assignee')
    return
  }
  const removedAssignees = oldAssignees.value
    .filter(
      (assignee) => !assignees.value.find((a) => a.name === assignee.name)
    )
    .map((assignee) => assignee.name)

  const addedAssignees = assignees.value
    .filter(
      (assignee) => !oldAssignees.value.find((a) => a.name === assignee.name)
    )
    .map((assignee) => assignee.name);
  loadingBtn.value = true;
  if (removedAssignees.length) {
    for (let a of removedAssignees) {
      await call('crm.api.activities_sys.remove_assign', {
        doctype: props.doc.doctype,
        name: props.doc.name,
        assign_to: a,
      })
    }
  }

  if (addedAssignees.length) {
    await call('crm.api.activities_sys.add_assign', {
      doctype: props.doc.doctype,
      name: props.doc.name,
      assign_to: addedAssignees,
    })
  }
  setTimeout(()=>{
    loadingBtn.value = false;
    oldAssignees.value = assignees.value;
    emit('update');
    show.value = false
  }, 500)
}

watchOnce(assignees, (value) => {
  oldAssignees.value = [...value]
})

</script>
