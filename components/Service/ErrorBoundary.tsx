import React, { ReactNode } from "react";
interface Props {
    children?: ReactNode;
    message?: string;
}

interface State {
    hasError: boolean;
}
class ErrorBoundary extends React.Component<Props, State> {
    public state: State = {
        hasError: false
    };

    static getDerivedStateFromError() {
        // Update state so the next render will show the fallback UI

        return { hasError: true };
    }
    componentDidCatch() {
        // You can use your own error logging service here
    }
    render() {
        // Check if the error is thrown
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return (
                <div>
                    <h2>Oops, there is an error!</h2>
                    <div>
                        <h3>{`Problem:  ${this.props.message}`}</h3>
                    </div>
                    {/* <button
                        type="button"
                        onClick={() => this.setState({ hasError: false })}
                    >
                        Try again?
                    </button> */}
                </div>
            );
        }

        // Return children components in case of no error

        return this.props.children;
    }
}

export default ErrorBoundary;
