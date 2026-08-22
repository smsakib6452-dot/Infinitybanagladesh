import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallbackTitle?: string;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class AdminErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Admin Panel Component Error caught by ErrorBoundary:', error, errorInfo);
    this.setState({ errorInfo });
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="bg-white rounded-3xl border border-rose-200 p-8 space-y-4 shadow-warm-sm text-center">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600">
            <AlertTriangle className="w-7 h-7" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-extrabold text-slate-900 font-display">
              {this.props.fallbackTitle || 'Component Error (কম্পোনেন্ট ত্রুটি)'}
            </h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              This section encountered an unexpected issue. The rest of the Admin Panel is still fully functional.
            </p>
          </div>

          {this.state.error && (
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 max-w-lg mx-auto text-left overflow-x-auto">
              <p className="text-[11px] font-mono text-rose-700 font-bold">
                {this.state.error.name}: {this.state.error.message}
              </p>
            </div>
          )}

          <div className="pt-2 flex justify-center gap-3">
            <button
              type="button"
              onClick={this.handleReset}
              className="px-4 py-2 bg-[#006A4E] hover:bg-[#00523C] text-white text-xs font-bold rounded-xl shadow-warm-sm flex items-center gap-1.5 cursor-pointer transition-all"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Retry / Recover Component</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
