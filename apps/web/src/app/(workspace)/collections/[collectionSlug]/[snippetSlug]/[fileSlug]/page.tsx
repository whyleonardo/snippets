import { Code } from "@/components/code"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

import { getFileBySlug } from "@/actions/get-file-by-slug"

import { ClipboardCopyButton } from "./_components/clipboard-copy-button"

interface FileSlugProps {
  params: {
    snippetSlug: string
    fileSlug: string
  }
}

const FileSlugPage = async ({
  params: { fileSlug, snippetSlug },
}: FileSlugProps) => {
  const [file] = await getFileBySlug({ snippetSlug, fileSlug })

  // TODO - Handle 404
  if (!file) {
    return null
  }

  return (
    <div>
      <ScrollArea className="size-full px-4 pt-4">
        <Code code={file?.content as string} lang={file?.language} />

        <ScrollBar className="h-2.5" orientation="horizontal" />
      </ScrollArea>
      <ClipboardCopyButton code={file?.content} />
    </div>
  )
}

export default FileSlugPage
