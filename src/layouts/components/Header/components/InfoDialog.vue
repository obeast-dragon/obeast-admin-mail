<template>
	<el-dialog v-model="dialogVisible" title="个人信息" width="500px" draggable>
		<el-form ref="ruleFormRef" label-suffix=" :" :rules="rules" :model="globalStore.userInfo">
			<el-form-item label="用户头像" prop="avatar">
				<UploadImg v-model:imageUrl="globalStore.userInfo.avatar" width="135px" height="135px" :file-size="3">
					<template #empty>
						<el-icon><Avatar /></el-icon>
						<span>请上传头像</span>
					</template>
					<template #tip> 头像大小不能超过 3M </template>
				</UploadImg>
			</el-form-item>
			<el-form-item label="用户名" prop="username">
				<el-input v-model="globalStore.userInfo.username" disabled></el-input>
			</el-form-item>
			<el-form-item label="手机" prop="phone">
				<el-input v-model="globalStore.userInfo.phone" placeholder="请填写手机"></el-input>
			</el-form-item>
		</el-form>
		<template #footer>
			<span class="dialog-footer">
				<el-button @click="dialogVisible = false">取消</el-button>
				<el-button type="primary" @click="dialogVisible = false">确认</el-button>
			</span>
		</template>
	</el-dialog>
</template>

<script setup lang="ts">
import { GlobalStore } from "@/stores";
import { FormInstance } from "element-plus";
import { reactive, ref } from "vue";
import UploadImg from "@/components/Upload/Img.vue";

const globalStore = GlobalStore();

const rules = reactive({
	postCode: [{ required: true, message: "请填写岗位编码" }],
	postName: [{ required: true, message: "请选择岗位名称" }]
});

const dialogVisible = ref(false);

// 提交数据（新增/编辑）
const ruleFormRef = ref<FormInstance>();
// const handleSubmit = () => {
// 	ruleFormRef.value!.validate(async valid => {
// 		if (!valid) return;
// 		try {
// 			let grants = curGantTypes.value[0];
// 			for (let i = 1; i < curGantTypes.value.length; i++) {
// 				grants = grants + "," + curGantTypes.value[i];
// 			}
// 			drawerProps.value.rowData.authorizedGrantTypes = grants;
// 			await drawerProps.value.api!(drawerProps.value.rowData);
// 			ElMessage.success({ message: `${drawerProps.value.title}岗位成功！` });
// 			drawerProps.value.getTableList!();
// 			drawerVisible.value = false;
// 		} catch (error) {
// 			console.log(error);
// 		}
// 	});
// };

// openDialog
const openDialog = () => {
	dialogVisible.value = true;
};

defineExpose({ openDialog });
</script>
