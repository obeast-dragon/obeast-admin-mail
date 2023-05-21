<template>
	<div class="card content-box">
		<el-steps style="width: 100%" :active="2" finish-status="success">
			<el-step title="基本信息" />
			<el-step title="规格参数" />
			<el-step title="销售属性" />
			<el-step title="SKU信息" />
			<el-step title="保存完成" />
		</el-steps>
		<div class="form-box">
			<div class="form-title"></div>
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
				<el-form-item>
					<el-button type="primary" @click="submitForm(ruleFormRef)">Create</el-button>
					<el-button @click="resetForm(ruleFormRef)">Reset</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script setup lang="ts" name="dynamicForm">
import { reactive, ref } from "vue";
import type { FormInstance } from "element-plus";
import { ElMessage } from "element-plus";
import UploadImgs from "@/components/Upload/Imgs.vue";

const fileList = ref([
	{ name: "img", url: "https://i.imgtg.com/2023/01/16/QRBHS.jpg" },
	{ name: "img", url: "https://i.imgtg.com/2023/01/16/QRBHS.jpg" },
	{ name: "img", url: "https://i.imgtg.com/2023/01/16/QRBHS.jpg" },
	{ name: "img", url: "https://i.imgtg.com/2023/01/16/QRBHS.jpg" }
]);

const ruleFormRef = ref<FormInstance>();
const ruleForm = reactive({
	name: "Geeker-Admin",
	phone: "",
	region: "",
	date1: "",
	date2: "",
	delivery: false,
	resource: "",
	desc: ""
});
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const submitForm = async (formEl: FormInstance | undefined) => {
	if (!formEl) return;
	await formEl.validate((valid, fields) => {
		if (valid) {
			ElMessage.success("提交的数据为 : " + JSON.stringify(ruleForm));
		} else {
			console.log("error submit!", fields);
		}
	});
};
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const resetForm = (formEl: FormInstance | undefined) => {
	if (!formEl) return;
	formEl.resetFields();
};
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
