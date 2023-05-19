<template>
	<div class="table-box">
		<ProTable
			ref="proTable"
			title="岗位列表"
			:columns="columns"
			:requestApi="getTableList"
			:initParam="initParam"
			:dataCallback="dataCallback"
		>
			<!-- 表格 header 按钮 -->
			<template #tableHeader>
				<el-button type="primary" :icon="CirclePlus" @click="openDrawer('新增')">新增</el-button>
			</template>
			<!-- 表格操作 -->
			<template #operation="scope">
				<el-button type="primary" link :icon="View" @click="openDrawer('查看', scope.row)">查看</el-button>
				<el-button type="primary" link :icon="EditPen" @click="openDrawer('编辑', scope.row)">编辑</el-button>
				<el-button type="primary" link :icon="Delete" @click="deleteClientById(scope.row)">删除</el-button>
			</template>
		</ProTable>
		<ClientDrawer ref="drawerRef" />
		<ImportExcel ref="dialogRef" />
	</div>
</template>

<script setup lang="tsx" name="useProTable">
import { ref, reactive } from "vue";
import { ColumnProps } from "@/components/ProTable/interface";
import { useHandleData } from "@/hooks/useHandleData";
import ProTable from "@/components/ProTable/index.vue";
import ImportExcel from "@/components/ImportExcel/index.vue";
import ClientDrawer from "@/views/admin/client/components/ClientDrawer.vue";
import { CirclePlus, Delete, View, EditPen } from "@element-plus/icons-vue";
import { getClientPages, addClient, updateClient, deleteClient } from "@/api/modules/admin/client";
import { Client } from "@/api/interface/admin/client";

const proTable = ref();

const initParam = reactive({ type: 1 });

const dataCallback = (data: any) => {
	return {
		list: data.records,
		total: data.total,
		pageNum: data.current,
		pageSize: data.size
	};
};

const getTableList = (params: any) => {
	return getClientPages({
		size: params.pageSize,
		current: params.pageNum,
		clientId: params.clientId === undefined ? "" : params.clientId
	});
};

// 表格配置项
const columns: ColumnProps<Client.Entity>[] = [
	{ type: "selection", fixed: "left", width: 40 },
	{ type: "index", label: "#", width: 40 },
	// 以下为后端字段
	{
		prop: "clientId",
		label: "客户端ID",
		width: 130,
		search: {
			el: "input"
		}
	},
	{ prop: "clientSecret", label: "客户端密钥", width: 130},
	{ prop: "scope", label: "作用域", width: 150 },
	{
		prop: "authorizedGrantTypes",
		label: "授权方式",
		render: scope => {
			return (
				<>
					{scope.row.authorizedGrantTypes == undefined ? "--": scope.row.authorizedGrantTypes.split(",").map(item => {
						return <el-tag type="">{item}</el-tag>
					})}
				</>
			);
		}
	},
	{ prop: "accessTokenValidity", label: "请求令牌有效时间 (秒)", width: 120 },
	{ prop: "refreshTokenValidity", label: "刷新令牌有效时间  (秒)", width: 120 },
	{ prop: "operation", label: "操作", fixed: "right", width: 220 }
];

// 删除岗位信息
const deleteClientById = async (params: Client.Entity) => {
	await useHandleData(deleteClient, { id: [params.clientId] }, `删除【${params.clientId}】岗位`);
	proTable.value.getTableList();
};

// 打开 drawer(新增、查看、编辑)
const drawerRef = ref<InstanceType<typeof ClientDrawer> | null>(null);
const openDrawer = (title: string, rowData: Partial<Client.Entity> = {}) => {
	const params = {
		title,
		isView: title === "查看",
		rowData: { ...rowData },
		api: title === "新增" ? addClient : title === "编辑" ? updateClient : undefined,
		getTableList: proTable.value.getTableList
	};
	drawerRef.value?.acceptParams(params);
};
</script>
