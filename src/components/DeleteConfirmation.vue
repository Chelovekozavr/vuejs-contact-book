<template>
  <div class="delete-confirmation delete_backdrop">
    <p
      v-if="cancel"
      class="delete-confirmation__text"
    >
      Are you sure you want to cancel?
    </p>
    <p
      v-else
      class="delete-confirmation__text"
    >
      Are you sure you want to delete {{ !item ? name : `${name} ${item}` }}?
    </p>
    <div class="delete-confirmation__buttons-container">
      <button
        v-if="cancel"
        class="delete-confirmation__button
          delete-confirmation__button--ok"
        @click="$emit('cancel-edit')"
      >
        &#10003;
      </button>
      <button
        v-else
        class="delete-confirmation__button
          delete-confirmation__button--ok"
        @click="$emit('delete-ok')"
      >
        &#10003;
      </button>
      <button
        class="delete-confirmation__button
          delete-confirmation__button--cancel"
        @click="$emit('delete-cancel')"
      >
        &#10005;
      </button>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      name: String,
      item: String,
      cancel: Boolean
    },
  }
</script>

<style lang="scss" scoped>
  @import "../styles/deleteConfirmation";
</style>
