/**
 * Baut einen pebble-BEM-Klassenstring aus Component-ID und Modifier-Map.
 * bem('button', { size: 'large', style: 'primary', state: 'default' })
 * -> 'pebble-button pebble-button--size-large pebble-button--style-primary pebble-button--state-default'
 *
 * Boolean true erzeugt eine wertlose Modifier-Klasse (--key), z.B. bem('checkbox', { checked: true })
 * -> 'pebble-checkbox pebble-checkbox--checked'. false/undefined/'' werden weggelassen.
 */
export function bem(
  component: string,
  modifiers: Record<string, string | number | boolean | undefined> = {},
): string {
  const base = `pebble-${component}`;
  const mods = Object.entries(modifiers)
    .filter(([, value]) => value !== undefined && value !== false && value !== '')
    .map(([key, value]) => (value === true ? `${base}--${key}` : `${base}--${key}-${value}`))
    .join(' ');
  return mods ? `${base} ${mods}` : base;
}

export function cx(...classNames: Array<string | undefined | false>): string {
  return classNames.filter(Boolean).join(' ');
}
