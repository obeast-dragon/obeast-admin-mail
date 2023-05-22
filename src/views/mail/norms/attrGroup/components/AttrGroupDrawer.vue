<template>
	<el-drawer v-model="drawerVisible" :destroy-on-close="true" size="450px" :title="`${drawerProps.title}用户`">
		<el-form
			ref="ruleFormRef"
			label-width="100px"
			label-suffix=" :"
			:rules="rules"
			:disabled="drawerProps.isView"
			:model="drawerProps.rowData"
			:hide-required-asterisk="drawerProps.isView"
		>
			<el-form-item label="组名" prop="attrGroupName">
				<el-input v-model="drawerProps.rowData!.attrGroupName" placeholder="请填写组名" clearable></el-input>
			</el-form-item>
			<el-form-item label="排序" prop="sort">
				<el-input-number v-model="drawerProps.rowData!.sort" :min="0" clearable></el-input-number>
			</el-form-item>
			<el-form-item label="描述" prop="descript">
				<el-input v-model="drawerProps.rowData!.descript" placeholder="请填写描述" clearable></el-input>
			</el-form-item>
			<el-form-item label="图标" prop="icon">
				<el-input v-model="drawerProps.rowData!.icon" placeholder="请填写图标" clearable></el-input>
			</el-form-item>
			<el-form-item label="所属分类" prop="catelogId">
				<SelectV2Tree v-model:modelId="drawerProps.rowData!.catelogId" :data="treeFilterData" label="name" />
			</el-form-item>
		</el-form>
		<template #footer>
			<el-button @click="drawerVisible = false">取消</el-button>
			<el-button type="primary" v-show="!drawerProps.isView" @click="handleSubmit">确定</el-button>
		</template>
	</el-drawer>
</template>

<script setup lang="ts" name="UserDrawer">
import { ref, reactive, onMounted } from "vue";
import { ElMessage, FormInstance } from "element-plus";
import { MailAttrGroup } from "@/api/interface/mail/attrGroup";
import SelectV2Tree from "@/components/SelectTreeV2/index.vue"
import { categoryTree } from "@/api/modules/mail/category";

onMounted(() => {
	getTreeFilter();
})

const rules = reactive({
	email: [{ required: true, message: "请填写邮箱" }],
	address: [{ required: true, message: "请填写居住地址" }]
});

const treeFilterData = ref<any>([]);

const getTreeFilter = async () => {
	const { data } = await categoryTree({});
	treeFilterData.value = data;
};

interface DrawerProps {
	title: string;
	isView: boolean;
	rowData: Partial<MailAttrGroup.Entity>;
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
			ElMessage.success({ message: `${drawerProps.value.title}用户成功！` });
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
