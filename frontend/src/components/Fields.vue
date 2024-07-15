<template>
  <div class="flex flex-col gap-4">
    <div v-for="section in sections" :key="section.section" class="first:border-t-0 first:pt-0"
      :class="section.hideBorder ? '' : 'border-t pt-4'">
      <div class="grid gap-4" :class="section.columns ? 'grid-cols-' + section.columns : 'grid-cols-3'
        ">
        <div v-for="field in section.fields" :key="field.name">

          <div class="mb-2 text-sm text-gray-600" style="display: flex; justify-content: space-between;">
            {{ __(field.label) }}
            <span class="text-red-500" v-if="field.mandatory">*</span>
            <div v-if="invalid[field.name]">
              <Tooltip :text="invalid[field.name]" :placement="'top'">
                <FeatherIcon name="alert-triangle" class="h-4 w-4 text-red-500" />
              </Tooltip>
            </div>
          </div>
          <FormControl v-if="field.type === 'select'" type="select" class="form-control truncate"
            :class="field.prefix ? 'prefix' : ''" :options="field.options" v-model="data[field.name]"
            :placeholder="__(field.placeholder)">
            <template v-if="field.prefix" #prefix>
              <IndicatorIcon :class="field.prefix" />
            </template>
          </FormControl>
          <Link v-else-if="field.type === 'link'" class="form-control truncate" :value="data[field.name]"
            :doctype="field.doctype" @change="(v) => (data[field.name] = v)" :placeholder="__(field.placeholder)"
            :onCreate="field.create" />
          <Link v-else-if="field.type === 'user'" class="form-control truncate" :value="getUser(data[field.name]).full_name"
            :doctype="field.doctype" @change="(v) => (data[field.name] = v)" :placeholder="__(field.placeholder)"
            :hideMe="true">
          <template #prefix>
            <UserAvatar class="mr-2" :user="data[field.name]" size="sm" />
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
          <div v-else-if="field.type === 'dropdown'">
            <NestedPopover>
              <template #target="{ open }">
                <Button :label="data[field.name]"
                  class="truncate dropdown-button flex w-full items-center justify-between rounded border border-gray-100 bg-gray-100 px-2 py-1.5 text-base text-gray-800 placeholder-gray-500 transition-colors hover:border-gray-200 hover:bg-gray-200 focus:border-gray-500 focus:bg-white focus:shadow-sm focus:outline-none focus:ring-0 focus-visible:ring-2 focus-visible:ring-gray-400">
                  <div class="truncate">{{ data[field.name] }}</div>
                  <template #suffix>
                    <FeatherIcon :name="open ? 'chevron-up' : 'chevron-down'" class="h-4 text-gray-600" />
                  </template>
                </Button>
              </template>
              <template #body>
                <div class="my-2 space-y-1.5 divide-y rounded-lg border border-gray-100 bg-white p-1.5 shadow-xl">
                  <div>
                    <DropdownItem v-if="field.options?.length" v-for="option in field.options" :key="option.name"
                      :option="option" />
                    <div v-else>
                      <div class="p-1.5 px-7 text-base text-gray-500">
                        {{ __('No {0} Available', [field.label]) }}
                      </div>
                    </div>
                  </div>
                  <div class="pt-1.5">
                    <Button variant="ghost" class="w-full !justify-start" :label="__('Create New')"
                      @click="field.create()">
                      <template #prefix>
                        <FeatherIcon name="plus" class="h-4" />
                      </template>
                    </Button>
                  </div>
                </div>
              </template>
            </NestedPopover>
          </div>
          <div v-else-if="field.type === 'dropdownNote'">
            <div class="w-[100px]">
              <Button :label="__('Note')"
                class="dropdown-button flex w-full items-center justify-between rounded border border-gray-100 bg-gray-100 px-2 py-1.5 text-base text-gray-800 placeholder-gray-500 transition-colors hover:border-gray-200 hover:bg-gray-200 focus:border-gray-500 focus:bg-white focus:shadow-sm focus:outline-none focus:ring-0 focus-visible:ring-2 focus-visible:ring-gray-400"
                @click="onClickNote()">
                <template #suffix>
                  <FeatherIcon :name="openNote ? 'chevron-up' : 'chevron-down'" class="h-4 text-gray-600" />
                </template>
              </Button>
            </div>
            <div v-if="openNote">
              <div class="py-1">
                <FormControl :type="'textarea'" :placeholder="__('Write Content...')" v-model="data[field.name]" />
              </div>
            </div>
          </div>
          <FormControl v-else type="text" :placeholder="__(field.placeholder)" v-model="data[field.name]" class="truncate"
            @focus="handleFocus(data[field.name], field.name)" @blur="handleBlur(data[field.name], field.name)" />
          <div v-if="showAutoRepairEmail[field.name]">
            <div style="display: flex;justify-content:space-between;" class="mt-2">
              <div class="whitespace-pre-line text-sm text-red-600">{{__('Correct format')}}: "{{emailCorrect}}"</div>
              <div style="cursor: pointer;" @click="onAutoRepairEmail(field.name)">
                <FeatherIcon name="check" class="h-4 w-4 text-red-500" style="font-size: 12px;" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { TextEditor } from 'frappe-ui'
import NestedPopover from '@/components/NestedPopover.vue'
import DropdownItem from '@/components/DropdownItem.vue'
import IndicatorIcon from '@/components/Icons/IndicatorIcon.vue'
import UserAvatar from '@/components/UserAvatar.vue'
import Link from '@/components/Controls/Link.vue'
import { usersStore } from '@/stores/users'
import { Tooltip, FeatherIcon } from 'frappe-ui'
import { reactive, ref } from 'vue';
import { createToast } from '@/utils'
const { getUser } = usersStore();

const props = defineProps({
  sections: Array,
  data: Object,
});

const error = reactive({}); // object to store validation errors

const invalid = reactive({});
const openNote = ref(false);
const showAutoRepairEmail = reactive({});
const emailCorrect = ref("");

const handleFocus = (value, fieldName) => {
  // Clear error message when the field is focused

};

const onClickNote = () => {
  openNote.value = !openNote.value;
}

const onAutoRepairEmail = (field) => {
  props.data[field] = emailCorrect.value;
  showAutoRepairEmail[field] = false;
  emailCorrect.value = "";
}

const handleBlur = (value, fieldName) => {
  // Perform validation based on your requirements
  // For example, check if the value is empty
  const emailRegex = /^[\w-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-zA-Z]{2,}$/;
  const phoneRegex = /^(\+84|0)\d{9}$/;
  if (value != null && value != "") {
    if (fieldName == 'email' || fieldName == 'email_id') {
      if (!emailRegex.test(value)) {
        invalid[fieldName] = __('Invalid Email');
      } else {
        delete invalid[fieldName];
      }
      if (isCorrectEmailRegular(value)) {
        showAutoRepairEmail[fieldName] = false;
        emailCorrect.value = "";
      } else {
        showAutoRepairEmail[fieldName] = true;
        emailCorrect.value = correctEmail(value);
      }
    }
    if (fieldName == 'mobile_no' || fieldName == 'actual_mobile_no') {
      const cleanedValue = value.replace(/\s+/g, '').replace(/^(\+?84|0|84)/, '0');
      props.data[fieldName] = cleanedValue
      if (!phoneRegex.test(cleanedValue)) {
        invalid[fieldName] = __('Invalid phone number');
      } else {
        delete invalid[fieldName];
      }
    }
  } else {
    if (fieldName == 'email' || fieldName == 'email_id') {
      delete invalid[fieldName];
      showAutoRepairEmail[fieldName] = false;
      emailCorrect.value = "";
    }
    if (fieldName == 'mobile_no' || fieldName == 'actual_mobile_no') delete invalid[fieldName];
  }
};

const levenshtein = (a, b) => {
  const matrix = [];
  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          Math.min(matrix[i][j - 1] + 1, matrix[i - 1][j] + 1)
        );
      }
    }
  }
  return matrix[b.length][a.length];
}

const isCorrectEmailRegular = (email) => {
  const commonDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com'];
  const emailParts = email.split('@');
  if (emailParts.length !== 2) {
    return true;
  }
  const domain = emailParts[1];
  if (commonDomains.indexOf(domain) >= 0) return true;
  else{
    const commonDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com'];
    const emailParts = email.split('@');
    if (emailParts.length !== 2) {
      createToast({
        title: __('Error'),
        text: __("Lỗi định dạng email"),
        icon: 'x',
        iconClasses: 'text-red-600',
      })
      return email;
    }

    const domain = emailParts[1];
    let bestMatch = domain;
    let minDistance = Infinity;
    let indexMatch = -1;

    for (let i = 0; i < commonDomains.length; i++) {
      const distance = levenshtein(domain, commonDomains[i]);
      if (distance < minDistance) {
        minDistance = distance;
        indexMatch = i;
        bestMatch = commonDomains[i];
      }
    }
    if(indexMatch == -1) return true;
    else return false;
  }
}

const correctEmail = (email) => {
  const commonDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com'];
  const emailParts = email.split('@');
  if (emailParts.length !== 2) {
    createToast({
      title: __('Error'),
      text: __("Lỗi định dạng email"),
      icon: 'x',
      iconClasses: 'text-red-600',
    })
    return email;
  }

  const domain = emailParts[1];
  let bestMatch = domain;
  let minDistance = Infinity;
  let indexMatch = -1;

  for (let i = 0; i < commonDomains.length; i++) {
    const distance = levenshtein(domain, commonDomains[i]);
    if (distance < minDistance) {
      minDistance = distance;
      indexMatch = i;
      bestMatch = commonDomains[i];
    }
  }
  if (indexMatch != -1) { // Nếu khoảng cách Levenshtein <= 2, coi như lỗi chính tả phổ biến
    return `${emailParts[0]}@${bestMatch}`;
  }
  return email;
}

</script>

<style scoped>
:deep(.form-control.prefix select) {
  padding-left: 2rem;
}

.error-message {
  color: red;
  font-size: 0.8rem;
}
</style>
