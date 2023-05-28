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
			
			<el-form-item label="仓库名" prop="name">
				<el-input v-model="drawerProps.rowData!.name" placeholder="请填写仓库名" clearable></el-input>
			</el-form-item>
			<el-form-item label="仓库地址" prop="address">
				<el-input v-model="drawerProps.rowData!.address" placeholder="请填写仓库地址" clearable></el-input>
			</el-form-item>
			<el-form-item label="区域编码" prop="areaCode">
				<el-input v-model="drawerProps.rowData!.areaCode" placeholder="请填写区域编码" clearable></el-input>
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

const rules = reactive({
	name: [{ required: true, message: "请填写仓库名" }],
	address: [{ required: true, message: "请选择仓库地址" }],
	areaCode: [{ required: true, message: "请选择区域编码" }],
});

interface DrawerProps {
	title: string;
	isView: boolean;
	rowData: Partial<WareInfo.Entity>;
	api?: (params: any) => Promise<any>;
	getTableList?: () => void;
}

const drawerVisible = ref(false);
const drawerProps = ref<DrawerProps>({
	isView: false,
	title: "",
	rowData: {}
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
