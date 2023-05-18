<template>
	<el-drawer v-model="drawerVisible" :destroy-on-close="true" size="450px" :title="`${drawerProps.title}日志`">
		<el-form
			ref="ruleFormRef"
			label-width="100px"
			label-suffix=" :"
			:rules="rules"
			:disabled="drawerProps.isView"
			:model="drawerProps.rowData"
			:hide-required-asterisk="drawerProps.isView"
		>
			<el-form-item label="类型" prop="type">
				<el-input v-model="drawerProps.rowData!.type"></el-input>
			</el-form-item>
			<el-form-item label="标题" prop="title">
				<el-input v-model="drawerProps.rowData!.title"></el-input>
			</el-form-item>
			<el-form-item label="IP地址" prop="remoteAddr">
				<el-input v-model="drawerProps.rowData!.remoteAddr"></el-input>
			</el-form-item>
			<el-form-item label="请求方式" prop="method">
				<el-input v-model="drawerProps.rowData!.method"></el-input>
			</el-form-item>
			<el-form-item label="客户端" prop="serviceId">
				<el-input v-model="drawerProps.rowData!.serviceId"></el-input>
			</el-form-item>
			<el-form-item label="创建人" prop="createBy">
				<el-input v-model="drawerProps.rowData!.createBy"></el-input>
			</el-form-item>
			<el-form-item label="创建时间" prop="createTime">
				<el-input v-model="drawerProps.rowData!.createTime"></el-input>
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
import { Log } from "@/api/interface/log";

const rules = reactive({
	postCode: [{ required: true, message: "请填写日志编码" }],
	postName: [{ required: true, message: "请选择日志名称" }]
});

interface DrawerProps {
	title: string;
	isView: boolean;
	rowData: Partial<Log.Entity>;
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
			ElMessage.success({ message: `${drawerProps.value.title}日志成功！` });
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
