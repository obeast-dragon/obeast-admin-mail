<template>
	<el-drawer v-model="drawerVisible" :destroy-on-close="true" size="450px" :title="`${drawerProps.title}岗位`">
		<el-form
			ref="ruleFormRef"
			label-width="100px"
			label-suffix=" :"
			:rules="rules"
			:disabled="drawerProps.isView"
			:model="drawerProps.rowData"
			:hide-required-asterisk="drawerProps.isView"
		>
			<el-form-item label="岗位编码" prop="postCode">
				<el-input v-model="drawerProps.rowData!.postCode" placeholder="请填写岗位编码" clearable></el-input>
			</el-form-item>
			<el-form-item label="岗位名称" prop="postName">
				<el-input v-model="drawerProps.rowData!.postName" placeholder="请填写岗位名称" clearable></el-input>
			</el-form-item>
			<el-form-item label="岗位排序" prop="postSort">
				<el-input-number :min="0" v-model="drawerProps.rowData!.postSort"></el-input-number>
			</el-form-item>
			<el-form-item label="岗位描述" prop="remark">
				<el-input v-model="drawerProps.rowData!.remark" placeholder="请填写岗位描述" clearable></el-input>
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
import { Post } from "@/api/interface/post";

const rules = reactive({
	postCode: [{ required: true, message: "请填写岗位编码" }],
	postName: [{ required: true, message: "请选择岗位名称" }],
});

interface DrawerProps {
	title: string;
	isView: boolean;
	rowData: Partial<Post.Res>;
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
			ElMessage.success({ message: `${drawerProps.value.title}岗位成功！` });
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
