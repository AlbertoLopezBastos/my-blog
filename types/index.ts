import { MDXRemoteSerializeResult } from "next-mdx-remote";

export interface IPost {
		attributes: {
			title: String,
			description: String,
			urlSlug: URL,
			content: MDXRemoteSerializeResult,
		}	
}