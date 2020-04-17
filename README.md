# Mail App

一款简易邮箱App。

## Document

[TAPD(需登录)](https://www.tapd.cn/55280682/documents/file_list)



## Development
(科学上网依然很慢

### For MacOS

1. 安装`node`, `watchman`.

   `brew install node`

   `brew install watchman`

2. 安装`JDK`

   建议直接官网下载`JDK8`或者更新版本.

3. 安装`Android`开发环境

   下载`Android Studio`后，勾选相关依赖即可.

4. 安装`react-native-cli`

   `npm i -i react-native-cli`

5.  运行已存在的项目

   `react-native run-android`

#### Problem

1. 官网文档太老了

   环境变量（注意第4行，和官网的不一样）.

   同时`cmdline-tools`需要在`Android Studio`自行下载.

   ```
   export ANDROID_HOME=$HOME/Library/Android/sdk
   export PATH=$PATH:$ANDROID_HOME/emulator
   export PATH=$PATH:$ANDROID_HOME/tools
   export PATH=$PATH:$ANDROID_HOME/cmdline-tools/latest/bin
   export PATH=$PATH:$ANDROID_HOME/platform-tools
   ```

2. gradle下载失败

   手动下载，把压缩包放在`/android/gradle/wrapper`内，然后修改该目录下的`gradle-wrapper.properties`将其下载地址目标改为当前目录下已经下载的文件路径.

   然后需要手动导出环境变量(把压缩包解压到`/usr/local`)

   `export GRADLE_USER_HOME=/usr/local/gradle-6.0.1`

   `export PATH=$PATH:$GRADLE_USER_HOME/bin`

3. gradle自动安装失败
   在`android/build.gradle`中配置镜像源，如下
   
   ```diff
   buildscript {
       ext {
           buildToolsVersion = "28.0.3"
           minSdkVersion = 16
           compileSdkVersion = 28
           targetSdkVersion = 28
       }
       repositories {
   +        maven { url 'https://maven.aliyun.com/repository/google'}
   +        maven { url 'https://maven.aliyun.com/repository/jcenter'}
   +        maven { url 'https://maven.aliyun.com/repository/public'}
       }
   - 			 // remove other repo
       dependencies {
           classpath("com.android.tools.build:gradle:3.5.2")
   
           // NOTE: Do not place your application dependencies here; they belong
           // in the individual module build.gradle files
       }
   }
   ```
   
4. **建议使用`flutter`**


## API

[Yapi](http://yapi.wghtstudio.cn/)


