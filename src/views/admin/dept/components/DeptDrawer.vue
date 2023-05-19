<template>
	<el-drawer v-model="drawerVisible" :destroy-on-close="true" size="450px" :title="`${drawerProps.title}部门`">
		<el-form
			ref="ruleFormRef"
			label-width="100px"
			label-suffix=" :"
			:rules="rules"
			:disabled="drawerProps.isView"
			:model="drawerProps.rowData"
			:hide-required-asterisk="drawerProps.isView"
		>
			<el-form-item label="上级部门" prop="deptName">
				<el-tree-select
					v-model="drawerProps.rowData.parentId"
					:data="drawerProps.options"
					:props="{ value: 'id', label: 'name' }"
					highlight-current
					check-strictly
				/>
			</el-form-item>
			<el-form-item label="部门名称" prop="name">
				<el-input v-model="drawerProps.rowData!.name" placeholder="请填写部门名称" clearable></el-input>
			</el-form-item>
			<el-form-item label="排序" prop="sortOrder">
				<el-input-number v-model="drawerProps.rowData!.sortOrder" :min="0" clearable></el-input-number>
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
import { Department } from "@/api/interface/admin/dept";

const rules = reactive({
	deptName: [{ required: true, message: "请填写上级部门" }],
	name: [{ required: true, message: "请填写部门名称" }]
});

interface DrawerProps {
	title: string;
	isView: boolean;
	rowData: Partial<Department.Res>;
	api?: (params: any) => Promise<any>;
	getTableList?: () => void;
	options: any;
}

const drawerVisible = ref(false);
const drawerProps = ref<DrawerProps>({
	isView: false,
	title: "",
	rowData: {},
	options: {}
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
			ElMessage.success({ message: `${drawerProps.value.title}部门成功！` });
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
