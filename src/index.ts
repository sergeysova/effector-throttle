import {
  is,
  createEffect,
  forward,
  createEvent,
  guard,
  Unit,
  Event,
} from 'effector';

export function createThrottle<T>(
  callee: Unit<T>,
  timeout: number,
  { name = (callee as any).shortName || 'unknown' } = {},
): Event<T> {
  if (!is.unit(callee)) throw new Error('callee must be unit from effector');
  if (typeof timeout !== 'number' || timeout < 0)
    throw new Error('timeout must be positive number or zero');

  const tick = createEvent<T>(`${name}ThrottleTick`);

  const timer = createEffect<T, T>(`${name}ThrottleTimer`).use(
    (parameter) =>
      new Promise((resolve) => {
        setTimeout(resolve, timeout, parameter);
      }),
  );

  guard({
    source: callee,
    filter: timer.pending.map((is) => !is),
    target: timer,
  });

  forward({
    from: timer.done.map(({ result }) => result),
    to: tick,
  });

  return tick;
}
