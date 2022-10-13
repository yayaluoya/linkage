<script lang="ts">
import { ref, reactive, watch, toRef, computed, onMounted } from "vue";
import MDShow from "./MDShow.vue";
import marked from "-/marked";
import table_ from "./com/table/table.vue";
import { IConType } from "./IConType";
import { createThrottleFun } from "yayaluoya-tool/dist/throttleAntiShake";
import anime from "animejs/lib/anime.js";
import { EEasing } from "@/_d/EEasing";
import Dialog from ">/Dialog/Dialog.vue";
import Img_ from "./com/img/img.vue";
import Emoji_ from "./com/emoji/emoji.vue";
import Help_ from "./com/help/help.vue";
import Theme_ from "./com/theme/theme.vue";
import { insertContent } from "./insertContent";
import { themeType } from "./MDTheme";

export default {
  components: { MDShow, table_, Dialog, Img_, Emoji_, Help_, Theme_ },
  props: {
    md: {
      type: String,
      default: "",
    },
    md_theme: {
      type: String,
      default: "",
    },
    code_theme: {
      type: String,
      default: "",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["update:md", "update:md_theme", "update:code_theme"],
  setup(props, ctx) {
    const input = computed(() => {
      return props.md;
    });
    const mdContent = computed(() => {
      return marked.parse(input.value);
    });
    const textareaRef = ref<HTMLTextAreaElement>();
    /** 操作列表 */
    const conList = reactive<IConType>({
      theme: {
        ak: "M",
        alertTitle: "主题 (Ctrl+M)",
        showSelect: false,
        selectBack(type: themeType, value: string) {
          if (props.disabled) {
            return;
          }
          switch (type) {
            case "md":
              ctx.emit("update:md_theme", value);
              break;
            case "code":
              ctx.emit("update:code_theme", value);
              break;
          }
        },
        onClick() {
          this.showSelect = !this.showSelect;
        },
        noClick() {
          this.showSelect = false;
        },
      },
      boldface: {
        ak: "B",
        alertTitle: "粗体 (Ctrl+B)",
        onClick() {
          insertContent_(" **$** ", "粗体");
        },
      },
      italic: {
        ak: "I",
        alertTitle: "斜体 (Ctrl+I)",
        onClick() {
          insertContent_(" _$_ ", "强调");
        },
      },
      title: {
        ak: "H",
        alertTitle: "标题 (Ctrl+H)",
        onClick() {
          insertContent_("### $\n", "标题");
        },
      },
      url: {
        ak: "L",
        alertTitle: "链接 (Ctrl+L)",
        onClick() {
          insertContent_("[$](http://)", "输入链接说明");
        },
      },
      img: {
        ak: "G",
        alertTitle: "图片 (Ctrl+G)",
        showSelect: false,
        selectBack: (_str: string) => {
          insertContent_(`![输入图片说明](${_str} "在这里输入图片标题")`);
        },
        onClick() {
          this.showSelect = true;
        },
      },
      emoji: {
        ak: "E",
        alertTitle: "表情 (Ctrl+E)",
        showSelect: false,
        selectBack: (_str: string) => {
          conList.emoji.showSelect = false;
          insertContent_(`${_str}`);
        },
        onClick() {
          this.showSelect = true;
        },
      },
      uList: {
        ak: "U",
        alertTitle: "无序列表 (Ctrl+U)",
        onClick() {
          insertContent_("- $", "这里是列表文本");
        },
      },
      oList: {
        ak: "O",
        alertTitle: "有序列表 (Ctrl+O)",
        onClick() {
          insertContent_("1. $", "这里是列表文本");
        },
      },
      table: {
        alertTitle: "表格",
        showSelect: false,
        openSelect: () => {
          conList.table.showSelect = false;
        },
        selectBack: (_str: string) => {
          insertContent_(`${_str}`, "");
        },
        onClick() {
          this.showSelect = !this.showSelect;
        },
        noClick() {
          this.showSelect = false;
        },
      },
      code: {
        ak: "K",
        alertTitle: "代码 (Ctrl+K)",
        onClick() {
          insertContent_("\n```\n$\n```\n", "这里输入代码");
        },
      },
      use: {
        ak: "Q",
        alertTitle: "引用 (Ctrl+Q)",
        onClick() {
          insertContent_("> $", "这里输入引用文本");
        },
      },
      show: {
        ak: "P",
        alertTitle: "预览 (Ctrl+P)",
        ifShow: false,
        onClick() {
          this.ifShow = !this.ifShow;
        },
      },
      help: {
        ak: "/",
        alertTitle: "帮助 (Ctrl+/)",
        showSelect: false,
        onClick() {
          this.showSelect = true;
        },
      },
    });
    /** 是否显示md */
    const ifShowMd = computed(() => {
      return conList.show.ifShow;
    });
    //左右内容ref
    const leftConRef = ref<HTMLDivElement>();
    const rightConRef = ref<HTMLDivElement>();

    /** input值变化 */
    function inputChange(e: any) {
      if (props.disabled) {
        return;
      }
      ctx.emit("update:md", e.target.value);
    }

    //监听md的变化
    watch(input, () => {
      setTimeout(() => {
        setTextareaHeight();
      }, 0);
    });

    /** 插入内容的函数包装 */
    function insertContent_(_tem: string, _def?: string) {
      if (props.disabled) {
        return;
      }
      insertContent(textareaRef.value!, _tem, _def, (_value) => {
        ctx.emit("update:md", _value);
      });
    }

    onMounted(() => {
      textareaRef.value?.addEventListener("keydown", (e: KeyboardEvent) => {
        if (e.ctrlKey) {
          //执行快捷键匹配，如果有匹配到的话就阻止事件冒泡
          AK(e.key) && e.preventDefault();
        } else {
          //对其他快捷键进行监听
          if (e.key == "Tab") {
            insertContent_("  $");
            e.preventDefault();
          }
        }
      });
      asyncContent();
      //在下一个宏任务中设置内容高度，因为此时内容才能填充完毕
      setTimeout(() => {
        setTextareaHeight();
      }, 0);
    });

    /** 控制器点击 */
    function conClick(_key: keyof IConType) {
      let keys: (keyof IConType)[] = Object.keys(conList) as any;
      for (let i of keys) {
        if (i != _key) {
          //触发noClick
          conList[i].noClick?.();
        } else {
          //触发点击事件
          conList[i].onClick?.();
        }
      }
    }
    /** 快捷键 */
    function AK(_key: string): boolean {
      let keys: (keyof IConType)[] = Object.keys(conList) as any;
      for (let i of keys) {
        if (
          conList[i].ak &&
          new RegExp(`^${conList[i].ak!}$`, "i").test(_key)
        ) {
          conList[i].onClick?.();
          return true;
        }
      }
      return false;
    }

    /** 设置文本域高度，不显示进度条所以要显示全部高度 */
    function setTextareaHeight() {
      if (!textareaRef.value) {
        return;
      }
      // console.log(
      //   textareaRef.value!.scrollHeight - textareaRef.value!.offsetHeight,
      //   textareaRef.value!.scrollHeight
      // );
      //当出现滚动内容时才重置高度
      if (textareaRef.value.scrollHeight - textareaRef.value.offsetHeight > 0) {
        textareaRef.value.style.height = `${textareaRef.value.scrollHeight}px`;
      }
    }
    /** 同步滚动内容 */
    function asyncContent() {
      // console.log(leftConRef.value, rightConRef.value);
      //添加滚动事件
      leftConRef.value?.addEventListener(
        "scroll",
        createThrottleFun(() => {
          //获取滚动比例，滚动高度/(内容高度-显示高度);
          let percentage =
            leftConRef.value!.scrollTop /
            (leftConRef.value!.scrollHeight - leftConRef.value!.offsetHeight);
          let scrollTop =
            percentage *
            (rightConRef.value!.scrollHeight - rightConRef.value!.offsetHeight);
          anime({
            targets: rightConRef.value!,
            scrollTop,
            duration: 300,
            easing: EEasing.easeOutCubic,
          });
        }, 10)
      );
    }

    /** 文本域或者显示区域点击 */
    function textareaAndShowMdClick() {
      let keys: (keyof IConType)[] = Object.keys(conList) as any;
      //触发全部操作按钮的不点击事件
      keys.forEach((key) => {
        conList[key].noClick?.();
      });
    }

    //
    return {
      input,
      mdContent,
      inputChange,
      textareaRef,
      ifShowMd,
      conList,
      conClick,
      leftConRef,
      rightConRef,
      textareaAndShowMdClick,
    };
  },
};
</script>

<template>
  <div class="mdEdit">
    <div class="top">
      <div class="group">
        <button
          type="button"
          :title="conList.theme.alertTitle"
          :class="{
            on: conList.theme.showSelect,
          }"
          @click="conClick('theme')"
        >
          <el-popover
            :visible="conList.theme.showSelect"
            placement="bottom"
            :width="300"
            trigger="manual"
          >
            <Theme_
              :md_theme="md_theme"
              :code_theme="code_theme"
              @selectBack="conList.theme.selectBack"
            />
            <template #reference>
              <span>主题M</span>
            </template>
          </el-popover>
        </button>
      </div>
      <span></span>
      <div class="group">
        <button
          type="button"
          :title="conList.boldface.alertTitle"
          @click="conClick('boldface')"
        >
          <span>粗体B</span>
        </button>
        <button
          type="button"
          :title="conList.italic.alertTitle"
          @click="conClick('italic')"
        >
          <span>斜体I</span>
        </button>
        <button
          type="button"
          :title="conList.title.alertTitle"
          @click="conClick('title')"
        >
          <span>标题H</span>
        </button>
      </div>
      <span></span>
      <div class="group">
        <button
          type="button"
          :title="conList.url.alertTitle"
          @click="conClick('url')"
        >
          <span>链接L</span>
        </button>
        <button
          type="button"
          :title="conList.img.alertTitle"
          :class="{
            on: conList.img.showSelect,
          }"
          @click="conClick('img')"
        >
          <span>图片G</span>
          <Img_
            v-model:show="conList.img.showSelect"
            @selectBack="conList.img.selectBack"
          />
        </button>
        <button
          type="button"
          :title="conList.emoji.alertTitle"
          :class="{
            on: conList.emoji.showSelect,
          }"
          @click="conClick('emoji')"
        >
          <span>表情E</span>
          <Emoji_
            v-model:show="conList.emoji.showSelect"
            @selectBack="conList.emoji.selectBack"
          />
        </button>
      </div>
      <span></span>
      <div class="group">
        <button
          type="button"
          :title="conList.uList.alertTitle"
          @click="conClick('uList')"
        >
          <span>无序列表U</span>
        </button>
        <button
          type="button"
          :title="conList.oList.alertTitle"
          @click="conClick('oList')"
        >
          <span>有序列表O</span>
        </button>
        <button
          type="button"
          :title="conList.table.alertTitle"
          size="mini"
          :class="{
            on: conList.table.showSelect,
          }"
          @click="conClick('table')"
        >
          <el-popover
            :visible="conList.table.showSelect"
            placement="bottom"
            :width="160"
            trigger="manual"
          >
            <table_
              @selectBack="conList.table.selectBack"
              @openSelect="conList.table.openSelect"
            />
            <template #reference>
              <span>表格</span>
            </template>
          </el-popover>
        </button>
        <button
          type="button"
          :title="conList.code.alertTitle"
          @click="conClick('code')"
        >
          <span>代码K</span>
        </button>
        <button
          type="button"
          :title="conList.use.alertTitle"
          @click="conClick('use')"
        >
          <span>引用Q</span>
        </button>
      </div>
      <span></span>
      <div class="group">
        <button
          type="button"
          :title="conList.show.alertTitle"
          :class="{
            on: conList.show.ifShow,
          }"
          @click="conClick('show')"
        >
          <span>预览P</span>
        </button>
      </div>
      <span></span>
      <div class="group">
        <button
          type="button"
          :title="conList.help.alertTitle"
          :class="{
            on: conList.help.showSelect,
          }"
          @click="conClick('help')"
        >
          <span>帮助?</span>
          <Help_ v-model:show="conList.help.showSelect" />
        </button>
      </div>
    </div>
    <div
      class="content"
      :class="{
        showMd: ifShowMd,
      }"
      @click="textareaAndShowMdClick"
    >
      <div class="left" ref="leftConRef">
        <textarea
          :disabled="disabled"
          ref="textareaRef"
          placeholder
          :value="input"
          @input="inputChange"
        ></textarea>
      </div>
      <div class="right" ref="rightConRef">
        <MDShow
          :content="mdContent"
          :md_theme="md_theme"
          :code_theme="code_theme"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.mdEdit {
  --content-height: 500px;
  width: 100%;
  display: flex;
  flex-direction: column;
  border: 1px solid var(--border-color-dark);
  border-radius: var(--border-radius);
  overflow: hidden;
  > .top {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    border-bottom: 1px solid var(--border-color);
    padding: 5px;
    // background-color: var(--background-color);
    opacity: 0.8;
    transition: all 0.2s;
    > .group {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      > button {
        outline: none;
        border: none;
        padding: 5px;
        font-weight: bold;
        background-color: transparent;
        height: 25px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        transition: background-color 0.2s;
        &:hover {
          border-radius: var(--border-radius);
          background-color: white;
        }
        &.on {
          border-radius: var(--border-radius);
          border: 1px solid var(--border-color-dark);
          background-color: white;
        }
        > span {
          color: var(--color);
          font-size: 12px;
          display: flex;
          flex-direction: row;
          align-items: end;
          justify-content: center;
        }
      }
    }
    > span {
      margin: 0 5px;
      height: 10px;
      border-right: 1px solid var(--border-color-dark);
    }
    &:hover {
      opacity: 1;
    }
  }
  > .content {
    background-color: white;
    display: grid;
    &:not(.showMd) {
      grid-template-columns: 100%;
      > .left {
      }
      > .right {
        display: none;
      }
    }
    &.showMd {
      grid-template-columns: calc(50% - 1px) calc(50% - 1px);
      > .left {
        border-right: 1px dashed var(--border-color);
      }
      > .right {
        margin-left: 1px;
      }
    }
    > .left {
      height: 100%;
      max-height: var(--content-height);
      overflow-y: auto;
      transition: all 0.2s;
      // background-color: #222231;
      color: white;
      > textarea {
        color: var(--color);
        width: calc(100% - 20px);
        padding: 10px;
        height: calc(100% - 20px);
        min-height: 200px;
        overflow: hidden;
        overflow-wrap: break-word;
        display: block;
        border: none;
        outline: none;
        margin: 0;
        background-color: transparent;
        resize: none;
        transition: all 0.4s;
        font-size: 14px;
      }
    }
    > .right {
      height: 100%;
      max-height: var(--content-height);
      overflow-y: auto;
      transition: all 0.2s;
    }
  }
}
</style>
