<script setup lang="ts">
import { useChat } from "@ai-sdk/vue";

const { messages, input, handleSubmit, status } = useChat({
  api: "/api/chat",
});
</script>

<template>
  <div class="flex flex-col w-full max-w-md py-24 mx-auto gap-4">
    <h1 class="text-2xl font-bold">Chat with AI</h1>

    <div class="flex flex-col gap-4 max-h-96">
      <div v-for="message in messages" :key="message.id" class="p-3 rounded-lg">
        <div
          :class="
            message.role === 'user'
              ? 'bg-blue-100 dark:bg-blue-900 ml-auto'
              : 'bg-gray-100 dark:bg-gray-800'
          "
          class="p-3 rounded-lg max-w-xs"
        >
          <div class="text-sm font-semibold mb-1">
            {{ message.role === "user" ? "You" : "AI" }}
          </div>
          <div class="whitespace-pre-wrap">
            <template v-if="message.parts">
              <div
                v-for="(part, i) in message.parts"
                :key="`${message.id}-${i}`"
              >
                <div v-if="part.type === 'text'">{{ part.text }}</div>
                <div
                  v-else-if="part.type === 'tool-invocation'"
                  class="bg-yellow-50 dark:bg-yellow-900 p-2 rounded mt-2"
                >
                  <div
                    class="text-xs font-mono text-gray-600 dark:text-gray-400"
                  >
                    🛠️ {{ part.toolInvocation.toolName }}
                  </div>
                  <div
                    v-if="part.toolInvocation.state === 'result'"
                    class="mt-1"
                  >
                    {{
                      part.toolInvocation.result.content?.[0]?.text ||
                      JSON.stringify(part.toolInvocation.result)
                    }}
                  </div>
                  <div v-else class="text-xs text-gray-500">実行中...</div>
                </div>
              </div>
            </template>
            <template v-else>
              {{ message.content }}
            </template>
          </div>
        </div>
      </div>
    </div>

    <form @submit.prevent="handleSubmit" class="flex flex-col gap-2">
      <input
        v-model="input"
        type="text"
        class="w-full p-3 border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-gray-800"
        placeholder="メッセージを入力..."
        :disabled="status !== 'ready'"
      />
      <button
        type="submit"
        class="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
        :disabled="status !== 'ready'"
      >
        {{ status !== "ready" ? "送信中..." : "送信" }}
      </button>
    </form>
  </div>
</template>
