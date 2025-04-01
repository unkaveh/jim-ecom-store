import React from "react";
import Image from "next/image";
import ReactMarkdown from "react-markdown";

interface CMSPageProps {
  title: string;
  content: string;
  featuredImage?: string;
}

export function CMSPage({ title, content, featuredImage }: CMSPageProps) {
  return (
    <article className="mx-auto max-w-4xl py-8">
      <h1 className="mb-6 text-3xl font-bold md:text-4xl">{title}</h1>

      {featuredImage && (
        <div className="relative mb-8 h-[300px] w-full overflow-hidden rounded-lg md:h-[400px]">
          <Image
            src={featuredImage}
            alt={title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      <div className="prose prose-stone max-w-none dark:prose-invert">
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </article>
  );
}
