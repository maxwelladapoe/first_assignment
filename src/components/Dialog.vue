<script setup>
const props = defineProps({
  title: {
    type: String,
    default: "Are you sure you want to perform this action?",
  },
  message: {
    type: String,
    default: "Click OK to confirm & Cancel to reject",
  },
});
</script>
<template>
  <div class="dialog-bg">
    <div class="dialog-wrap">
      <div>
        <p class="font-bold text-xl">{{ title }}</p>
        <p class="mt-1">{{ message }}</p>
      </div>
      <div class="flex justify-between mt-5">
        <button class="cancel-btn" @click="$emit('cancel')">Cancel</button>
        <button class="ok-btn" @click="$emit('approve')">Ok</button>
      </div>
    </div>
  </div>
</template>