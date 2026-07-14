import type { ReactNode } from 'react';

export interface FinanceTransaction {
  /** Defaults to a generic payment icon when omitted. */
  icon?: ReactNode;
  title: string;
  subtitle: string;
  amount: string;
  /** 'owed': red (this amount is still owed). 'settled': green (paid / owed back to the user). */
  tone: 'owed' | 'settled';
}

export interface FinanceProps {
  /** e.g. "Today" */
  period: string;
  /** e.g. "You owe Helene 12,50€" */
  headline: string;
  transactions: FinanceTransaction[];
  buttonLabel: string;
  buttonIcon?: ReactNode;
  onButtonClick?: () => void;
  className?: string;
}
