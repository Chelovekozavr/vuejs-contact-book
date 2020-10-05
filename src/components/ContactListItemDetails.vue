<template>
  <div class="contact-details contact-details__backdrop">
    <header class="contact-details__header">
      <h3 class="contact-details__header_title">{{ contact.name }}</h3>
      <router-link
        to="/"
        tag="button"
        class="contact-details__header_button"
      >
        &#10005;
      </router-link>
    </header>

    <section class="contact-details__content">
      <span
        v-if="Object.keys(this.contact).length < 3"
        class="contact-details__no-info"
      >
        No info
      </span>

      <ul
        v-else
        class="contact-details__list"
      >
        <li
          v-for="(value, title) in contact"
          v-show="title !== 'id' && title !== 'name'"
          :key="title"
          class="contact-details__item"
        >
          <span class="contact-details__item-title">
            {{ title[0].toUpperCase() + title.slice(1) + ':' }}
          </span>
          <span>
            {{ value }}
          </span>
          <button
            class="contact-details__button"
            @click="setDeleteConfirmatioVisibility(); setKeyToDelete(title)"
          >
            &#10005;
          </button>
        </li>
      </ul>
    </section>

    <form
      class="contact-details__edit"
      action=""
      method="GET"
      @submit.prevent="addNewKey"
      v-show="addFormVisibility"
    >
      <input
        v-focus
        type="text"
        class="contact-details__input"
        placeholder="Key"
        v-model="keyToAdd.title"
        maxlength="10"
        required
      >
      <input
        type="text"
        class="contact-details__input"
        placeholder="Value"
        v-model="keyToAdd.value"
        maxlength="18"
        required
      >
      <button
        class="contact-details__button"
      >
        &#10003;
      </button>
    </form>

    <footer class="contact-details__footer">
      <button
        class="contact-details__footer-button"
        @click="setAddFormVisibility"
      >
        {{ !addFormVisibility ? 'Add' : 'Cancel' }}
      </button>
      <button
        class="contact-details__footer-button"
        @click="setEditFormVisibility"
      >
        Edit
      </button>
      <button
        class="contact-details__footer-button"
        @click="undoChanges"
      >
        Undo changes
      </button>
    </footer>

    <ContactListItemDetailsEdit
      v-if="editFormVisibility && (Object.keys(this.contact).length > 2)"
      :contact="contact"
      @cancel-edit="cancelEdit"
      @submit-editting="handleSumbit"
    />

    <DeleteConfirmation
      v-if="deleteConfirmatioVisibility"
      @delete-cancel="setDeleteConfirmatioVisibility"
      @delete-ok="deleteContactKey"
      @cancel-edit="editCanceled"
      :name="contact.name"
      :item="keyToDelete"
      :cancel="editCancel"
    />

  </div>
</template>

<script>
  import Vue from 'vue';
  import { mapMutations } from 'vuex';

  import DeleteConfirmation from './DeleteConfirmation';
  import ContactListItemDetailsEdit from './ContactListItemDetailsEdit';

  export default {
    name: 'ContactListItemDetails',
    props: {
      id: {
        type: Number,
        required: true
      }
    },

    directives: {
      focus: {
        inserted: function(element) {
          element.focus();
        }
      }
    },

    components: {
      DeleteConfirmation,
      ContactListItemDetailsEdit
    },

    computed: {
      contact() {
        return this.$store.getters.getContactById(this.id);
      }
    },

    data() {
      return {
        deleteConfirmatioVisibility: false,
        keyToDelete: '',
        addFormVisibility: false,
        editFormVisibility: false,
        keyToAdd: {
          title: '',
          value: '',
        },
        editCancel: false,
        prevContact: {}
      }
    },

    methods: {
      ...mapMutations([
        'ADD_CONTACT_TO_STATE',
        'DELETE_CONTACT_FROM_STATE'
      ]),

      setDeleteConfirmatioVisibility() {
        this.deleteConfirmatioVisibility = !this.deleteConfirmatioVisibility;
      },

      setKeyToDelete(title) {
        this.keyToDelete = title;
      },

      deleteContactKey() {
        this.prevContact = {...this.contact};
        this.deleteConfirmatioVisibility = !this.deleteConfirmatioVisibility;
        Vue.delete(this.contact, this.keyToDelete);
      },

      setAddFormVisibility() {
        this.addFormVisibility = !this.addFormVisibility;
      },

      addNewKey() {
        let newKey = this.keyToAdd.title.trim();
        let newValue = this.keyToAdd.title.trim();

        if (!newKey || !newValue || Object.keys(this.contact).length > 8) {
          this.setAddFormVisibility();

          return;
        }

        for (let key in this.contact) {
          if (key.toLowerCase() === newKey.toLowerCase()) {
            this.setAddFormVisibility();
            this.keyToAdd = {
              title: '',
              value: '',
            };

            return;
          }
        }

        this.prevContact = {...this.contact};

        Vue.set(this.contact,
          this.keyToAdd.title.trim(),
          this.keyToAdd.value.trim()
        );

        this.addFormVisibility = !this.addFormVisibility;
        this.keyToAdd = {
          title: '',
          value: '',
        };
      },

      setEditFormVisibility() {
        this.editFormVisibility = !this.editFormVisibility;
      },

      cancelEdit(newContact) {
        if (JSON.stringify(newContact) === JSON.stringify(this.contact)) {

          return this.setEditFormVisibility();
        }
        
        this.deleteConfirmatioVisibility = !this.deleteConfirmatioVisibility;
        this.editCancel = true;
      },

      editCanceled() {
        this.deleteConfirmatioVisibility = !this.deleteConfirmatioVisibility;
        this.editCancel = !this.editCancel;
        this.setEditFormVisibility();
      },

      submitEditing(newContact) {
        this.prevContact = this.contact;
        this.DELETE_CONTACT_FROM_STATE(newContact.id);
        this.ADD_CONTACT_TO_STATE(newContact);
      },

      handleSumbit(newContact) {
        this.setEditFormVisibility();
        this.submitEditing(newContact);
      },

      undoChanges() {
        if (Object.keys(this.prevContact).length === 0) {

          return;
        }

        this.submitEditing(this.prevContact);
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../styles/contactListItemDetails";
</style>
