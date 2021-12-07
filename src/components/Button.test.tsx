import { findByText, render, screen, fireEvent } from '@testing-library/react';
import { DownloadOutlined } from '@ant-design/icons';
import { Button } from 'components';
import { IButtonOptions } from './Button';

describe('<Button/>', () => {
    const testId = 'bsui-button';
    const loadingIconClassName = '.ant-btn-loading-icon';

    const baseOptions: IButtonOptions = {
        buttonTitle: 'title',
    };

    it('should render button with title', () => {
        render(<Button {...baseOptions} />);
        const button = screen.getByTestId(testId);
        expect(button).toBeDefined();

        // @ts-ignore - seems like typing is not updated in official package
        expect(findByText(baseOptions.buttonTitle)).toBeTruthy();
    });

    it('should render button with icon', () => {
        const iconTestId = 'bsui-testicon';
        const options: IButtonOptions = {
            ...baseOptions,
            icon: <DownloadOutlined data-testid={iconTestId} />,
        };

        render(<Button {...options} />);
        expect(screen.getByTestId(iconTestId)).toBeTruthy();
    });

    it('should render loading button in loading state', () => {
        const options: IButtonOptions = {
            ...baseOptions,
            isLoading: true,
        };

        render(<Button {...options} />);
        const button = screen.getByTestId(testId);

        expect(button.querySelector(loadingIconClassName)).toBeDefined();
    });

    it('should be disabled in disabled state', () => {
        const options: IButtonOptions = {
            ...baseOptions,
            isDisabled: true,
        };

        render(<Button {...options} />);
        expect(screen.getByTestId(testId).closest('button')).toBeDisabled();
    });

    it('should do nothing when no onClick handler is provided', () => {
        render(<Button {...baseOptions} />);
        const button = screen.getByTestId(testId);
        fireEvent.click(button);
        expect(button).toBeEnabled();
        expect(button.querySelector(loadingIconClassName)).toBeNull();
    });

    it('should execute onClick handler when provided', () => {
        const onClickHandler = jest.fn();
        const options: IButtonOptions = {
            ...baseOptions,
            onClick: onClickHandler,
        };
        render(<Button {...options} />);

        const button = screen.getByTestId(testId);
        fireEvent.click(button);

        expect(onClickHandler).toHaveBeenCalledTimes(1);
    });
});
