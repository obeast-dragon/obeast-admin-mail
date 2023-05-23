<template>
	<div class="main-box">
		<TreeFilterV2
			label="name"
			title="商品分类"
			:data="treeFilterData"
			:defaultValue="initParam.catelogId"
			@change="changeTreeFilter"
		/>
		<div class="table-box">
			<ProTable
				ref="proTable"
				title="规格属性分组列表"
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
				</template>
				<!-- 表格操作 -->
				<template #operation="scope">
					<el-button type="primary" link :icon="Switch" @click="openDrawer('关联', scope.row)">关联</el-button>
					<el-button type="primary" link :icon="EditPen" @click="openDrawer('编辑', scope.row)">编辑</el-button>
					<el-button type="danger" link :icon="Delete" @click="remove(scope.row)">删除</el-button>
				</template>
			</ProTable>
			<AttrGroupDrawer ref="drawerRef" />
			<ImportExcel ref="dialogRef" />
		</div>
	</div>
</template>

<script setup lang="tsx" name="AttrGroupProTable">
import { onMounted, reactive, ref } from "vue";
import { ColumnProps } from "@/components/ProTable/interface";
import { useHandleData } from "@/hooks/useHandleData";
import ProTable from "@/components/ProTable/index.vue";
import TreeFilterV2 from "@/components/TreeFilterV2/index.vue";
import ImportExcel from "@/components/ImportExcel/index.vue";
import AttrGroupDrawer from "@/views/mail/norms/attrGroup/components/AttrGroupDrawer.vue";
import { CirclePlus, Delete, EditPen, Switch } from "@element-plus/icons-vue";
import { attrGroupPages, addAttrGroup, updateAttrGroup, delAttrGroup } from "@/api/modules/mail/attrGroup";
import { categoryTree } from "@/api/modules/mail/category";
import { MailAttrGroup } from "@/api/interface/mail/attrGroup";

const proTable = ref();

const initParam = reactive({ catelogId: null });

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
	return attrGroupPages({
		size: params.pageSize,
		current: params.pageNum,
		catelogId: params.catelogId,
		attrGroupName: params.attrGroupName === undefined ? "" : params.attrGroupName
	});
};

/**
 * 树形筛选切换
 * @param val
 */
const changeTreeFilter = (val: string) => {
	proTable.value.pageable.pageNum = 1;
	initParam.catelogId = val;
};

/**
 * 商品分类树初始化
 */
const getTreeFilter = async () => {
	const { data } = await categoryTree({});
	treeFilterData.value = data;
	initParam.catelogId = null;
};

// 表格配置项
const columns: ColumnProps<MailAttrGroup.Entity>[] = [
	{ type: "selection", fixed: "left", width: 40 },
	{ type: "index", label: "#", width: 40 },
	{
		prop: "attrGroupName",
		label: "组名",
		search: {
			el: "input"
		}
	},
	{ prop: "sort", label: "排序" },
	{ prop: "descript", label: "描述" },
	{
		prop: "icon",
		label: "组图标",
		render: scope => {
			return <>{scope.row.icon}</>;
		}
	},
	{
		prop: "catelogId",
		label: "所属分类",
		render: scope => {
			return <>{scope.row.catelogId}</>;
		}
	},

	{ prop: "operation", label: "操作", width: 280, fixed: "right" }
];

// 删除规格属性分组信息
const remove = async (params: MailAttrGroup.Entity) => {
	await useHandleData(delAttrGroup, { id: [params.attrGroupId] }, `删除【${params.attrGroupName}】规格属性分组`);
	proTable.value.getTableList();
};

// 打开 drawer(新增、查看、编辑)
const drawerRef = ref<InstanceType<typeof AttrGroupDrawer> | null>(null);
const openDrawer = async (title: string, rowData: Partial<MailAttrGroup.Entity> = {}) => {
	const params = {
		title,
		rowData: { ...rowData },
		isView: title === "查看",
		api: title === "新增" ? addAttrGroup : title === "编辑" ? updateAttrGroup : undefined,
		getTableList: proTable.value.getTableList,
	};
	drawerRef.value?.acceptParams(params);
};

onMounted(() => {
	getTreeFilter();
});
</script>
