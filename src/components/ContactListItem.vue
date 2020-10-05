<template>
  <li
    class="contact"
    @mouseenter="mouseHover"
    @mouseleave="mouseHover"
  >
    <router-link
      class="contact__link"
      :to="{ name: 'ContactListItemDetails', params: { id: contact.id }}"
    >
      <span class="contact__initials">
        {{ getContactInitials(contact.name) }}
      </span>
      <span>
        {{ contact.name }}
      </span>
    </router-link>
    <button
      v-show="deleteButtonVisibility"
      class="contact__delete-button"
      @click.stop="$emit('delete-contact', contact.id)"
    >
      &#10005;
    </button>
  </li>
</template>

<script>
  export default {
    props: {
      contact: {
        type: Object,
        required: true
      }
    },

    data() {
      return {
        deleteButtonVisibility: false,
      }
    },

    methods: {
      getContactInitials(name) {
        if(name.split(' ').length > 1) {

          return name
            .split(' ')
            .slice(0, 2)
            .map(word => word.slice(0, 1))
            .join('')
            .toUpperCase();
        }

        return name.slice(0, 1).toUpperCase();
      },

      mouseHover() {
        this.deleteButtonVisibility = !this.deleteButtonVisibility;
      }
    }
  }
</script>

<style lang="scss">
  @import "../styles/contactListItem";
</style>
