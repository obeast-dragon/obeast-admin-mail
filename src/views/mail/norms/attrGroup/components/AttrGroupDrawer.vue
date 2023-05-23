<template>
	<el-drawer v-model="drawerVisible" :destroy-on-close="true" size="600px" :title="`${drawerProps.title}用户`">
		<DialogTable ref="dialogRef" :get-table-list="attrPages" @select-list-params="selectListParams" />
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
		<div v-else>
			<div style="margin-bottom: 10px">
				<el-button type="success" @click="openDialog">新增关联</el-button>
			</div>
			<el-table :data="relsList" style="width: 100%">
				<el-table-column fixed type="selection" width="50" />
				<el-table-column fixed prop="attrId" label="id" width="50" />
				<el-table-column prop="attrName" label="属性名" width="100" />
				<el-table-column prop="valueSelect" label="可选择值" width="280">
					<template #default="scope">
						<div v-if="scope.row.valueSelect">
							<el-tag :key="index" v-for="(item, index) in handleValueSelect(scope.row.valueSelect)">{{ item }}</el-tag>
						</div>
						<div v-else>
							--
						</div>
					</template>
				</el-table-column>
				<el-table-column fixed="right" label="操作" width="80">
					<template #default="scope">
						<el-button type="danger" size="small" @click.prevent="delItem(scope.$index)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<template #footer>
			<el-button @click="drawerVisible = false">取消</el-button>
			<el-button type="primary" v-show="!drawerProps.isView" @click="handleSubmit">确定</el-button>
		</template>
	</el-drawer>
</template>

<script setup lang="ts" name="UserDrawer">
import { ref, reactive, onMounted } from "vue";
import { ElMessage, FormInstance, ElTag } from "element-plus";
import { MailAttrGroup } from "@/api/interface/mail/attrGroup";
import SelectV2Tree from "@/components/SelectTreeV2/index.vue";
import { categoryTree } from "@/api/modules/mail/category";
import { attrPages } from "@/api/modules/mail/attr";
import DialogTable from "@/views/mail/norms/attrGroup/components/DialogTable.vue";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { listRelsByAttrGroupId, updateAttrAttrGroupRel } from "@/api/modules/mail/attrGroup";
import { MailAttr } from "@/api/interface/mail/attr";

onMounted(() => {
	getTreeFilter();
});

const rules = reactive({
	email: [{ required: true, message: "请填写邮箱" }],
	address: [{ required: true, message: "请填写居住地址" }]
});

const treeFilterData = ref<any>([]);
const getTreeFilter = async () => {
	const { data } = await categoryTree({});
	treeFilterData.value = data;
};

const relsList = ref<MailAttrGroup.AttrAttrGroupRelsDTO[]>([]);
const handleRels = async (attrGroupId: number) => {
	const { data } = await listRelsByAttrGroupId(attrGroupId);
	relsList.value = data;
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
	handleRels(drawerProps.value.rowData.attrGroupId);
	drawerVisible.value = true;
};

// 提交数据（新增/编辑）
const ruleFormRef = ref<FormInstance>();
const handleSubmit = () => {
	if (drawerProps.value.title === "关联") {
		updateAttrAttrGroupRel(drawerProps.value.rowData.attrGroupId, relsList.value);
		ElMessage.success({ message: `${drawerProps.value.title}属性分组成功！` });
		drawerVisible.value = false;
		relsList.value = [];
	} else {
		ruleFormRef.value!.validate(async valid => {
			if (!valid) return;
			try {
				await drawerProps.value.api!(drawerProps.value.rowData);
				ElMessage.success({ message: `${drawerProps.value.title}属性分组成功！` });
				drawerProps.value.getTableList!();
				drawerVisible.value = false;
			} catch (error) {
				console.log(error);
			}
		});
	}
};

const handleValueSelect = (valueSelect: string) => {
	return valueSelect === null ? "" : valueSelect.split(";");
};

const dialogRef = ref<InstanceType<typeof DialogTable> | null>(null);
const openDialog = () => {
	const params = {
		attrGroupId: drawerProps.value.rowData.attrGroupId,
		relsList: relsList,
		getRelsList: handleRels
	};
	dialogRef.value.acceptDialogParams(params);
};

const selectListParams = async (params: MailAttr.Entity[]) => {
	let addRelsList = params.map(item => {
		return {
			attrId: item.attrId,
			attrGroupId: drawerProps.value.rowData.attrGroupId,
			attrSort: item.sort,
			attrName: item.attrName,
			valueSelect: item.valueSelect
		} as MailAttrGroup.AttrAttrGroupRelsDTO;
	});
	relsList.value = [...relsList.value, ...addRelsList];
};

const delItem = (index: number) => {
	relsList.value.splice(index, 1);
};

defineExpose({
	acceptParams
});
</script>
