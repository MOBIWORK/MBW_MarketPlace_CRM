<template>
  <LayoutHeader>
    <template #left-header>
      <Breadcrumbs :items="breadcrumbs" />
    </template>
    <template #right-header>
      <Button variant="solid" :label="__('Create')" @click="createNote">
        <template #prefix><FeatherIcon name="plus" class="h-4" /></template>
      </Button>
    </template>
  </LayoutHeader>
  <ViewControls
    v-model="notes"
    v-model:loadMore="loadMore"
    v-model:updatedPageCount="updatedPageCount"
    doctype="FCRM Note"
    :showElement=true
    :placeholderText="__('Search content')"
    :options="{
      hideColumnsButton: true,
      defaultViewName: __('Notes View'),
    }"
  />
  <div class="flex-1 overflow-y-auto">
    <div
      v-if="notes.data?.data?.length"
      class="grid grid-cols-4 gap-4 px-5 pb-3"
    >
      <div
        v-for="note in notes.data.data"
        class="group flex h-56 cursor-pointer flex-col justify-between gap-2 rounded-lg border px-5 py-4 shadow-sm hover:bg-gray-50"
        @click="editNote(note)"
      >
        <div class="flex items-center justify-between">
          <div class="truncate text-lg font-medium">
            {{ note.title }}
          </div>
          <Dropdown
            :options="[
              {
                label: __('Delete'),
                icon: 'trash-2',
                onClick: () => deleteNote(note.name),
              },
            ]"
            @click.stop
          >
            <Button
              icon="more-horizontal"
              variant="ghosted"
              class="hover:bg-white"
            />
          </Dropdown>
        </div>
        <TextEditor
          v-if="note.content"
          :content="note.content"
          :editable="false"
          editor-class="!prose-sm max-w-none !text-sm text-gray-600 focus:outline-none"
          class="flex-1 overflow-hidden"
        />
        <div class="mt-2 flex items-center justify-between gap-2">
          <div class="flex items-center gap-2">
            <UserAvatar :user="note.owner" size="xs" />
            <div class="text-sm text-gray-800">
              {{ getUser(note.owner).full_name }}
            </div>
          </div>
          <Tooltip :text="dateFormat(note.modified, dateTooltipFormat)">
            <div class="text-sm text-gray-700">
              {{ __(timeAgo(note.modified)) }}
            </div>
          </Tooltip>
        </div>
      </div>
    </div>
  </div>
  <ListFooter
    v-if="notes.data?.data?.length"
    class="border-t px-5 py-2"
    v-model="notes.data.page_length_count"
    :options="{
      rowCount: notes.data.row_count,
      totalCount: notes.data.total_count,
    }"
    @loadMore="() => loadMore++"
  />
  <div v-else class="flex h-full items-center justify-center">
    <div
      class="flex flex-col items-center gap-3 text-xl font-medium text-gray-500"
    >
      <NoteIcon class="h-10 w-10" />
      <span>{{ __('No {0} Found', [__('notes')]) }}</span>
      <Button :label="__('Create')" @click="createNote">
        <template #prefix><FeatherIcon name="plus" class="h-4" /></template>
      </Button>
    </div>
  </div>
  <NoteModal
    v-model="showNoteModal"
    v-model:reloadNotes="notes"
    :note="currentNote"
  />
</template>

<script setup>
import LayoutHeader from '@/components/LayoutHeader.vue'
import UserAvatar from '@/components/UserAvatar.vue'
import NoteIcon from '@/components/Icons/NoteIcon.vue'
import NoteModal from '@/components/Modals/NoteModal.vue'
import ViewControls from '@/components/ViewControls.vue'
import { usersStore } from '@/stores/users'
import { timeAgo, dateFormat, dateTooltipFormat } from '@/utils'
import {
  TextEditor,
  call,
  Dropdown,
  Tooltip,
  Breadcrumbs
} from 'frappe-ui'
import ListFooter from '@/components/frappe-ui/ListFooter.vue'
import { ref, watch } from 'vue'

const { getUser } = usersStore()

const breadcrumbs = [{ label: __('Notes'), route: { name: 'Notes' } }]

const showNoteModal = ref(false)
const currentNote = ref(null)

const notes = ref({})
const loadMore = ref(1)
const updatedPageCount = ref(20)

watch(
  () => notes.value?.data?.page_length_count,
  (val, old_value) => {
    if (!val || val === old_value) return
    updatedPageCount.value = val
  }
)

function createNote() {
  currentNote.value = {
    title: '',
    content: '',
  }
  showNoteModal.value = true
}

function editNote(note) {
  currentNote.value = note
  showNoteModal.value = true
}

async function deleteNote(name) {
  await call('frappe.client.delete', {
    doctype: 'FCRM Note',
    name,
  })
  notes.value.reload()
}
</script>
