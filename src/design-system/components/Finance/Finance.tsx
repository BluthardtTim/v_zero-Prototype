import { CreditCard, Plus } from '@phosphor-icons/react';
import { bem, cx } from '../../utils/bem';
import { Divider } from '../Divider';
import { Button } from '../Button';
import type { FinanceProps } from './Finance.types';

export function Finance({
  period,
  headline,
  transactions,
  buttonLabel,
  buttonIcon,
  onButtonClick,
  className,
}: FinanceProps) {
  return (
    <div className={cx(bem('finance'), className)}>
      <div className="pebble-finance__header">
        <span className="pebble-finance__period">{period}</span>
        <span className="pebble-finance__headline">{headline}</span>
      </div>

      <Divider />

      <div className="pebble-finance__transactions">
        {transactions.map((tx, index) => (
          <div className="pebble-finance__row" key={index}>
            <div className="pebble-finance__row-icon">{tx.icon ?? <CreditCard size={20} weight="regular" />}</div>
            <div className="pebble-finance__row-text">
              <span className="pebble-finance__row-title">{tx.title}</span>
              <span className="pebble-finance__row-subtitle">{tx.subtitle}</span>
            </div>
            <span className={cx('pebble-finance__row-amount', `pebble-finance__row-amount--${tx.tone}`)}>
              {tx.amount}
            </span>
          </div>
        ))}
      </div>

      <Button
        size="large"
        style="primary"
        type="text-icon"
        label={buttonLabel}
        icon={buttonIcon ?? <Plus size={20} weight="regular" />}
        onClick={onButtonClick}
        className="pebble-finance__button"
      />
    </div>
  );
}
