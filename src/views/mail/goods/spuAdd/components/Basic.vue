<template>
	<el-form :inline="true" ref="basicFormRef" :model="basicForm">
		<el-form-item label="商品名称" prop="name">
			<el-input v-model="basicForm.name" placeholder="请填写商品名称"  clearable />
		</el-form-item>
		<el-form-item label="商品描述" prop="desc">
			<el-input v-model="basicForm.desc" placeholder="请填写商品描述"  clearable />
		</el-form-item>
		<el-form-item label="商品分类" prop="categroyTree">
			<div id="categroy-tree">
				<el-select ref="selectRef" v-model="selectTreeV2Prop.currentNodeLabel" placeholder="请选择分类">
					<el-option style="height: auto; padding: 0">
						<el-tree-v2
							@node-click="nodeClick"
							:current-node-key="selectTreeV2Prop.currentNodeKey"
							:data="categoryTreeRef"
							:props="{ value: 'id', label: 'name' }"
						/>
					</el-option>
				</el-select>
			</div>
		</el-form-item>
		<el-form-item label="选择品牌" prop="brand">
			<el-select v-model="basicForm.brand" placeholder="请选择品牌">
				<el-option v-for="item in brandListRef" :key="item.brandId" :label="item.name" :value="item.brandId" />
			</el-select>
		</el-form-item>
		<el-form-item label="商品重量(kg)" prop="weight">
			<el-input-number v-model="basicForm.weight" :precision="3" :step="0.001" />
		</el-form-item>
		<el-form-item label="设置积分">
			<div>
				金币 <el-input-number v-model="basicForm.species" controls-position="right" /> 成长值
				<el-input-number v-model="basicForm.growthValue" controls-position="right" />
			</div>
		</el-form-item>
		<el-form-item label="商品介绍" prop="descImgs">
			<UploadImgs v-model:fileList="basicForm.descImgs" height="100px" width="100px">
				<template #empty>
					<el-icon><Picture /></el-icon>
					<span>上传照片(可拖拽)</span>
				</template>
			</UploadImgs>
		</el-form-item>
		<el-form-item label="商品图集" prop="goodsImgs">
			<UploadImgs v-model:fileList="basicForm.goodsImgs" height="100px" width="100px">
				<template #empty>
					<el-icon><Picture /></el-icon>
					<span>上传照片(可拖拽)</span>
				</template>
			</UploadImgs>
		</el-form-item>
	</el-form>
</template>

<script setup lang="ts">
import { Brand } from "@/api/interface/mail/brand";
import { Category } from "@/api/interface/mail/category";
import { brandList } from "@/api/modules/mail/brand";
import { categoryTree } from "@/api/modules/mail/category";
import UploadImgs from "@/components/Upload/Imgs.vue";
import { FormInstance } from "element-plus";
import { onMounted, reactive, ref } from "vue";
import { TreeNodeData } from "element-plus/es/components/tree/src/tree.type";

const selectTreeV2Prop = reactive({
	currentNodeKey: 1,
	currentNodeLabel: ""
});

const selectRef = ref();

const brandListRef = ref<Brand.Entity[]>([]);

const categoryTreeRef = ref<Category.Entity[]>([]);

const basicFormRef = ref<FormInstance>();

const nodeClick = (data: TreeNodeData) => {
	selectTreeV2Prop.currentNodeKey = data.id;
	selectTreeV2Prop.currentNodeLabel = data.name;
	selectRef.value.blur();
};

const basicForm = reactive({
	name: "",
	desc: "",
	categroyTree: null,
	brand: "",
	weight: 0,
	species: 0,
	growthValue: 0,
	descImgs: [
		{ name: "img", url: "https://i.imgtg.com/2023/01/16/QRBHS.jpg" },
		{ name: "img", url: "https://i.imgtg.com/2023/01/16/QRBHS.jpg" },
		{ name: "img", url: "https://i.imgtg.com/2023/01/16/QRBHS.jpg" },
		{ name: "img", url: "https://i.imgtg.com/2023/01/16/QRBHS.jpg" }
	],
	goodsImgs: [
		{ name: "img", url: "https://i.imgtg.com/2023/01/16/QRBHS.jpg" },
		{ name: "img", url: "https://i.imgtg.com/2023/01/16/QRBHS.jpg" },
		{ name: "img", url: "https://i.imgtg.com/2023/01/16/QRBHS.jpg" },
		{ name: "img", url: "https://i.imgtg.com/2023/01/16/QRBHS.jpg" }
	]
});

const handleBrandList = async () => {
	const { data } = await brandList();
	brandListRef.value = data;
};
const handleCategoryTree = async () => {
	const { data } = await categoryTree();
	categoryTreeRef.value = data;
};

onMounted(() => {
	handleBrandList();
	handleCategoryTree();
});
</script>
