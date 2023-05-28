<template>
	<el-drawer v-model="drawerVisible" :destroy-on-close="true" size="450px" :title="`${drawerProps.title}仓库`">
		<el-form
			ref="ruleFormRef"
			label-width="100px"
			label-suffix=" :"
			:rules="rules"
			:disabled="drawerProps.isView"
			:model="drawerProps.rowData"
			:hide-required-asterisk="drawerProps.isView"
		>
			<el-form-item label="skuId" prop="skuId">
				<el-input v-model="drawerProps.rowData!.skuId" placeholder="请填写skuId" clearable></el-input>
			</el-form-item>
			<el-form-item label="skuName" prop="skuName">
				<el-input v-model="drawerProps.rowData!.skuName" placeholder="请填写skuName" clearable></el-input>
			</el-form-item>
			<el-form-item label="仓库" prop="wareId">
				<el-select v-model="drawerProps.rowData!.wareId" class="m-2" placeholder="请选择仓库">
					<el-option v-for="item in drawerProps.wareInfos" :key="item.id" :label="item.name" :value="item.id" />
				</el-select>
			</el-form-item>
			<el-form-item label="库存数量" prop="stock">
				<el-input v-model="drawerProps.rowData!.stock" placeholder="请填写库存数量" clearable></el-input>
			</el-form-item>
			<el-form-item label="锁定库存" prop="stockLocked">
				<el-input v-model="drawerProps.rowData!.stockLocked" placeholder="请填写锁定库存" clearable></el-input>
			</el-form-item>
		</el-form>
		<template #footer>
			<el-button @click="drawerVisible = false">取消</el-button>
			<el-button type="primary" v-show="!drawerProps.isView" @click="handleSubmit">确定</el-button>
		</template>
	</el-drawer>
</template>

<script setup lang="ts" name="UserDrawer">
import { ref, reactive } from "vue";
import { ElMessage, FormInstance } from "element-plus";
import { WareSku } from "@/api/interface/stock/wareSku";
import { WareInfo } from "@/api/interface/stock/wareInfo";

const rules = reactive({
	skuId: [{ required: true, message: "请填写skuId" }],
	skuName: [{ required: true, message: "请填写skuName" }],
	wareId: [{ required: true, message: "请选择仓库" }],
	stock: [{ required: true, message: "请填写库存数量" }],
	stockLocked: [{ required: true, message: "请填写锁定库存" }]
});

interface DrawerProps {
	title: string;
	isView: boolean;
	rowData: Partial<WareSku.Entity>;
	api?: (params: any) => Promise<any>;
	getTableList?: () => void;
	wareInfos?: WareInfo.Entity[];
}

const drawerVisible = ref(false);
const drawerProps = ref<DrawerProps>({
	isView: false,
	title: "",
	rowData: {},
	wareInfos: []
});

// 接收父组件传过来的参数
const acceptParams = (params: DrawerProps) => {
	drawerProps.value = params;
	drawerVisible.value = true;
};

// 提交数据（新增/编辑）
const ruleFormRef = ref<FormInstance>();
const handleSubmit = () => {
	ruleFormRef.value!.validate(async valid => {
		if (!valid) return;
		try {
			await drawerProps.value.api!(drawerProps.value.rowData);
			ElMessage.success({ message: `${drawerProps.value.title}仓库成功！` });
			drawerProps.value.getTableList!();
			drawerVisible.value = false;
		} catch (error) {
			console.log(error);
		}
	});
};

defineExpose({
	acceptParams
});
</script>
