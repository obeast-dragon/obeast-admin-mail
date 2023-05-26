<template>
	<el-form :rules="rules" ref="basicFormRef" :model="props.basicForm.spu">
		<el-form-item label="商品名称" prop="spuName">
			<el-input v-model="basicForm.spu.spuName" placeholder="请填写商品名称" clearable />
		</el-form-item>
		<el-form-item label="商品描述" prop="spuDesc">
			<el-input v-model="basicForm.spu.spuDesc" placeholder="请填写商品描述" clearable />
		</el-form-item>
		<el-form-item label="商品分类" prop="categoryId">
			<el-cascader
				ref="cascaderRef"
				v-model="basicForm.spu.categoryId"
				style="width: 300px"
				:props="{ label: 'name', value: 'id', emitPath: false }"
				:options="categoryTreeRef"
				@change="handleCascader"
			/>
		</el-form-item>
		<el-form-item label="选择品牌" prop="brandId">
			<el-select v-model="basicForm.spu.brandId" placeholder="请选择品牌">
				<el-option v-for="item in brandListRef" :key="item.brandId" :label="item.brandName" :value="item.brandId" />
			</el-select>
		</el-form-item>
		<el-form-item label="商品重量(kg)" prop="weight">
			<el-input-number v-model="basicForm.spu.weight" :precision="3" :step="0.001" />
		</el-form-item>
		<el-form-item label="设置积分" >
			<div>
				金币 <el-input-number v-model="basicForm.spu.buyBounds" controls-position="right" /> 成长值
				<el-input-number v-model="basicForm.spu.growBounds" controls-position="right" />
			</div>
		</el-form-item>
		<el-form-item label="商品介绍" prop="descImgs">
			<UploadImgs v-model:fileList="basicForm.descImgsTemp" height="100px" width="100px">
				<template #empty>
					<el-icon><Picture /></el-icon>
					<span>上传照片(可拖拽)</span>
				</template>
			</UploadImgs>
		</el-form-item>
		<el-form-item label="商品图集" prop="goodsImgs">
			<UploadImgs :file-size="10" v-model:fileList="basicForm.goodsImgsTemp" height="100px" width="100px">
				<template #empty>
					<el-icon><Picture /></el-icon>
					<span>上传照片(可拖拽)</span>
				</template>
			</UploadImgs>
		</el-form-item>
	</el-form>
	<div>
		<el-button type="success" @click="nextStepClick">下一步</el-button>
	</div>
</template>

<script setup lang="ts">
import { Brand } from "@/api/interface/mail/brand";
import { Category } from "@/api/interface/mail/category";
import { listRelsByCategoryId } from "@/api/modules/mail/brand";
import { categoryTree } from "@/api/modules/mail/category";
import UploadImgs from "@/components/Upload/Imgs.vue";
import { onMounted, ref, reactive } from "vue";
import type { FormInstance } from "element-plus";

const rules = reactive({
	spuName: [{ required: true, message: "请填写商品名称" }],
	spuDesc: [{ required: true, message: "请选择品牌" }],
	categoryId: [{ required: true, message: "请选择商品分类" }],
	brandId: [{ required: true, message: "请选择品牌" }],
});
const basicFormRef = ref<FormInstance>();

const brandListRef = ref<Brand.BrandCategoryRels[]>([]);
const handleBrandList = async (categoryId: number) => {
	const { data } = await listRelsByCategoryId(categoryId);
	brandListRef.value = data;
};

const handleCascader = () => {
	let item = cascaderRef.value.getCheckedNodes()[0];
	if (item.value) handleBrandList(item.value);
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

const nextStepClick = () => {
	basicFormRef.value.validate(async (valid: any) => {
		if (!valid) return;
		props.basicForm.spu.descImgs = props.basicForm.descImgsTemp.flatMap((item: any) => item.url);
		props.basicForm.spu.goodsImgs = props.basicForm.goodsImgsTemp.flatMap((item: any) => item.url);
		props.basicForm.activeStep = 1;
		console.log("basicForm", props.basicForm);
	});
};

onMounted(() => {
	handleCategoryTree();
});
defineExpose({
	basicFormRef
});
</script>
