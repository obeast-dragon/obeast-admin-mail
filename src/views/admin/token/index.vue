<template>
	<div class="table-box">
		<ProTable
			ref="proTable"
			title="令牌列表"
			:columns="columns"
			:requestApi="getTableList"
			:initParam="initParam"
			:dataCallback="dataCallback"
		>
			<!-- 表格操作 -->
			<template #operation="scope">
				<el-button type="primary" link :icon="Delete" @click="deletePostById(scope.row)">删除</el-button>
			</template>
		</ProTable>
	</div>
</template>

<script setup lang="tsx" name="useProTable">
import { ref, reactive } from "vue";
import { ColumnProps } from "@/components/ProTable/interface";
import { useHandleData } from "@/hooks/useHandleData";
import ProTable from "@/components/ProTable/index.vue";
import { Delete } from "@element-plus/icons-vue";
import { getTokenPages, deleteToken } from "@/api/modules/admin/token";
import { SysToken } from "@/api/interface/admin/token";

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
	return getTokenPages({
		size: params.pageSize,
		current: params.pageNum,
		username: params.username === undefined ? "" : params.username
	});
};

// 表格配置项
const columns: ColumnProps<SysToken.Entity>[] = [
	{ type: "selection", fixed: "left", width: 40 },
	{ type: "index", label: "#", width: 40 },
	// 以下为后端字段
	{
		prop: "username",
		label: "用户名",
		search: {
			el: "input"
		}
	},
	{ prop: "clientId", label: "客户端" },
	{ prop: "accessToken", label: "令牌" },
	{ prop: "expiresAt", label: "过期时间" },
	{ prop: "operation", label: "操作", fixed: "right", width: 220 }
];

// 删除令牌信息
const deletePostById = async (params: SysToken.Entity) => {
	await useHandleData(deleteToken, { id: [params.id] }, `删除【${params.username}】令牌`);
	proTable.value.getTableList();
};

</script>
