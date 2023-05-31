<template>
	<el-dialog v-model="dialogVisible" title="合并整单" width="30%">
		<el-select filterable v-model="params" value-key="userId" placeholder="请选择" size="large">
			<el-option v-for="item in unclaimedListRef" :key="item.id" :label="item.id" :value="item.id">
				<div v-if="item.assigneeName !== ''">
					<span style="float: left">{{ item.id }}</span>
					<span style="float: right; color: var(--el-text-color-secondary); font-size: 13px">{{ item.assigneeName }}</span>
				</div>
				<div v-else>
					<span>{{ item.id }}</span>
				</div>
			</el-option>
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
import { unclaimedList, purchaseMerge } from "@/api/modules/stock/purchase";
import { Purchase } from "@/api/interface/stock/purchase";
import { ElMessageBox } from "element-plus";

// 接收父组件传过来的参数
const acceptParams = (params: DialogProps) => {
	dialogProps.value = params;
	dialogVisible.value = true;
	initUnclaimedList();
};

const confirmClick = async () => {
	if (params.value === undefined) {
		handleClose();
	} else {
		await purchaseMerge({
			purchaseId: params.value,
			items: dialogProps.value.items
		});
		params.value = {};
	}
	dialogVisible.value = false;
};

const handleClose = () => {
	ElMessageBox.confirm("未选择采购单，此操作会自动新增采购单是否继续?")
		.then(async () => {
			await purchaseMerge({
				purchaseId: params.value,
				items: dialogProps.value.items
			});
		})
		.catch(() => {});
};

const params = ref<{
	id?: number;
}>();

const unclaimedListRef = ref<Purchase.Entity[]>([]);
const initUnclaimedList = async () => {
	const { data } = await unclaimedList();
	unclaimedListRef.value = data;
};

interface DialogProps {
	items: string[];
	getTableList?: () => void;
}

const dialogVisible = ref(false);
const dialogProps = ref<DialogProps>({
	items: []
});

defineExpose({
	acceptParams
});
</script>

<style lang="scss" scoped></style>
