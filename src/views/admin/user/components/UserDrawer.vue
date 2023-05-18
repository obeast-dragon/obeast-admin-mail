<template>
	<el-drawer v-model="drawerVisible" :destroy-on-close="true" size="450px" :title="`${drawerProps.title}用户`">
		<el-form
			ref="ruleFormRef"
			label-width="100px"
			label-suffix=" :"
			:rules="rules"
			:disabled="drawerProps.isView"
			:model="drawerProps.rowData"
			:hide-required-asterisk="drawerProps.isView"
		>
			<el-form-item label="用户头像" prop="avatar">
				<UploadImg v-model:imageUrl="drawerProps.rowData!.avatar" width="135px" height="135px" :file-size="3">
					<template #empty>
						<el-icon><Avatar /></el-icon>
						<span>请上传头像</span>
					</template>
					<template #tip> 头像大小不能超过 3M </template>
				</UploadImg>
			</el-form-item>
			<el-form-item label="用户名" prop="username">
				<el-input :disabled="drawerProps.title === '编辑' ? true : false"  v-model="drawerProps.rowData!.username" placeholder="请填写用户姓名" clearable></el-input>
			</el-form-item>
			<el-form-item label="姓名" prop="name">
				<el-input v-model="drawerProps.rowData!.name" placeholder="请填写姓名" clearable></el-input>
			</el-form-item>
			<el-form-item label="密码" prop="password">
				<el-input v-model="drawerProps.rowData!.password" placeholder="请填写密码" clearable></el-input>
			</el-form-item>
			<el-form-item label="手机号" prop="phone">
				<el-input v-model="drawerProps.rowData!.phone" placeholder="请填写手机号" clearable></el-input>
			</el-form-item>
			<el-form-item label="部门" prop="deptName">
				<el-tree-select
					v-model="drawerProps.rowData.deptId"
					:data="optionsDeptTree"
					:props="{ value: 'id', label: 'name' }"
					highlight-current
					check-strictly
				/>
			</el-form-item>
			<el-form-item label="岗位" prop="postId">
				<el-select
				v-model="drawerProps.rowData.postList"
				value-key="postId" 
				multiple
				placeholder="请选择岗位"
				>
					<el-option
						v-for="item in optionsPostList"
						:key="item.postId"
						:label="item.postName"
						:value="item"
					/>
				</el-select>
			</el-form-item>
			<el-form-item label="角色" prop="roleId">
				<el-select
				v-model="drawerProps.rowData.roleList"
				value-key="roleId" 
				multiple
				placeholder="请选择角色"
				>
					<el-option
						v-for="item in optionsRoleList"
						:key="item.roleId"
						:label="item.roleName"
						:value="item"
					/>
				</el-select>
			</el-form-item>
			<el-form-item label="邮箱" prop="email">
				<el-input v-model="drawerProps.rowData!.email" placeholder="请填写邮箱" clearable></el-input>
			</el-form-item>
			<el-form-item label="状态" prop="delFlag">
				<el-radio-group v-model="drawerProps.rowData!.delFlag">
					<el-radio label="0">有效</el-radio>
					<el-radio label="1">禁用</el-radio>
				</el-radio-group>
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
import { User } from "@/api/interface/user";
import { deptTree } from "@/api/modules/dept";
import { getPostList } from "@/api/modules/post";
import { Post } from "@/api/interface/post";
import { Department } from "@/api/interface/dept";
import { Role } from "@/api/interface/role";
import { getRoleList } from "@/api/modules/role";
import UploadImg from "@/components/Upload/Img.vue";

onMounted(() => {
	init();
});

const optionsDeptTree = ref<Department.Res[]>([]);

const optionsPostList = ref<Post.Res[]>([]);

const optionsRoleList = ref<Role.Res[]>([]);

const init = async () => {
	const dept = await deptTree({});
	const post = await getPostList();
	const role = await getRoleList();

	optionsDeptTree.value = dept.data;
	optionsPostList.value = post.data;
	optionsRoleList.value = role.data;
};

const rules = reactive({
	// avatar: [{ required: true, message: "请上传用户头像" }],
	photo: [{ required: true, message: "请上传用户照片" }],
	username: [{ required: true, message: "请填写用户姓名" }],
	gender: [{ required: true, message: "请选择性别" }],
	idCard: [{ required: true, message: "请填写身份证号" }],
	email: [{ required: true, message: "请填写邮箱" }],
	address: [{ required: true, message: "请填写居住地址" }]
});

interface DrawerProps {
	title: string;
	isView: boolean;
	rowData: Partial<User.UserVO>;
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
		try {
			await drawerProps.value.api!(drawerProps.value.rowData);
			ElMessage.success({ message: `${drawerProps.value.title}用户成功！` });
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
