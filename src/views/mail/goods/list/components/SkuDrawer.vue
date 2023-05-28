<template>
	<el-drawer v-model="drawerVisible" :destroy-on-close="true" size="700px" :title="`${drawerProps.title}Spu`">
		<el-form
			ref="ruleFormRef"
			label-width="100px"
			label-suffix=" :"
			:rules="rules"
			:disabled="drawerProps.isView"
			:model="drawerProps.rowData"
			:hide-required-asterisk="drawerProps.isView"
			v-if="drawerProps.title !== '关联'"
		>
			<el-form-item label="商品名称" prop="skuName">
				<el-input v-model="drawerProps.rowData!.skuName" placeholder="请填写商品名称" clearable></el-input>
			</el-form-item>
			<el-form-item label="默认图片" prop="skuDefaultImg">
				<UploadImg v-model:imageUrl="drawerProps.rowData!.skuDefaultImg" width="135px" height="135px" :file-size="3">
					<template #empty>
						<el-icon><Avatar /></el-icon>
						<span>请上传Logo</span>
					</template>
					<template #tip> 图片大小不能超过 3M </template>
				</UploadImg>
			</el-form-item>
			<el-form-item label="价格" prop="price">
				<el-input-number v-model="drawerProps.rowData!.price"  clearable></el-input-number>
			</el-form-item>
			<el-form-item label="销量" prop="saleCount">
				<el-input-number v-model="drawerProps.rowData!.saleCount"  clearable></el-input-number>
			</el-form-item>
			<el-form-item label="所属分类Id" prop="categoryId">
				<el-input v-model="drawerProps.rowData!.categoryId" placeholder="请填写检索首字母" clearable></el-input>
			</el-form-item>
			<el-form-item label="所属品牌Id" prop="brandId">
				<el-input v-model="drawerProps.rowData!.brandId" placeholder="请填写检索首字母" clearable></el-input>
			</el-form-item>
		</el-form>
		<template #footer>
			<el-button @click="drawerVisible = false">取消</el-button>
			<el-button type="primary" v-show="!drawerProps.isView" @click="handleSubmit">确定</el-button>
		</template>
	</el-drawer>
</template>

<script setup lang="ts" name="UserDrawer">
import { ref, reactive } from "vue";
import { ElMessage, FormInstance } from "element-plus";
import { SkuInfo } from "@/api/interface/mail/skuInfo";
import UploadImg from "@/components/Upload/Img.vue";

const rules = reactive({
	postCode: [{ required: true, message: "请填写Spu编码" }],
	name: [{ required: true, message: "请选择Spu名称" }]
});

interface DrawerProps {
	title: string;
	isView?: boolean;
	rowData: Partial<SkuInfo.Entity>;
	api?: (params: any) => Promise<any>;
	getTableList?: () => void;
}

const drawerVisible = ref(false);
const drawerProps = ref<DrawerProps>({
	isView: false,
	title: "",
	rowData: {}
});

// 接收父组件传过来的参数
const acceptParams = (params: DrawerProps) => {
	drawerProps.value = params;
	drawerVisible.value = true;
};

// 提交数据（新增/编辑）
const ruleFormRef = ref<FormInstance>();
const handleSubmit = () => {
	ruleFormRef.value!.validate(async valid => {
		if (!valid) return;
		await drawerProps.value.api!(drawerProps.value.rowData);
		ElMessage.success({ message: `${drawerProps.value.title}Spu成功！` });
		drawerProps.value.getTableList!();
		drawerVisible.value = false;
	});
};

defineExpose({
	acceptParams
});
</script>
