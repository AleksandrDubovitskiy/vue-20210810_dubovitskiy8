<template>
  <div class="image-uploader">
    <label
      class="image-uploader__preview"
      :class="{ 'image-uploader__preview-loading': isLoading }"
      :style="preview ? `--bg-url: url('${selectedPreview}')` : `--bg-url: url('/link.jpeg')`"
    >
      <span class="image-uploader__text">
        {{ displayMessage }}
      </span>
      <input
        ref="file"
        type="file"
        class="image-uploader__input"
        accept="image/*"
        v-bind="$attrs"
        @change="uploadFile"
        @click="remove"
      />
    </label>
  </div>
</template>

<script>
export default {
  name: 'UiImageUploader',
  inheritAttrs: false,
  props: {
    preview: [String, undefined],
    uploader: Function,
  },
  emits: ['upload', 'error', 'select', 'remove'],
  data() {
    return {
      selectedFile: undefined,
      selectedPreview: this.preview,
      isLoading: false,
    };
  },
  computed: {
    displayMessage() {
      let message = 'Загрузить изображение';

      if (this.selectedFile || this.selectedPreview) {
        message = 'Удалить изображение';
      }

      if (this.isLoading) {
        message = 'Загрузка...';
      }

      return message;
    },
  },
  methods: {
    uploadFile() {
      this.selectedFile = this.$refs.file.files[0];
      if (this.uploader) {
        this.isLoading = true;
        this.uploader(this.selectedFile)
          .then((result) => {
            this.isLoading = false;
            this.$emit('upload', result);
          })
          .catch((error) => {
            this.isLoading = false;
            this.$refs.file.value = '';
            this.selectedFile = '';
            this.$emit('error', error);
          });
      }
      this.$emit('select', this.selectedFile);
    },
    remove() {
      this.$refs.file.value = '';
      this.selectedFile = '';
      this.selectedPreview = '';
      if (!this.isLoading) {
        this.$emit('remove');
      }
    },
  },
};
</script>

<style scoped>
.image-uploader {
}

.image-uploader__input {
  opacity: 0;
  height: 0;
}

.image-uploader__preview {
  --bg-url: var(--default-cover);
  background-size: cover;
  background-position: center;
  background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), var(--bg-url);
  border: 2px solid var(--blue-light);
  border-radius: 8px;
  transition: 0.2s border-color;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 512px;
  height: 228px;
}

.image-uploader__text {
  color: var(--white);
  font-family: 'Nunito', sans-serif;
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
}

.image-uploader__preview:hover {
  border-color: var(--blue);
}

.image-uploader__preview.image-uploader__preview-loading {
  cursor: no-drop;
}
</style>
