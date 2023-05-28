<template>
	<div class="table-box">
		<ProTable
			rowKey="skuId"
			ref="proTable"
			title="Spu列表"
			:columns="columns"
			:requestApi="getTableList"
			:dataCallback="dataCallback"
		>
			<!-- Expand -->
			<template #expand="scope">
				<div style="display: flex; flex-direction: column">
					<span>商品标题: {{ scope.row.skuTitle }}</span>
					<span>商品副标题: {{ scope.row.skuSubtitle }}</span>
					<span>商品描述: {{ scope.row.skuDesc }}</span>
					<span>商品所属分类Id: {{ scope.row.categoryId }}</span>
					<span>商品品牌Id: {{ scope.row.brandId }}</span>
				</div>
			</template>
			<!-- 表格操作 -->
			<template #operation="scope">
				<el-button type="primary" link :icon="View" @click="openDrawer('查看', scope.row)">查看</el-button>
				<el-button type="primary" link :icon="Comment" @click="() => {}">评论</el-button>
				<el-dropdown trigger="click" style="margin-top: 3px">
					<el-button type="primary" link :icon="ArrowDown">更多</el-button>
					<template #dropdown>
						<el-dropdown-menu>
							<el-dropdown-item>上传图片</el-dropdown-item>
							<el-dropdown-item>参与秒杀</el-dropdown-item>
							<el-dropdown-item>满减设置</el-dropdown-item>
							<el-dropdown-item>折扣设置</el-dropdown-item>
							<el-dropdown-item>会员价格</el-dropdown-item>
							<el-dropdown-item @click="wareSkuClick()">库存管理</el-dropdown-item>
							<el-dropdown-item>优惠卷</el-dropdown-item>
						</el-dropdown-menu>
					</template>
				</el-dropdown>
			</template>
		</ProTable>
		<SkuDrawer ref="drawerRef" />
	</div>
</template>
<script setup lang="tsx" name="useProTable">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { ColumnProps } from "@/components/ProTable/interface";
import ProTable from "@/components/ProTable/index.vue";
import SkuDrawer from "@/views/mail/goods/list/components/SkuDrawer.vue";
import { Comment, ArrowDown, View } from "@element-plus/icons-vue";
import { SkuInfo } from "@/api/interface/mail/skuInfo";
import { skuInfoPages } from "@/api/modules/mail/skuInfo";
import { categoryTree } from "@/api/modules/mail/category";
import { brandList } from "@/api/modules/mail/brand";

const proTable = ref();
const router = useRouter();

const dataCallback = (data: any) => {
	return {
		list: data.records,
		total: data.total,
		pageNum: data.current,
		pageSize: data.size
	};
};

const getTableList = (params: any) => {
	return skuInfoPages({
		size: params.pageSize,
		current: params.pageNum,
		categoryId: params.categoryId,
		brandId: params.brandId,
		skuName: params.skuName,
		priceMin: params.priceMin,
		priceMax: params.priceMax
	});
};

// 表格配置项
const columns: ColumnProps<SkuInfo.Entity>[] = [
	{ type: "expand", fixed: "left", width: 50 },
	{ type: "selection", fixed: "left", width: 50 },
	{ prop: "skuId", label: "skuId", fixed: "left", width: 80 },
	// 以下为后端字段
	{
		prop: "skuName",
		label: "商品名称",
		search: {
			el: "input"
		}
	},
	{
		prop: "skuDefaultImg",
		label: "默认图片",
		render: scope => {
			return <>{scope.row.skuDefaultImg ? <el-image style="height: 50px" src={scope.row.skuDefaultImg} fit="cover" /> : ""}</>;
		}
	},
	{ prop: "price", label: "价格" },
	{
		prop: "saleCount",
		label: "销量",
		width: 80
	},
	{
		prop: "priceMin",
		label: "价格",
		search: {
			el: "input-number",
			props: {
				min: 0,
				precision: 4,
				step: 0.0001
			}
		},
		isShow: false
	},
	{
		prop: "priceMax",
		label: "-",
		labelSufix: "",
		search: {
			el: "input-number",
			props: {
				min: 0,
				precision: 4,
				step: 0.0001
			}
		},
		isShow: false
	},
	{
		prop: "categoryId",
		label: "所属分类Id",
		enum: categoryTree,
		search: {
			el: "cascader",
			props: { props: { emitPath: false } }
		},
		fieldNames: { label: "name", value: "id" },
		isShow: false,
		render: scope => <>{scope.row.categoryId}</>
	},
	{
		prop: "brandId",
		label: "所属品牌Id",
		enum: brandList,
		search: {
			el: "select",
			props: { filterable: true }
		},
		fieldNames: { label: "name", value: "brandId" },
		isShow: false,
		render: scope => <>{scope.row.brandId}</>
	},

	{ prop: "operation", label: "操作", fixed: "right", width: 280 }
];

// 打开 drawer(新增、查看、编辑)
const drawerRef = ref<InstanceType<typeof SkuDrawer> | null>(null);
const openDrawer = async (title: string, rowData: Partial<SkuInfo.Entity> = {}) => {
	const params = {
		title,
		rowData: { ...rowData },
		// api: title === "规格" ? () => {} :  undefined,
		getTableList: proTable.value.getTableList
	};
	drawerRef.value?.acceptParams(params);
};

const wareSkuClick = () => {
	router.replace("/stock/wareSku");
};
</script>
