<template>
	<el-drawer v-model="drawerVisible" :destroy-on-close="true" size="700px" :title="`${drawerProps.title}Spu`">
		<el-form
			ref="ruleFormRef"
			label-width="100px"
			label-suffix=" :"
			:rules="rules"
			:disabled="drawerProps.isView"
			:model="drawerProps.rowData"
			:hide-required-asterisk="drawerProps.isView"
			v-if="drawerProps.title !== '关联'"
		>
			<el-form-item label="检索首字母" prop="firstLetter">
				<el-input v-model="drawerProps.rowData!.id" placeholder="请填写检索首字母" clearable></el-input>
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
import { SpuInfo } from "@/api/interface/mail/spuInfo";

const rules = reactive({
	postCode: [{ required: true, message: "请填写Spu编码" }],
	name: [{ required: true, message: "请选择Spu名称" }]
});

interface DrawerProps {
	title: string;
	isView?: boolean;
	rowData: Partial<SpuInfo.Entity>;
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
		await drawerProps.value.api!(drawerProps.value.rowData.id);
		ElMessage.success({ message: `${drawerProps.value.title}Spu成功！` });
		drawerProps.value.getTableList!();
		drawerVisible.value = false;
	});
};

defineExpose({
	acceptParams
});
</script>
