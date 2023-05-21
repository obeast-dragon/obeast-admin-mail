<template>
	<div class="table-box">
		<ProTable
			ref="proTable"
			title="角色列表"
			:columns="columns"
			:requestApi="getTableList"
			:initParam="initParam"
			:dataCallback="dataCallback"
		>
			<!-- 表格 header 按钮 -->
			<template #tableHeader="scope">
				<el-button type="primary" :icon="CirclePlus" @click="openDrawer('新增')">新增角色</el-button>
				<el-button type="danger" :icon="Delete" plain @click="batchDelete(scope.selectedListIds)" :disabled="!scope.isSelected">
					批量删除
				</el-button>
			</template>
			<!-- 表格操作 -->
			<template #operation="scope">
				<el-button type="primary" link :icon="EditPen" @click="openDrawer('编辑', scope.row)">编辑</el-button>
				<el-button type="primary" link :icon="TurnOff" @click="openDrawer('授权', scope.row)"> 授权</el-button>
				<el-button type="primary" link :icon="Delete" @click="deleteRoleById(scope.row)">删除</el-button>
			</template>
		</ProTable>
		<RoleDrawer ref="drawerRef" />
		<ImportExcel ref="dialogRef" />
	</div>
</template>

<script setup lang="tsx" name="useProTable">
import { ref, reactive } from "vue";
import { ColumnProps } from "@/components/ProTable/interface";
import { useHandleData } from "@/hooks/useHandleData";
import ProTable from "@/components/ProTable/index.vue";
import ImportExcel from "@/components/ImportExcel/index.vue";
import RoleDrawer from "@/views/admin/role/components/RoleDrawer.vue";
import { CirclePlus, Delete, EditPen, TurnOff } from "@element-plus/icons-vue";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { addRole, authorizeMenu, deleteRole, getRolePages, updateRole } from "@/api/modules/admin/role";
import { Role } from "@/api/interface/admin/role";

// 获取 ProTable 元素，调用其获取刷新数据方法（还能获取到当前查询参数，方便导出携带参数）
const proTable = ref();

// 如果表格需要初始化请求参数，直接定义传给 ProTable(之后每次请求都会自动带上该参数，此参数更改之后也会一直带上，改变此参数会自动刷新表格数据)
const initParam = reactive({});

// dataCallback 是对于返回的表格数据做处理，如果你后台返回的数据不是 list && total && pageNum && pageSize 这些字段，那么你可以在这里进行处理成这些字段
// 或者直接去 hooks/useTable.ts 文件中把字段改为你后端对应的就行
const dataCallback = (data: any) => {
	return {
		list: data.records,
		total: data.total,
		pageNum: data.current,
		pageSize: data.size
	};
};

// 如果你想在请求之前对当前请求参数做一些操作，可以自定义如下函数：params 为当前所有的请求参数（包括分页），最后返回请求列表接口
// 默认不做操作就直接在 ProTable 组件上绑定	:requestApi="getUserList"
const getTableList = (params: any) => {
	return getRolePages({
		size: params.pageSize,
		current: params.pageNum,
		roleName: params.roleName
	});
};

// 表格配置项
const columns: ColumnProps<Role.Res>[] = [
	{ type: "selection", fixed: "left", width: 40 },
	{ type: "index", label: "#", width: 40 },
	// 以下为后端字段
	{
		prop: "roleName",
		label: "角色姓名",
		search: {
			el: "input"
		}
	},
	{ prop: "roleCode", label: "角色标识" },
	{ prop: "roleDesc", label: "角色描述" },
	{
		prop: "createTime",
		label: "创建时间",
		width: 180
	},
	{ prop: "operation", label: "操作", fixed: "right", width: 220 }
];

// 删除角色信息
const deleteRoleById = async (params: Role.Res) => {
	await useHandleData(deleteRole, { id: [params.roleId] }, `删除【${params.roleName}】角色`);
	proTable.value.getTableList();
};

// 批量删除角色信息
const batchDelete = async (id: string[]) => {
	console.log(id);
	// await useHandleData(deleteRole, { id }, "删除所选角色信息");
	// proTable.value.clearSelection();
	// proTable.value.getTableList();
};

// 打开 drawer(新增、查看、编辑)
const drawerRef = ref<InstanceType<typeof RoleDrawer> | null>(null);
const openDrawer = (title: string, rowData: Partial<Role.Res> = {}) => {
	const params = {
		title,
		isView: title === "查看",
		rowData: { ...rowData },
		api: title === "新增" ? addRole : title === "编辑" ? updateRole : title === "授权" ? authorizeMenu : undefined,
		getTableList: proTable.value.getTableList
	};
	drawerRef.value?.acceptParams(params);
};
</script>
