import Link from 'next/link';
import React from 'react';

const Nav = () => {
	return (
		<div className="nav">
			<p className="logo"><strong>CoderBlog</strong></p>
			<div>
				<Link href='/'>
					Home
				</Link>
			</div>
		</div>
	)
}

export default Nav;