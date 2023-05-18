<template>
	<el-drawer v-model="drawerVisible" :destroy-on-close="true" size="500px" :title="`${drawerProps.title}客户端`">
		<el-form
			ref="ruleFormRef"
			label-width="100px"
			label-suffix=" :"
			:rules="rules"
			:disabled="drawerProps.isView"
			:model="drawerProps.rowData"
			:hide-required-asterisk="drawerProps.isView"
		>
			<el-form-item label="客户端ID" prop="clientId">
				<el-input v-model="drawerProps.rowData!.clientId" placeholder="请填写客户端ID" clearable></el-input>
			</el-form-item>
			<el-form-item label="客户端密钥" prop="clientSecret">
				<el-input v-model="drawerProps.rowData!.clientSecret" placeholder="请填写客户端密钥" clearable></el-input>
			</el-form-item>
			<el-form-item label="作用域" prop="scope">
				<el-input v-model="drawerProps.rowData!.scope" placeholder="请填写作用域" clearable></el-input>
			</el-form-item>
			<el-form-item label="授权方式" prop="authorizedGrantTypes">
				<el-select v-model="curGantTypes" value-key="authorizedGrantTypes" multiple placeholder="请选择授权方式">
					<el-option v-for="item in optionsGrantTypes" :key="item.key" :label="item.value" :value="item.key" />
				</el-select>
			</el-form-item>
			<el-form-item label-width="160px" label="请求令牌有效时间 (秒)" prop="accessTokenValidity">
				<el-input-number :min="0" v-model="drawerProps.rowData!.accessTokenValidity"></el-input-number>
			</el-form-item>
			<el-form-item label-width="160px" label="刷新令牌有效时间  (秒)" prop="refreshTokenValidity">
				<el-input-number :min="0" v-model="drawerProps.rowData!.refreshTokenValidity"></el-input-number>
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
import { Client } from "@/api/interface/client";

const curGantTypes = ref([]);

const optionsGrantTypes = ref([
	{
		value: "密码模式",
		key: "password"
	},
	{
		value: "授权码模式",
		key: "authorization_code"
	},
	{
		value: "客户端模式",
		key: "client_credentials"
	},
	{
		value: "刷新模式",
		key: "refresh_token"
	},
	{
		value: "App模式",
		key: "app"
	}
]);

const rules = reactive({
	postCode: [{ required: true, message: "请填写岗位编码" }],
	postName: [{ required: true, message: "请选择岗位名称" }]
});

interface DrawerProps {
	title: string;
	isView: boolean;
	rowData: Partial<Client.Entity>;
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
	curGantTypes.value = []; 
	if(drawerProps.value.title === '编辑' && drawerProps.value.rowData.authorizedGrantTypes !== null) {
		curGantTypes.value  = drawerProps.value.rowData.authorizedGrantTypes.split(",");
	}
};

// 提交数据（新增/编辑）
const ruleFormRef = ref<FormInstance>();
const handleSubmit = () => {
	ruleFormRef.value!.validate(async valid => {
		if (!valid) return;
		try {
			let grants = curGantTypes.value[0];
			for (let i = 1; i < curGantTypes.value.length; i++) {
				grants = grants + "," + curGantTypes.value[i];
			}
			drawerProps.value.rowData.authorizedGrantTypes = grants;
			await drawerProps.value.api!(drawerProps.value.rowData);
			ElMessage.success({ message: `${drawerProps.value.title}岗位成功！` });
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
