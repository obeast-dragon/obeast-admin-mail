<template>
	<el-drawer v-model="drawerVisible" :destroy-on-close="true" size="600px" :title="`SKU详情`">
		<el-form ref="ruleFormRef" label-width="100px" label-suffix=" :" :rules="rules" :model="drawerProps.rowData">
			<!-- <el-form-item label="选择图集">
				<UploadImgs
					v-model:fileList="drawerProps.basicForm.spu.goodsImgs"
					height="100px"
					width="100px"
					style="float: left; margin-left: 10px"
				>
					<el-checkbox v-model="drawerProps.basicForm.spu.descImgs[0].url" :true-label="'img'" false-label></el-checkbox>
					<template #empty>
						<el-icon><Picture /></el-icon>
						<span>上传照片(可拖拽)</span>
					</template>
				</UploadImgs>
			</el-form-item> -->

			<!-- 折扣，满减，会员价 -->
			<el-form-item label="设置折扣">
				<label>满 </label>
				<el-input-number
					style="width: 160px"
					:min="0"
					controls-position="right"
					v-model="drawerProps.rowData.fullCount"
				></el-input-number>
				<label> 件</label>

				<label style="margin-left: 15px">打 </label>
				<el-input-number
					style="width: 160px"
					v-model="drawerProps.rowData.discount"
					:precision="2"
					:max="1"
					:min="0"
					:step="0.01"
					controls-position="right"
				></el-input-number>
				<label> 折</label>
				<el-checkbox v-model="drawerProps.rowData.countStatus" :true-label="1" :false-label="0">可叠加优惠</el-checkbox>
			</el-form-item>
			<el-form-item label="设置满减">
				<label>满 </label>
				<el-input-number
					style="width: 160px"
					v-model="drawerProps.rowData.fullPrice"
					:step="100"
					:min="0"
					controls-position="right"
				></el-input-number>
				<label> 元</label>
				<label style="margin-left: 15px">减 </label>
				<el-input-number
					style="width: 160px"
					v-model="drawerProps.rowData.reducePrice"
					:step="10"
					:min="0"
					controls-position="right"
				></el-input-number>
				<label> 元</label>
				<el-checkbox v-model="drawerProps.rowData.priceStatus" :true-label="1" :false-label="0"> 可叠加优惠</el-checkbox>
			</el-form-item>

			<el-form-item label="设置会员价" v-if="drawerProps.rowData.memberPrice.length > 0">
				<br />
				<el-form-item v-for="(mp, mpidx) in drawerProps.rowData.memberPrice" :key="mp.id">
					{{ mp.name }}
					<el-input-number
						style="width: 160px"
						v-model="drawerProps.rowData.memberPrice[mpidx].price"
						:precision="2"
						:min="0"
						controls-position="right"
					></el-input-number>
				</el-form-item>
			</el-form-item>
            <el-button>上传图片</el-button>
			<div style="display: flex; flex-flow: wrap; overflow: auto;">
				<el-card
					style="width: 170px; height: 170px"
					:body-style="{ padding: '0px' }"
					v-for="(img, index) in drawerProps.basicForm.spu.descImgs"
					:key="index"
				>
					<img :src="img.url" style="width: 170px; height: 120px" />
					<div style="padding: 14px">
						<el-checkbox v-model="drawerProps.basicForm.spu.descImgs[index].url" :true-label="img" false-label></el-checkbox>
						<el-tag style="margin-left: 10px;" v-if="drawerProps.basicForm.spu.descImgs[index].url == 1">
							<input
								type="radio"
								checked
								:name="drawerProps.rowData.skuName"
								@change="checkDefaultImg(drawerProps.rowData, index, img)"
							/>设为默认
						</el-tag>
						<el-tag v-else style="margin-left: 10px;">
							<input
								type="radio"
								:name="drawerProps.rowData.skuName"
								@change="checkDefaultImg(drawerProps.rowData, index, img)"
							/>设为默认
						</el-tag>
					</div>
				</el-card>
			</div>
		</el-form>
		<template #footer>
			<el-button @click="drawerVisible = false">取消</el-button>
			<el-button type="primary" @click="handleSubmit">确定</el-button>
		</template>
	</el-drawer>
</template>

<script setup lang="ts" name="UserDrawer">
import { ref, reactive } from "vue";
import { FormInstance } from "element-plus";
// import UploadImgs from "@/components/Upload/Imgs.vue";

const rules = reactive({
	postCode: [{ required: true, message: "请填写岗位编码" }],
	postName: [{ required: true, message: "请选择岗位名称" }]
});

interface DrawerProps {
	rowData: Partial<any>;
	basicForm: any;
	rowIndex: number;
}

const drawerVisible = ref(false);
const drawerProps = ref<DrawerProps>({
	basicForm: {},
	rowData: {},
	rowIndex: null
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const checkDefaultImg = (row: any, index: number, img: string) => {};

// 接收父组件传过来的参数
const acceptParams = (params: DrawerProps) => {
	console.log(params);
	drawerProps.value = params;
	drawerVisible.value = true;
};

// 提交数据（新增/编辑）
const ruleFormRef = ref<FormInstance>();
const handleSubmit = () => {
	console.log(drawerProps.value.rowData);
	drawerProps.value.basicForm.spu.skus[drawerProps.value.rowIndex] = drawerProps.value.rowData;
	console.log(drawerProps.value.basicForm.spu.skus);
};

defineExpose({
	acceptParams
});
</script>
