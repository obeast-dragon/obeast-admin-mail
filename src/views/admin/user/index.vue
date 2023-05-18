<template>
	<div class="main-box">
		<TreeFilter
			label="name"
			title="部门列表(单选)"
			:data="treeFilterData"
			:defaultValue="initParam.departmentId"
			@change="changeTreeFilter"
		/>
		<div class="table-box">
			<ProTable
				ref="proTable"
				title="用户列表"
				rowKey="id"
				:indent="30"
				:columns="columns"
				:requestApi="getTableList"
				:requestAuto="false"
				:initParam="initParam"
				:dataCallback="dataCallback"
				:searchCol="{ xs: 1, sm: 1, md: 2, lg: 3, xl: 3 }"
			>
				<!-- 表格 header 按钮 -->
				<template #tableHeader>
					<el-button type="primary" :icon="CirclePlus" @click="openDrawer('新增')">新增</el-button>
					<el-button type="danger" :icon="Delete" plain> 删除 </el-button>
				</template>
				<!-- 表格操作 -->
				<template #operation="scope">
					<el-button type="primary" link :icon="View" @click="openDrawer('查看', scope.row)">查看</el-button>
					<el-button type="primary" link :icon="EditPen" @click="openDrawer('编辑', scope.row)">编辑</el-button>
					<el-button type="danger" link :icon="Delete" @click="deleteAccount(scope.row)">删除</el-button>
				</template>
			</ProTable>
			<UserDrawer ref="drawerRef" />
			<ImportExcel ref="dialogRef" />
		</div>
	</div>
</template>

<script setup lang="tsx" name="treeProTable">
import { onMounted, reactive, ref } from "vue";
import { ColumnProps } from "@/components/ProTable/interface";
import { useHandleData } from "@/hooks/useHandleData";
import ProTable from "@/components/ProTable/index.vue";
import TreeFilter from "@/components/TreeFilter/index.vue";
import ImportExcel from "@/components/ImportExcel/index.vue";
import UserDrawer from "@/views/admin/user/components/UserDrawer.vue";
import { CirclePlus, Delete, EditPen, View } from "@element-plus/icons-vue";
import { deleteUser, updateUser, addUser, getUserPages } from "@/api/modules/user";
import { deptTree } from "@/api/modules/dept";
import { User } from "@/api/interface/user";

const proTable = ref();

const initParam = reactive({ departmentId: "" });

const treeFilterData = ref<any>([]);

const dataCallback = (data: any) => {
	return {
		list: data.records,
		total: data.total,
		pageNum: data.current,
		pageSize: data.size
	};
};

const getTableList = (params: any) => {
	return getUserPages({
		size: params.pageSize,
		current: params.pageNum,
		deptId: params.departmentId,
		name: params.name,
		phone: params.phone
	});
};

/**
 * 树形筛选切换
 * @param val
 */
const changeTreeFilter = (val: string) => {
	proTable.value.pageable.pageNum = 1;
	initParam.departmentId = val;
};

/**
 * 部门树初始化
 */
const getTreeFilter = async () => {
	const { data } = await deptTree({});
	treeFilterData.value = data;
	initParam.departmentId = null;
};

// 表格配置项
const columns: ColumnProps<User.UserVO>[] = [
	{ type: "selection", fixed: "left", width: 40 },
	{ type: "index", label: "#", width: 40 },
	{ prop: "username", label: "用户名" },
	{
		prop: "name",
		label: "姓名",
		search: {
			el: "input"
		}
	},
	{
		prop: "phone",
		label: "手机号",
		search: {
			el: "input"
		}
	},
	{
		prop: "postList",
		label: "岗位",
		render: scope => {
			return (
				<>
					{scope.row.postList.map(item => {
						return <el-tag>{item.postName}</el-tag>;
					})}
				</>
			);
		}
	},
	{
		prop: "roleList",
		label: "角色",
		render: scope => {
			return (
				<>
					{scope.row.roleList.map(item => {
						return <el-tag>{item.roleName}</el-tag>;
					})}
				</>
			);
		}
	},
	{
		prop: "delFlag",
		label: "用户状态",
		render: scope => {
			return (
				<>
					<el-tag type={scope.row.delFlag === "0" ? "success" : "danger"}>{scope.row.delFlag === "0" ? "启用" : "禁用"}</el-tag>
				</>
			);
		}
	},
	{ prop: "createTime", label: "创建时间", width: 180 },
	{ prop: "operation", label: "操作", width: 280, fixed: "right" }
];

// 删除用户信息
const deleteAccount = async (params: User.UserVO) => {
	console.log(params.userId);
	await useHandleData(deleteUser, { id: [params.userId] }, `删除【${params.username}】用户`);
	proTable.value.getTableList();
};

// 打开 drawer(新增、查看、编辑)
const drawerRef = ref<InstanceType<typeof UserDrawer> | null>(null);
const openDrawer = (title: string, rowData: Partial<User.UserVO> = {}) => {
	const params = {
		title,
		rowData: { ...rowData },
		isView: title === "查看",
		api: title === "新增" ? addUser : title === "编辑" ? updateUser : undefined,
		getTableList: proTable.value.getTableList
	};
	drawerRef.value?.acceptParams(params);
};

onMounted(() => {
	getTreeFilter();
});
</script>
