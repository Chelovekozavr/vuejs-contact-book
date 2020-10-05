<template>
  <div class="content_container">
    <ContactListAddContact
      @add-contact="addNewContact"
    />
    <ul
      class="contacts_list"
      v-if="contacts.length"
    >
      <ContactListItem
        v-for="contact of contacts"
        :key="contact.id"
        :contact="contact"
        @delete-contact="setDeleteConfirmatioVisibility"
      />
    </ul>

    <DeleteConfirmation
      v-if="deleteConfirmatioVisibility"
      @delete-cancel="setDeleteConfirmatioVisibility"
      @delete-ok="deleteContact"
      :name="contact.name"
    />
  </div>
</template>

<script>
  import { mapMutations } from 'vuex';

  import ContactListItem from './ContactListItem';
  import ContactListAddContact from './ContactListAddContact';
  import DeleteConfirmation from './DeleteConfirmation';

  export default {
    data() {
      return {
        deleteConfirmatioVisibility: false,
      }
    },

    computed: {
      contacts() {
        return this.$store.getters.getSortedContacts;
      }
    },

    components: {
      ContactListItem,
      ContactListAddContact,
      DeleteConfirmation,
    },

    methods: {
      ...mapMutations([
        'ADD_CONTACT_TO_STATE',
        'DELETE_CONTACT_FROM_STATE'
      ]),

      addNewContact(newContact) {
        this.ADD_CONTACT_TO_STATE(newContact);
      },

      setDeleteConfirmatioVisibility(id) {
        this.deleteConfirmatioVisibility = !this.deleteConfirmatioVisibility;
        this.contact = this.contacts.find(contact => contact.id === id);
      },

      deleteContact() {
        this.deleteConfirmatioVisibility = !this.deleteConfirmatioVisibility;
        this.DELETE_CONTACT_FROM_STATE(this.contact.id);
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../styles/contactList";
</style>
