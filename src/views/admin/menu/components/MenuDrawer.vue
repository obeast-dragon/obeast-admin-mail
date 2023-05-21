<template>
	<el-drawer v-model="drawerVisible" :destroy-on-close="true" size="450px" :title="`${drawerProps.title}菜单`">
		<el-form
			ref="ruleFormRef"
			label-width="100px"
			label-suffix=" :"
			:rules="rules"
			:disabled="drawerProps.isView"
			:model="drawerProps.rowData"
			:hide-required-asterisk="drawerProps.isView"
		>
			<el-form-item label="类型" prop="type">
				<el-radio-group v-model="drawerProps.rowData!.type">
					<el-radio label="0">菜单</el-radio>
					<el-radio label="1">按钮</el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item label="菜单名称" prop="name">
				<el-input v-model="drawerProps.rowData!.name" placeholder="请填写菜单名称"></el-input>
			</el-form-item>
			<el-form-item label="排序" prop="sortOrder">
				<el-input-number controls-position="right" :min="0" v-model="drawerProps.rowData!.sortOrder"></el-input-number>
			</el-form-item>
			<el-form-item label="显示" prop="delFlag">
				<el-radio-group v-model="drawerProps.rowData!.delFlag">
					<el-radio label="0">是</el-radio>
					<el-radio label="1">否</el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item label="上级菜单" prop="parentId">
				<el-tree-select
					v-model="drawerProps.rowData.parentId"
					:data="drawerProps.options"
					:props="{ value: 'id', label: 'name' }"
					highlight-current
					check-strictly
				/>
			</el-form-item>
			<el-form-item v-if="drawerProps.rowData!.type === '0'" label="缓存" prop="keepAlive">
				<el-radio-group v-model="drawerProps.rowData!.keepAlive">
					<el-radio label="0">是</el-radio>
					<el-radio label="1">否</el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item v-if="drawerProps.rowData!.type === '0'" label="路由" prop="path">
				<el-input v-model="drawerProps.rowData!.path" placeholder="请填写路由" clearable></el-input>
			</el-form-item>
			<el-form-item v-if="drawerProps.rowData!.type === '0'" label="图标" prop="icon">
				<el-select allow-create filterable v-model="drawerProps.rowData!.icon" placeholder="请填写图标">
					<template #prefix>
						<el-icon>
							<component :is="drawerProps.rowData!.icon"></component>
						</el-icon>
					</template>
					<el-option v-for="item in optionsIcon" :key="item.value" :label="item.label" :value="item.value">
						<div>
							<el-icon>
								<component :is="item.label"></component>
							</el-icon>
							{{ item.label }}
						</div>
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item v-if="drawerProps.rowData!.type === '1'" label="权限标识" prop="icon">
				<el-input v-model="drawerProps.rowData!.permission" placeholder="请填写权限标识" clearable></el-input>
			</el-form-item>
		</el-form>
		<template #footer>
			<el-button @click="drawerVisible = false">取消</el-button>
			<el-button type="primary" v-show="!drawerProps.isView" @click="handleSubmit">确定</el-button>
		</template>
	</el-drawer>
</template>

<script setup lang="ts" name="UserDrawer">
import { ref, reactive, onMounted } from "vue";
import { ElMessage, FormInstance } from "element-plus";
import { Menu } from "@/api/interface/admin/menu";
import * as Icons from "@element-plus/icons-vue";

const optionsIcon: any[] = [];

onMounted(() => {
	initIcons();
});

function initIcons() {
	Object.keys(Icons).forEach(key => {
		optionsIcon.push({
			value: key,
			label: key
		});
	});
}

const rules = reactive({
	name: [{ required: true, message: "请填写菜单名称" }],
	type: [{ required: true, message: "请选择菜单类型" }],
});

interface DrawerProps {
	title: string;
	isView: boolean;
	rowData: Partial<Menu.Res>;
	api?: (params: any) => Promise<any>;
	getTableList?: () => void;
	options: any;
}

const drawerVisible = ref(false);
const drawerProps = ref<DrawerProps>({
	isView: false,
	title: "",
	rowData: {},
	options: {}
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
		try {
			await drawerProps.value.api!(drawerProps.value.rowData);
			ElMessage.success({ message: `${drawerProps.value.title}菜单成功！` });
			drawerProps.value.getTableList!();
			drawerVisible.value = false;
		} catch (error) {
			console.log(error);
		}
	});
};

defineExpose({
	acceptParams
});
</script>
