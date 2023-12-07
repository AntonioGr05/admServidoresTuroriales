import React, { useState, useEffect } from "react";
import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'
import axios from "axios";
import NAVBAR from './components/barranav'
import FOOTER from './components/footer'

export default function MarkdownToHtml(){

    const [markdown, setMarkdown] = useState('')

    const content = async () => {
        const res = await axios.get('./api/dns')
        setMarkdown(res.data)
    }

    useEffect(() => {
        content()
    }, [])

    return (
      <>
        <NAVBAR/>
        <div className="prose prose-slate m-auto w-2/4 mt-10">
        < ReactMarkdown ReactMarkdown className="markdown__preview w-full">{markdown}</ReactMarkdown>
        </div>
        <FOOTER/>
      </>
      
    )
}