import React from 'react'
import { ApolloClient, InMemoryCache } from '@apollo/client'
import { GET_ALL_SLUGS, GET_INDIVIDUAL_POST } from '../graphql/queries';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote } from 'next-mdx-remote';
import { IPost } from '../types';
import rehypePrism from 'rehype-prism-plus';
import rehypeCodeTitles from 'rehype-code-titles';


const client = new ApolloClient({
	uri: 'https://alberto-strapi-blog.herokuapp.com/graphql',
	cache: new InMemoryCache()
});


export default function Post({post} : {post: IPost}) {

	return (
		<div>
			<h1>{post.attributes.title}</h1>
			<MDXRemote {...post.attributes.content} />
		</div>
	)
}

export async function getStaticPaths() {

		const {data} = await client.query({query: GET_ALL_SLUGS});

		const paths = data.blogPosts.data.map((post: IPost) => {
			return { params: {slug: post.attributes.urlSlug}}
		});

		return {
			paths,
			fallback: false
		}
}

export async function getStaticProps({params} : any) {

		const { data } = await client.query({
			query: GET_INDIVIDUAL_POST,
			variables: {slugUrl: params.slug}
		})

		const attrs = data.blogPosts.data[0].attributes;
		const content = await serialize(attrs.content, {mdxOptions: {
			rehypePlugins: [
				rehypeCodeTitles,
				rehypePrism
			]
		}})
		return {
			props: {
				post: {
					attributes: {
						title: attrs.title,
						content			
					}		
				}
			}
		}
}