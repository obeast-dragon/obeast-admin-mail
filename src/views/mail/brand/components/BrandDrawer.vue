<template>
	<el-drawer v-model="drawerVisible" :destroy-on-close="true" size="700px" :title="`${drawerProps.title}品牌`">
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
			<el-form-item label="品牌名称" prop="name">
				<el-input v-model="drawerProps.rowData!.name" placeholder="请填写品牌名称" clearable></el-input>
			</el-form-item>
			<el-form-item label="品牌logo" prop="logo">
				<UploadImg v-model:imageUrl="drawerProps.rowData!.logo" width="135px" height="135px" :file-size="3">
					<template #empty>
						<el-icon><Avatar /></el-icon>
						<span>请上传Logo</span>
					</template>
					<template #tip> 头像大小不能超过 3M </template>
				</UploadImg>
			</el-form-item>
			<el-form-item label="检索首字母" prop="firstLetter">
				<el-input v-model="drawerProps.rowData!.firstLetter" placeholder="请填写检索首字母" clearable></el-input>
			</el-form-item>
			<el-form-item label="品牌排序" prop="sort">
				<el-input-number v-model="drawerProps.rowData!.sort" :min="0" clearable></el-input-number>
			</el-form-item>
			<el-form-item label="显示" prop="showStatus">
				<el-radio-group v-model="drawerProps.rowData!.showStatus">
					<el-radio :label="0">是</el-radio>
					<el-radio :label="1">否</el-radio>
				</el-radio-group>
			</el-form-item>
		</el-form>
		<div v-else>
			<div style="margin-bottom: 10px">
				<el-button type="success" @click="onAddItem">新增关联</el-button>
			</div>
			<el-table :data="drawerProps.relsList" style="width: 100%">
				<el-table-column fixed prop="id" label="id" width="50" />
				<el-table-column align="center" prop="catelogName" label="分类名" width="330">
					<template #default="scope">
						<el-cascader
							ref="cascaderRef"
							style="width: 300px"
							checkStrictly
							:props="{ label: 'name', value: 'id', emitPath: false }"
							v-model="scope.row.catelogId"
							:options="categoryTreeRef"
							@change="handleCascader"
						/>
					</template>
				</el-table-column>
				<el-table-column prop="brandName" label="品牌名" width="200" />
				<el-table-column fixed="right" label="操作" width="80">
					<template #default="scope">
						<el-button type="danger" size="small" @click.prevent="handleClickDetail(scope.$index)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<template #footer>
			<el-button @click="drawerVisible = false">取消</el-button>
			<el-button type="primary" v-show="!drawerProps.isView" @click="handleSubmit">确定</el-button>
		</template>
	</el-drawer>
</template>

<script setup lang="ts" name="UserDrawer">
import { ref, reactive, onMounted } from "vue";
import { Brand } from "@/api/interface/mail/brand";
import UploadImg from "@/components/Upload/Img.vue";
import { categoryTree } from "@/api/modules/mail/category";
import { Category } from "@/api/interface/mail/category";
import { ElMessage, FormInstance } from "element-plus";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { updateCategoryBrandRel } from "@/api/modules/mail/brand";

const cascaderRef = ref();

const categoryTreeRef = ref<Category.Entity[]>([]);

const rules = reactive({
	postCode: [{ required: true, message: "请填写品牌编码" }],
	name: [{ required: true, message: "请选择品牌名称" }]
});

interface DrawerProps {
	title: string;
	isView: boolean;
	rowData: Partial<Brand.Entity>;
	api?: (params: any) => Promise<any>;
	getTableList?: () => void;
	relsList: Brand.BrandCategoryRels[];
}
const initCategoryTree = async () => {
	const { data } = await categoryTree();
	categoryTreeRef.value = data;
};

const drawerVisible = ref(false);
const drawerProps = ref<DrawerProps>({
	isView: false,
	title: "",
	rowData: {},
	relsList: []
});

// 接收父组件传过来的参数
const acceptParams = (params: DrawerProps) => {
	drawerProps.value = params;
	drawerVisible.value = true;
};

// 提交数据（新增/编辑）
const ruleFormRef = ref<FormInstance>();
const handleSubmit = () => {
	try {
		if (drawerProps.value.title === "关联") {
			updateCategoryBrandRel(drawerProps.value.rowData.brandId, drawerProps.value.relsList);
			ElMessage.success({ message: `${drawerProps.value.title}品牌成功！` });
			drawerProps.value.getTableList!();
			drawerVisible.value = false;
		} else {
			ruleFormRef.value!.validate(async valid => {
				if (!valid) return;
				await drawerProps.value.api!(drawerProps.value.rowData);
				ElMessage.success({ message: `${drawerProps.value.title}品牌成功！` });
				drawerProps.value.getTableList!();
				drawerVisible.value = false;
			});
		}
	} catch (error) {
		console.log(error);
	}
};

const handleClickDetail = (index: number) => {
	drawerProps.value.relsList.splice(index, 1);
};

const onAddItem = () => {
	drawerProps.value.relsList.push({
		brandId: drawerProps.value.rowData.brandId,
		catelogId: null,
		catelogName: "",
		brandName: drawerProps.value.rowData.name
	});
};

const handleCascader = () => {
	let item = cascaderRef.value.getCheckedNodes()[0];
	let rels = drawerProps.value.relsList.at(-1);
	rels.catelogName = item.label;
};

onMounted(() => {
	initCategoryTree();
});

defineExpose({
	acceptParams
});
</script>
