<template>
	<el-table :data="skuRef" style="width: 100%">
		<el-table-column label="属性组合">
			<el-table-column :label="item.attrName" v-for="(item, index) in props.basicForm.tableAttrColumn" :key="item.attrId">
				<template #default="scope">
					<span style="margin-left: 10px">{{ scope.row.attr[index] }}</span>
				</template>
			</el-table-column>
		</el-table-column>
		<el-table-column label="商品名称" prop="skuName">
			<template #default="scope">
				<el-input v-model="scope.row.skuName"></el-input>
			</template>
		</el-table-column>
		<el-table-column label="标题" prop="skuTitle">
			<template #default="scope">
				<el-input v-model="scope.row.skuTitle"></el-input>
			</template>
		</el-table-column>
		<el-table-column label="副标题" prop="skuSubtitle">
			<template #default="scope">
				<el-input v-model="scope.row.skuSubtitle"></el-input>
			</template>
		</el-table-column>
		<el-table-column label="价格" prop="price">
			<template #default="scope">
				<el-input v-model="scope.row.price"></el-input>
			</template>
		</el-table-column>
		<el-table-column type="expand">
			<template #default="scope">
				<el-row>
					<el-col :span="24">
						<label style="display: block; float: left">选择图集 或</label>
						<UploadImgs
							v-model:fileList="props.basicForm.uploadImages"
							height="100px"
							width="100px"
							style="float: left; margin-left: 10px"
						>
							<template #empty>
								<el-icon><Picture /></el-icon>
								<span>上传照片(可拖拽)</span>
							</template>
						</UploadImgs>
					</el-col>
					<el-col :span="24">
						<el-divider></el-divider>
					</el-col>
					<el-col :span="24">
						<el-card
							style="width: 170px; float: left; margin-left: 15px; margin-top: 15px"
							:body-style="{ padding: '0px' }"
							v-for="(img, index) in props.basicForm.spu.descImgs"
							:key="index"
						>
							<img :src="img" style="width: 160px; height: 120px" />
							<div style="padding: 14px">
								<el-row>
									<el-col :span="12">
										<el-checkbox v-model="scope.row.images[index].imgUrl" :true-label="img" false-label></el-checkbox>
									</el-col>
									<el-col :span="12">
										<el-tag v-if="scope.row.images[index].defaultImg == 1">
											<input
												type="radio"
												checked
												:name="scope.row.skuName"
												@change="checkDefaultImg(scope.row, index, img)"
											/>设为默认
										</el-tag>
										<el-tag v-else>
											<input type="radio" :name="scope.row.skuName" @change="checkDefaultImg(scope.row, index, img)" />设为默认
										</el-tag>
									</el-col>
								</el-row>
							</div>
						</el-card>
					</el-col>
				</el-row>
				<!-- 折扣，满减，会员价 -->
				<el-form :model="scope.row">
					<el-row>
						<el-col :span="24">
							<el-form-item label="设置折扣">
								<label>满 </label>
								<el-input-number
									style="width: 160px"
									:min="0"
									controls-position="right"
									v-model="scope.row.fullCount"
								></el-input-number>
								<label> 件</label>

								<label style="margin-left: 15px">打 </label>
								<el-input-number
									style="width: 160px"
									v-model="scope.row.discount"
									:precision="2"
									:max="1"
									:min="0"
									:step="0.01"
									controls-position="right"
								></el-input-number>
								<label> 折</label>
								<el-checkbox v-model="scope.row.countStatus" :true-label="1" :false-label="0">可叠加优惠</el-checkbox>
							</el-form-item>
						</el-col>
						<el-col :span="24">
							<el-form-item label="设置满减">
								<label>满 </label>
								<el-input-number
									style="width: 160px"
									v-model="scope.row.fullPrice"
									:step="100"
									:min="0"
									controls-position="right"
								></el-input-number>
								<label> 元</label>
								<label style="margin-left: 15px">减 </label>
								<el-input-number
									style="width: 160px"
									v-model="scope.row.reducePrice"
									:step="10"
									:min="0"
									controls-position="right"
								></el-input-number>
								<label> 元</label>
								<el-checkbox v-model="scope.row.priceStatus" :true-label="1" :false-label="0"> 可叠加优惠</el-checkbox>
							</el-form-item>
						</el-col>

						<el-col :span="24">
							<el-form-item label="设置会员价" v-if="scope.row.memberPrice.length > 0">
								<br />
								<!--   @change="handlePriceChange(scope,mpidx,$event)" -->
								<el-form-item v-for="(mp, mpidx) in scope.row.memberPrice" :key="mp.id">
									{{ mp.name }}
									<el-input-number
										style="width: 160px"
										v-model="scope.row.memberPrice[mpidx].price"
										:precision="2"
										:min="0"
										controls-position="right"
									></el-input-number>
								</el-form-item>
							</el-form-item>
						</el-col>
					</el-row>
				</el-form>
			</template>
		</el-table-column>
	</el-table>
	<div>
		<el-button type="primary" @click="rollbackStepClick">上一步</el-button>
		<el-button type="success" @click="nextStepClick">下一步</el-button>
	</div>
</template>

<script setup lang="ts">
import { descartes } from "@/utils/util";
import { onMounted, ref } from "vue";
import UploadImgs from "@/components/Upload/Imgs.vue";

// 接收父组件参数并设置默认值
interface SalesProps {
	basicForm?: any;
}
const props = withDefaults(defineProps<SalesProps>(), {});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const checkDefaultImg = (row: any, index: number, img: string) => {};

const nextStepClick = () => {
	// props.basicForm.activeStep = 4;
};

const rollbackStepClick = () => {
	props.basicForm.activeStep = props.basicForm.activeStep - 1;
};

const skuRef = ref([]);
const generateSkus = () => {
	//根据笛卡尔积运算进行生成sku
	let attrTemp: any = [];
	props.basicForm.saleAttrs.forEach((item: any) => {
		attrTemp.push(item.attrValue);
	});
	let descartesList = descartes(attrTemp);
	console.log("descartesList", descartesList);
	// 会员价
	let memberPrices: any = [];
	if (props.basicForm.memberLevels.length > 0) {
		for (let i = 0; i < props.basicForm.memberLevels.length; i++) {
			if (props.basicForm.memberLevels[i].priviledgeMemberPrice == 1) {
				memberPrices.push({
					id: props.basicForm.memberLevels[i].id,
					name: props.basicForm.memberLevels[i].name,
					price: 0
				});
			}
		}
	}
	console.log("memberPrices", memberPrices);

	props.basicForm.saleAttrs.forEach((item: any) => {
		props.basicForm.tableAttrColumn.push({
			attrId: item.attrId,
			attrName: item.attrName,
			attrValue: item.attrValue,
			attrSort: item.sort,
			attr: descartesList
		});
	});
	console.log("tableAttrColumn", props.basicForm.tableAttrColumn);

	// sku
	descartesList.forEach((item: any) => {
		skuRef.value.push({
			attr: item,
			skuName: props.basicForm.spu.spuName + " " + item.join(" "),
			price: 0,
			skuTitle: props.basicForm.spu.spuName + " " + item.join(" "),
			skuSubtitle: "",
			images: "",
			descar: item,
			fullCount: 0,
			discount: 0,
			countStatus: 0,
			fullPrice: 0.0,
			reducePrice: 0.0,
			priceStatus: 0,
			memberPrice: [].concat(memberPrices)
		});
	});
	console.log("sku", skuRef.value);
};
onMounted(() => {
	generateSkus();
});
</script>

<style lang="scss" scoped></style>
