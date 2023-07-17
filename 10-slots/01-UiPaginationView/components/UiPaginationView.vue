<template>
  <div class="pagination-container">
    <!-- Контент страницы -->
    <slot v-for="item in pagesItems" :item="item" />
  </div>
</template>

<script>
export default {
  name: 'UiPaginationView',

  props: {
    page: {
      type: Number,
      required: true,
      validator: (value) => value > 0,
    },
    perPage: {
      type: Number,
      required: true,
      validator: (value) => value > 0,
    },
    items: {
      type: Array,
      required: true,
    },
  },
  computed: {
    pagesItems() {
      return this.items.slice((this.page - 1) * this.perPage, this.page * this.perPage);
    },
  },
};
</script>

<style></style>
