<template>
    <div class="form-group">
      <label>{{ label }}</label>
      <div v-for="(option, index) in options" :key="index" class="form-check">
        <input
          type="radio"
          :id="getOptionId(option)"
          :value="option.value"
          v-model="selectedOption"
          class="form-check-input"
        >
        <label :for="getOptionId(option)" class="form-check-label">{{ option.label }}</label>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'RadioGroup',
    props: {
      options: {
        type: Array,
        required: true,
      },
      label: {
        type: String,
        required: true,
      },
      value: {
        type: String,
        required: true,
      },
    },
    computed: {
      selectedOption: {
        get() {
          return this.value;
        },
        set(newValue) {
          this.$emit('input', newValue);
        },
      },
    },
    methods: {
      getOptionId(option) {
        return `radio-${option.value}`;
      },
    },
  };
  </script>
  