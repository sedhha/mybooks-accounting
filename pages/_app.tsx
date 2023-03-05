import Footer from '@/components/Footer';
import '@/styles/global.css';
import type { AppProps } from 'next/app';
import React from 'react';

export default function MyApp({ Component, pageProps }: AppProps) {
	return (
		<React.Fragment>
			<Component {...pageProps} />
				<Footer />
		</React.Fragment>
	);
}
