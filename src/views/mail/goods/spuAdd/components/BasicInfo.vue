<!-- <template>
	<el-form ref="ruleFormRef" :model="ruleForm" label-width="140px">
		<el-form-item label="商品名称" prop="name">
			<el-input v-model="ruleForm.name" />
		</el-form-item>
		<el-form-item label="商品描述" prop="phone">
			<el-input v-model="ruleForm.phone" placeholder="Activity phone" />
		</el-form-item>
		<el-form-item label="选择分类" prop="region">
			<el-select v-model="ruleForm.region" placeholder="Activity zone">
				<el-option label="Zone one" value="shanghai" />
				<el-option label="Zone two" value="beijing" />
			</el-select>
		</el-form-item>
		<el-form-item label="选择品牌" prop="region">
			<el-select v-model="ruleForm.region" placeholder="Activity zone">
				<el-option label="Zone one" value="shanghai" />
				<el-option label="Zone two" value="beijing" />
			</el-select>
		</el-form-item>
		<el-form-item label="商品重量(kg)" prop="phone">
			<el-input-number v-model="ruleForm.phone" :precision="3" :step="0.001" />
		</el-form-item>
		<el-form-item label="设置积分" prop="phone">
			<el-input-number v-model="ruleForm.phone" controls-position="right" />
			<el-input-number v-model="ruleForm.phone" controls-position="right" />
		</el-form-item>
		<el-form-item label="商品介绍" prop="phone">
			<UploadImgs v-model:fileList="fileList" height="100px" width="100px">
				<template #empty>
					<el-icon><Picture /></el-icon>
					<span>上传照片(可拖拽)</span>
				</template>
			</UploadImgs>
		</el-form-item>
		<el-form-item label="商品图集" prop="phone">
			<UploadImgs v-model:fileList="fileList" height="100px" width="100px">
				<template #empty>
					<el-icon><Picture /></el-icon>
					<span>上传照片(可拖拽)</span>
				</template>
			</UploadImgs>
		</el-form-item>
	</el-form>
</template>

<script setup lang="ts">
import UploadImgs from "@/components/Upload/Imgs.vue";

interface BasicInfoProps extends Partial<any> {
}

</script>
 -->
