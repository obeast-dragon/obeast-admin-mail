<template>
	<el-drawer destroy-on-close v-model="drawerVisible" :show-close="false" size="600px" :title="`SKU详情`">
		<el-form label-width="100px" label-suffix=" :" :model="drawerProps.rowData">
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
			<div @click.once="uploadBefore">
				<BtnUpload :is-files="true" :image-urls="drawerProps.basicForm.spu.goodsImgs" />
			</div>
			<div style="display: flex; flex-flow: wrap; overflow: auto">
				<el-card
					style="width: 170px; height: 170px"
					:body-style="{ padding: '0px' }"
					v-for="(img, index) in drawerProps.basicForm.spu.goodsImgs"
					:key="index"
				>
					<img :src="img" style="width: 170px; height: 120px" />
					<div style="padding: 14px">
						<el-checkbox v-model="drawerProps.rowData.images[index].url" :true-label="img" false-label=""></el-checkbox>
						<el-tag style="margin-left: 10px" v-if="drawerProps.basicForm.spu.goodsImgs[index] == 1">
							<input
								type="radio"
								checked
								:name="drawerProps.rowData.skuName"
								@change="checkDefaultImg(drawerProps.rowData, index, img)"
							/>设为默认
						</el-tag>
						<el-tag v-else style="margin-left: 10px">
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
			<el-button type="primary" @click="confirmClick">确定</el-button>
		</template>
	</el-drawer>
</template>

<script setup lang="ts" name="UserDrawer">
import { ref } from "vue";
import BtnUpload from "@/components/Upload/Btn.vue";

const uploadBefore = () => {
	drawerProps.value.basicForm.spu.skus.forEach((item: any) => {
		item.images.push({ url: "", defaultImg: 0 });
	});
};

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

const checkDefaultImg = (row: any, index: number, img: string) => {
	console.log("默认图片", row, index);
	//这个图片被选中了，
	row.images[index].url = img; //默认选中
	row.images[index].defaultImg = 1; //修改标志位;
	//修改其他人的标志位
	row.images.forEach((item: any, idx: any) => {
		if (idx != index) {
			row.images[idx].defaultImg = 0;
		}
	});
};

// 接收父组件传过来的参数
const acceptParams = (params: DrawerProps) => {
	drawerProps.value = params;
	drawerVisible.value = true;
};

const confirmClick = () => {
	drawerProps.value.basicForm.spu.skus[drawerProps.value.rowIndex] = drawerProps.value.rowData
	drawerVisible.value = false;
};

defineExpose({
	acceptParams
});
</script>
