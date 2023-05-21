<template>
	<el-drawer v-model="drawerVisible" :destroy-on-close="true" size="450px" :title="`${drawerProps.title}品牌`">
		<el-form
			ref="ruleFormRef"
			label-width="100px"
			label-suffix=" :"
			:rules="rules"
			:disabled="drawerProps.isView"
			:model="drawerProps.rowData"
			:hide-required-asterisk="drawerProps.isView"
		>
		
			<el-form-item label="品牌名称" prop="name">
				<el-input v-model="drawerProps.rowData!.name" placeholder="请填写品牌名称" clearable></el-input>
			</el-form-item>
			<el-form-item label="品牌logo" prop="logo">
				<UploadImg v-model:imageUrl="drawerProps.rowData!.logo" width="135px" height="135px" :file-size="3">
					<template #empty>
						<el-icon><Avatar /></el-icon>
						<span>请上传Logo</span>
					</template>
					<template #tip> 头像大小不能超过 3M </template>
				</UploadImg>
			</el-form-item>
			<el-form-item label="检索首字母" prop="firstLetter">
				<el-input v-model="drawerProps.rowData!.firstLetter" placeholder="请填写检索首字母" clearable></el-input>
			</el-form-item>
			<el-form-item label="品牌排序" prop="sort">
				<el-input-number v-model="drawerProps.rowData!.sort" :min="0" placeholder="0" clearable></el-input-number>
			</el-form-item>
			<el-form-item label="显示" prop="showStatus">
				<el-radio-group v-model="drawerProps.rowData!.showStatus">
					<el-radio :label="0">是</el-radio>
					<el-radio :label="1">否</el-radio>
				</el-radio-group>
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
import { Brand } from "@/api/interface/mail/brand";
import UploadImg from "@/components/Upload/Img.vue";

const rules = reactive({
	postCode: [{ required: true, message: "请填写品牌编码" }],
	name: [{ required: true, message: "请选择品牌名称" }],
});

interface DrawerProps {
	title: string;
	isView: boolean;
	rowData: Partial<Brand.Entity>;
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
			ElMessage.success({ message: `${drawerProps.value.title}品牌成功！` });
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
