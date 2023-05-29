<template>
   <el-dialog
    v-model="dialogVisible"
    title="Tips"
    width="30%"
  >
    <span>This is a message</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="dialogVisible = false">
          Confirm
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref } from "vue" 

// 接收父组件传过来的参数
const acceptParams = (params: DialogProps) => {
	dialogProps.value = params;
	dialogVisible.value = true;
};

interface DialogProps {
	rowData: Partial<any>;
	getTableList?: () => void;
}

const dialogVisible = ref(false);
const dialogProps = ref<DialogProps>({
	rowData: {},
});

defineExpose({
	acceptParams
});

</script>

<style lang="scss" scoped>

</style>