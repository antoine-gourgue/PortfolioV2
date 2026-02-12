<template>
  <div />
</template>

<script setup lang="ts">
const localePath = useLocalePath()
await navigateTo(localePath('/articles'), { redirectCode: 301 })
</script>
