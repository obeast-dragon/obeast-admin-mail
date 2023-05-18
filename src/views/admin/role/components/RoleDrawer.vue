<template>
	<el-drawer v-model="drawerVisible" :destroy-on-close="true" size="450px" :title="`${drawerProps.title}角色`">
		<el-form
			ref="ruleFormRef"
			label-width="100px"
			label-suffix=" :"
			:rules="rules"
			:disabled="drawerProps.isView"
			:model="drawerProps.rowData"
			:hide-required-asterisk="drawerProps.isView"
		>
			<div v-if="drawerProps.title !== '授权'">
				<el-form-item label="角色名称" prop="roleName">
					<el-input v-model="drawerProps.rowData!.roleName" placeholder="请填写角色名称" clearable></el-input>
				</el-form-item>
				<el-form-item label="角色标识" prop="roleCode">
					<el-input
						:disabled="drawerProps.title === '编辑' ? true : false"
						v-model="drawerProps.rowData!.roleCode"
						placeholder="请填写角色标识"
						clearable
					></el-input>
				</el-form-item>
				<el-form-item label="角色描述" prop="roleDesc">
					<el-input v-model="drawerProps.rowData!.roleDesc" placeholder="请填写角色描述" clearable></el-input>
				</el-form-item>
			</div>
			<el-form-item v-if="drawerProps.title === '授权'" prop="menuIds">
				<el-tree
					ref="treeRef"
					node-key="id"
					:default-checked-keys="relsList"
					default-expand-all
					:data="menuTreeData"
					:props="{ children: 'children', label: 'label' }"
					show-checkbox
				/>
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
import { ElMessage, ElTree, FormInstance } from "element-plus";
import { Role } from "@/api/interface/role";
import { Menu } from "@/api/interface/menu";
import { getMenuRelsByRoleId, menuTree } from "@/api/modules/menu";

const treeRef = ref<InstanceType<typeof ElTree>>();

onMounted(() => {
	getMenuTree();
});

const relsList = ref<number[]>([]);

const menuTreeData = ref<Menu.Res[]>([]);

const initRels = async () => {
	if (drawerProps.value.title === "授权") {
		const { data } = await getMenuRelsByRoleId(drawerProps.value.rowData.roleId);
		let newData: number[] = [];
		data.forEach(item => {
			if (!treeRef.value.getNode(item).childNodes || !treeRef.value.getNode(item).childNodes.length) {
				newData.push(item);
			}
		});
		relsList.value = newData;
	}
};
const getMenuTree = async () => {
	const { data } = await menuTree({
		lazy: false
	});
	menuTreeData.value = data;
};

const rules = reactive({
	roleName: [{ required: true, message: "请填写角色名称" }],
	roleCode: [{ required: true, message: "请填写角色名称" }]
});

interface DrawerProps {
	title: string;
	isView: boolean;
	rowData: Partial<Role.Res>;
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
	relsList.value = [];
	initRels();
};

// 提交数据（新增/编辑）
const ruleFormRef = ref<FormInstance>();
const handleSubmit = () => {
	ruleFormRef.value!.validate(async valid => {
		if (!valid) return;
		try {
			if (drawerProps.value.title === "授权") {
				drawerProps.value.rowData.menuIds = treeRef
					.value!.getCheckedKeys()
					.concat(treeRef.value!.getHalfCheckedKeys()) as number[];
			}
			await drawerProps.value.api!(drawerProps.value.rowData);
			ElMessage.success({ message: `${drawerProps.value.title}角色成功！` });
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
