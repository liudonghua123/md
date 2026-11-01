<script setup lang="ts">
import { Eraser } from '@lucide/vue'

import { useEditorDocumentActions } from '@/composables/useEditorDocumentActions'

withDefaults(defineProps<{
  asSub?: boolean
}>(), {
  asSub: false,
})

const { stripEdgeFence } = useEditorDocumentActions()
const { t } = useI18n()
</script>

<template>
  <MenubarSub v-if="asSub">
    <MenubarSubTrigger>
      {{ t('menu.cleanup') }}
    </MenubarSubTrigger>
    <MenubarSubContent class="min-w-56">
      <MenubarItem @click="stripEdgeFence()">
        <Eraser class="mr-2 h-4 w-4" />
        {{ t('menu.stripEdgeFence') }}
      </MenubarItem>
    </MenubarSubContent>
  </MenubarSub>

  <MenubarMenu v-else>
    <MenubarTrigger>{{ t('menu.cleanup') }}</MenubarTrigger>
    <MenubarContent align="start" class="min-w-56">
      <MenubarItem @click="stripEdgeFence()">
        <Eraser class="mr-2 h-4 w-4" />
        {{ t('menu.stripEdgeFence') }}
      </MenubarItem>
    </MenubarContent>
  </MenubarMenu>
</template>
