<template>
	<el-drawer v-model="drawerVisible" :destroy-on-close="true" size="450px" :title="`${drawerProps.title}商品分类`">
		<el-form
			ref="ruleFormRef"
			label-width="100px"
			label-suffix=" :"
			:rules="rules"
			:disabled="drawerProps.isView"
			:model="drawerProps.rowData"
			:hide-required-asterisk="drawerProps.isView"
		>
			<el-form-item label="名称" prop="name">
				<el-input v-model="drawerProps.rowData!.name" placeholder="请填写名称" clearable></el-input>
			</el-form-item>
			<el-form-item label="排序" prop="sort">
				<el-input-number v-model="drawerProps.rowData!.sort" :min="0" clearable></el-input-number>
			</el-form-item>
			<el-form-item label="上级分类" prop="parentId">
				<el-tree-select
					v-model="drawerProps.rowData.parentId"
					:data="drawerProps.options"
					:props="{ value: 'id', label: 'name' }"
					highlight-current
					check-strictly
				/>
			</el-form-item>
			<el-form-item label="图标" prop="avatar">
				<UploadImg v-model:imageUrl="drawerProps.rowData!.icon" width="135px" height="135px" :file-size="3">
					<template #empty>
						<el-icon><Avatar /></el-icon>
						<span>请上传图标</span>
					</template>
					<template #tip> 头像大小不能超过 3M </template>
				</UploadImg>
			</el-form-item>
			<el-form-item label="显示" prop="delFlag">
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

<script setup lang="ts" name="CategroyDrawer">
import { ref, reactive } from "vue";
import { ElMessage, FormInstance } from "element-plus";
import { Category } from "@/api/interface/mail/category";
import UploadImg from "@/components/Upload/Img.vue";

const rules = reactive({
	name: [{ required: true, message: "请填写商品分类名称" }]
});

interface DrawerProps {
	title: string;
	isView: boolean;
	rowData: Partial<Category.Entity>;
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
			ElMessage.success({ message: `${drawerProps.value.title}商品分类成功！` });
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
