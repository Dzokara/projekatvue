<template>
    <div class="form-group">
      <label :class="lclass" :for="id">{{ label }}</label>
      <textarea v-if="isTextarea" v-model="localValue" :name="name" :class="iclass" :id="id" :placeholder="placeholder"></textarea>
      <input v-else v-model="localValue" :type="type" :name="name" :class="iclass" :id="id" :placeholder="placeholder">
    </div>
  </template>
  
  <script>
  export default {
    name: "TextfieldComponent",
    props: {
      type: {
        type: String,
        default: "text"
      },
      name: {
        type: String,
        required: false,
      },
      id: {
        type: String,
        required: true
      },
      label: {
        type: String,
        required: true
      },
      value: {
        type: String,
        required: false
      },
      placeholder: {
        type: String,
        required: false
      },
      lclass: {
        type: String,
        required: false
      },
      iclass: {
        type: String,
        required: false
      }
    },
    data() {
      return {
        localValue: undefined,
        isTextarea: false
      }
    },
    watch: {
      localValue() {
        this.$emit("input", this.localValue)
      }
    },
    mounted() {
      this.localValue = this.value;
      this.isTextarea = this.type === 'textarea';
    }
  }
  </script>
  