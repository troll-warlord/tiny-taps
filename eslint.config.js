import pluginVue from 'eslint-plugin-vue'
import globals from 'globals'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  ...pluginVue.configs['flat/recommended'],
  {
    languageOptions: {
      globals: globals.browser,
    },
    rules: {
      // Component names are intentionally single-word in this project (HomeView, etc.)
      'vue/multi-word-component-names': 'off',
      // HTML formatting — project uses compact single-line templates; these are style opinions, not bugs
      'vue/max-attributes-per-line': 'off',
      'vue/singleline-html-element-content-newline': 'off',
      'vue/multiline-html-element-content-newline': 'off',
      'vue/html-self-closing': 'off',
    },
  },
])
