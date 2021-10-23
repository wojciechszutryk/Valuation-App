import React from 'react'
import ClipLoader from 'react-spinners/ClipLoader'
import { ErrorPage } from 'pages'

interface Error {
    stack?: string
}
interface Props {
    children: React.ReactNode
}
interface State {
    hasError: boolean
}

// const SuspenseErrorBoundary = ({ children }: { children: React.ReactNode }) => {
//     const [hasError, setHasError] = React.useState(false)
//
//     const getDerivedStateFromError = () => {
//         return { hasError: true }
//     }
//
//     return (
//         <React.Suspense fallback={<ClipLoader />}>
//             {hasError ? <ErrorPage /> : <>{children}</>}
//         </React.Suspense>
//     )
// }

class SuspenseErrorBoundary extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = { hasError: false }
    }

    static getDerivedStateFromError(error: Error) {
        return { hasError: true }
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.log(error, errorInfo)
    }

    render() {
        return (
            <React.Suspense fallback={<ClipLoader />}>
                {this.state.hasError ? (
                    <ErrorPage />
                ) : (
                    <>{this.props.children}</>
                )}
            </React.Suspense>
        )
    }
}

export default SuspenseErrorBoundary
