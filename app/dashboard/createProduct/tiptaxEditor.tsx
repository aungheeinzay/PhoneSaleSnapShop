'use client'

import { Button } from '@/components/ui/button'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Bold, Italic, List, Strikethrough, Underline } from 'lucide-react'
import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'

const Tiptap = ({value}:{value:string}) => {
const {setValue} = useFormContext()
  const editor = useEditor({
    extensions: [
        StarterKit.configure({
            orderedList:{
                HTMLAttributes:{class:'list-decimal pl-4'}
            },
            bulletList:{
                HTMLAttributes:{class:"list-disc pl-4"}
            }
        })

    ],
    content: value,
    immediatelyRender:false,
    editorProps:{
        attributes:{
            class:"min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
        }
    },
    onUpdate:({editor})=>{
        const content =editor.getHTML()
        setValue("description",content,{
            shouldDirty:true,
            shouldValidate:true
        })
        
    }

  })
useEffect(()=>{
if(editor)editor.commands.setContent(value || "")
},[value])
  return <div>
    <EditorContent editor={editor} />
    {
        editor && <div className='flex gap-2'>
        <Button type='button' onClick={()=>editor.chain().focus().toggleBold().run()}
           
            >
            <Bold/>
        </Button>
          <Button type='button' onClick={()=>editor.chain().focus().toggleItalic().run()}>
            <Italic />
        </Button>
          <Button type='button' onClick={()=>editor.chain().focus().toggleStrike().run()}
           >
            <Strikethrough/>
        </Button>
          <Button type='button' onClick={()=>editor.chain().focus().toggleOrderedList().run()}
           >
            <List/>
        </Button>
         <Button type='button'
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        
      >
        <Underline/>
      </Button>
        </div>
    }
  </div>
}
export default Tiptap