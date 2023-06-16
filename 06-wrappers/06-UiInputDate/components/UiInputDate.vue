<template>
  <ui-input v-bind="$attrs" :model-value="value" :step="step" :type="type" @input="handleInput" />
  <div v-if="Boolean($slots['left-icon'])" class="input-group__icon">
    <slot name="left-icon" />
  </div>
</template>

<script>
import UiInput from './UiInput';
import UiIcon from './UiIcon';

import moment from 'moment';

export default {
  name: 'UiInputDate',
  components: { UiInput, UiIcon },
  inheritAttrs: false,
  props: {
    modelValue: {
      type: Number,
    },
    type: {
      type: String,
      default: 'date',
    },
    step: {
      type: [Number, String],
    },
  },
  emits: ['update:modelValue'],
  computed: {
    value() {
      if (!this.modelValue) {
        return '';
      }

      const date = new Date(this.modelValue);
      const fullYear = moment(date).utc().format('YYYY-MM-DD');
      const hoursMinutes = moment(date).utc().format('HH:mm');

      if (this.type === 'time') {
        return hoursMinutes;
      }

      if (this.type === 'datetime-local') {
        return fullYear + 'T' + hoursMinutes;
      }

      return fullYear;
    },
  },

  methods: {
    handleInput($event) {
      this.$emit('update:modelValue', $event.target.value === '' ? null : $event.target.valueAsNumber);
    },
  },
};
</script>
