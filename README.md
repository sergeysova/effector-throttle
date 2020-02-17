# Effector Throttle

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

To test that original event is correctly throttled you can add watcher:

```ts
someHappened.watch((payload) => {
  console.info('someHappened now', payload);
});

throttled(1);
throttled(2);
throttled(3);
throttled(4);
```
