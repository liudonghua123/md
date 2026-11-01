import { getDefaultContent } from '@/assets/example/default-content'
import { t } from '@/i18n/translate'
import { stripSurroundingFence } from '@/lib/markdown/stripFence'
import { useEditorStore } from '@/stores/editor'
import { usePostStore } from '@/stores/post'

export function useEditorDocumentActions() {
  const editorStore = useEditorStore()
  const postStore = usePostStore()

  async function formatContent() {
    const doc = await editorStore.formatContent()
    if (doc && postStore.currentPost)
      postStore.updatePostContent(postStore.currentPostId, doc)
    return doc
  }

  function resetContent() {
    editorStore.importContent(getDefaultContent())
    toast.success(t('store.editor.contentReset'))
  }

  function clearContent() {
    editorStore.clearContent()
  }

  function stripEdgeFence() {
    const content = editorStore.getContent()
    const inner = stripSurroundingFence(content)
    if (inner === null) {
      toast.warning(t('store.editor.edgeFenceNotFound'))
      return
    }
    editorStore.importContent(inner)
    toast.success(t('store.editor.edgeFenceStripped'))
  }

  return {
    formatContent,
    resetContent,
    clearContent,
    stripEdgeFence,
  }
}
