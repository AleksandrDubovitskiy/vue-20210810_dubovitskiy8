<template>
  <div class="toasts">
    <div v-for="message in messages" :class="message.class">
      <ui-icon class="toast__icon" :icon="message.icon" />
      <span>{{ message.message }}</span>
    </div>
  </div>
</template>

<script>
import UiIcon from './UiIcon';

export default {
  name: 'TheToaster',
  components: { UiIcon },
  data() {
    return {
      messages: [],
    };
  },
  methods: {
    success(message) {
      this.addMessage({
        class: 'toast toast_success',
        message: message,
        icon: 'check-circle',
      });
    },
    error(message) {
      this.addMessage({
        class: 'toast toast_error',
        message: message,
        icon: 'alert-circle',
      });
    },
    addMessage(messageObj) {
      this.messages.push(messageObj);
      this.clearMessages();
    },
    clearMessages() {
      setTimeout(() => {
        this.messages.shift();
      }, 5000);
    },
  },
};
</script>

<style scoped>
.toasts {
  position: fixed;
  bottom: 8px;
  right: 8px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  white-space: pre-wrap;
  z-index: 999;
}

@media all and (min-width: 992px) {
  .toasts {
    bottom: 72px;
    right: 112px;
  }
}

.toast {
  display: flex;
  flex: 0 0 auto;
  flex-direction: row;
  align-items: center;
  padding: 16px;
  background: #ffffff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  font-size: 18px;
  line-height: 28px;
  width: auto;
}

.toast + .toast {
  margin-top: 20px;
}

.toast__icon {
  margin-right: 12px;
}

.toast.toast_success {
  color: var(--green);
}

.toast.toast_error {
  color: var(--red);
}
</style>
