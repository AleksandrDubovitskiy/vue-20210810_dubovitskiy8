<template>
  <a v-if="$attrs.tag === 'a'" :tag="$attrs.tag" :href="$attrs.href">
    <slot />
  </a>
  <div v-else>
    <router-link v-bind="$attrs"><slot /></router-link>
  </div>
</template>
<script>
export default {
  name: 'UiLink',
};
</script>

<style scoped>
.link {
  color: var(--blue);
  text-decoration: none;
}

.link:hover {
  text-decoration: underline;
}
</style>
