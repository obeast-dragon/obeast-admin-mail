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
			<el-form-item label="规格名称" prop="attrName">
				<el-input v-model="drawerProps.rowData!.attrName" placeholder="请填写岗位描述" clearable></el-input>
			</el-form-item>
			<el-form-item label="排序" prop="sort">
				<el-input-number v-model="drawerProps.rowData!.sort" :min="0" clearable></el-input-number>
			</el-form-item>
			<el-form-item label="值类型" prop="valueType">
				<el-radio-group v-model="drawerProps.rowData!.valueType">
					<el-switch
						v-model="drawerProps.rowData!.valueType"
						:active-value="1"
						active-text="多选"
						:inactive-value="0"
						inactive-text="单选"
					/>
				</el-radio-group>
			</el-form-item>
			<el-form-item v-if="drawerProps.rowData!.valueType === 1" label="可选值列表" prop="valueSelect">
				<el-select
					
					collapse-tags
					:max-collapse-tags="2"
					v-model="valueOptions"
					multiple
					filterable
					default-first-option
					allow-create
					placeholder="请填写可选值"
				>
					<el-option v-for="(item, index) in valueOptions" :key="index" :label="item" :value="item" />
				</el-select>
			</el-form-item>
			<el-form-item label="显示" prop="enable">
				<el-radio-group v-model="drawerProps.rowData!.enable">
					<el-radio :label="0">是</el-radio>
					<el-radio :label="1">否</el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item label="可检索" prop="searchType">
				<el-radio-group v-model="drawerProps.rowData!.searchType">
					<el-radio :label="0">是</el-radio>
					<el-radio :label="1">否</el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item label="快速展示" prop="showDesc">
				<el-radio-group v-model="drawerProps.rowData!.showDesc">
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
import { MailAttr } from "@/api/interface/mail/attr";

const valueOptions = ref<string[]>([]);

const rules = reactive({
	postCode: [{ required: true, message: "请填写岗位编码" }],
	postName: [{ required: true, message: "请选择岗位名称" }]
});

interface DrawerProps {
	title: string;
	isView: boolean;
	rowData: Partial<MailAttr.Entity>;
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
	valueOptions.value = [];
	if (params.rowData.valueSelect) {
		valueOptions.value = params.rowData.valueSelect.split(";");
	}
	drawerVisible.value = true;
};

// 提交数据（新增/编辑）
const ruleFormRef = ref<FormInstance>();
const handleSubmit = () => {
	ruleFormRef.value!.validate(async valid => {
		if (!valid) return;
		if (valueOptions.value) {
			let vals = valueOptions.value[0];
			for (let i = 1; i < valueOptions.value.length; i++) {
				vals = vals + ";" + valueOptions.value[i];
			}
			drawerProps.value.rowData.valueSelect = vals;
		}
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
