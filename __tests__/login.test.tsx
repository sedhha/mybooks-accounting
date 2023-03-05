import React from 'react';
import { render } from '@testing-library/react';
import LoginScreen from '@/components/Login';
import * as NextRouter from 'next/router';

describe('LoginScreen', () => {
	beforeEach(() => {
		// Create a Jest mock for the `useRouter` hook
		const mockRouter: NextRouter.NextRouter = {
			route: '/',
			pathname: '/',
			asPath: '/',
			basePath: '',
			isLocaleDomain: false,
			push: jest.fn(),
			replace: jest.fn(),
			reload: jest.fn(),
			back: jest.fn(),
			forward: jest.fn(),
			prefetch: jest.fn(),
			beforePopState: jest.fn(),
			events: {
				on: jest.fn(),
				off: jest.fn(),
				emit: jest.fn(),
			},
			isFallback: false,
			isReady: true,
			isPreview: false,
			query: {},
		};

		// Mock the `useRouter` hook
		jest.spyOn(NextRouter, 'useRouter').mockReturnValue(mockRouter);
	});
	afterAll(() => {
		jest.resetAllMocks();
		jest.clearAllMocks();
	});
	test('renders LoginScreen component', () => {
		const { container } = render(<LoginScreen />);
		expect(container).toMatchSnapshot();
	});
});
