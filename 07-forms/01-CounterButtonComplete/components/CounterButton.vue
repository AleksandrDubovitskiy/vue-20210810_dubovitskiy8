<template>
  <button @click="localCount++">{{ localCount }}</button>
</template>

<script>
export default {
  name: 'CounterButton',
  props: {
    count: {
      type: Number,
      default: 0,
    },
  },
  emits: ['update:count'],
  data() {
    return {
      localCount: this.count,
    };
  },

  watch: {
    count: {
      handler() {
        if (this.localCount != this.count) {
          this.localCount = this.count;
        }
      },
    },
    localCount: {
      handler(newValue) {
        this.$emit('update:count', newValue);
      },
    },
  },
};
</script>
