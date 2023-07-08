import { computed } from 'vue';
import { ref } from 'vue';

/**
 * @template T
 * @param {function(...[*]): T} func - Исходная функция вычисления
 * @returns {function(...[*]): ComputedRef<T>} - Функция вычисления от ref-ов, возвращающая вычисляемое значение computed
 */
export function reactify(func) {
  return (...args) =>
    computed(() => {
      const newArgs = [];
      for (let i = 0; i < args.length; i++) {
        if (typeof args[i] !== 'object') {
          args[i] = ref(args[i]);
        }
        newArgs.push(args[i].value);
      }

      return func(...newArgs);
    });
}
