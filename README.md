# Effector Throttle

[![npm bundle size](https://img.shields.io/bundlephobia/min/effector-throttle)](https://bundlephobia.com/result?p=effector-throttle)

> **Deprecated**: use [patronum](https://github.com/sergeysova/patronum) instead

https://codesandbox.io/s/effector-throttle-debounce-w32tk

## Installation

```bash
npm install --save effector effector-throttle

# or

yarn add effector effector-throttle
```

## Usage

Create event that should be throttled:

```ts
import { createEvent } from 'effector';

const someHappened = createEvent<number>();
```

Create throttled event from it:

```ts
import { createThrottle } from 'effector-throttle';

const THROTTLE_TIMEOUT_IN_MS = 200;

const throttled = createThrottle(someHappened, THROTTLE_TIMEOUT_IN_MS);
```

When you call `someHappened` it will throttle call to `throttled` event:

```ts
throttled.watch((payload) => {
  console.info('someHappened now', payload);
});

someHappened(1);
someHappened(2);
someHappened(3);
someHappened(4);
```

Also you can use `Effect` and `Store` as trigger. `createThrottle` always returns `Event`:

```ts
const event = createEvent<number>();
const debouncedEvent: Event<number> = createThrottle(event, 100);

const fx = createEffect<number, void>();
const debouncedEffect: Event<number> = createThrottle(fx, 100);

const $store = createStore<number>(0);
const debouncedStore: Event<number> = createThrottle($store, 100);
```

### Change name

```ts
const trigger = createEvent();
const throttled = createThrottle(trigger, 100);

// Now throttled var has `triggerThrottleTick` name
```

To change name:

```ts
const trigger = createEvent();
const throttled = createThrottle(trigger, 100, { name: 'Hello' });

// Now throttled var has `HelloThrottleTick` name
```
