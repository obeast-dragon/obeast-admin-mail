<template>
	<el-drawer v-model="drawerVisible" :destroy-on-close="true" size="450px" :title="`${drawerProps.title}采购需求`">
		<el-form
			ref="ruleFormRef"
			label-width="100px"
			label-suffix=" :"
			:rules="rules"
			:disabled="drawerProps.isView"
			:model="drawerProps.rowData"
			:hide-required-asterisk="drawerProps.isView"
		>
			<el-form-item label="采购商品Id" prop="skuId">
				<el-input v-model="drawerProps.rowData!.skuId" placeholder="请填写采购商品Id" clearable></el-input>
			</el-form-item>
			<el-form-item label="采购数量" prop="skuNum">
				<el-input v-model="drawerProps.rowData!.skuNum" placeholder="请填写采购数量" clearable></el-input>
			</el-form-item>
			<el-form-item label="仓库" prop="wareId">
				<el-select v-model="drawerProps.rowData!.wareId" class="m-2" placeholder="请选择仓库">
					<el-option v-for="item in drawerProps.wareInfos" :key="item.id" :label="item.name" :value="item.id" />
				</el-select>
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
import { WareInfo } from "@/api/interface/stock/wareInfo";
import { Purchase } from "@/api/interface/stock/purchase";

const rules = reactive({
	skuId: [{ required: true, message: "请填写skuId" }],
	skuNum: [{ required: true, message: "请填写skuName" }],
	wareId: [{ required: true, message: "请选择仓库" }],
});

interface DrawerProps {
	title: string;
	isView: boolean;
	rowData: Partial<Purchase.Demand>;
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
			ElMessage.success({ message: `${drawerProps.value.title}采购需求成功！` });
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
