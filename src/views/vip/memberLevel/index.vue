<template>
	<div class="table-box">
		<ProTable
			ref="proTable"
			title="会员等级列表"
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
				<el-button type="primary" link :icon="EditPen" @click="openDrawer('编辑', scope.row)">编辑</el-button>
				<el-button type="primary" link :icon="Delete" @click="remove(scope.row)">删除</el-button>
			</template>
		</ProTable>
		<MemberLevelDrawer ref="drawerRef" />
		<ImportExcel ref="dialogRef" />
	</div>
</template>

<script setup lang="tsx" name="useProTable">
import { ref, reactive } from "vue";
import { ColumnProps } from "@/components/ProTable/interface";
import { useHandleData } from "@/hooks/useHandleData";
import ProTable from "@/components/ProTable/index.vue";
import ImportExcel from "@/components/ImportExcel/index.vue";
import MemberLevelDrawer from "@/views/vip/memberLevel/components/MemberLevelDrawer.vue";
import { CircleCloseFilled, CirclePlus, Delete, EditPen, SuccessFilled } from "@element-plus/icons-vue";
import { MemberLevel } from "@/api/interface/vip/memberLevel";
import { memberLevelPages, addMemberLevel, updateMemberLevel, delMemberLevel } from "@/api/modules/vip/memberLevel";

const proTable = ref();

const initParam = reactive({});

const dataCallback = (data: any) => {
	return {
		list: data.records,
		total: data.total,
		pageNum: data.current,
		pageSize: data.size
	};
};

const getTableList =  (params: any) => {
	return  memberLevelPages({
		size: params.pageSize,
		current: params.pageNum,
		name: params.name === undefined ? "" : params.name
	});
};

// 表格配置项
const columns: ColumnProps<MemberLevel.Entity>[] = [
	{ type: "selection", fixed: "left", width: 40 },
	{ type: "index", label: "#", width: 80 },
	// 以下为后端字段
	{
		prop: "name",
		label: "等级名称",
		search: {
			el: "input"
		}
	},
	{ prop: "growthPoint", label: "等级需要的成长值" },
	{
		prop: "defaultStatus",
		label: "默认等级",
		render: scope => {
			return (
				<>
					{scope.row.defaultStatus === 0 ? (
						<el-icon size={"30px"} color={"#67c23a"}>
							<SuccessFilled />
						</el-icon>
					) : (
						<el-icon size={"30px"} color={"#f56c6c"}>
							<CircleCloseFilled />
						</el-icon>
					)}
				</>
			);
		}
	},
	{ prop: "freeFreightPoint", label: "免运费标准" },
	{ prop: "commentGrowthPoint", label: "评价获取的成长值" },
	{
		prop: "priviledgeFreeFreight",
		label: "是否有免邮特权",
		render: scope => {
			return (
				<>
					{scope.row.priviledgeFreeFreight === 0 ? (
						<el-icon size={"30px"} color={"#67c23a"}>
							<SuccessFilled />
						</el-icon>
					) : (
						<el-icon size={"30px"} color={"#f56c6c"}>
							<CircleCloseFilled />
						</el-icon>
					)}
				</>
			);
		}
	},
	{
		prop: "priviledgeMemberPrice",
		label: "会员价格特权",
		render: scope => {
			return (
				<>
					{scope.row.priviledgeMemberPrice === 0 ? (
						<el-icon size={"30px"} color={"#67c23a"}>
							<SuccessFilled />
						</el-icon>
					) : (
						<el-icon size={"30px"} color={"#f56c6c"}>
							<CircleCloseFilled />
						</el-icon>
					)}
				</>
			);
		}
	},
	{
		prop: "priviledgeBirthday",
		label: "生日特权",
		render: scope => {
			return (
				<>
					{scope.row.priviledgeBirthday === 0 ? (
						<el-icon size={"30px"} color={"#67c23a"}>
							<SuccessFilled />
						</el-icon>
					) : (
						<el-icon size={"30px"} color={"#f56c6c"}>
							<CircleCloseFilled />
						</el-icon>
					)}
				</>
			);
		}
	},
	{ prop: "note", label: "备注" },
	{ prop: "operation", label: "操作", fixed: "right", width: 220 }
];

// 删除会员等级信息
const remove = async (params: MemberLevel.Entity) => {
	await useHandleData(delMemberLevel, { id: [params.id] }, `删除【${params.name}】会员等级`);
	proTable.value.getTableList();
};

// 打开 drawer(新增、查看、编辑)
const drawerRef = ref<InstanceType<typeof MemberLevelDrawer> | null>(null);
const openDrawer = (title: string, rowData: Partial<MemberLevel.Entity> = {}) => {
	const params = {
		title,
		isView: title === "查看",
		rowData: { ...rowData },
		api: title === "新增" ? addMemberLevel : title === "编辑" ? updateMemberLevel : undefined,
		getTableList: proTable.value.getTableList
	};
	drawerRef.value?.acceptParams(params);
};
</script>
