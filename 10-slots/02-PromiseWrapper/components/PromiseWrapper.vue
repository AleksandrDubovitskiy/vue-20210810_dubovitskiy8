<template>
  <slot :name="status" :result="result" :error="error" />
</template>

<script>
export default {
  name: 'PromiseWrapper',

  props: {
    promise: {
      type: Promise,
      required: true,
    },
  },
  data() {
    return {
      status: 'pending',
      result: null,
      error: null,
    };
  },
  watch: {
    promise: {
      immediate: true,
      handler(promise) {
        this.status = 'pending';
        promise
          .then((result) => {
            this.status = 'fulfilled';
            this.result = result;
          })
          .catch((error) => {
            this.status = 'rejected';
            this.error = error;
          });
      },
    },
  },
};
</script>
