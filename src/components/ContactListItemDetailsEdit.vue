<template>
  <div class="edit-contact">
    <header class="edit-contact__header">
      <h3>Edit contact info</h3>
        <button
          class="edit-contact__button"
          @click="$emit('cancel-edit', newContact)"
        >
          &#10005;
        </button>
    </header>

    <form
      @submit.prevent="$emit('submit-editting', newContact);"
      v-for="(key, title) in contact"
      v-show="title !== 'id' && title !== 'name'"
      :key="title"
      class="edit-contact__list"
      id="submitKeys"
    >
      <input
        class="edit-contact__input"
        type="text"
        maxlength="15"
        :value="title"
        :name="title"
        @input="e => title = e.target.value"
        @change="e => editTitle(key, title, e.target.name)"
      >
      <input
        class="edit-contact__input"
        type="text"
        maxlength="25"
        :value="key"
        @input="e => key = e.target.value"
        @change="editValue(key, title)"
      >
    </form>

    <button
      class="edit-contact__submit-button"
      form="submitKeys"
    >
      Submit
    </button>

  </div>
</template>

<script>
  import { mapMutations } from 'vuex';

  export default {
    props: {
      contact: Object,
    },

    data() {
      return {
        titleToDel: '',
        newContact: {...this.contact},
      }
    },

    methods: {
      ...mapMutations([
        'ADD_CONTACT_TO_STATE',
        'DELETE_CONTACT_FROM_STATE'
      ]),

      editValue(key, title) {
        this.newContact[title] = key;
      },

      editTitle(key, title, name) {
        this.newContact[title] = key;
        delete this.newContact[name];
      },

      setTitle(title) {
        if(!title) {

          return;
        }

        this.titleToDel = title.trim();
        delete this.contact[title];
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../styles/contactListItemDetailsEdit";
</style>
