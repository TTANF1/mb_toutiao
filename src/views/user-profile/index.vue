<template>
  <div class="user-profile">
    <van-nav-bar
      class="page-nav-bar"
      title="个人信息"
      left-arrow
      :border="false"
      @click-left="$router.back()"
    />

    <input
      ref="avaterFileRef"
      type="file"
      hidden
      @change="onAvaterFileChange"
    />

    <van-cell title="头像" is-link @click="$refs.avaterFileRef.click()">
      <van-image class="avater" fit="cover" :src="user.photo" round />
    </van-cell>
    <van-cell
      title="昵称"
      :value="user.name"
      is-link
      @click="isEditNameShow = true"
    />
    <van-cell
      title="性别"
      :value="['男', '女'][user.gender]"
      is-link
      @click="isUpdateGenderShow = true"
    />
    <van-cell
      title="生日"
      :value="user.birthday"
      is-link
      @click="isUpdateBirthdayShow = true"
    />

    <!-- 编辑昵称 -->
    <van-popup
      v-model="isEditNameShow"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <edit-name
        v-if="isEditNameShow"
        v-model="user.name"
        @close="isEditNameShow = false"
      />
    </van-popup>
    <!-- /编辑昵称 -->

    <!-- 编辑性别 -->
    <van-popup v-model="isUpdateGenderShow" position="bottom">
      <update-gender
        v-if="isUpdateGenderShow"
        v-model="user.gender"
        @close="isUpdateGenderShow = false"
      />
    </van-popup>
    <!-- /编辑性别 -->

    <!-- 编辑生日 -->
    <van-popup v-model="isUpdateBirthdayShow" position="bottom">
      <update-birthday
        v-if="isUpdateBirthdayShow"
        v-model="user.birthday"
        @close="isUpdateBirthdayShow = false"
      />
    </van-popup>
    <!-- /编辑生日 -->

    <!-- 上传头像 -->
    <van-popup
      v-model="isUpdatePhotoShow"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <update-photo
        v-if="isUpdatePhotoShow"
        :preview-img="previewImg"
        @update-photo="user.photo = $event"
        @close="isUpdatePhotoShow = false"
      />
    </van-popup>
    <!-- /上传头像 -->
  </div>
</template>

<script>
import { getUserProfile } from '@/api/user'
import EditName from './components/edit-name'
import UpdateGender from './components/update-gender'
import UpdateBirthday from './components/update-birthday'
import UpdatePhoto from './components/update-photo'

export default {
  name: 'UserProfile',
  components: {
    EditName,
    UpdateGender,
    UpdateBirthday,
    UpdatePhoto
  },
  data() {
    return {
      user: {},
      isEditNameShow: false,
      isUpdateGenderShow: false,
      isUpdateBirthdayShow: false,
      isUpdatePhotoShow: false,
      previewImg: null
    }
  },
  methods: {
    async loadUserProfile() {
      try {
        const { data: res } = await getUserProfile()
        this.user = res.data
      } catch (err) {
        this.$toast('请求失败，请稍后再试')
      }
    },
    onAvaterFileChange() {
      // console.log('coming...')
      // 获取文件对象
      const file = this.$refs.avaterFileRef.files[0]
      // 根据文件对象获取blob数据
      this.previewImg = window.URL.createObjectURL(file)
      this.isUpdatePhotoShow = true
      // 如果两次上传相同的图片 则不会触发change事件 所以手动清空
      // 加了v-if之后 好像重复的图片也能触发change事件
      this.$refs.avaterFileRef.value = ''
    }
  },
  created() {
    this.loadUserProfile()
  }
}
</script>

<style lang="less" scoped>
.user-profile {
  .avater {
    width: 60px;
    height: 60px;
  }
}
</style>
