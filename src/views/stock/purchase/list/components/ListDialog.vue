<template>
	<el-dialog v-model="dialogVisible" title="分配采购人员" width="30%">
		<el-select filterable v-model="params"  value-key="userId" placeholder="请选择分配采购人员" size="large">
			<el-option v-for="item in userListRef" :key="item.userId" :label="item.username" :value="item" />
		</el-select>
		<template #footer>
			<span class="dialog-footer">
				<el-button @click="dialogVisible = false">取消</el-button>
				<el-button type="primary" @click="confirmClick">确定</el-button>
			</span>
		</template>
	</el-dialog>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { listUserObj } from "@/api/modules/admin/user";

// 接收父组件传过来的参数
const acceptParams = (params: DialogProps) => {
	dialogProps.value = params;
	dialogVisible.value = true;
	initUserList();
};

const confirmClick = () => {
	dialogVisible.value = false;
	console.log(params.value);
  params.value = {};
};

const params = ref<{
	nickName?: string;
	userId?: number;
	username?: string;
}>();

const userListRef = ref<any>([]);
const initUserList = async () => {
	const { data } = await listUserObj();
	userListRef.value = data;
};

interface DialogProps {
	rowData: Partial<any>;
	getTableList?: () => void;
}

const dialogVisible = ref(false);
const dialogProps = ref<DialogProps>({
	rowData: {}
});

defineExpose({
	acceptParams
});
</script>

<style lang="scss" scoped></style>
