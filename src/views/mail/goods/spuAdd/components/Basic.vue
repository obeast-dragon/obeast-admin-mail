<template>
	<el-form :rules="rules" :inline="true" ref="basicFormRef" :model="props.basicForm">
		<el-form-item label="商品名称" prop="name">
			<el-input v-model="basicForm.name" placeholder="请填写商品名称" clearable />
		</el-form-item>
		<el-form-item label="商品描述" prop="desc">
			<el-input v-model="basicForm.desc" placeholder="请填写商品描述" clearable />
		</el-form-item>
		<el-form-item label="商品分类" prop="categroyId">
			<el-cascader
				ref="cascaderRef"
				v-model="basicForm.categroyId"
				style="width: 300px"
				:props="{ label: 'name', value: 'id', emitPath: false }"
				:options="categoryTreeRef"
				@change="handleCascader"
			/>
		</el-form-item>
		<el-form-item label="选择品牌" prop="brand">
			<el-select v-model="basicForm.brand" placeholder="请选择品牌">
				<el-option v-for="item in brandListRef" :key="item.brandId" :label="item.brandName" :value="item.brandId" />
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
import { listRelsByCategoryId} from "@/api/modules/mail/brand";
import { categoryTree } from "@/api/modules/mail/category";
import UploadImgs from "@/components/Upload/Imgs.vue";
import { onMounted, ref, reactive } from "vue";
import type { FormInstance } from "element-plus";

const rules = reactive({
	categroyId: [{ required: true, message: "请选择商品分类", trigger: "blur" }],
	brand: [{ required: true, message: "请选择品牌", trigger: "blur" }],
	name: [{ required: true, message: "请填写商品名称" }]
});
const basicFormRef = ref<FormInstance>();

const brandListRef = ref<Brand.BrandCategoryRels[]>([]);
const handleBrandList = async (categoryId: number) => {
	const { data } = await listRelsByCategoryId(categoryId);
	brandListRef.value = data;
};

const handleCascader = () => {
	let item = cascaderRef.value.getCheckedNodes()[0];
	if(item.value) handleBrandList(item.value);
};

const categoryTreeRef = ref<Category.Entity[]>([]);
const handleCategoryTree = async () => {
	const { data } = await categoryTree();
	categoryTreeRef.value = data;
};

const cascaderRef = ref();

// 接收父组件参数并设置默认值
interface BasicProps {
	basicForm?: any;
}
const props = withDefaults(defineProps<BasicProps>(), {});

onMounted(() => {
	handleCategoryTree();
});
defineExpose({ basicFormRef });
</script>
