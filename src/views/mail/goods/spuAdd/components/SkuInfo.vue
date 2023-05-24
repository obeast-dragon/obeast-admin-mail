<template>
	<el-card class="box-card" style="width: 80%; margin: 20px auto">
		<el-table :data="spu.skus" style="width: 100%">
			<el-table-column label="属性组合">
				<el-table-column :label="item.attrName" v-for="(item, index) in dataResp.tableAttrColumn" :key="item.attrId">
					<template #default="scope">
						<span style="margin-left: 10px">{{ scope.row.attr[index].attrValue }}</span>
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
							<multi-upload
								style="float: left; margin-left: 10px"
								:showFile="false"
								:listType="'text'"
								v-model="uploadImages"
							></multi-upload>
						</el-col>
						<el-col :span="24">
							<el-divider></el-divider>
						</el-col>
						<el-col :span="24">
							<el-card
								style="width: 170px; float: left; margin-left: 15px; margin-top: 15px"
								:body-style="{ padding: '0px' }"
								v-for="(img, index) in spu.images"
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
									<label>满</label>
									<el-input-number
										style="width: 160px"
										:min="0"
										controls-position="right"
										v-model="scope.row.fullCount"
									></el-input-number>
									<label>件</label>

									<label style="margin-left: 15px">打</label>
									<el-input-number
										style="width: 160px"
										v-model="scope.row.discount"
										:precision="2"
										:max="1"
										:min="0"
										:step="0.01"
										controls-position="right"
									></el-input-number>
									<label>折</label>
									<el-checkbox v-model="scope.row.countStatus" :true-label="1" :false-label="0">可叠加优惠</el-checkbox>
								</el-form-item>
							</el-col>
							<el-col :span="24">
								<el-form-item label="设置满减">
									<label>满</label>
									<el-input-number
										style="width: 160px"
										v-model="scope.row.fullPrice"
										:step="100"
										:min="0"
										controls-position="right"
									></el-input-number>
									<label>元</label>
									<label style="margin-left: 15px">减</label>
									<el-input-number
										style="width: 160px"
										v-model="scope.row.reducePrice"
										:step="10"
										:min="0"
										controls-position="right"
									></el-input-number>
									<label>元</label>
									<el-checkbox v-model="scope.row.priceStatus" :true-label="1" :false-label="0">可叠加优惠</el-checkbox>
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
	</el-card>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// const skuListRef = ref([]);

const props = ref({
	tableAttrColumn: [],
	tempSaleAttrs: []
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const generateSkus = () => {
	//根据笛卡尔积运算进行生成sku
	let selectValues: any = [];
	props.value.tableAttrColumn = [];
	props.value.tempSaleAttrs.forEach(item => {
		if (item.attrValues.length > 0) {
			selectValues.push(item.attrValues);
			props.value.tableAttrColumn.push(item);
		}
	});

	let descartes = descartesFun(selectValues);
	//[["黑色","6GB","移动"],["黑色","6GB","联通"],["黑色","8GB","移动"],["黑色","8GB","联通"],
	//["白色","6GB","移动"],["白色","6GB","联通"],["白色","8GB","移动"],["白色","8GB","联通"],
	//["蓝色","6GB","移动"],["蓝色","6GB","联通"],["蓝色","8GB","移动"],["蓝色","8GB","联通"]]
	console.log("生成的组合", JSON.stringify(descartes));
	//有多少descartes就有多少sku
};

/**
 * 计算笛卡尔积
 * @param array 
 */
function descartesFun(array: any[]) {
  if (array.length < 2) return array[0] || [];
 
  return array.reduce((total, currentValue) => {
    let res:any = [];
 
    total.forEach((t: any) => {
      currentValue.forEach((cv: any) => {
        if (t instanceof Array) 	
          res.push([...t, cv]);
        else
          res.push([t, cv]);
      })
    })
    return res;
  })
}

</script>

<style lang="scss" scoped></style>
