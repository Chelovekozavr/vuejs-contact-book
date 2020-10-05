<template>
  <div class="add-contact">

    <form
      action=""
      method="GET"
      v-bind:class="{'add-contact__form--active': inputVisibility,' add-contact__form': true}"
      @submit.prevent="onSubmit"
    >
      <button
        type="submit"
        id="submit"
        class="add-contact__button"
        @click="changeInputVisibilty"
      >
        {{ buttonSymbol }}
      </button>
      <label for="submit">
        <span v-show="!inputVisibility">
          Add contact
        </span>
      </label>

      <input
        v-focus
        v-if="inputVisibility"
        class="add-contact__input"
        type="text"
        v-model="newContactName"
        maxlength="15"
      >
      <button
        type="reset"
        v-show="inputVisibility"
        class="add-contact__button"
        @click="cancelAddContact"
      >
        &#10005;
      </button>
    </form>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        newContactName: '',
        inputVisibility: false
      }
    },

    directives: {
      focus: {
        inserted: function (element) {
          element.focus();
        }
      }
    },

    computed: {
      buttonSymbol: function() {
        if (!this.inputVisibility) {
          return '+';
        } else {
          return String.fromCharCode(10003);
        }
      }
    },

    methods: {
      onSubmit() {
        const newName = this.newContactName.trim();
        if(newName) {
          const newContact = {
            id: Date.now(),
            name: newName
          };

          this.$emit('add-contact', newContact);
          this.newContactName = '';
        } else {
          this.newContactName = '';

          return;
        }
      },

      changeInputVisibilty() {
        this.inputVisibility = !this.inputVisibility;
      },

      cancelAddContact() {
        this.newContactName = '';
        this.changeInputVisibilty();
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../styles/contactListAddContact";
</style>
