<template>
	<el-drawer v-model="drawerVisible" :destroy-on-close="true" size="450px" :title="`${drawerProps.title}会员等级`">
		<el-form
			ref="ruleFormRef"
			label-width="140px"
			label-suffix=" :"
			:rules="rules"
			:disabled="drawerProps.isView"
			:model="drawerProps.rowData"
			:hide-required-asterisk="drawerProps.isView"
		>
			<el-form-item label="等级名称" prop="name">
				<el-input v-model="drawerProps.rowData!.name" placeholder="请填写会员等级名称" clearable></el-input>
			</el-form-item>
			<el-form-item label="等级需要的成长值" prop="growthPoint">
				<el-input-number v-model="drawerProps.rowData!.growthPoint" :min="0" clearable></el-input-number>
			</el-form-item>
			<el-form-item label="默认等级" prop="defaultStatus">
				<el-radio-group v-model="drawerProps.rowData!.defaultStatus">
					<el-radio :label="0">是</el-radio>
					<el-radio :label="1">否</el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item label="免运费标准" prop="freeFreightPoint">
				<el-input-number v-model="drawerProps.rowData!.freeFreightPoint" :min="0" :precision="4" :step="0.0001" clearable></el-input-number>
			</el-form-item>
			<el-form-item label="评价获取的成长值" prop="commentGrowthPoint">
				<el-input-number v-model="drawerProps.rowData!.commentGrowthPoint" :min="0" clearable></el-input-number>
			</el-form-item>
			<el-form-item label="是否有免邮特权" prop="priviledgeFreeFreight">
				<el-radio-group v-model="drawerProps.rowData!.priviledgeFreeFreight">
					<el-radio :label="0">是</el-radio>
					<el-radio :label="1">否</el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item label="会员价格特权" prop="priviledgeMemberPrice">
				<el-radio-group v-model="drawerProps.rowData!.priviledgeMemberPrice">
					<el-radio :label="0">是</el-radio>
					<el-radio :label="1">否</el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item label="生日特权" prop="priviledgeBirthday">
				<el-radio-group v-model="drawerProps.rowData!.priviledgeBirthday">
					<el-radio :label="0">是</el-radio>
					<el-radio :label="1">否</el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item label="备注" prop="note">
				<el-input v-model="drawerProps.rowData!.note" placeholder="请填写备注" clearable></el-input>
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
import { MemberLevel } from "@/api/interface/vip/memberLevel";

const rules = reactive({
	postCode: [{ required: true, message: "请填写会员等级编码" }],
	name: [{ required: true, message: "请选择会员等级名称" }]
});

interface DrawerProps {
	title: string;
	isView: boolean;
	rowData: Partial<MemberLevel.Entity>;
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
			ElMessage.success({ message: `${drawerProps.value.title}会员等级成功！` });
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
