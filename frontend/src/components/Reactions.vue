<template>
  <div class="flex select-none items-stretch space-x-1.5">
    <Popover class="h-full">
      <template #target="{ togglePopover, isOpen }">
        <button
          aria-label="Add a reaction"
          @click="togglePopover()"
          class="flex h-full items-center justify-center rounded-full px-2 py-1 transition bg-gray-100 text-gray-700 hover:bg-gray-200"
          :class="{ 'bg-gray-200': isOpen }"
        >
          <ReactionFaceIcon />
        </button>
      </template>
      <template #body-main="{ togglePopover }">
        <div class="mt-1 inline-flex p-1">
          <div class="grid grid-cols-5 items-center space-x-0.5">
            <button
              class="h-6 w-6 rounded hover:bg-gray-50"
              v-for="emoji in standardEmojis"
              :key="emoji"
              @click="
                () => {
                  toggleReaction(emoji)
                  togglePopover()
                }
              "
            >
              {{ emoji }}
            </button>
          </div>
        </div>
      </template>
    </Popover>
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="scale-75"
      enter-to-class="scale-100"
      leave-active-class="transition duration-100 ease-in absolute"
      leave-from-class="scale-100 opacity-100"
      leave-to-class="scale-90 opacity-0"
    >
      <div
        v-if="reactions.length"
        tag="div"
        class="flex items-stretch space-x-1.5"
        move-class="transition duration-100 ease-in"
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="scale-75"
        enter-to-class="scale-100"
        leave-active-class="transition duration-100 ease-in"
        leave-from-class="scale-100 opacity-100"
        leave-to-class="scale-90 opacity-0"
      >
        <Tooltip v-for="(reactions, emoji) in reactionsCount" :key="emoji">
          <button
            class="flex items-center justify-center rounded-full px-2 py-1 text-sm transition"
            :class="[
              reactions.userReacted
                ? 'bg-amber-100 hover:bg-amber-200 text-amber-700'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700',
            ]"
            @click="toggleReaction(emoji)"
          >
            {{ emoji }} {{ reactions.count }}
          </button>
          <template #body>
            <div
              class="max-w-[30ch] rounded-lg border border-gray-100 bg-gray-800 px-2 py-1 text-center text-xs text-white shadow-xl"
            >
              {{ toolTipText(reactions) }}
            </div>
          </template>
        </Tooltip>
      </div>
    </Transition>
  </div>
  <!-- <div class="mt-2 space-y-2" v-if="batchRequestErrors.length">
    <ErrorMessage v-for="error in batchRequestErrors" :message="error" />
  </div> -->
</template>

<script>
import { Popover, Tooltip, ErrorMessage ,call} from 'frappe-ui';
import ReactionFaceIcon from './ReactionFaceIcon.vue';
import { sessionStore } from '@/stores/session';
import { usersStore } from '@/stores/users';
const { user } = sessionStore();
const { getUser } = usersStore();

export default {
  name: 'Reactions',
  props: ['reactions', 'doctype', 'name', 'readOnlyMode','id_comment'],
  emits: ['update:reactions'],
  components: {
    ReactionFaceIcon,
    Popover,
    Tooltip,
    ErrorMessage
  },
  methods: {

    toggleReaction(emoji) {
      if (this.readOnlyMode) return;
      let existingReaction = this.reactions.find(
        (r) => r.user === user && r.emoji === emoji
      );
      if (existingReaction) {
        this.removeReaction(existingReaction);
      } else {
        this.addReaction(emoji);
      }
    },
    async addReaction(emoji) {
      const username = user;
      // Tạo đối tượng mới và biến nó thành proxy
      let d =  await call('frappe.client.insert', {
      doc: {
        doctype: this.doctype,
        user: username,
        emoji: emoji,
        id_comment : this.id_comment
      },
    })
      const newReaction = this.createProxyReaction({
        emoji: emoji,
        user: username,
        name: d.name
      });

      // Tạo mảng mới với đối tượng proxy
      let reactions = [
        ...this.reactions,
        newReaction
      ];

      this.$emit('update:reactions', reactions);
     
    },
   async removeReaction(reaction) {
    let reactions = this.reactions.filter((r) => r !== reaction);
    this.$emit('update:reactions', reactions);
    let d =  await call('frappe.client.delete', {
        doctype: this.doctype,
        name: reaction.name,
    })
    },
    toolTipText(reactions) {
      return reactions.users
        .map((user) => {
          if (user) {
            return getUser(user).full_name.trim();
          }
          return '';
        })
        .join(', ');
    },
    createProxyReaction(reaction) {
      return new Proxy(reaction, {
        get(target, prop) {
          if (typeof prop === 'symbol') {
            return Reflect.get(target, prop);
          }
          return target[prop];
        },
        set(target, prop, value) {
          if (typeof prop === 'symbol') {
            return Reflect.set(target, prop, value);
          }
          target[prop] = value;
          return true;
        }
      });
    }
  },
  computed: {
    reactionsCount() {
      let out = {};
      for (let reaction of this.reactions) {
        if (!out[reaction.emoji]) {
          out[reaction.emoji] = { count: 0, users: [], userReacted: false };
        }
        out[reaction.emoji].count++;
        out[reaction.emoji].users.push(reaction.user);
        if (reaction.user === user) {
          out[reaction.emoji].userReacted = true;
        }
      }
      return out;
    },
    standardEmojis() {
      return [
        '👍',
        '🤩',
        '💖',
        '🚀',
        '👏🏻'
      ];
    }
  }
};
</script>
